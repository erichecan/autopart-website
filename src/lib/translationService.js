// 翻译服务 - 将中文自动翻译为其他语言
// 注意：这里使用的是简单的字典映射，实际项目中可以集成Google Translate API或其他翻译服务

// 汽车配件专业词汇字典
const autoPartsTranslations = {
  // 发动机系统
  '发动机系统': {
    en: 'Engine System',
    fr: 'Système Moteur', 
    es: 'Sistema del Motor',
    ar: 'نظام المحرك'
  },
  '活塞': {
    en: 'Pistons',
    fr: 'Pistons',
    es: 'Pistones', 
    ar: 'المكابس'
  },
  '活塞环': {
    en: 'Piston Rings',
    fr: 'Segments de Piston',
    es: 'Anillos de Pistón',
    ar: 'حلقات المكبس'
  },
  '气缸套': {
    en: 'Cylinder Liners',
    fr: 'Chemises de Cylindre',
    es: 'Camisas de Cilindro',
    ar: 'بطانات الأسطوانة'
  },
  '曲轴': {
    en: 'Crankshafts',
    fr: 'Vilebrequins',
    es: 'Cigüeñales',
    ar: 'أعمدة المرفق'
  },
  '连杆': {
    en: 'Connecting Rods',
    fr: 'Bielles',
    es: 'Bielas',
    ar: 'قضبان التوصيل'
  },

  // 制动系统
  '制动系统': {
    en: 'Brake System',
    fr: 'Système de Freinage',
    es: 'Sistema de Frenos',
    ar: 'نظام الفرامل'
  },
  '刹车片': {
    en: 'Brake Pads',
    fr: 'Plaquettes de Frein',
    es: 'Pastillas de Freno',
    ar: 'أقراص الفرامل'
  },
  '刹车盘': {
    en: 'Brake Discs',
    fr: 'Disques de Frein',
    es: 'Discos de Freno',
    ar: 'أقراص الفرامل'
  },
  '刹车鼓': {
    en: 'Brake Drums',
    fr: 'Tambours de Frein',
    es: 'Tambores de Freno',
    ar: 'طبول الفرامل'
  },
  '刹车油': {
    en: 'Brake Fluid',
    fr: 'Liquide de Frein',
    es: 'Líquido de Frenos',
    ar: 'سائل الفرامل'
  },

  // 悬挂系统
  '悬挂系统': {
    en: 'Suspension System',
    fr: 'Système de Suspension',
    es: 'Sistema de Suspensión',
    ar: 'نظام التعليق'
  },
  '减震器': {
    en: 'Shock Absorbers',
    fr: 'Amortisseurs',
    es: 'Amortiguadores',
    ar: 'ماصات الصدمات'
  },
  '弹簧': {
    en: 'Springs',
    fr: 'Ressorts',
    es: 'Resortes',
    ar: 'الزنبركات'
  },
  '稳定杆': {
    en: 'Stabilizer Bars',
    fr: 'Barres Stabilisatrices',
    es: 'Barras Estabilizadoras',
    ar: 'أعمدة التوازن'
  },

  // 电气系统
  '电气系统': {
    en: 'Electrical System',
    fr: 'Système Électrique',
    es: 'Sistema Eléctrico',
    ar: 'النظام الكهربائي'
  },
  '火花塞': {
    en: 'Spark Plugs',
    fr: 'Bougies d\'Allumage',
    es: 'Bujías',
    ar: 'شمعات الإشعال'
  },
  '点火线圈': {
    en: 'Ignition Coils',
    fr: 'Bobines d\'Allumage',
    es: 'Bobinas de Encendido',
    ar: 'ملفات الإشعال'
  },
  '电池': {
    en: 'Batteries',
    fr: 'Batteries',
    es: 'Baterías',
    ar: 'البطاريات'
  },
  '发电机': {
    en: 'Alternators',
    fr: 'Alternateurs',
    es: 'Alternadores',
    ar: 'المولدات'
  },

  // 过滤系统
  '过滤系统': {
    en: 'Filter System',
    fr: 'Système de Filtration',
    es: 'Sistema de Filtros',
    ar: 'نظام المرشحات'
  },
  '机油滤清器': {
    en: 'Oil Filters',
    fr: 'Filtres à Huile',
    es: 'Filtros de Aceite',
    ar: 'مرشحات الزيت'
  },
  '空气滤清器': {
    en: 'Air Filters',
    fr: 'Filtres à Air',
    es: 'Filtros de Aire',
    ar: 'مرشحات الهواء'
  },
  '燃油滤清器': {
    en: 'Fuel Filters',
    fr: 'Filtres à Carburant',
    es: 'Filtros de Combustible',
    ar: 'مرشحات الوقود'
  },

  // 照明系统
  '照明系统': {
    en: 'Lighting System',
    fr: 'Système d\'Éclairage',
    es: 'Sistema de Iluminación',
    ar: 'نظام الإضاءة'
  },
  '前大灯': {
    en: 'Headlights',
    fr: 'Phares',
    es: 'Faros Delanteros',
    ar: 'المصابيح الأمامية'
  },
  '尾灯': {
    en: 'Tail Lights',
    fr: 'Feux Arrière',
    es: 'Luces Traseras',
    ar: 'المصابيح الخلفية'
  },
  '转向灯': {
    en: 'Turn Signals',
    fr: 'Clignotants',
    es: 'Señales de Giro',
    ar: 'إشارات الانعطاف'
  },
  'LED灯条': {
    en: 'LED Light Bars',
    fr: 'Barres LED',
    es: 'Barras de Luz LED',
    ar: 'أشرطة LED'
  }
}

