/**
 * PulseRoute Admin Dashboard - Core Client Controller
 * Connects directly to the Rust REST API (/api/v1/team or /api/team)
 */

const API_BASE = window.location.origin.includes('localhost') || window.location.origin.includes('127.0.0.1')
  ? '/api/v1'
  : '/api';

let teamMembersState = [];

// DOM Elements
const gridContainer = document.getElementById('members-grid');
const searchInput = document.getElementById('search-input');
const btnAddMember = document.getElementById('btn-add-member');
const btnRefresh = document.getElementById('btn-refresh');
const memberModal = document.getElementById('member-modal');
const btnCloseModal = document.getElementById('btn-close-modal');
const btnCancelModal = document.getElementById('btn-cancel-modal');
const memberForm = document.getElementById('member-form');
const modalTitle = document.getElementById('modal-title');
const toastContainer = document.getElementById('toast-container');

// Form inputs
const inputId = document.getElementById('member-id');
const inputNameAr = document.getElementById('name_ar');
const inputNameEn = document.getElementById('name_en');
const inputRoleAr = document.getElementById('role_ar');
const inputRoleEn = document.getElementById('role_en');
const inputAge = document.getElementById('age');
const inputOrder = document.getElementById('display_order');
const inputAvatarUrl = document.getElementById('avatar_url');
const inputAvatarFile = document.getElementById('avatar-file-input');
const avatarPreviewImg = document.getElementById('avatar-preview-img');
const uploadStatusText = document.getElementById('upload-status-text');
const inputSkills = document.getElementById('skills-input');
const inputGithub = document.getElementById('social_github');
const inputLinkedin = document.getElementById('social_linkedin');
const inputEmail = document.getElementById('social_email');
const inputWebsite = document.getElementById('social_website');
const inputBioAr = document.getElementById('bio_ar');
const inputBioEn = document.getElementById('bio_en');
const inputIsActive = document.getElementById('is_active');
const inputIsFeatured = document.getElementById('is_featured');

// Stats Elements
const statTotal = document.getElementById('stat-total-count');
const statActive = document.getElementById('stat-active-count');
const statFeatured = document.getElementById('stat-featured-count');
const statDb = document.getElementById('stat-db-mode');
const backendStatusText = document.getElementById('backend-status-text');

// Init
document.addEventListener('DOMContentLoaded', () => {
  fetchHealthStatus();
  fetchTeamMembers();
  setupEventListeners();
});

function setupEventListeners() {
  btnAddMember.addEventListener('click', () => openModal());
  btnCloseModal.addEventListener('click', closeModal);
  btnCancelModal.addEventListener('click', closeModal);
  btnRefresh.addEventListener('click', () => {
    fetchHealthStatus();
    fetchTeamMembers();
  });

  searchInput.addEventListener('input', (e) => {
    renderMembers(e.target.value);
  });

  memberForm.addEventListener('submit', handleFormSubmit);

  inputAvatarUrl.addEventListener('input', (e) => {
    avatarPreviewImg.src = e.target.value || '../assets/logo.png';
  });

  inputAvatarFile.addEventListener('change', handleFileUpload);
}

// Fetch Health
async function fetchHealthStatus() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    const data = await res.json();
    if (data && data.success) {
      backendStatusText.textContent = `Rust API: نشط | ${data.data.supabase.connected ? 'Supabase متصل' : 'الوضع المحلي'}`;
      if (data.data.supabase.connected) {
        statDb.textContent = 'Supabase Cloud';
      } else {
        statDb.textContent = 'Local Standalone';
      }
    }
  } catch (err) {
    backendStatusText.textContent = 'السيرفر غير متصل حالياً';
  }
}

// Fetch Team Members
async function fetchTeamMembers() {
  gridContainer.innerHTML = `
    <div class="loading-state">
      <i class="fa-solid fa-circle-notch fa-spin"></i>
      <p>جاري مزامنة البيانات مع السيرفر...</p>
    </div>
  `;

  try {
    const res = await fetch(`${API_BASE}/team?all=true`);
    const result = await res.json();

    if (result.success && Array.isArray(result.data)) {
      teamMembersState = result.data;
      updateStats(teamMembersState);
      renderMembers();
    } else {
      showToast('تعذر استرجاع بيانات الفريق من السيرفر', 'error');
    }
  } catch (err) {
    console.error('Fetch error:', err);
    showToast('خطأ في الاتصال بالباك إند', 'error');
  }
}

