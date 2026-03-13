export type Language = "uz" | "en" | "ru";

export const languageLabels: Record<Language, string> = {
  uz: "O'zbek",
  en: "English",
  ru: "Русский",
};

type TranslationSet = {
  nav: {
    home: string;
    features: string;
    start: string;
  };
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    cta: string;
    students: string;
    appStore: string;
    googlePlay: string;
  };
  exercise: {
    level: string;
    listen: string;
    skip: string;
    check: string;
    correct: string;
    incorrect: string;
    selectAnswer: string;
    buildSentence: string;
    tapWords: string;
  };
  mission: {
    heading: string;
    line1: string;
    line2: string;
  };
  features: {
    heading: string;
    gamifiedTitle: string;
    gamifiedDesc: string;
    aiTitle: string;
    aiDesc: string;
    streakTitle: string;
    streakDesc: string;
  };
  progress: {
    heading: string;
    description: string;
    nextLevel: string;
  };
  leaderboard: {
    heading: string;
  };
  howItWorks: {
    heading: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
  };
  comingSoon: {
    heading: string;
    description: string;
    timeline: string;
  };
  faq: {
    heading: string;
    q1: string;
    a1: string;
    q2: string;
    a2: string;
    q3: string;
    a3: string;
    q4: string;
    a4: string;
  };
  footer: {
    copyright: string;
    privacy: string;
  };
};

