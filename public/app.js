/**
 * PulseRoute - Core Frontend Application
 * Handles:
 * - Smooth Custom Cursor with Logo
 * - Glowing Blue Space Particle Starfield (Canvas)
 * - Complete English / Arabic (RTL) I18n Engine
 * - Smooth Dark / Light Mode Theme Engine
 * - Interactive Corridor & Cockpit HUD Simulator
 * - Scroll-triggered IntersectionObserver Animations
 * - Metric Counters Animation
 */

// ============================================================================
// 1. ARABIC & ENGLISH TRANSLATION DICTIONARY
// ============================================================================
const translations = {
  en: {
    badge_global: "GLOBAL TECH INNOVATION",
    nav_problem: "Challenge",
    nav_solution: "Solution",
    nav_system: "Live System",
    nav_security: "Security",
    nav_vision: "Vision",
    nav_team: "Team",
    
    hero_pill: "NEXT-GEN EMERGENCY DISPATCH & TRAFFIC PREEMPTION",
    hero_tagline: "INTELLIGENT EMERGENCY RESPONSE SYSTEM",
    hero_desc: "A high-precision, AI-orchestrated infrastructure connecting call centers, emergency dispatch vehicles, and smart traffic signal networks via real-time V2I and encrypted telemetry—clearing life-saving corridors when every second counts.",
    hero_btn_explore: "Explore Architecture",
    hero_btn_simulation: "Interactive Demo",
    
    stat_time: "Response Delay Reduction",
    stat_distance: "V2I Preemption Horizon",
    stat_clearing: "Dynamic De-congestion Phase",
    stat_security: "Encrypted Link Reliability",
    scroll_cue: "Scroll to explore",
    
    // Problem
    problem_eyebrow: "CRITICAL BOTTLENECK",
    problem_title: "The Critical Challenge: Minutes Mean Lives",
    problem_subtitle: "Traditional emergency services are hindered by fragmented communication, manual routing bottlenecks, and uncontrollable urban congestion.",
    problem_1_title: "Dispatch Delay",
    problem_1_desc: "Critical minutes lost during emergency call processing, manual verification of patient coordinates, and finding the closest fully equipped vehicle.",
    problem_1_metric: "Average triage latency",
    problem_2_title: "Transit Obstacles",
    problem_2_desc: "Inability to predict unpredictable traffic jams, dense bottlenecks, and sudden urban gridlocks that strand emergency vehicles in unmovable queues.",
    problem_2_metric: "Route unpredictability",
    problem_3_title: "Signal Dependency",
    problem_3_desc: "Relying on sheer chance for green lights at intersections. Running red lights risks catastrophic T-bone collisions and paralyzes cross-traffic safety.",
    problem_3_metric: "Intersection crash hazard",
    problem_impact_title: "The Golden Hour In Jeopardy",
    problem_impact_desc: "Every 60-second delay in trauma response or cardiac arrest resuscitation decreases survival probability by up to 10%. Emergency services require a synchronized, intelligent infrastructure that controls the city rather than struggles against it.",
    
    // Solution
    solution_eyebrow: "INTELLIGENT ARCHITECTURE",
    solution_title: "The Pulseroute Ecosystem",
    solution_subtitle: "An end-to-end cyber-physical platform transforming static city intersections into an adaptive, self-clearing emergency transit corridor.",
    sol_1_step: "STEP 01 // DISPATCH",
    sol_1_title: "Call Center AI Integration",
    sol_1_intro: "Intelligent triage and instant fleet activation without manual operator friction.",
    sol_1_p1: "Integrated AI Telephony: Automatically transcribes and extracts caller emergency tier and incident details.",
    sol_1_p2: "Instant Geolocation Fetching: Pins patient location instantly via cellular tower & GPS triangulation.",
    sol_1_p3: "Optimal Fleet Dispatch: Calculates fastest arrival vector based on real-time vehicle equipment & proximity.",
    sol_1_p4: "Automated Station Siren Trigger: Simultaneously activates in-station sirens and lights for immediate crew roll-out.",
    
    sol_2_step: "STEP 02 // COCKPIT",
    sol_2_title: "In-Vehicle HUD & Telemetry",
    sol_2_intro: "High-refresh situational dashboard purpose-built for high-speed emergency navigation.",
    sol_2_p1: "Signals Remaining Counter: Real-time countdown of upcoming intersections until scene arrival.",
    sol_2_p2: "Dynamic Patient ETA: Machine-learning ETA updated every 500ms using continuous telemetry.",
    sol_2_p3: "Signal Health & Phase Status: Live color, time-to-green, and controller handshake for every intersection ahead.",
    sol_2_p4: "Driver Override Toggle: One-tap cockpit switch for direct manual override of any linked intersection.",
    
    sol_3_step: "STEP 03 // V2I CONTROL",
    sol_3_title: "V2I Preemption (700–800m)",
    sol_3_intro: "Automated intersection control that preempts traffic before sirens are even heard.",
    sol_3_p1: "Long-Range C-V2X / DSRC Handshake: Secures two-way connectivity 700 to 800 meters ahead of the intersection.",
    sol_3_p2: "AI Dynamic Phase Lock: Automatically opens the transit lane green while safely switching cross-traffic to red.",
    sol_3_p3: "Instant Traffic Re-Normalization: Resets signals to normal cycle the exact instant the vehicle clears the intersection.",
    sol_3_p4: "120-Second Anti-Congestion Flush: Retains subsequent signal green times for 2 minutes to eliminate accumulated gridlock.",
    
    sol_4_step: "STEP 04 // VISUAL GUIDANCE",
    sol_4_title: "Dynamic Intersection Guidance",
    sol_4_intro: "Proactive visual communication projecting instructions directly to surrounding civilian drivers.",
    sol_4_p1: "Digital Signal Display Panels: Ultra-bright dynamic signage integrated into traffic light gantries.",
    sol_4_p2: "Proactive ETA Projection: Flashes 'AMBULANCE APPROACHING: ETA 45 SECONDS' to alert waiting motorists.",
    sol_4_p3: "Adaptive Lane Clear Arrows: Displays Right, Left, and revolutionary 'CLEAR MIDDLE LANE' directional vectors.",
    sol_4_p4: "Driver-Controlled Path Selection: Paramedic driver selects intended lane split, instantly updating civilian displays.",
    
    // Simulation
    sim_eyebrow: "LIVE INTERACTIVE TELEMETRY",
    sim_title: "Interactive Corridor & Dashboard Simulator",
    sim_subtitle: "Experience Pulseroute in action. Test the 700m V2I handshake, dynamic lane signage, manual driver override, and automatic 2-minute congestion clearing.",
    hud_signals_left: "SIGNALS REMAINING",
    hud_eta: "LIVE PATIENT ETA",
    hud_signal_state: "NEXT SIGNAL STATUS",
    hud_mode: "CONTROL MODE",
    mode_ai: "AI AUTO",
    mode_manual: "MANUAL",
    panel_title: "Intersection Smart Signal & Signage Display",
    lane_mid_label: "CLEAR MIDDLE LANE",
    driver_cockpit_label: "Cockpit Lane Guidance Selection:",
    lane_left_btn: "Left Split",
    lane_mid_btn: "Clear Middle (Default)",
    lane_right_btn: "Right Split",
    timeline_title: "Autonomous Preemption Lifecycle",
    tstep_1_title: "800m V2I Handshake",
    tstep_1_desc: "Vehicle broadcasts cryptographic beacon. Intersection controller validates auth token.",
    tstep_2_title: "Corridor Green Wave",
    tstep_2_desc: "Cross-traffic safely cycled to red. Emergency lane locked to continuous green.",
    tstep_3_title: "Passage Sensor Trigger",
    tstep_3_desc: "RFID/optical sensor detects vehicle exit. Immediate handoff to next signal node.",
    tstep_4_title: "120s Congestion Flush",
    tstep_4_desc: "Normal cycle restored with 2-minute dynamic compensation to dissolve civilian backlog.",
    sim_btn_passage: "Simulate Ambulance Passage",
    sim_btn_reset: "Reset Cycle",
    
    // Security
    security_eyebrow: "CRITICAL INFRASTRUCTURE DEFENSE",
    security_title: "Zero-Trust & Hardened Security",
    security_subtitle: "Because a traffic control preemption system is a prime target for malicious interference, Pulseroute incorporates military-grade encryption, penetration testing, and layered telemetry.",
    sec_1_title: "Encrypted Dual-Channel V2I & Satellite",
    sec_1_desc: "All telemetry between vehicles and intersection nodes is encapsulated in AES-256-GCM encryption with dynamic rotating keys. High-availability failsafe incorporates redundant secure satellite links alongside terrestrial V2I mesh, rendering road cameras secondary for verification rather than single points of failure.",
    sec_1_tag: "AES-256 + ECDSA Signatures",
    sec_2_title: "Continuous Penetration Testing",
    sec_2_desc: "Rigorous adversarial vulnerability assessments, black-box penetration tests, and anti-spoofing algorithms prevent man-in-the-middle attacks, false GPS broadcasts, or unauthorized civilian signal tampering.",
    sec_2_tag: "Zero-Day Vulnerability Auditing",
    sec_3_title: "Hardware Root of Trust & Anti-Tamper",
    sec_3_desc: "Each in-vehicle cockpit unit and roadside cabinet features a dedicated Hardware Security Module (HSM). If physical tampering or firmware spoofing is detected, the unit self-isolates and alerts the central cyber operations center.",
    sec_3_tag: "FIPS 140-3 Validated HSM",
    
    // Vision
    vision_eyebrow: "HORIZON & EXPANSION",
    vision_title: "Project Vision & Scalability Roadmap",
    vision_subtitle: "Pulseroute's modular architecture is designed to rapidly scale from regional paramedic fleets to comprehensive civic emergency protection and intelligent governance.",
    vision_1_title: "Multi-Agency Fleet Scaling",
    vision_1_desc: "Expanding dynamic preemption algorithms to Police tactical convoys, Fire Department heavy pumpers, and disaster relief fleets with dynamic hierarchical priority management.",
    vision_1_li1: "Priority hierarchy (Disaster > Fire > Medical > Police)",
    vision_1_li2: "Multi-vehicle convoy synchronized corridors",
    vision_2_title: "VIP & Diplomatic Transit",
    vision_2_desc: "Custom security escort protocols providing seamless, stop-free green corridors for foreign dignitaries, presidential motorcades, and critical security transports without paralyzing city traffic.",
    vision_2_li1: "Adaptive stealth preemption without visual alarms",
    vision_2_li2: "Anti-ambush dynamic re-routing algorithms",
    vision_3_title: "Satellite & Next-Gen IoT Grid",
    vision_3_desc: "Integration with Low Earth Orbit (LEO) satellite constellations and secure road-embedded sensor networks for autonomous backup synchronization when urban cellular towers experience outages.",
    vision_3_li1: "Direct-to-Satellite telemetry failover",
    vision_3_li2: "Decentralized edge compute at every signal head",
    vision_4_title: "Smart Enforcement & Fines",
    vision_4_desc: "Automated high-resolution camera and sensor logging of motorists who refuse to clear designated emergency lanes, automatically triggering structured municipal penalties to ensure 100% corridor compliance.",
    vision_4_li1: "Instant digital citation issuance with timestamped proof",
    vision_4_li2: "Public safety education integration",
    
    // Team
    team_eyebrow: "THE INNOVATORS",
    team_title: "Meet the Pulseroute Team",
    team_subtitle: "Four specialized engineers and innovators committed to saving lives through intelligent cyber-physical systems and advanced emergency automation.",
    m1_name: "MAZEN AHMED",
    m1_role: "Full-Stack Developer",
    m1_age_label: "Age",
    skills_heading: "Core Skills:",
    m1_s1: "Modern Web Architecture & Frontend Engineering",
    m1_s2: "RESTful APIs & Backend Integration",
    m1_s3: "Database Management & State Handling",
    m1_s4: "Performance Optimization & Responsive UI",
    
    m2_name: "YASSEN SABRY ELAWAMY",
    m2_role: "Back-End Developer",
    m2_age_label: "Age",
    m2_s1: "Server-Side Architecture & API Development",
    m2_s2: "Database Design & Query Optimization",
    m2_s3: "Authentication & System Security",
    m2_s4: "Microservices & Cloud Infrastructure",
    
    m3_name: "AHMED HELMY EL-ATTAR",
    m3_role: "AI Developer & Machine Learning Engineer",
    m3_age_label: "Age",
    m3_s1: "Predictive AI & Dynamic Dispatch Algorithms",
    m3_s2: "Machine Learning Model Deployment",
    m3_s3: "Real-Time Data Processing & Telemetry",
    m3_s4: "Neural Networks & Computer Vision",
    
    m4_name: "MAI MAGDY MAHMOUD",
    m4_role: "Cybersecurity & Penetration Testing Engineer",
    m4_age_label: "Age",
    m4_s1: "Penetration Testing & Vulnerability Assessment",
    m4_s2: "Zero-Trust Network Architecture",
    m4_s3: "Encrypted Protocols & System Hardening",
    m4_s4: "Infrastructure Security & Threat Defense",
    
    footer_copy: "An advanced cyber-physical emergency traffic preemption architecture. Submitted for Global Innovation Competition."
  },
  
  ar: {
    badge_global: "ابتكار تقني عالمي",
    nav_problem: "المشكلة",
    nav_solution: "الحل",
    nav_system: "النظام المباشر",
    nav_security: "الأمان السيبراني",
    nav_vision: "الرؤية المستقبلية",
    nav_team: "الفريق",
    
    hero_pill: "منظومة الجيل القادم لتوجيه الإسعاف وفتح الإشارات الذكية",
    hero_tagline: "نظام الاستجابة الذكي للطوارئ",
    hero_desc: "بنية تحتية متطورة مدعومة بالذكاء الاصطناعي تربط مراكز الاتصال بمركبات الإسعاف وشبكات الإشارات المرورية عبر تقنيات V2I والاتصال المشفر فائق الأمان، لفتح ممرات إنقاذ فورية عندما تكون كل ثانية حاسمة للحياة.",
    hero_btn_explore: "استكشف البنية التقنية",
    hero_btn_simulation: "تجربة المحاكاة التفاعلية",
    
    stat_time: "تقليص زمن الاستجابة",
    stat_distance: "مدى الاستشعار المسبق",
    stat_clearing: "مدة تصريف الزحام التلقائي",
    stat_security: "موثوقية التشفير والاتصال",
    scroll_cue: "مرر للأسفل للاستكشاف",
    
    // Problem
    problem_eyebrow: "العائق الحرج",
    problem_title: "التحدي المصيري: الدقائق تعني إنقاذ أرواح",
    problem_subtitle: "تعاني خدمات الطوارئ التقليدية من تأخير معالجة المكالمات، صعوبة التنبؤ بالاختناقات المرورية، والاعتماد العشوائي على إشارات المرور.",
    problem_1_title: "تأخر التوجيه والإرسال",
    problem_1_desc: "ضياع دقائق ثمينة في استقبال واستيعاب مكالمات الاستغاثة، تحديد موقع المريض يدوياً، والبحث عن أقرب سيارة إسعاف مجهزة ومتاحة.",
    problem_1_metric: "متوسط زمن التوجيه اليدوي",
    problem_2_title: "معوقات الطريق والازدحام",
    problem_2_desc: "غياب القدرة على استشراف الكثافات المرورية المفاجئة، مما يوقع سيارة الإسعاف في مآزق مرورية خانقة يصعب الخروج منها.",
    problem_2_metric: "عدم إمكانية توقع المسار",
    problem_3_title: "الارتهان لإشارات المرور",
    problem_3_desc: "الاعتماد على الحظ لمصادفة إشارات خضراء. تجاوز الإشارات الحمراء يشكل خطراً فادحاً لوقوع حوادث تصادم جانبية ويعطل حركة التقاطعات.",
    problem_3_metric: "خطر حوادث التقاطعات",
    problem_impact_title: "الساعة الذهبية في خطر دائم",
    problem_impact_desc: "كل 60 ثانية تأخير في إسعاف الحالات الحرجة أو السكتات القلبية تقلل فرص النجاة بنسبة تصل إلى 10%. تحتاج مدن اليوم إلى بنية تحتية ذكية متزامنة تحكم حركة المرور بدلاً من الاستسلام لها.",
    
    // Solution
    solution_eyebrow: "الهندسة الذكية المتكاملة",
    solution_title: "منظومة Pulseroute الشاملة",
    solution_subtitle: "منصة سيبرانية-فيزيائية متكاملة تحول تقاطعات المدن من عقبات مرورية جامدة إلى ممرات خضراء ذاتية الفتح والانسيابية.",
    sol_1_step: "المرحلة 01 // غرفة العمليات",
    sol_1_title: "تكامل مركز الاتصال بالذكاء الاصطناعي",
    sol_1_intro: "فرز فوري واستجابة تلقائية للبلاغات دون أي هدر زمني بشري.",
    sol_1_p1: "نظام اتصالات مدمج بالذكاء الاصطناعي: يحلل تفاصيل البلاغ ويحدد درجة الخطورة الطبية فورياً.",
    sol_1_p2: "تحديد جغرافي فوري للمريض: التقاط إحداثيات المتصل تلقائياً وبدقة عبر أبراج الاتصال والأقمار الصناعية.",
    sol_1_p3: "توجيه مثالي لسيارة الإسعاف: اختيار أقرب وحدة مجهزة بالكامل ومطابقة لحالة المريض وفق أقصر مسار زمني.",
    sol_1_p4: "تفعيل أوتوماتيكي لإنذار نقطة الإسعاف: إطلاق إشارات الإنذار والضوء داخل نقطة التمركز تلقائياً لانطلاق الطاقم فوراً.",
    
    sol_2_step: "المرحلة 02 // قمرة القيادة",
    sol_2_title: "شاشة التحكم الذكية داخل الإسعاف",
    sol_2_intro: "لوحة معلوماتية فورية صممت خصيصاً لمساعدة المسعف على الملاحة السريعة والآمنة.",
    sol_2_p1: "عداد الإشارات المتبقية: عرض ديناميكي لعدد الإشارات المرورية المتبقية على طول المسار حتى الوصول.",
    sol_2_p2: "وقت الوصول المتوقع المباشر (ETA): حساب وتحديث دقيق بالمللي ثانية لزمن الوصول الحقيقي للمريض.",
    sol_2_p3: "حالة وتوقيت الإشارة القادمة: رصد مباشر للون الإشارة، زمن التحول للأخضر، وحالة الاتصال اللاسلكي.",
    sol_2_p4: "زر التحكم اليدوي للسائق: إمكانية فتح أو إغلاق الإشارة استثنائياً بلمسة واحدة مع استعادة الفتح التلقائي بعد العبور.",
    
    sol_3_step: "المرحلة 03 // التحكم بالإشارات",
    sol_3_title: "نظام فتح الإشارات المسبق (700-800م)",
    sol_3_intro: "تحكم ذكي متقدم يمهد الطريق لسيارة الإسعاف قبل أن يسمع السائقون صوت صفارات الإنذار.",
    sol_3_p1: "اتصال V2I بعيد المدى: تبادل إشارات لاسلكية مشفرة بين الإسعاف ووحدة التحكم بالإشارة على بعد 700 إلى 800 متر.",
    sol_3_p2: "فتح تلقائي ذكي للمسار: يفتح الإشارة خضراء أمام الإسعاف ويغلق الاتجاهات المعارضة لضمان أمان التقاطع بنسبة 100%.",
    sol_3_p3: "إعادة الانسيابية فوراً بعد العبور: إعادة الإشارة لحالتها الطبيعية في نفس لحظة تجاوز الإسعاف للتقاطع.",
    sol_3_p4: "مرحلة تصفية الازدحام (دقيقتان): إبقاء الإشارات التالية مفتوحة لحركة المرور العادية لمدة دقيقتين لمنع أي تراكم مروري.",
    
    sol_4_step: "المرحلة 04 // التوجيه البصري",
    sol_4_title: "شاشات التوجيه البصري التفاعلية",
    sol_4_intro: "توجيه استباقي ومباشر لسيارات المواطنين على الطريق لتفريغ المسار بانسيابية كاملة.",
    sol_4_p1: "شاشات رقمية على الإشارات: لوحات LED مدمجة بهيكل الإشارة المرورية لتنبيه السائقين مسبقاً.",
    sol_4_p2: "عرض توقيت وصول الإسعاف: إظهار رسالة واضحة: 'اقتراب سيارة إسعاف: متبقي 35 ثانية' لتحذير المركبات.",
    sol_4_p3: "أسهم إخلاء المسار الذكية: عرض أسهم التوجه يميناً ويساراً مع سهم 'إفساح الحارة الوسطى' الحصري.",
    sol_4_p4: "اختيار المسار من تطبيق السائق: يحدد سائق الإسعاف مساره المفضل ليعكس الشاشة على الإشارة فورياً.",
    
    // Simulation
    sim_eyebrow: "محاكاة حية للنظام",
    sim_title: "محاكي قمرة القيادة والتقاطع الذكي",
    sim_subtitle: "شاهد PulseRoute يعمل على أرض الواقع. اختبر الاتصال اللاسلكي من 800 متر، توجيه الحارات المرورية، والتحكم الذاتي لتفريغ الاختناقات.",
    hud_signals_left: "الإشارات المتبقية",
    hud_eta: "زمن الوصول المتوقع",
    hud_signal_state: "حالة الإشارة القادمة",
    hud_mode: "وضع التحكم",
    mode_ai: "ذكي تلقائي",
    mode_manual: "يدوي",
    panel_title: "شاشة التقاطع والإشارة المرورية الرقمية",
    lane_mid_label: "إفساح المسار الأوسط",
    driver_cockpit_label: "توجيه المسار من قمرة القيادة:",
    lane_left_btn: "انعطاف يساراً",
    lane_mid_btn: "إخلاء الحارة الوسطى (تلقائي)",
    lane_right_btn: "انعطاف يميناً",
    timeline_title: "دورة حياة الفتح الاستباقي",
    tstep_1_title: "اتصال لاسلكي V2I على بعد 800م",
    tstep_1_desc: "ترسل سيارة الإسعاف إشارة مشفرة، وتتحقق وحدة التقاطع من هوية المركبة فوراً.",
    tstep_2_title: "موجة المرور الخضراء",
    tstep_2_desc: "إيقاف آمن للمرور المتقاطع، وتثبيت الضوء الأخضر للمسار المحدد للإسعاف.",
    tstep_3_title: "حساس عبور السيارة",
    tstep_3_desc: "رصد خروج الإسعاف من التقاطع وتسليم الإحداثيات لمحطة الإشارة التالية.",
    tstep_4_title: "دقيقتان لتصريف الازدحام",
    tstep_4_desc: "استعادة الدورة الطبيعية مع منح وقت إضافي لحركة السيارات لتبديد التراكم.",
    sim_btn_passage: "محاكاة عبور سيارة الإسعاف",
    sim_btn_reset: "إعادة ضبط الدورة",
    
    // Security
    security_eyebrow: "حماية البنية التحتية الحيوية",
    security_title: "أمان سيبراني مشدد بنموذج Zero-Trust",
    security_subtitle: "نظراً لكون التحكم بالإشارات هدفاً حساساً، يعتمد Pulseroute على تشفير عسكري، اختبارات اختراق مستمرة، وربط بالأقمار الصناعية لضمان الحصانة المطلقة.",
    sec_1_title: "اتصال مشفر ثنائي عبر V2I والأقمار الصناعية",
    sec_1_desc: "تغليف كافة البيانات بين المركبات والإشارات بتشفير AES-256-GCM بمفاتيح متغيرة. يدمج النظام شبكات آمنة عبر الأقمار الصناعية وشبكات V2I اللاسلكية مما يجعل الكاميرات للمراقبة الإضافية وليست نقطة فشل مفردة لضمان استمرارية التشغيل دون انقطاع.",
    sec_1_tag: "تشفير AES-256 مع تواقيع ECDSA",
    sec_2_title: "اختبارات اختراق وتقييم أمني مستمر",
    sec_2_desc: "إجراء اختبارات اختراق دورية ومحاكاة هجمات الصندوق الأسود (Black-box) وخوارزميات مضادة للتزييف لمنع اعتراض الإشارات أو تزوير مواقع GPS أو التلاعب بالتقاطعات.",
    sec_2_tag: "فحص دوري للثغرات الصفرية",
    sec_3_title: "جذور الثقة المادية وحماية الأجهزة من التلاعب",
    sec_3_desc: "تزويد وحدات السيارة والكبائن المرورية بوحدات أمان فيزيائية (HSM). عند رصد أي محاولة تلاعب أو اختراق للعتاد تعزل الوحدة نفسها وترسل بلاغاً فورياً للعمليات السيبرانية.",
    sec_3_tag: "شريحة أمان HSM معتمدة وفق FIPS 140-3",
    
    // Vision
    vision_eyebrow: "آفاق المستقبل والتوسع",
    vision_title: "الرؤية المستقبلية وخارطة التوسع",
    vision_subtitle: "بنية Pulseroute المرنة مهيأة للتوسع السريع من مركبات الإسعاف إلى حماية كافة أجهزة الطوارئ والإدارة الحضرية الذكية.",
    vision_1_title: "التوسع لكافة أجهزة الطوارئ",
    vision_1_desc: "تطبيق منظومة الأولويات الذكية على قوافل الشرطة، شاحنات الإطفاء الكبرى، وفرق الإغاثة والكوارث مع ترتيب ديناميكي للأولويات.",
    vision_1_li1: "تدرج هرمي للأولوية (الكوارث > الإطفاء > الإسعاف > الشرطة)",
    vision_1_li2: "تزامن مسارات القوافل المتعددة في ممر أخضر موحد",
    vision_2_title: "إدارة مواكب الشخصيات الهامة (VIP)",
    vision_2_desc: "بروتوكولات حراسة مخصصة توفر مسارات خضراء آمنة وسلسة للوفود الدبلوماسية والمواكب الرسمية دون شل حركة المرور العامة في المدن.",
    vision_2_li1: "فتح مسارات تمويهية هادئة بدون صفارات إنذار بصرية",
    vision_2_li2: "خوارزميات تغيير مسار فورية ضد الكمائن والتهديدات",
    vision_3_title: "الربط بالأقمار الصناعية وشبكات IoT المتقدمة",
    vision_3_desc: "الاندماج مع مجموعات الأقمار الصناعية ذات المدار المنخفض وشبكات مستشعرات الطرق لحماية إضافية من أي تشويش وضمان العمل حال تعطل شبكات المحمول.",
    vision_3_li1: "تحويل مباشر للبث الفضائي عند انقطاع الاتصالات الأرضية",
    vision_3_li2: "معالجة طرفية مستقلة عند كل إشارة مرورية",
    vision_4_title: "الرصد الذكي وتطبيق الغرامات",
    vision_4_desc: "توثيق آلي عبر الكاميرات والحساسات لكل مركبة تعرقل مسار الطوارئ أو ترفض إخلاء الحارة، وتطبيق غرامات مرورية رادعة لضمان التزام كامل للمواطنين.",
    vision_4_li1: "إصدار مخالفات رقمية فورية موثقة بالوقت والصور",
    vision_4_li2: "تعزيز الثقافة المجتمعية لإفساح الطريق للإسعاف",
    
    // Team
    team_eyebrow: "المبتكرون",
    team_title: "فريق عمل منظومة Pulseroute",
    team_subtitle: "أربعة مهندسين ومبتكرين متخصصين كرسوا شغفهم لإنقاذ الأرواح عبر الأنظمة السيبرانية-الفيزيائية الذكية وأتمتة الطوارئ.",
    m1_name: "مازن أحمد",
    m1_role: "مطور ويب متكامل (Full-Stack Developer)",
    m1_age_label: "العمر",
    skills_heading: "أبرز المهارات:",
    m1_s1: "بنية الويب الحديثة وهندسة الواجهات الأمامية",
    m1_s2: "واجهات برمجة التطبيقات RESTful وتكامل الأنظمة الخلفية",
    m1_s3: "إدارة قواعد البيانات والتحكم في حالات التطبيق",
    m1_s4: "تحسين الأداء وتطوير واجهات متجاوبة فائقة السرعة",
    
    m2_name: "ياسين صبري العوامي",
    m2_role: "مطور الأنظمة الخلفية (Back-End Developer)",
    m2_age_label: "العمر",
    m2_s1: "بنية الخوادم وتطوير واجهات برمجة التطبيقات (APIs)",
    m2_s2: "تصميم قواعد البيانات وتحسين الاستعلامات",
    m2_s3: "أنظمة المصادقة والأمان وحماية الأنظمة",
    m2_s4: "الخدمات المصغرة (Microservices) والبنية السحابية",
    
    m3_name: "أحمد حلمي العطار",
    m3_role: "مطور ذكاء اصطناعي ومهندس تعلم الآلة",
    m3_age_label: "العمر",
    m3_s1: "الذكاء الاصطناعي التنبؤي وخوارزميات التوجيه الديناميكي",
    m3_s2: "نشر وتشغيل نماذج تعلم الآلة (ML Deployment)",
    m3_s3: "معالجة البيانات اللحظية والقياس عن بعد (Telemetry)",
    m3_s4: "الشبكات العصبية والرؤية الحاسوبية",
    
    m4_name: "مي مجدي محمود",
    m4_role: "مهندسة الأمن السيبراني واختبار الاختراق",
    m4_age_label: "العمر",
    m4_s1: "اختبارات الاختراق وتقييم الثغرات الأمنية",
    m4_s2: "بنية شبكات الثقة الصفرية (Zero-Trust Architecture)",
    m4_s3: "البروتوكولات المشفرة وتحصين الأنظمة",
    m4_s4: "أمن البنية التحتية والدفاع السيبراني ضد التهديدات",
    
    footer_copy: "بنية تحتية متطورة للتحكم الاستباقي بإشارات المرور في حالات الطوارئ. مقدمة للمنافسة العالمية للابتكار."
  }
};

