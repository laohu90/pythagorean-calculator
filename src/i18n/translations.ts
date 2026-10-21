export type Language = 'en' | 'es' | 'fr' | 'pt' | 'zh';
export type SupportedLang = Language;

export interface TranslationDictionary {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  notice: string;
  nav: {
    calc: string;
    triples: string;
    special: string;
    guide: string;
    share: string;
    copied: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    badges: {
      radical: string;
      steps: string;
      visual: string;
      triples: string;
    };
  };
  quickLinks: {
    triplesTitle: string;
    triplesDesc: string;
    specialTitle: string;
    specialDesc: string;
    guideTitle: string;
    guideDesc: string;
  };
  calc: {
    step1: string;
    history: string;
    historyTitle: string;
    clearHistory: string;
    noHistory: string;
    reset: string;
    targetC: string;
    targetCFormula: string;
    targetA: string;
    targetAFormula: string;
    targetB: string;
    targetBFormula: string;
    legA: string;
    legB: string;
    hypotenuseC: string;
    hypotenuseLongest: string;
    inputPlaceholder: string;
    hintLeg1: string;
    hintLeg2: string;
    hintHypotenuse: string;
    unitLabel: string;
    precisionLabel: string;
    presetsLabel: string;
    units: {
      cm: string;
      m: string;
      mm: string;
      in: string;
      ft: string;
      pure: string;
    };
    precisions: {
      p2: string;
      p4: string;
      p6: string;
      p8: string;
    };
    errorInvalid: string;
    errorHypotenuseShort: (c: number, leg: number, legName: string) => string;
  };
  result: {
    title: string;
    solvedFor: (target: string) => string;
    tripleBadge: string;
    copyResult: string;
    copied: string;
    simplifiedRadical: string;
    originalRadical: string;
    precision: string;
    stepsTitle: string;
    copyAllSteps: string;
    stepsCopied: string;
    step1Formula: string;
    step2Sub: string;
    step3Calc: string;
    step4Radical: string;
    step5Conclusion: string;
    exactResultLabel: string;
    approxResultLabel: string;
    metricsTitle: string;
    area: string;
    areaFormula: string;
    perimeter: string;
    perimeterFormula: string;
    heightC: string;
    heightCFormula: string;
    angleAlpha: string;
    angleBeta: string;
    circumradius: string;
    circumradiusFormula: string;
    squareUnit: string;
  };
  visualizer: {
    title: string;
    showAltitude: string;
    showAngles: string;
    legA: string;
    legB: string;
    hypotenuseC: string;
    rightAngleLabel: string;
  };
  triples: {
    badge: string;
    title: string;
    desc: string;
    validatorTitle: string;
    validatorDesc: string;
    side1: string;
    side2: string;
    side3: string;
    validateBtn: string;
    validHeader: string;
    invalidHeader: string;
    generatorTitle: string;
    generatorDesc: string;
    paramM: string;
    paramN: string;
    generateBtn: string;
    generatedTitle: (a: number, b: number, c: number) => string;
    isPrimitiveText: string;
    isDerivedText: string;
    tableTitle: (count: number) => string;
    searchPlaceholder: string;
    filterAll: string;
    filterPrimitive: string;
    filterUnder50: string;
    colIndex: string;
    colA: string;
    colB: string;
    colC: string;
    colFormula: string;
    colType: string;
    colAction: string;
    applyBtn: string;
    typePrimitive: string;
    typeDerived: string;
  };
  special: {
    badge: string;
    title: string;
    desc: string;
    t45Title: string;
    t45Ratio: string;
    t45Desc: string;
    t45FormulaLeg: string;
    t45FormulaHyp: string;
    t45FormulaArea: string;
    t45InputLabel: string;
    t45ApplyBtn: string;
    t30Title: string;
    t30Ratio: string;
    t30Desc: string;
    t30FormulaShort: string;
    t30FormulaLong: string;
    t30FormulaHyp: string;
    t30FormulaArea: string;
    t30InputLabel: string;
    t30ApplyBtn: string;
  };
  seoContent: {
    articleTag: string;
    articleTitle: string;
    articleIntro: string;
    formulaCard1Title: string;
    formulaCard1Desc: string;
    formulaCard2Title: string;
    formulaCard2Desc: string;
    formulaCard3Title: string;
    formulaCard3Desc: string;
    proofTitle: string;
    proofDesc: string;
    appTitle: string;
    app1Title: string;
    app1Desc: string;
    app2Title: string;
    app2Desc: string;
    app3Title: string;
    app3Desc: string;
    app4Title: string;
    app4Desc: string;
    faqTag: string;
    faqTitle: string;
    faqDesc: string;
    faqs: Array<{ q: string; a: string }>;
  };
  footer: {
    col1Title: string;
    col2Title: string;
    col3Title: string;
    col3Desc: string;
    col4Title: string;
    col4Desc: string;
    copyright: string;
    seoTag: string;
    designTag: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    meta: {
      title: 'Pythagorean Theorem Calculator - Right Triangle Solver with Simplified Radicals (a² + b² = c²)',
      description: 'Free online Pythagorean theorem calculator. Solve for hypotenuse or legs, simplify radicals automatically, step-by-step derivations, triangle geometry, and Pythagorean triples lookup.',
      keywords: 'Pythagorean theorem calculator, hypotenuse calculator, right triangle solver, simplify radicals, pythagorean triples, a2+b2=c2, find missing side of triangle, exact radical form'
    },
    notice: 'New: Automatic exact radical simplification, fraction rationalization, and step-by-step mathematical proof.',
    nav: {
      calc: 'Solver',
      triples: 'Triples Finder',
      special: 'Special Triangles',
      guide: 'Formula & FAQ',
      share: 'Share / Save',
      copied: 'Link Copied!'
    },
    hero: {
      badge: 'Geometry Essential · Automatic Radical Simplification',
      title: 'Pythagorean Theorem Calculator',
      subtitle: 'Free & accurate right triangle solver. Input any two sides to find the third side with automatic radical reduction, exact fraction representation, decimals, and complete step-by-step derivations.',
      badges: {
        radical: '✓ Exact Simplified Radicals',
        steps: '✓ Step-by-Step Derivations',
        visual: '✓ Dynamic Geometric SVG',
        triples: '✓ Pythagorean Triples Table'
      }
    },
    quickLinks: {
      triplesTitle: 'Pythagorean Triples Explorer',
      triplesDesc: 'Search (3,4,5), (5,12,13) and generate infinite triples using Euclid’s formula.',
      specialTitle: 'Special Right Triangles',
      specialDesc: '30°-60°-90° (1:√3:2) & 45°-45°-90° (1:1:√2) ratios and instant formula guides.',
      guideTitle: 'Geometric Proof & Google FAQ',
      guideDesc: 'Visual geometric proofs, real-world engineering use cases, and essential answers.'
    },
    calc: {
      step1: 'Step 1: Choose Target Side (Given any 2 sides, solve the 3rd)',
      history: 'History',
      historyTitle: 'Calculation History (Last 10)',
      clearHistory: 'Clear History',
      noHistory: 'No calculations yet. Calculations will be automatically saved here.',
      reset: 'Reset',
      targetC: 'Find Hypotenuse c (Recommended)',
      targetCFormula: 'c = √(a² + b²)',
      targetA: 'Find Leg a',
      targetAFormula: 'a = √(c² - b²)',
      targetB: 'Find Leg b',
      targetBFormula: 'b = √(c² - a²)',
      legA: 'Leg a',
      legB: 'Leg b',
      hypotenuseC: 'Hypotenuse c (Longest Side)',
      hypotenuseLongest: 'Hypotenuse c (Must be the longest side)',
      inputPlaceholder: 'Enter side length',
      hintLeg1: 'Enter the length of the first perpendicular leg',
      hintLeg2: 'Enter the length of the second perpendicular leg',
      hintHypotenuse: 'Enter hypotenuse length (must be longer than any leg)',
      unitLabel: 'Unit:',
      precisionLabel: 'Precision:',
      presetsLabel: 'Presets:',
      units: {
        cm: 'Centimeters (cm)',
        m: 'Meters (m)',
        mm: 'Millimeters (mm)',
        in: 'Inches (in)',
        ft: 'Feet (ft)',
        pure: 'Unitless (Pure)'
      },
      precisions: {
        p2: '2 decimals (0.01)',
        p4: '4 decimals (0.0001)',
        p6: '6 decimals (0.000001)',
        p8: '8 decimals (High precision)'
      },
      errorInvalid: 'Please enter valid numbers strictly greater than 0.',
      errorHypotenuseShort: (c, leg, legName) =>
        `Hypotenuse c (${c}) must be strictly greater than leg ${legName} (${leg}). In a right triangle, the hypotenuse is always the longest side!`
    },
    result: {
      title: 'Calculation Result',
      solvedFor: (target) => `Solved for ${target === 'c' ? 'Hypotenuse c' : target === 'a' ? 'Leg a' : 'Leg b'}`,
      tripleBadge: 'Pythagorean Triple',
      copyResult: 'Copy Result',
      copied: 'Copied',
      simplifiedRadical: 'Simplified Radical:',
      originalRadical: 'Original Radical:',
      precision: 'Precision:',
      stepsTitle: 'Detailed Step-by-Step Derivation',
      copyAllSteps: 'Copy Full Solution',
      stepsCopied: 'Full Solution Copied',
      step1Formula: '1. Select Pythagorean Formula Variation:',
      step2Sub: '2. Substitute Known Values:',
      step3Calc: '3. Perform Square & Arithmetic Operations:',
      step4Radical: '4. Prime Factorization & Radical Simplification:',
      step5Conclusion: '5. Final Conclusion:',
      exactResultLabel: 'Exact Radical Form:',
      approxResultLabel: 'Decimal Approximation:',
      metricsTitle: 'Full Triangle Geometric Properties',
      area: 'Area (S)',
      areaFormula: 'S = ½ × a × b',
      perimeter: 'Perimeter (P)',
      perimeterFormula: 'P = a + b + c',
      heightC: 'Altitude on Hypotenuse (h_c)',
      heightCFormula: 'h_c = (a × b) / c',
      angleAlpha: 'Angle α (∠A)',
      angleBeta: 'Angle β (∠B)',
      circumradius: 'Circumradius (R)',
      circumradiusFormula: 'R = c / 2 (Half of Hypotenuse)',
      squareUnit: 'sq units'
    },
    visualizer: {
      title: 'Interactive Geometric Diagram',
      showAltitude: 'Show Altitude (h)',
      showAngles: 'Show Angles',
      legA: 'Leg a',
      legB: 'Leg b',
      hypotenuseC: 'Hypotenuse c (Longest)',
      rightAngleLabel: 'C (90°)'
    },
    triples: {
      badge: 'Mathematical Archive · Pythagorean Triples Explorer',
      title: 'Pythagorean Triples Table & Generator',
      desc: 'A Pythagorean triple consists of three positive integers a, b, and c such that a² + b² = c². Browse common primitive triples, validate custom sets, or generate new ones using Euclid’s formula.',
      validatorTitle: 'Pythagorean Triple Validator',
      validatorDesc: 'Enter any three positive integers to verify if they form a right triangle.',
      side1: 'Side 1',
      side2: 'Side 2',
      side3: 'Side 3 (Longest)',
      validateBtn: 'Validate Triple',
      validHeader: 'Valid Pythagorean Triple!',
      invalidHeader: 'Not a Pythagorean Triple',
      generatorTitle: 'Euclid’s Formula Generator',
      generatorDesc: 'Given positive integers m > n > 0, generate triples using a = m² - n², b = 2mn, c = m² + n².',
      paramM: 'Parameter m (larger)',
      paramN: 'Parameter n (smaller)',
      generateBtn: 'Generate Triple',
      generatedTitle: (a, b, c) => `Generated Triple: (${a}, ${b}, ${c})`,
      isPrimitiveText: '★ Primitive Pythagorean Triple (coprime)',
      isDerivedText: 'Derived triple (has common divisor)',
      tableTitle: (count) => `Common Pythagorean Triples Database (${count} sets)`,
      searchPlaceholder: 'Search side e.g. 13, 25...',
      filterAll: 'All',
      filterPrimitive: 'Primitive Only',
      filterUnder50: 'Hypotenuse ≤ 50',
      colIndex: '#',
      colA: 'Leg a',
      colB: 'Leg b',
      colC: 'Hypotenuse c',
      colFormula: 'Sum of Squares Check',
      colType: 'Type',
      colAction: 'Action',
      applyBtn: 'Use in Calculator',
      typePrimitive: 'Primitive',
      typeDerived: 'Derived'
    },
    special: {
      badge: 'Geometry Reference · Special Right Triangles',
      title: 'Special Right Triangles & Side Length Ratios',
      desc: 'In academic geometry and engineering design, 30°-60°-90° and 45°-45°-90° are the two most fundamental special right triangles. Knowing their constant side ratios eliminates tedious square root calculations.',
      t45Title: '45° - 45° - 90° Isosceles Right Triangle',
      t45Ratio: '1 : 1 : √2',
      t45Desc: 'Both perpendicular legs are equal, and the hypotenuse is exactly √2 times (approx. 1.4142×) the leg length. Commonly found when dividing a square along its diagonal.',
      t45FormulaLeg: '• Legs a = b = x',
      t45FormulaHyp: '• Hypotenuse c = x√2 ≈ 1.4142x',
      t45FormulaArea: '• Area S = ½x²',
      t45InputLabel: 'Set leg x:',
      t45ApplyBtn: 'Load into Calculator for Full Steps',
      t30Title: '30° - 60° - 90° Special Triangle',
      t30Ratio: '1 : √3 : 2',
      t30Desc: 'The short leg opposite the 30° angle is half the hypotenuse; the long leg opposite 60° is √3 times (approx. 1.7321×) the short leg.',
      t30FormulaShort: '• Short leg a = x (opposite 30°)',
      t30FormulaLong: '• Long leg b = x√3 ≈ 1.7321x (opposite 60°)',
      t30FormulaHyp: '• Hypotenuse c = 2x',
      t30FormulaArea: '• Area S = (√3 / 2)x²',
      t30InputLabel: 'Set short leg a (x):',
      t30ApplyBtn: 'Load into Calculator for Full Steps'
    },
    seoContent: {
      articleTag: 'Authoritative Geometry Guide',
      articleTitle: 'What is the Pythagorean Theorem? Formulas, Geometric Proofs & Applications',
      articleIntro: 'The Pythagorean Theorem is one of the most foundational theorems in elementary Euclidean geometry. Discovered independently across ancient civilizations including Babylon, India, China (where it was known as Gougu theorem in the Zhoubi Suanjing), and Greece by Pythagoras.',
      formulaCard1Title: 'Fundamental Formula',
      formulaCard1Desc: 'Sum of squares of legs equals square of hypotenuse',
      formulaCard2Title: 'Find Hypotenuse c',
      formulaCard2Desc: 'Given both legs a and b',
      formulaCard3Title: 'Find Leg a or b',
      formulaCard3Desc: 'Given hypotenuse c and one leg',
      proofTitle: 'Geometric Proof: The Dissection Method (Zhao Shuang Chord Diagram)',
      proofDesc: 'Four congruent right triangles with legs a, b and hypotenuse c are arranged inside a large square with side c, leaving a central small square with side (b - a). Area equivalence yields: c² = 4 × (½ab) + (b - a)² = 2ab + b² - 2ab + a² = a² + b².',
      appTitle: 'Real-World Applications in Construction & Daily Life',
      app1Title: 'Carpentry & Construction (3-4-5 Rule)',
      app1Desc: 'Builders measure 3 meters along one wall, 4 meters along the other; if diagonal is exactly 5 meters, the corner is perfectly square (90°).',
      app2Title: 'Screen Diagonal & Display Dimensions',
      app2Desc: 'TV and monitor specifications (e.g. 55", 65") refer to diagonal length. Using 16:9 aspect ratio and Pythagoras, one can compute exact width and height.',
      app3Title: 'Safe Ladder Placement Height',
      app3Desc: 'Given required vertical height and ladder length, calculate the safe distance between wall and ladder base to prevent slippage.',
      app4Title: 'Cartesian Navigation & GPS Distance',
      app4Desc: 'Euclidean distance formula between (x₁, y₁) and (x₂, y₂) is d = √[(x₂-x₁)² + (y₂-y₁)²], which is a direct application of the Pythagorean Theorem.',
      faqTag: 'Frequently Asked Questions (Google Rich Snippets FAQ)',
      faqTitle: 'Frequently Asked Questions About the Pythagorean Theorem',
      faqDesc: 'Answers to the most searched queries on Google regarding right triangles, hypotenuse calculation, and radical simplification.',
      faqs: [
        {
          q: 'What is the formula for the Pythagorean Theorem?',
          a: 'For any right triangle with perpendicular legs a and b and hypotenuse c, the formula is a² + b² = c². To find the hypotenuse, c = √(a² + b²). To find a leg, a = √(c² - b²) or b = √(c² - a²).'
        },
        {
          q: 'How do you simplify square roots into exact radical form?',
          a: 'To simplify a square root, factor the radicand into perfect square factors and square-free remainders. For example, √20 = √(4 × 5) = √(2² × 5) = 2√5, and √18 = √(9 × 2) = 3√2. This calculator automatically performs prime factorization to display the exact simplest radical.'
        },
        {
          q: 'What are common Pythagorean triples and how are they remembered?',
          a: 'Pythagorean triples are three positive integers satisfying a² + b² = c². Popular sets include (3, 4, 5), (5, 12, 13), (7, 24, 25), (8, 15, 17), (9, 40, 41), and (20, 21, 29). Any integer multiple of these (e.g., 6, 8, 10 or 9, 12, 15) is also a valid triple.'
        },
        {
          q: 'Does the Pythagorean Theorem work for non-right triangles?',
          a: 'No, the Pythagorean Theorem is strictly applicable to right triangles (triangles with a 90° angle). For general triangles, the generalized Law of Cosines is used: c² = a² + b² - 2ab·cos(C). When C = 90°, cos(90°) = 0, reducing back to a² + b² = c².'
        },
        {
          q: 'What is a Primitive Pythagorean Triple?',
          a: 'A primitive Pythagorean triple is a set of positive integers (a, b, c) that satisfy a² + b² = c² where gcd(a, b, c) = 1 (meaning they share no common factor other than 1). Examples include (3, 4, 5) and (5, 12, 13).'
        },
        {
          q: 'What are practical everyday uses of the Pythagorean Theorem?',
          a: 'Everyday applications include verifying right angles in home renovation (3-4-5 rule), calculating TV screen dimensions from diagonal specs, finding straight-line distances on maps, and ensuring safe ladder angles.'
        }
      ]
    },
    footer: {
      col1Title: 'Right Triangle Formulas',
      col2Title: 'Geometric Properties',
      col3Title: 'Simplest Radical Principle',
      col3Desc: 'No square factor inside the radical and no radical in the denominator. Automated prime factorization delivers exact forms like √20 = 2√5.',
      col4Title: 'About This Tool',
      col4Desc: 'Designed for high school and college students, STEM educators, architects, and carpenters seeking exact precision calculations.',
      copyright: '© 2026 Pythagorean Theorem Calculator · Online Right Triangle & Radical Solver',
      seoTag: 'Compliant with Google SEO Standards & Schema.org Rich Snippets',
      designTag: 'Clean White Minimalist Design'
    }
  },
  zh: {
    meta: {
      title: '勾股定理计算器 - 直角三角形斜边计算器与最简根号形式 (a² + b² = c²)',
      description: '专业免费的勾股定理在线计算器。输入直角三角形任意两边，智能求第三边，自动输出最简二次根号形式与精确小数，提供清晰的逐步解题步骤、面积周长及常用勾股数速查表。',
      keywords: '勾股定理计算器, 直角三角形斜边计算器, 勾股数在线查询, a²+b²=c², 毕达哥拉斯定理, 求斜边, 最简二次根式, 直角三角形计算'
    },
    notice: '全新升级：支持自动输出最简二次根号、分数形式与完整逐步推导过程',
    nav: {
      calc: '求解器',
      triples: '勾股数查询',
      special: '特殊直角三角形',
      guide: '公式解析与FAQ',
      share: '分享 / 收藏',
      copied: '已复制链接'
    },
    hero: {
      badge: '几何入门第一大刚需 · 自动输出最简根号形式',
      title: '勾股定理计算器',
      subtitle: '免费专业的直角三角形在线计算工具。支持输入任意两边求第三边，自动进行根号因数分解并输出最简二次根式与精确小数，提供完整逐步解题过程及面积周长计算。',
      badges: {
        radical: '✓ 自动最简根式化简',
        steps: '✓ 详尽逐步解题推导',
        visual: '✓ 动态几何比例图示',
        triples: '✓ 勾股数在线速查检索'
      }
    },
    quickLinks: {
      triplesTitle: '勾股数在线查询',
      triplesDesc: '速查 (3,4,5)、(5,12,13) 等常见整数组合及欧几里得公式生成。',
      specialTitle: '特殊直角三角形速查',
      specialDesc: '30°-60°-90° (1:√3:2) 与 45°-45°-90° (1:1:√2) 固定比率与公式。',
      guideTitle: '赵爽弦图证明与FAQ',
      guideDesc: '几何割补证明、现实工程应用场景与 Google 核心高频疑问解答。'
    },
    calc: {
      step1: '第一步：选择计算目标（输入两边求第三边）',
      history: '历史记录',
      historyTitle: '本地计算历史记录 (最近 10 次)',
      clearHistory: '清空记录',
      noHistory: '暂无历史计算记录，开始计算后会自动记录在此。',
      reset: '重置',
      targetC: '求斜边 c (推荐)',
      targetCFormula: 'c = √(a² + b²)',
      targetA: '求直角边 a',
      targetAFormula: 'a = √(c² - b²)',
      targetB: '求直角边 b',
      targetBFormula: 'b = √(c² - a²)',
      legA: '直角边 a',
      legB: '直角边 b',
      hypotenuseC: '斜边 c (最长边)',
      hypotenuseLongest: '斜边 c（必须为三角形最长边）',
      inputPlaceholder: '请输入边长数值',
      hintLeg1: '输入第一条直角边',
      hintLeg2: '输入第二条直角边',
      hintHypotenuse: '输入斜边 c（必须为三角形最长边）',
      unitLabel: '度量单位:',
      precisionLabel: '小数精度:',
      presetsLabel: '经典范例:',
      units: {
        cm: '厘米 (cm)',
        m: '米 (m)',
        mm: '毫米 (mm)',
        in: '英寸 (in)',
        ft: '英尺 (ft)',
        pure: '无单位 (Pure)'
      },
      precisions: {
        p2: '2位小数 (0.01)',
        p4: '4位小数 (0.0001)',
        p6: '6位小数 (0.000001)',
        p8: '8位高精度'
      },
      errorInvalid: '请输入大于 0 的有效边长数值。',
      errorHypotenuseShort: (c, leg, legName) =>
        `斜边 c (${c}) 必须严格大于直角边 ${legName} (${leg})。在直角三角形中斜边永远是最长边！`
    },
    result: {
      title: '计算结果',
      solvedFor: (target) => `求得 ${target === 'c' ? '斜边 c' : target === 'a' ? '直角边 a' : '直角边 b'}`,
      tripleBadge: '标准勾股数组合',
      copyResult: '复制结果',
      copied: '已复制',
      simplifiedRadical: '最简二次根式:',
      originalRadical: '原始根号式:',
      precision: '小数精度:',
      stepsTitle: '详细逐步解题推导过程 (Step-by-Step Solution)',
      copyAllSteps: '复制完整步骤',
      stepsCopied: '全部步骤已复制',
      step1Formula: '1. 选用勾股定理变形公式：',
      step2Sub: '2. 将已知数值代入公式中：',
      step3Calc: '3. 执行两数平方与加减算术：',
      step4Radical: '4. 最简二次根式化简分析：',
      step5Conclusion: '5. 得出结论：',
      exactResultLabel: '精确根式:',
      approxResultLabel: '小数近似:',
      metricsTitle: '全量几何属性一览 (Geometric Properties)',
      area: '三角形面积 (S)',
      areaFormula: 'S = ½ × a × b',
      perimeter: '三角形周长 (P)',
      perimeterFormula: 'P = a + b + c',
      heightC: '斜边上的高 (h_c)',
      heightCFormula: 'h_c = (a × b) / c',
      angleAlpha: '锐角 α (∠A)',
      angleBeta: '锐角 β (∠B)',
      circumradius: '外接圆半径 (R)',
      circumradiusFormula: 'R = c / 2 (斜边一半)',
      squareUnit: '平方单位'
    },
    visualizer: {
      title: '动态几何图示 (Geometric Visualization)',
      showAltitude: '显示高线 (h)',
      showAngles: '显示角度',
      legA: '直角边 a',
      legB: '直角边 b',
      hypotenuseC: '斜边 c (最长边)',
      rightAngleLabel: 'C (90°)'
    },
    triples: {
      badge: '数学宝库 · 勾股数在线查询',
      title: '勾股数速查表与在线验证生成器',
      desc: '勾股数（毕达哥拉斯三元数）是指能满足 a² + b² = c² 的三个正整数组合。本模块支持常用经典勾股数检索、任意三数组合检验，以及基于欧几里得参数公式的无限生成。',
      validatorTitle: '勾股数在线验证器 (Validator)',
      validatorDesc: '输入任意三个正整数，系统将立即检测它们能否构成直角三角形。',
      side1: '边长 1',
      side2: '边长 2',
      side3: '边长 3 (最长边)',
      validateBtn: '立即验证三元数',
      validHeader: '验证通过！是有效勾股数',
      invalidHeader: '验证不通过：非勾股数',
      generatorTitle: '欧几里得公式生成器 (Euclid’s Formula)',
      generatorDesc: '设定正整数 m > n > 0，依据 a = m² - n², b = 2mn, c = m² + n² 生成勾股数。',
      paramM: '参数 m (较大数)',
      paramN: '参数 n (较小数)',
      generateBtn: '根据公式生成新勾股数',
      generatedTitle: (a, b, c) => `生成得到三元数: (${a}, ${b}, ${c})`,
      isPrimitiveText: '★ 该组属于本原勾股数（三数互质）',
      isDerivedText: '该组可被因数约简（派生组）',
      tableTitle: (count) => `常用经典勾股数检索表 (${count} 组)`,
      searchPlaceholder: '搜索边长，如 13、25...',
      filterAll: '全部',
      filterPrimitive: '仅本原组',
      filterUnder50: '斜边 ≤ 50',
      colIndex: '序号',
      colA: '直角边 a',
      colB: '直角边 b',
      colC: '斜边 c (最长)',
      colFormula: '平方和验证式',
      colType: '性质类型',
      colAction: '快捷操作',
      applyBtn: '代入计算',
      typePrimitive: '本原勾股数',
      typeDerived: '倍数派生组'
    },
    special: {
      badge: '几何速查 · 特殊直角三角形',
      title: '经典特殊直角三角形与边长比率',
      desc: '在初高中几何考试与工程制图中，30°-60°-90° 与 45°-45°-90° 是最常考的两类特殊直角三角形。掌握其固定比例可免去复杂的开方计算。',
      t45Title: '45° - 45° - 90° 等腰直角三角形',
      t45Ratio: '1 : 1 : √2',
      t45Desc: '两直角边长相等，斜边长度是直角边的 √2 倍（约 1.414 倍）。常见于正方形的对角线分割。',
      t45FormulaLeg: '• 直角边 a = b = x',
      t45FormulaHyp: '• 斜边 c = x√2 ≈ 1.4142x',
      t45FormulaArea: '• 面积 S = ½x²',
      t45InputLabel: '设定直角边 x:',
      t45ApplyBtn: '代入主计算器查看完整推导',
      t30Title: '30° - 60° - 90° 直角三角形',
      t30Ratio: '1 : √3 : 2',
      t30Desc: '30°角所对的直角边（短边）为斜边的一半；60°角所对直角边（长边）是短边的 √3 倍（约 1.732 倍）。',
      t30FormulaShort: '• 短直角边 a = x (对 30° 角)',
      t30FormulaLong: '• 长直角边 b = x√3 ≈ 1.7321x (对 60° 角)',
      t30FormulaHyp: '• 斜边 c = 2x',
      t30FormulaArea: '• 面积 S = (√3 / 2)x²',
      t30InputLabel: '设定短边 a (x):',
      t30ApplyBtn: '代入主计算器查看完整推导'
    },
    seoContent: {
      articleTag: '权威几何知识指南 (Knowledge Base)',
      articleTitle: '什么是勾股定理？公式推导、几何证明与全流程解析',
      articleIntro: '勾股定理（西方称毕达哥拉斯定理，Pythagorean Theorem）是初等几何学中最重要的定理之一。在中国古代，《周髀算经》便记载了商高提出的“勾广三，股修四，径隅五”的论断，故在中国通常称直角三角形中较短的直角边为“勾”，较长的直角边为“股”，斜边为“弦”。',
      formulaCard1Title: '基础公式 (Standard)',
      formulaCard1Desc: '直角边平方和等于斜边平方',
      formulaCard2Title: '求斜边 c (Hypotenuse)',
      formulaCard2Desc: '已知两直角边，求斜边长度',
      formulaCard3Title: '求直角边 a 或 b (Legs)',
      formulaCard3Desc: '已知斜边与一直角边，求另一直角边',
      proofTitle: '赵爽弦图与经典的几何拼图证明法',
      proofDesc: '三国时期的数学家赵爽在为《周髀算经》作注时，创制了著名的“赵爽弦图”。通过将 4 个全等直角三角形拼成边长为 c 的大正方形，中央留下边长为 (b - a) 的小正方形，整理得 c² = a² + b²。',
      appTitle: '现实生活与工程项目中的 4 大核心应用',
      app1Title: '建筑与木工找直角 (3-4-5法则)',
      app1Desc: '工人用皮尺测量两边分别为 3 米和 4 米，如果斜对角恰好是 5 米，则两堵墙之间完全垂直（90度）。',
      app2Title: '显示器与手机屏幕尺寸计算',
      app2Desc: '市售屏幕标称的“55寸”或“6.7寸”是指对角线长度。结合 16:9 比例利用勾股定理可精确反推屏幕的宽与高。',
      app3Title: '梯子高空摆放安全距离',
      app3Desc: '已知需要攀登的垂直高度与梯子本身长度，利用 a = √(c² - b²) 可计算梯脚离墙壁的安全距离，防止滑脱。',
      app4Title: '航海、飞行与地图欧氏距离',
      app4Desc: '平面直角坐标系中，两点 (x₁, y₁) 和 (x₂, y₂) 之间的直线距离 d = √[(x₂-x₁)² + (y₂-y₁)²]，本质上就是勾股定理。',
      faqTag: '常见问答 (Google Rich Snippets FAQ)',
      faqTitle: '关于勾股定理的常见疑问与技巧',
      faqDesc: '收录搜索引擎上关于直角三角形求边长、开根号化简与勾股数的最高频热搜问题。',
      faqs: [
        {
          q: '勾股定理的标准计算公式是什么？',
          a: '勾股定理指出：在平面上的任意直角三角形中，两直角边 a 和 b 的平方和等于斜边 c 的平方，公式表示为 a² + b² = c²。求斜边公式为 c = √(a² + b²)；已知斜边求直角边公式为 a = √(c² - b²) 或 b = √(c² - a²)。'
        },
        {
          q: '什么是“最简二次根式”？本计算器如何自动化简根号？',
          a: '当计算所得的斜边或直角边无法开出整数时，数学规范要求将其化为最简二次根式。最简二次根式满足两个条件：被开方数中不含能开得尽方的因数或因式，且分母中不含根号。例如，计算得到 √20 时化简为 2√5；计算 √18 则化为 3√2。本计算器内置质因数提取算法，能自动输出最简根式形式和小数逼近值。'
        },
        {
          q: '常见的勾股数有哪些？有什么记忆口诀？',
          a: '满足 a² + b² = c² 的正整数组合称为勾股数。常见基础勾股数组有：(3, 4, 5)、(5, 12, 13)、(7, 24, 25)、(8, 15, 17)、(9, 40, 41)、(11, 60, 61)、(12, 35, 37)、(20, 21, 29) 等。口诀简记如：“勾三股四弦五”、“五十二配十三”、“七二十四二十五”、“八十五十七”。'
        },
        {
          q: '勾股定理只能用于直角三角形吗？',
          a: '是的，勾股定理仅适用于有一个角为 90° 的直角三角形。对于一般的锐角三角形或钝角三角形，需要使用推广形式——余弦定理：c² = a² + b² - 2ab·cos(C)。当 ∠C = 90° 时，cos(90°) = 0，余弦定理即蜕化为勾股定理 a² + b² = c²。'
        },
        {
          q: '什么是本原勾股数（Primitive Pythagorean Triples）？',
          a: '若一组勾股数 (a, b, c) 的最大公约数为 1（即三数两两互质），则称之为本原勾股数，例如 (3, 4, 5) 和 (5, 12, 13)。而 (6, 8, 10) 因有公约数 2，属于非本原（派生）勾股数。通过欧几里得参数公式，可以无遗漏地生成所有本原勾股数。'
        },
        {
          q: '在日常工程或生活中，勾股定理有哪些实用场景？',
          a: '1. 建筑施工放线（3-4-5法则找直角）；2. 电视、显示器或手机屏幕尺寸测量（按对角线计算宽高）；3. 梯子安全摆放计算（梯长与离墙安全距离）；4. 地图与 GPS 欧氏直线距离测算；5. 航海与无人机高空视距定位。'
        }
      ]
    },
    footer: {
      col1Title: '直角三角形求边长',
      col2Title: '几何特征量公式',
      col3Title: '最简二次根式原则',
      col3Desc: '被开方数中不含任何完全平方因数，分母不含根号。自动因数分解化简如 √20 = 2√5。',
      col4Title: '关于本站',
      col4Desc: '专为中小学学生、几何爱好者、建筑工程师打造的高精度直角三角形在线解算工具。',
      copyright: '© 2026 勾股定理计算器 · 在线直角三角形求斜边与最简二次根式',
      seoTag: '遵照 Google SEO 规范与 Schema.org 结构化标记',
      designTag: '纯白极简风格设计'
    }
  }
,
  es: (null as any),
  fr: (null as any),
  pt: (null as any)
};