// Update Stats
function updateStats(members) {
  statTotal.textContent = members.length;
  statActive.textContent = members.filter(m => m.is_active).length;
  statFeatured.textContent = members.filter(m => m.is_featured).length;
}

// Render Members Cards
function renderMembers(filterQuery = '') {
  const query = filterQuery.toLowerCase().trim();
  const filtered = teamMembersState.filter(m => {
    return (
      m.name_ar.toLowerCase().includes(query) ||
      m.name_en.toLowerCase().includes(query) ||
      m.role_ar.toLowerCase().includes(query) ||
      m.role_en.toLowerCase().includes(query)
    );
  });

  if (filtered.length === 0) {
    gridContainer.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
        <i class="fa-solid fa-user-slash" style="font-size: 36px; margin-bottom: 12px; display: block;"></i>
        <p>لا يوجد أعضاء يطابقون البحث.</p>
      </div>
    `;
    return;
  }

  gridContainer.innerHTML = filtered.map(member => {
    const avatar = member.avatar_url 
      ? (member.avatar_url.startsWith('http') || member.avatar_url.startsWith('uploads/') ? member.avatar_url : `../${member.avatar_url}`)
      : '../assets/logo.png';

    const skillsHtml = (member.skills || []).map(s => `<span class="skill-tag">${escapeHtml(s)}</span>`).join('');

    return `
      <div class="member-admin-card ${!member.is_active ? 'inactive' : ''}" data-id="${member.id}">
        <div class="card-top">
          <div class="member-avatar-wrap">
            <img src="${avatar}" alt="${escapeHtml(member.name_en)}" class="member-avatar" onerror="this.src='../assets/logo.png'" />
          </div>
          <div class="member-main-info">
            <div class="member-name-row">
              <span class="member-name">${escapeHtml(member.name_ar)}</span>
              ${member.is_featured ? '<i class="fa-solid fa-star" style="color:var(--warning); font-size:12px;" title="مميز"></i>' : ''}
            </div>
            <div class="member-en-name">${escapeHtml(member.name_en)}</div>
            <span class="member-role-badge">${escapeHtml(member.role_ar)}</span>
          </div>
        </div>

        <div class="member-tags">
          ${skillsHtml}
        </div>

        <div class="card-bottom">
          <span class="order-badge">#${member.display_order} ${member.age ? `| العمر: ${member.age}` : ''}</span>
          <div class="card-actions">
            <button class="action-btn edit" onclick="editMember('${member.id}')" title="تعديل">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="action-btn delete" onclick="deleteMember('${member.id}')" title="حذف">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Modal management
function openModal(member = null) {
  memberForm.reset();
  uploadStatusText.textContent = '';

  if (member) {
    modalTitle.textContent = `تعديل بيانات: ${member.name_ar}`;
    inputId.value = member.id;
    inputNameAr.value = member.name_ar;
    inputNameEn.value = member.name_en;
    inputRoleAr.value = member.role_ar;
    inputRoleEn.value = member.role_en;
    inputAge.value = member.age || '';
    inputOrder.value = member.display_order || 1;
    inputAvatarUrl.value = member.avatar_url || '';
    avatarPreviewImg.src = member.avatar_url ? (member.avatar_url.startsWith('http') ? member.avatar_url : `../${member.avatar_url}`) : '../assets/logo.png';
    inputSkills.value = (member.skills || []).join(', ');
    inputGithub.value = member.social_links?.github || '';
    inputLinkedin.value = member.social_links?.linkedin || '';
    inputEmail.value = member.social_links?.email || '';
    inputWebsite.value = member.social_links?.website || '';
    inputBioAr.value = member.bio_ar || '';
    inputBioEn.value = member.bio_en || '';
    inputIsActive.checked = member.is_active !== false;
    inputIsFeatured.checked = member.is_featured === true;
  } else {
    modalTitle.textContent = 'إضافة عضو جديد للفريق';
    inputId.value = '';
    inputOrder.value = teamMembersState.length + 1;
    avatarPreviewImg.src = '../assets/logo.png';
    inputIsActive.checked = true;
    inputIsFeatured.checked = false;
  }

  memberModal.classList.add('open');
}

function closeModal() {
  memberModal.classList.remove('open');
}

// Edit Member Trigger
window.editMember = function(id) {
  const member = teamMembersState.find(m => m.id === id);
  if (member) {
    openModal(member);
  }
};

// Delete Member
window.deleteMember = async function(id) {
  const member = teamMembersState.find(m => m.id === id);
  if (!member) return;

  if (!confirm(`هل أنت متأكد من رغبتك في حذف العضو: ${member.name_ar} (${member.name_en})؟`)) {
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/team/${id}`, {
      method: 'DELETE',
    });

    const result = await res.json();
    if (res.ok && result.success) {
      showToast(`تم حذف ${member.name_ar} بنجاح`, 'success');
      fetchTeamMembers();
    } else {
      showToast(result.message || 'حدث خطأ أثناء الحذف', 'error');
    }
  } catch (err) {
    showToast('تعذر الاتصال بالسيرفر لإتمام الحذف', 'error');
  }
};

// Handle File Upload
async function handleFileUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  uploadStatusText.textContent = 'جاري الرفع...';
  const formData = new FormData();
  formData.append('file', file);

  try {
    const res = await fetch(`${API_BASE}/team/upload`, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (res.ok && data.success) {
      const url = data.data.url;
      inputAvatarUrl.value = url;
      avatarPreviewImg.src = url.startsWith('http') ? url : `../${url}`;
      uploadStatusText.textContent = 'تم الرفع بنجاح!';
      showToast('تم رفع الصورة بنجاح', 'success');
    } else {
      uploadStatusText.textContent = 'فشل الرفع';
      showToast(data.message || 'فشل رفع الصورة', 'error');
    }
  } catch (err) {
    uploadStatusText.textContent = 'خطأ اتصال';
    showToast('خطأ أثناء رفع الصورة للسيرفر', 'error');
  }
}

// Handle Form Submit (Add or Update)
async function handleFormSubmit(e) {
  e.preventDefault();

  const isEdit = !!inputId.value;
  const skillsArray = inputSkills.value
    .split(',')
    .map(s => s.trim())
    .filter(s => s.length > 0);

  const payload = {
    name_ar: inputNameAr.value.trim(),
    name_en: inputNameEn.value.trim(),
    role_ar: inputRoleAr.value.trim(),
    role_en: inputRoleEn.value.trim(),
    age: inputAge.value ? parseInt(inputAge.value, 10) : null,
    display_order: inputOrder.value ? parseInt(inputOrder.value, 10) : 1,
    avatar_url: inputAvatarUrl.value.trim() || 'assets/logo.png',
    skills: skillsArray,
    social_links: {
      github: inputGithub.value.trim() || null,
      linkedin: inputLinkedin.value.trim() || null,
      email: inputEmail.value.trim() || null,
      website: inputWebsite.value.trim() || null,
    },
    bio_ar: inputBioAr.value.trim() || null,
    bio_en: inputBioEn.value.trim() || null,
    is_active: inputIsActive.checked,
    is_featured: inputIsFeatured.checked,
  };

  const url = isEdit ? `${API_BASE}/team/${inputId.value}` : `${API_BASE}/team`;
  const method = isEdit ? 'PUT' : 'POST';

  try {
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    if (res.ok && result.success) {
      showToast(isEdit ? 'تم تحديث بيانات العضو بنجاح' : 'تمت إضافة العضو الجديد بنجاح', 'success');
      closeModal();
      fetchTeamMembers();
    } else {
      showToast(result.message || 'فشلت العملية', 'error');
    }
  } catch (err) {
    showToast('خطأ في الاتصال بالباك إند', 'error');
  }
}

// Toast Notifications
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}" style="color: ${type === 'success' ? 'var(--success)' : 'var(--danger)'}"></i>
    <span>${escapeHtml(message)}</span>
  `;

  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