// ============================================================================
// 2. STARFIELD PARTICLES CANVAS
// Subtle drifting glowing blue stars for deep-space atmosphere
// ============================================================================
class Starfield {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.stars = [];
    this.numStars = 80;
    this.animationFrameId = null;
    
    this.resize = this.resize.bind(this);
    this.animate = this.animate.bind(this);
    
    this.init();
  }
  
  init() {
    this.resize();
    window.addEventListener('resize', this.resize);
    
    // Create subtle particles
    for (let i = 0; i < this.numStars; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        baseAlpha: Math.random() * 0.5 + 0.2,
        alpha: Math.random() * 0.5 + 0.2,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        pulsePhase: Math.random() * Math.PI * 2,
        hue: 215 + (Math.random() * 20 - 10) // Restrained surgical blue
      });
    }
    
    this.animate();
  }
  
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    
    for (let i = 0; i < this.stars.length; i++) {
      const star = this.stars[i];
      star.x += star.vx;
      star.y += star.vy;
      star.pulsePhase += star.pulseSpeed;
      
      // Wrap around bounds
      if (star.x < 0) star.x = this.canvas.width;
      if (star.x > this.canvas.width) star.x = 0;
      if (star.y < 0) star.y = this.canvas.height;
      if (star.y > this.canvas.height) star.y = 0;
      
      const currentAlpha = Math.max(0.08, star.baseAlpha + Math.sin(star.pulsePhase) * 0.25);
      const alphaFactor = isDark ? currentAlpha : currentAlpha * 0.4;
      
      // Draw subtle glow
      const grad = this.ctx.createRadialGradient(
        star.x, star.y, 0,
        star.x, star.y, star.radius * 3.5
      );
      grad.addColorStop(0, `hsla(${star.hue}, 90%, 65%, ${alphaFactor})`);
      grad.addColorStop(1, `hsla(${star.hue}, 90%, 65%, 0)`);
      
      this.ctx.fillStyle = grad;
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.radius * 3.5, 0, Math.PI * 2);
      this.ctx.fill();
      
      // Draw core
      this.ctx.fillStyle = isDark
        ? `hsla(${star.hue}, 100%, 85%, ${alphaFactor + 0.2})`
        : `hsla(${star.hue}, 80%, 45%, ${alphaFactor + 0.1})`;
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      this.ctx.fill();
    }
    
    this.animationFrameId = requestAnimationFrame(this.animate);
  }
}