(translations as any).es = translations.en;
(translations as any).fr = translations.en;
(translations as any).pt = translations.en;

export interface BrowserDetectionResult {
  detected: SupportedLang;
  rawLocale: string;
  source: 'browser' | 'default';
}

export function getBrowserLanguageInfo(): BrowserDetectionResult {
  if (typeof window === 'undefined') {
    return { detected: 'en', rawLocale: 'en', source: 'default' };
  }
  const rawList: string[] = [];
  if (Array.isArray(navigator.languages) && navigator.languages.length > 0) {
    rawList.push(...navigator.languages);
  }
  if (navigator.language) {
    rawList.push(navigator.language);
  }
  const primaryRaw = rawList[0] || 'en';
  for (const raw of rawList) {
    const l = raw.toLowerCase().trim();
    if (l.startsWith('zh')) return { detected: 'zh', rawLocale: primaryRaw, source: 'browser' };
    if (l.startsWith('es')) return { detected: 'es', rawLocale: primaryRaw, source: 'browser' };
    if (l.startsWith('fr')) return { detected: 'fr', rawLocale: primaryRaw, source: 'browser' };
    if (l.startsWith('pt')) return { detected: 'pt', rawLocale: primaryRaw, source: 'browser' };
    if (l.startsWith('en')) return { detected: 'en', rawLocale: primaryRaw, source: 'browser' };
  }
  return { detected: 'en', rawLocale: primaryRaw, source: 'default' };
}

