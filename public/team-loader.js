/**
 * PulseRoute Team Dynamic Synchronization Client
 * Fetches live team members from the Rust backend API with fallback support.
 */

(function() {
  const API_ENDPOINT = window.location.origin.includes('localhost') || window.location.origin.includes('127.0.0.1')
    ? '/api/v1/team'
    : '/api/team';

  async function syncLiveTeamData() {
    const teamGrid = document.querySelector('.team-grid');
    if (!teamGrid) return;

    try {
      const response = await fetch(API_ENDPOINT);
      if (!response.ok) return;

      const resData = await response.json();
      if (!resData || !resData.success || !Array.isArray(resData.data) || resData.data.length === 0) {
        return; // Retain existing static markup if no live members returned
      }

      const currentLang = document.documentElement.getAttribute('lang') || 'en';
      const isArabic = currentLang === 'ar';
      const members = resData.data;

      // Render updated team cards
      teamGrid.innerHTML = members.map((member, idx) => {
        const name = isArabic ? (member.name_ar || member.name_en) : (member.name_en || member.name_ar);
        const role = isArabic ? (member.role_ar || member.role_en) : (member.role_en || member.role_ar);
        const ageLabel = isArabic ? 'العمر' : 'Age';
        const skillsHeading = isArabic ? 'المهارات الأساسية:' : 'Core Skills:';
        const portfolioLabel = isArabic ? 'زيارة الموقع الشخصي' : 'View Portfolio / Subdomain';
        
        let avatar = member.avatar_url || 'assets/logo.png';
        if (!avatar.startsWith('http') && !avatar.startsWith('/') && !avatar.startsWith('assets/')) {
          avatar = `/${avatar}`;
        }

        const skills = Array.isArray(member.skills) ? member.skills : [];
        const skillsListHtml = skills.map(skill => `<li>${escapeHtml(skill)}</li>`).join('');

        // Badge icon based on role
        let badgeIcon = 'fa-code';
        const roleLower = (member.role_en || '').toLowerCase();
        if (roleLower.includes('backend') || roleLower.includes('database')) badgeIcon = 'fa-server';
        else if (roleLower.includes('ai') || roleLower.includes('machine learning')) badgeIcon = 'fa-brain';
        else if (roleLower.includes('security') || roleLower.includes('cyber')) badgeIcon = 'fa-shield-halved';
        else if (roleLower.includes('embedded') || roleLower.includes('hardware')) badgeIcon = 'fa-microchip';

        const staggerClass = `team-reveal-${(idx % 4) + 1}`;

        // Social Links and Subdomain / Portfolio Link
        const social = member.social_links || {};
        const portfolioUrl = social.portfolio || social.website;

        const socialButtonsHtml = `
          <div class="team-social-links" style="display: flex; gap: 8px; margin-top: 14px; flex-wrap: wrap; align-items: center;">
            ${social.github ? `<a href="${escapeHtml(social.github)}" target="_blank" rel="noopener noreferrer" class="social-icon-btn" title="GitHub" style="width:32px; height:32px; border-radius:50%; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1); display:inline-flex; align-items:center; justify-content:center; color:#fff; text-decoration:none; transition:all 0.2s;"><i class="fa-brands fa-github"></i></a>` : ''}
            ${social.linkedin ? `<a href="${escapeHtml(social.linkedin)}" target="_blank" rel="noopener noreferrer" class="social-icon-btn" title="LinkedIn" style="width:32px; height:32px; border-radius:50%; background:rgba(0,119,181,0.15); border:1px solid rgba(0,119,181,0.3); display:inline-flex; align-items:center; justify-content:center; color:#0077b5; text-decoration:none; transition:all 0.2s;"><i class="fa-brands fa-linkedin-in"></i></a>` : ''}
            ${social.email ? `<a href="mailto:${escapeHtml(social.email)}" class="social-icon-btn" title="Email" style="width:32px; height:32px; border-radius:50%; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1); display:inline-flex; align-items:center; justify-content:center; color:#fff; text-decoration:none; transition:all 0.2s;"><i class="fa-solid fa-envelope"></i></a>` : ''}
            ${portfolioUrl ? `
              <a href="${escapeHtml(portfolioUrl)}" target="_blank" rel="noopener noreferrer" class="portfolio-subdomain-btn" title="${portfolioLabel}" style="display:inline-flex; align-items:center; gap:6px; padding:6px 12px; border-radius:99px; background:linear-gradient(135deg, rgba(0,240,255,0.15), rgba(121,40,202,0.2)); border:1px solid rgba(0,240,255,0.4); color:#00f0ff; font-size:11px; font-weight:600; text-decoration:none; transition:all 0.25s; box-shadow:0 0 12px rgba(0,240,255,0.15);">
                <i class="fa-solid fa-globe"></i>
                <span>${portfolioLabel}</span>
                <i class="fa-solid fa-arrow-up-right-from-square" style="font-size:9px;"></i>
              </a>
            ` : ''}
          </div>
        `;

        return `
          <div class="team-card ${staggerClass} revealed" data-member-id="${member.id}">
            <div class="team-photo-wrap">
              <div class="photo-ring"></div>
              <img src="${avatar}" alt="${escapeHtml(name)}" class="team-photo" onerror="this.src='assets/logo.png'" />
              <div class="photo-badge" title="${escapeHtml(role)}"><i class="fa-solid ${badgeIcon}"></i></div>
            </div>
            <div class="team-info">
              <h3 class="team-name">${escapeHtml(name)}</h3>
              <div class="team-role">${escapeHtml(role)}</div>
              <div class="team-meta">
                ${member.age ? `<span class="team-age"><i class="fa-regular fa-id-card"></i> <span>${ageLabel}</span>: <strong>${member.age}</strong></span>` : ''}
              </div>
              ${skills.length > 0 ? `
                <div class="skills-section">
                  <span class="skills-label">${skillsHeading}</span>
                  <ul class="skills-list">
                    ${skillsListHtml}
                  </ul>
                </div>
              ` : ''}
              ${socialButtonsHtml}
            </div>
          </div>
        `;
      }).join('');

    } catch (e) {
      console.log('PulseRoute dynamic team sync fallback:', e.message);
    }
  }

  function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Hook into language switcher to refresh translations
  const langToggleBtn = document.getElementById('lang-toggle-btn');
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      setTimeout(syncLiveTeamData, 100);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', syncLiveTeamData);
  } else {
    syncLiveTeamData();
  }
})();