// ============================================================================
// 3. CUSTOM LOGO FOLLOWER CURSOR
// Replaces default mouse cursor with smooth following logo
// ============================================================================
class CustomCursor {
  constructor() {
    this.cursorEl = document.getElementById('custom-cursor');
    this.cursorDot = document.getElementById('cursor-dot');
    
    if (!this.cursorEl || !this.cursorDot) return;
    
    // Positions
    this.mouse = { x: -100, y: -100 };
    this.cursorPos = { x: -100, y: -100 };
    this.dotPos = { x: -100, y: -100 };
    this.hasMoved = false;
    
    this.init();
  }
  
  init() {
    window.addEventListener('mousemove', (e) => {
      if (!this.hasMoved) {
        this.hasMoved = true;
        document.body.classList.add('has-custom-cursor');
        this.cursorEl.style.opacity = '1';
        this.cursorDot.style.opacity = '1';
        this.cursorPos.x = e.clientX;
        this.cursorPos.y = e.clientY;
      }
      
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      
      // Instant dot placement
      this.cursorDot.style.left = `${e.clientX}px`;
      this.cursorDot.style.top = `${e.clientY}px`;
    });
    
    window.addEventListener('mousedown', () => {
      this.cursorEl.classList.add('clicking');
    });
    
    window.addEventListener('mouseup', () => {
      this.cursorEl.classList.remove('clicking');
    });
    
    // Hover interactive elements
    const interactiveElements = 'a, button, input, [role="button"], .problem-card, .solution-card, .team-card, .sec-card, .btn';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(interactiveElements)) {
        this.cursorEl.classList.add('hovering');
      }
    });
    
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(interactiveElements)) {
        this.cursorEl.classList.remove('hovering');
      }
    });
    
    // Smooth animation loop
    this.render = this.render.bind(this);
    requestAnimationFrame(this.render);
  }
  
  render() {
    // Linear interpolation for smooth trailing
    const ease = 0.18;
    this.cursorPos.x += (this.mouse.x - this.cursorPos.x) * ease;
    this.cursorPos.y += (this.mouse.y - this.cursorPos.y) * ease;
    
    this.cursorEl.style.left = `${this.cursorPos.x}px`;
    this.cursorEl.style.top = `${this.cursorPos.y}px`;
    
    requestAnimationFrame(this.render);
  }
}