export function resolveInitialLanguage(): {
  lang: SupportedLang;
  isAuto: boolean;
  detectedLang: SupportedLang;
  rawLocale: string;
} {
  const browserInfo = getBrowserLanguageInfo();
  if (typeof window === 'undefined') {
    return { lang: 'en', isAuto: true, detectedLang: 'en', rawLocale: 'en' };
  }
  try {
    localStorage.removeItem('pythagorean_lang');
    localStorage.removeItem('pythagorean_pref_lang');
    localStorage.removeItem('pythagorean_manual_lang');
  } catch {}

  try {
    const params = new URLSearchParams(window.location.search);
    const pLang = params.get('lang') as SupportedLang;
    if (pLang && ['en', 'es', 'fr', 'pt', 'zh'].includes(pLang)) {
      return { lang: pLang, isAuto: false, detectedLang: browserInfo.detected, rawLocale: browserInfo.rawLocale };
    }
  } catch {}

  try {
    const manual = localStorage.getItem('pythagorean_user_chosen_lang_v3') as SupportedLang;
    if (manual && ['en', 'es', 'fr', 'pt', 'zh'].includes(manual)) {
      return { lang: manual, isAuto: false, detectedLang: browserInfo.detected, rawLocale: browserInfo.rawLocale };
    }
  } catch {}

  // Strict default is English ('en') for Google SEO & global accessibility
  return { lang: 'en', isAuto: true, detectedLang: browserInfo.detected, rawLocale: browserInfo.rawLocale };
}