export const translations: Record<Language, TranslationSet> = {
  uz: {
    nav: {
      home: "Bosh sahifa",
      features: "Imkoniyatlar",
      start: "Boshlash",
    },
    hero: {
      badge: "45M+ O'quvchilar",
      titleLine1: "Ingliz tilini",
      titleLine2: "maroqli o'rganing",
      subtitle: "Bepul. Qiziqarli. Samarali. Kuniga 15 daqiqa",
      cta: "BOSHLASH",
      students: "O'quvchilar",
      appStore: "App Store",
      googlePlay: "Google Play",
    },
    exercise: {
      level: "Level 5 - English",
      listen: "Tinglang",
      skip: "O'tkazib yuborish",
      check: "TEKSHIRISH",
      correct: "To'g'ri!",
      incorrect: "Noto'g'ri!",
      selectAnswer: "Javobni tanlang",
      buildSentence: "So'zlarni to'g'ri tartibda tuzing",
      tapWords: "So'zlarni bosing...",
    },
    mission: {
      heading: "Nega biz buni qilyapmiz?",
      line1: "O'zbeklar ingliz tilini o'rganishda qiynaladi.",
      line2: "Biz o'yin orqali gapirishni oson qilmoqchimiz.",
    },
    features: {
      heading: "Nima uchun EazyEnglish?",
      gamifiedTitle: "O'yinlashtirilgan darslar",
      gamifiedDesc:
        "Ball yig'ing, level ashing va do'stlaringiz bilan bellashing",
      aiTitle: "AI suhbatdosh",
      aiDesc: "Sun'iy intellekt bilan real suhbatlar qiling",
      streakTitle: "Kunlik streak",
      streakDesc: "Har kuni o'qib, motivatsiyani saqlang",
    },
    progress: {
      heading: "Yo'lingizni kuzatib boring",
      description:
        "Kunlik maqsadlarni bajaring va fluensingiz o'sishini ko'ring",
      nextLevel: "Keyingi daraja",
    },
    leaderboard: {
      heading: "Haftalik leaderboard",
    },
    howItWorks: {
      heading: "Qanday ishlaydi?",
      step1Title: "Ro'yxatdan o'ting",
      step1Desc: "Email manzilingizni qoldiring va biz sizga birinchi bo'lib xabar beramiz",
      step2Title: "Ilovani yuklab oling",
      step2Desc: "Ilova tayyor bo'lganda App Store yoki Google Play'dan yuklab oling",
      step3Title: "O'ynab o'rganing",
      step3Desc: "Kuniga 15 daqiqa o'yin o'ynang va ingliz tilida gapiring",
    },
    comingSoon: {
      heading: "Tez kunda",
      description: "Biz hozir ilovani yaratish ustida ishlamoqdamiz. Birinchilardan bo'lib sinab ko'rish uchun ro'yxatga yoziling.",
      timeline: "2026-yil bahorida chiqadi",
    },
    faq: {
      heading: "Ko'p so'raladigan savollar",
      q1: "EazyEnglish bepulmi?",
      a1: "Ha! Asosiy funksiyalar butunlay bepul. Premium imkoniyatlar uchun obuna mavjud bo'ladi.",
      q2: "Qaysi darajadagilar uchun?",
      a2: "Boshlang'ich darajadan tortib o'rta darajagacha. Noldan boshlovchilar uchun ham qulay.",
      q3: "Kuniga qancha vaqt kerak?",
      a3: "Kuniga atigi 15 daqiqa yetarli. Qisqa darslar bilan jadval bo'yicha o'rganasiz.",
      q4: "Qanday boshlash mumkin?",
      a4: "app.eazy-english.uz saytiga kirib, hoziroq boshlashingiz mumkin!",
    },
    footer: {
      copyright:
        "© 2025 EazyEnglish. Ingliz tilini o'rganishning eng qiziqarli usuli",
      privacy: "Maxfiylik siyosati",
    },
  },

  en: {
    nav: {
      home: "Home",
      features: "Features",
      start: "Start",
    },
    hero: {
      badge: "45M+ Students",
      titleLine1: "Learn English",
      titleLine2: "through games",
      subtitle: "Free. Fun. Effective. 15 minutes a day",
      cta: "START NOW",
      students: "Students",
      appStore: "App Store",
      googlePlay: "Google Play",
    },
    exercise: {
      level: "Level 5 - English",
      listen: "Listen",
      skip: "Skip",
      check: "CHECK",
      correct: "Correct!",
      incorrect: "Incorrect!",
      selectAnswer: "Select an answer",
      buildSentence: "Arrange the words to build a sentence",
      tapWords: "Tap words to build...",
    },
    mission: {
      heading: "Why are we doing this?",
      line1: "Uzbeks struggle with learning English.",
      line2: "We want to make speaking easy through games.",
    },
    features: {
      heading: "Why EazyEnglish?",
      gamifiedTitle: "Gamified lessons",
      gamifiedDesc: "Earn points, level up, and compete with friends",
      aiTitle: "AI companion",
      aiDesc: "Have real conversations with artificial intelligence",
      streakTitle: "Daily streak",
      streakDesc: "Study every day, stay motivated",
    },
    progress: {
      heading: "Track your progress",
      description: "Complete daily goals and watch your fluency grow",
      nextLevel: "Next level",
    },
    leaderboard: {
      heading: "Weekly leaderboard",
    },
    howItWorks: {
      heading: "How does it work?",
      step1Title: "Sign up",
      step1Desc: "Leave your email and we'll notify you first when it's ready",
      step2Title: "Download the app",
      step2Desc: "Get it from the App Store or Google Play as soon as it launches",
      step3Title: "Learn by playing",
      step3Desc: "Play for 15 minutes a day and start speaking English",
    },
    comingSoon: {
      heading: "Coming soon",
      description: "We're currently building the app. Sign up to be among the first to try it.",
      timeline: "Launching spring 2026",
    },
    faq: {
      heading: "Frequently asked questions",
      q1: "Is EazyEnglish free?",
      a1: "Yes! Core features are completely free. Premium features will be available via subscription.",
      q2: "What level is it for?",
      a2: "From beginner to intermediate. Perfect even for complete beginners.",
      q3: "How much time per day?",
      a3: "Just 15 minutes a day is enough. Short lessons that fit your schedule.",
      q4: "How do I get started?",
      a4: "Visit app.eazy-english.uz and start learning right away!",
    },
    footer: {
      copyright: "© 2025 EazyEnglish. The most fun way to learn English",
      privacy: "Privacy Policy",
    },
  },

  ru: {
    nav: {
      home: "Главная",
      features: "Возможности",
      start: "Начать",
    },
    hero: {
      badge: "45M+ Учеников",
      titleLine1: "Учите английский",
      titleLine2: "через игры",
      subtitle: "Бесплатно. Увлекательно. Эффективно. 15 минут в день",
      cta: "НАЧАТЬ",
      students: "Учеников",
      appStore: "App Store",
      googlePlay: "Google Play",
    },
    exercise: {
      level: "Уровень 5 - English",
      listen: "Слушайте",
      skip: "Пропустить",
      check: "ПРОВЕРИТЬ",
      correct: "Правильно!",
      incorrect: "Неправильно!",
      selectAnswer: "Выберите ответ",
      buildSentence: "Расставьте слова в правильном порядке",
      tapWords: "Нажимайте слова...",
    },
    mission: {
      heading: "Почему мы это делаем?",
      line1: "Узбекистанцам сложно учить английский.",
      line2: "Мы хотим сделать разговорную речь лёгкой через игры.",
    },
    features: {
      heading: "Почему EazyEnglish?",
      gamifiedTitle: "Игровые уроки",
      gamifiedDesc:
        "Зарабатывайте баллы, повышайте уровень и соревнуйтесь с друзьями",
      aiTitle: "AI собеседник",
      aiDesc: "Ведите реальные разговоры с искусственным интеллектом",
      streakTitle: "Ежедневная серия",
      streakDesc: "Занимайтесь каждый день, сохраняйте мотивацию",
    },
    progress: {
      heading: "Следите за прогрессом",
      description:
        "Выполняйте ежедневные цели и наблюдайте за ростом беглости",
      nextLevel: "Следующий уровень",
    },
    leaderboard: {
      heading: "Еженедельный рейтинг",
    },
    howItWorks: {
      heading: "Как это работает?",
      step1Title: "Зарегистрируйтесь",
      step1Desc: "Оставьте свой email, и мы сообщим вам первыми о запуске",
      step2Title: "Скачайте приложение",
      step2Desc: "Загрузите из App Store или Google Play сразу после запуска",
      step3Title: "Учитесь играя",
      step3Desc: "Играйте 15 минут в день и начните говорить на английском",
    },
    comingSoon: {
      heading: "Скоро",
      description: "Мы сейчас работаем над созданием приложения. Запишитесь, чтобы быть в числе первых.",
      timeline: "Запуск весной 2026",
    },
    faq: {
      heading: "Часто задаваемые вопросы",
      q1: "EazyEnglish бесплатный?",
      a1: "Да! Основные функции полностью бесплатны. Премиум-функции будут доступны по подписке.",
      q2: "Для какого уровня?",
      a2: "От начального до среднего. Подходит даже для полных новичков.",
      q3: "Сколько времени в день нужно?",
      a3: "Всего 15 минут в день достаточно. Короткие уроки, которые вписываются в ваш график.",
      q4: "Как начать?",
      a4: "Зайдите на app.eazy-english.uz и начните учиться прямо сейчас!",
    },
    footer: {
      copyright:
        "© 2025 EazyEnglish. Самый увлекательный способ изучения английского",
      privacy: "Политика конфиденциальности",
    },
  },
};