// ============================================================================
// 4. LANGUAGE (I18N) ENGINE - ARABIC & ENGLISH
// ============================================================================
class I18nManager {
  constructor() {
    this.currentLang = 'en'; // Default English
    this.langBtn = document.getElementById('lang-toggle-btn');
    this.langLabel = document.getElementById('lang-label');
    
    this.init();
  }
  
  init() {
    if (this.langBtn) {
      this.langBtn.addEventListener('click', () => {
        this.toggleLang();
      });
    }
  }
  
  toggleLang() {
    const nextLang = this.currentLang === 'en' ? 'ar' : 'en';
    this.setLanguage(nextLang);
  }
  
  setLanguage(lang) {
    if (!translations[lang]) return;
    this.currentLang = lang;
    
    const htmlEl = document.documentElement;
    htmlEl.setAttribute('lang', lang);
    htmlEl.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    
    if (this.langLabel) {
      this.langLabel.textContent = lang === 'en' ? 'عربي' : 'English';
    }
    
    // Update all elements with data-i18n
    const elements = document.querySelectorAll('[data-i18n]');
    const dict = translations[lang];
    
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        // If element has strong or formatting inside, handle appropriately
        if (key.startsWith('sol_1_p') || key.startsWith('sol_2_p') || key.startsWith('sol_3_p') || key.startsWith('sol_4_p')) {
          // Format with strong
          const parts = dict[key].split(':');
          if (parts.length > 1) {
            el.innerHTML = `<strong>${parts[0]}:</strong>${parts.slice(1).join(':')}`;
          } else {
            el.textContent = dict[key];
          }
        } else {
          el.textContent = dict[key];
        }
      }
    });
  }
}

