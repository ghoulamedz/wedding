// ── Wedding Invitation Configuration ──
// Edit this file to customize the invitation.
// Everything else (render.js, index.html, style.css) stays untouched.

var WEDDING_CONFIG = {
  // ── Couple ──
  couple: {
    groom: "محمد",
    bride: "وفاء",
    // Each family: [ { role, name }, { role, name } ]
    families: [
      [
        { role: "السيد", name: "حسين بنهاشم" },
        { role: "والسيدة", name: "زهرة العماري" }
      ],
      [
        { role: "السيد", name: "محمد عبداللطيف" },
        { role: "والسيدة", name: "حليمة العلوي" }
      ]
    ]
  },

  // ── Countdown ──
  countdown: {
    // ISO 8601 date/time string
    targetDate: "2026-07-31T10:00:00"
  },

  // ── Events (timeline) ──
  // Items alternate: text left / icon right → icon left / text right
  events: [
    {
      date: "31 / 7 / 2026",
      title: "مراسم العقد",
      location: "فضاء بلدية تطاوين الجنوبية",
      time: "10:00",
      ampm: "AM",
      lat: 32.924629,
      lng: 10.439581,
      icon: "icon1.png"
    },
    {
      date: "01 / 8 / 2026",
      title: "مأدبة الغداء",
      location: "منزل العريس",
      time: "13:00",
      ampm: "PM",
      lat: 32.937178,
      lng: 10.455197,
      icon: "icon4.png"
    },
    {
      date: "01 / 8 / 2026",
      title: "سهرة للنساء",
      location: "منزل العريس",
      time: "10:00",
      ampm: "PM",
      lat: 35.508971,
      lng: 11.081458,
      icon: "icon5.png"
    },
     {
      date: "30 / 7 / 2026",
      title: "حنة العروسة",
      location: "منزل العروسة",
      time: "10:00",
      ampm: "PM",
      lat: 32.871710,
      lng: 10.379808,
      icon: "icon5.png"
    },
    // {
    //   date: "14 / 7 / 2026",
    //   title: "جلسة تصوير",
    //   location: "برج الراس",
    //   time: "5:00",
    //   ampm: "PM",
    //   lat: 35.508971,
    //   lng: 11.081458,
    //   icon: "icon3.png"
    // },
    // {
    //   date: "15 / 7 / 2026",
    //   title: "مأدبة العشاء",
    //   location: "منزل العريس",
    //   time: "6:30",
    //   ampm: "PM",
    //   lat: 35.642004,
    //   lng: 10.941811,
    //   icon: "icon4.png"
    // },
    // {
    //   date: "16 / 7 / 2026",
    //   title: "حفل الأفراح",
    //   location: "فضاء موازين",
    //   time: "8:00",
    //   ampm: "PM",
    //   lat: 35.658203,
    //   lng: 10.880335,
    //   icon: "icon5.png"
    // }
  ],

  // ── Labels (all user-facing text) ──
  labels: {
    pageTitle: "",
    loader: "الدعوة قيد التحضير",
    basmala: "بارك الله لهما وبارك عليهما وجمع بينهما في الخير",
    divider: "✦ ✦ ✦",
    invitePrefix: "تتشرف عائلتا",
    inviteSuffix: "بدعوتكم لحضور حفل زفاف نجليهما",
    andSymbol: "و",
    scrollHint: "اسحب للأسفل",
    seal: "اضغط لفتح الدعوة",
    countdownTitle: "العد التنازلي",
    countdownSubtitle: "لحظات تفصلنا عن اللقاء",
    programTitle: "برنامج الحفل",
    locationBtn: "الموقع",
    closingTagline: "يسعدنا مشاركتكم هذه الفرحة",
    timeUnits: {
      days: "يوم",
      hours: "ساعة",
      minutes: "دقيقة",
      seconds: "ثانية"
    },
    map: {
      title: "الموقع",
      noCoords: "أضف الإحداثيات لعرض الخريطة",
      openMaps: "افتح في خرائط جوجل"
    }
  },

  // ── Assets (file paths, relative to index.html) ──
  assets: {
    favicon: "assets/favicon.png",
    locationIcon: "assets/localisation_icon.webp",
    envelope: {
      left: "assets/left4.jpg",
      right: "assets/right4.jpg",
      seal: "assets/seal.webp"
    },
    closingIcon: "assets/seal.webp",
    backgrounds: {
      intro: "assets/intro-bg.jpg",
      countdown: "assets/countdown-bg.jpg",
      program: "assets/program-bg.jpg"
    }
  }
};