// 通用翻译词汇
const commonTranslations = {
  '高质量': {
    en: 'High Quality',
    fr: 'Haute Qualité',
    es: 'Alta Calidad',
    ar: 'جودة عالية'
  },
  '耐用': {
    en: 'Durable',
    fr: 'Durable',
    es: 'Duradero',
    ar: 'متين'
  },
  '原厂品质': {
    en: 'OEM Quality',
    fr: 'Qualité OEM',
    es: 'Calidad OEM',
    ar: 'جودة الشركة المصنعة الأصلية'
  },
  '适用于': {
    en: 'Suitable for',
    fr: 'Convient pour',
    es: 'Adecuado para',
    ar: 'مناسب لـ'
  },
  '优质材料': {
    en: 'Premium Materials',
    fr: 'Matériaux Premium',
    es: 'Materiales Premium',
    ar: 'مواد فاخرة'
  }
}

// 合并所有翻译字典
const allTranslations = { ...autoPartsTranslations, ...commonTranslations }

// 自动翻译函数
export const autoTranslate = (chineseText, targetLanguage) => {
  // 直接查找字典
  if (allTranslations[chineseText] && allTranslations[chineseText][targetLanguage]) {
    return allTranslations[chineseText][targetLanguage]
  }

  // 如果字典中没有，返回原文+语言标记（实际项目中可以调用翻译API）
  return `${chineseText} (${targetLanguage.toUpperCase()})`
}

// 生成所有语言的翻译
export const generateTranslations = (chineseName, chineseDescription = '') => {
  const languages = ['en', 'fr', 'es', 'ar']
  
  return languages.map(lang => ({
    language: lang,
    name: autoTranslate(chineseName, lang),
    description: chineseDescription ? autoTranslate(chineseDescription, lang) : ''
  }))
}

// 生成完整的多语言数据（包含中文）
export const generateAllLanguageTranslations = (chineseName, chineseDescription = '') => {
  const translations = [
    {
      language: 'zh',
      name: chineseName,
      description: chineseDescription
    },
    ...generateTranslations(chineseName, chineseDescription)
  ]
  
  return translations
}

// 验证翻译质量
export const validateTranslation = (chineseText) => {
  return {
    hasTranslation: !!allTranslations[chineseText],
    availableLanguages: allTranslations[chineseText] ? Object.keys(allTranslations[chineseText]) : [],
    suggestion: allTranslations[chineseText] ? null : '建议添加到翻译字典中'
  }
}

// 添加新的翻译到字典（动态扩展）
export const addTranslationToDictionary = (chineseText, translations) => {
  allTranslations[chineseText] = translations
}

// 获取所有支持的语言
export const getSupportedLanguages = () => {
  return [
    { code: 'zh', name: '中文', nativeName: '中文' },
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'fr', name: 'French', nativeName: 'Français' },
    { code: 'es', name: 'Spanish', nativeName: 'Español' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية' }
  ]
}