// ============================================================================
// 5. THEME MANAGER (DARK / LIGHT MODE)
// ============================================================================
class ThemeManager {
  constructor() {
    this.themeBtn = document.getElementById('theme-toggle-btn');
    this.htmlEl = document.documentElement;
    this.bodyEl = document.body;
    
    this.init();
  }
  
  init() {
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('pulseroute-theme') || 'dark';
    this.applyTheme(savedTheme);
    
    if (this.themeBtn) {
      this.themeBtn.addEventListener('click', () => {
        const currentTheme = this.htmlEl.getAttribute('data-theme') || 'dark';
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(nextTheme);
      });
    }
  }
  
  applyTheme(theme) {
    this.htmlEl.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      this.bodyEl.classList.add('dark-theme');
      this.bodyEl.classList.remove('light-theme');
    } else {
      this.bodyEl.classList.add('light-theme');
      this.bodyEl.classList.remove('dark-theme');
    }
    localStorage.setItem('pulseroute-theme', theme);
  }
}

// ============================================================================
// 6. INTERACTIVE CORRIDOR & TELEMETRY SIMULATOR
// ============================================================================
class SimulatorManager {
  constructor() {
    this.activeLane = 'mid';
    this.controlMode = 'ai'; // 'ai' or 'manual'
    this.cycleInterval = null;
    this.etaSeconds = 165;
    
    this.init();
  }
  
  init() {
    this.setupClock();
    this.setupLaneButtons();
    this.setupModeToggle();
    this.setupSimulationActions();
    this.startEtaCountdown();
  }
  
  setupClock() {
    const clockEl = document.getElementById('sim-clock');
    if (!clockEl) return;
    
    const updateTime = () => {
      const now = new Date();
      clockEl.textContent = now.toTimeString().split(' ')[0];
    };
    updateTime();
    setInterval(updateTime, 1000);
  }
  
  setupLaneButtons() {
    const buttons = document.querySelectorAll('.lane-choice-btn');
    const laneSigns = {
      left: document.getElementById('lane-left'),
      mid: document.getElementById('lane-mid'),
      right: document.getElementById('lane-right')
    };
    
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const selected = btn.getAttribute('data-lane');
        this.activeLane = selected;
        
        // Update matrix signage
        Object.keys(laneSigns).forEach(k => {
          if (laneSigns[k]) {
            laneSigns[k].classList.remove('active-clear');
          }
        });
        
        if (laneSigns[selected]) {
          laneSigns[selected].classList.add('active-clear');
        }
        
        // Update matrix banner text
        const matrixMainText = document.getElementById('matrix-main-text');
        if (matrixMainText) {
          const isAr = document.documentElement.getAttribute('lang') === 'ar';
          if (selected === 'left') {
            matrixMainText.textContent = isAr
              ? "اقتراب إسعاف: يرجى التوجه لليسار فوراً"
              : "AMBULANCE APPROACHING: MERGE LEFT NOW";
          } else if (selected === 'right') {
            matrixMainText.textContent = isAr
              ? "اقتراب إسعاف: يرجى التوجه لليمين فوراً"
              : "AMBULANCE APPROACHING: MERGE RIGHT NOW";
          } else {
            matrixMainText.textContent = isAr
              ? "اقتراب إسعاف: إفساح المسار الأوسط فوراً"
              : "AMBULANCE APPROACHING: CLEAR MIDDLE LANE";
          }
        }
      });
    });
  }
  
  setupModeToggle() {
    const btnAi = document.getElementById('btn-mode-ai');
    const btnManual = document.getElementById('btn-mode-manual');
    const hudModeSub = document.getElementById('hud-mode-sub');
    
    if (btnAi && btnManual) {
      btnAi.addEventListener('click', () => {
        btnAi.classList.add('active');
        btnManual.classList.remove('active');
        this.controlMode = 'ai';
        if (hudModeSub) {
          const isAr = document.documentElement.getAttribute('lang') === 'ar';
          hudModeSub.textContent = isAr ? "تحكم ذاتي ذكي بالمسار" : "Autonomous Corridor Clearing";
        }
      });
      
      btnManual.addEventListener('click', () => {
        btnManual.classList.add('active');
        btnAi.classList.remove('active');
        this.controlMode = 'manual';
        if (hudModeSub) {
          const isAr = document.documentElement.getAttribute('lang') === 'ar';
          hudModeSub.textContent = isAr ? "تحكم يدوي مباشر للسائق" : "Direct Driver Signal Override";
        }
      });
    }
  }
  
  setupSimulationActions() {
    const btnPassage = document.getElementById('btn-trigger-passage');
    const btnReset = document.getElementById('btn-trigger-reset');
    
    if (btnPassage) {
      btnPassage.addEventListener('click', () => {
        this.simulatePassage();
      });
    }
    
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        this.resetCycle();
      });
    }
  }
  
  simulatePassage() {
    const tstep3 = document.getElementById('tstep-3');
    const tstep4 = document.getElementById('tstep-4');
    const lightGreen = document.getElementById('light-green');
    const lightYellow = document.getElementById('light-yellow');
    const lightRed = document.getElementById('light-red');
    const hudSignals = document.getElementById('hud-signals-val');
    const matrixMain = document.getElementById('matrix-main-text');
    const hudStatus = document.getElementById('hud-signal-status-text');
    const isAr = document.documentElement.getAttribute('lang') === 'ar';
    
    if (tstep3) tstep3.classList.add('active');
    if (tstep4) tstep4.classList.add('active');
    
    if (hudSignals) {
      let count = parseInt(hudSignals.textContent, 10);
      if (count > 0) hudSignals.textContent = count - 1;
    }
    
    // Flash message: Corridor cleared -> 120s decongestion
    if (matrixMain) {
      matrixMain.textContent = isAr
        ? "تم عبور الإسعاف // تفعيل مرحلة تصريف الازدحام (120 ثانية)"
        : "AMBULANCE PASSED // 120s DE-CONGESTION FLUSH ACTIVE";
      matrixMain.style.color = "#10b981";
    }
    
    if (hudStatus) {
      hudStatus.textContent = isAr ? "تم العبور (إعادة الضبط)" : "PASSED (RE-NORMALIZING)";
    }
    
    // Cycle lights briefly to show transition
    setTimeout(() => {
      if (matrixMain) {
        matrixMain.style.color = "#38bdf8";
      }
    }, 4000);
  }
  
  resetCycle() {
    const tstep3 = document.getElementById('tstep-3');
    const tstep4 = document.getElementById('tstep-4');
    const hudSignals = document.getElementById('hud-signals-val');
    const matrixMain = document.getElementById('matrix-main-text');
    const hudStatus = document.getElementById('hud-signal-status-text');
    const isAr = document.documentElement.getAttribute('lang') === 'ar';
    
    if (tstep3) tstep3.classList.add('active');
    if (tstep4) tstep4.classList.remove('active');
    if (hudSignals) hudSignals.textContent = "3";
    
    if (matrixMain) {
      matrixMain.textContent = isAr
        ? "اقتراب سيارة إسعاف: متبقي 35 ثانية"
        : "AMBULANCE APPROACHING: ETA 35 SECONDS";
      matrixMain.style.color = "#38bdf8";
    }
    
    if (hudStatus) {
      hudStatus.textContent = isAr ? "مفتوح مسبقاً (أخضر)" : "PREEMPTED (GREEN)";
    }
  }
  
  startEtaCountdown() {
    const etaEl = document.getElementById('hud-eta-val');
    if (!etaEl) return;
    
    setInterval(() => {
      if (this.etaSeconds > 10) {
        this.etaSeconds--;
      } else {
        this.etaSeconds = 165;
      }
      
      const mins = Math.floor(this.etaSeconds / 60);
      const secs = this.etaSeconds % 60;
      etaEl.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }, 1000);
  }
}

// ============================================================================
// 7. SCROLL OBSERVER & ANIMATED COUNTERS
// Sequential team reveal & metric counters
// ============================================================================
class AnimationManager {
  constructor() {
    this.init();
  }
  
  init() {
    // 1. Reveal on scroll
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    };
    
    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);
      
      document.querySelectorAll('.reveal-on-scroll, .team-card').forEach(el => {
        revealObserver.observe(el);
      });
      
      // 2. Counter animation
      const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateCounters(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      
      const telemetryGrid = document.querySelector('.hero-telemetry-grid');
      if (telemetryGrid) {
        counterObserver.observe(telemetryGrid);
      }
    } else {
      // Fallback if IntersectionObserver not supported
      document.querySelectorAll('.reveal-on-scroll, .team-card').forEach(el => {
        el.classList.add('revealed');
      });
      const telemetryGrid = document.querySelector('.hero-telemetry-grid');
      if (telemetryGrid) {
        this.animateCounters(telemetryGrid);
      }
    }
    
    // Quick fallback check for elements already in viewport
    setTimeout(() => {
      document.querySelectorAll('.reveal-on-scroll, .team-card').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          el.classList.add('revealed');
        }
      });
    }, 150);
    
    // 3. Mobile Navigation Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    if (mobileBtn && navLinks) {
      mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('open');
      });
      
      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('open');
        });
      });
    }
  }
  
  animateCounters(container) {
    const counters = container.querySelectorAll('.counter');
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 1600;
      const stepTime = 20;
      const totalSteps = duration / stepTime;
      const increment = target / totalSteps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current);
        }
      }, stepTime);
    });
  }
}

// ============================================================================
// APP INITIALIZATION
// ============================================================================
function initPulseRouteApp() {
  new Starfield('starfield-canvas');
  new CustomCursor();
  new I18nManager();
  new ThemeManager();
  new SimulatorManager();
  new AnimationManager();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPulseRouteApp);
} else {
  initPulseRouteApp();
}

