/**
 * Pythagorean Theorem Math Engine
 * Supports exact radical simplification, fraction handling, step-by-step derivation,
 * geometric properties (angles, area, height, inradius, circumradius), and triples.
 * Fully bilingual (en / zh).
 */

import { Language } from '../i18n/translations';

export interface RadicalResult {
  exactString: string; // e.g. "2√5", "5", "√3", "13/2", "3√2/2"
  radicandRaw: number; // e.g. 20
  radicandDisplay: string; // e.g. "20" or "169/4"
  outsideFactor: number; // A in (A√M)/B
  insideRadical: number; // M in (A√M)/B
  denominator: number; // B in (A√M)/B
  isInteger: boolean;
  isFraction: boolean;
  factorizationSteps: string[];
  decimalValue: number;
}

export interface SolveResult {
  target: 'c' | 'a' | 'b';
  a: number;
  b: number;
  c: number;
  unit: string;
  radical: RadicalResult;
  // Angles in degrees and radians
  angleAlphaDeg: number; // Angle opposite to side a (degrees)
  angleBetaDeg: number; // Angle opposite to side b (degrees)
  angleAlphaRad: number;
  angleBetaRad: number;
  // Geometric metrics
  area: number; // Area S = 0.5 * a * b
  perimeter: number; // Perimeter P = a + b + c
  heightC: number; // Altitude on hypotenuse hc = (a * b) / c
  inradius: number; // Inradius r = (a + b - c) / 2
  circumradius: number; // Circumradius R = c / 2
  // Steps for rich pedagogical display
  steps: {
    formula: string;
    substitution: string;
    squareCalculation: string;
    radicalExpression: string;
    factorizationNote?: string;
    finalExact: string;
    finalDecimal: string;
  };
  isPythagoreanTriple: boolean;
}

// Greatest Common Divisor
export function gcd(x: number, y: number): number {
  let a = Math.round(Math.abs(x));
  let b = Math.round(Math.abs(y));
  while (b > 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a || 1;
}

// Convert number to plain decimal string, preventing scientific notation leak e.g. 1e-8 -> 0.00000001
export function toPlainDecimal(val: number): string {
  if (!Number.isFinite(val)) return '0';
  // Normalize IEEE-754 precision noise e.g. 0.000004999999999999999 -> 0.000005
  const cleanVal = Number(val.toPrecision(12));
  const str = cleanVal.toString();
  if (!str.includes('e') && !str.includes('E')) return str;
  const [base, expStr] = str.toLowerCase().split('e');
  const exp = parseInt(expStr, 10);
  if (exp < 0) {
    const parts = base.split('.');
    const intPart = parts[0].replace('-', '');
    const fracPart = parts[1] || '';
    const isNeg = base.startsWith('-');
    const zeros = '0'.repeat(Math.abs(exp) - 1);
    return `${isNeg ? '-' : ''}0.${zeros}${intPart}${fracPart}`;
  } else {
    const parts = base.split('.');
    const intPart = parts[0];
    const fracPart = parts[1] || '';
    if (exp >= fracPart.length) {
      return intPart + fracPart + '0'.repeat(exp - fracPart.length);
    } else {
      return `${intPart}${fractionalPartSlice(fracPart, exp)}`;
    }
  }
}

function fractionalPartSlice(frac: string, exp: number): string {
  return `${frac.slice(0, exp)}.${frac.slice(exp)}`;
}

// Convert a decimal number to an exact fraction { num, den }
export function toFraction(val: number, maxDenominator = 1000000000000): { num: number; den: number } {
  if (val === 0) return { num: 0, den: 1 };
  if (Number.isInteger(val)) {
    return { num: val, den: 1 };
  }
  const plainStr = toPlainDecimal(val);
  if (plainStr.includes('.')) {
    const decimals = plainStr.split('.')[1].length;
    if (decimals <= 10) {
      const den = Math.round(Math.pow(10, decimals));
      const num = Math.round(val * den);
      if (den <= maxDenominator && num > 0) {
        const div = gcd(num, den);
        return { num: Math.round(num / div), den: Math.round(den / div) };
      }
    }
  }

  // Continued fraction approximation for floats
  let p0 = 0, q0 = 1, p1 = 1, q1 = 0;
  let n = val;
  for (let i = 0; i < 30; i++) {
    const a = Math.floor(n);
    const p2 = a * p1 + p0;
    const q2 = a * q1 + q0;
    if (q2 > maxDenominator) break;
    p0 = p1; q0 = q1;
    p1 = p2; q1 = q2;
    const diff = n - a;
    if (Math.abs(diff) < 1e-12) break;
    n = 1 / diff;
  }
  if (q1 === 0) return { num: Math.round(val), den: 1 };
  return { num: p1, den: q1 };
}

// Factorize integer into max square factor k^2 and square-free remainder m
export function factorSquare(n: number): { squareRoot: number; remainder: number; squareFactor: number } {
  let num = Math.round(Math.abs(n));
  if (num <= 1) return { squareRoot: num, remainder: 1, squareFactor: num };

  let squareRoot = 1;

  // Factor 2
  while (num % 4 === 0) {
    squareRoot *= 2;
    num /= 4;
  }

  // Factor odd integers
  for (let i = 3; i * i <= num; i += 2) {
    const i2 = i * i;
    while (num % i2 === 0) {
      squareRoot *= i;
      num /= i2;
    }
  }

  return {
    squareRoot,
    remainder: num,
    squareFactor: squareRoot * squareRoot
  };
}

// Simplify square root of a positive real number (e.g. 20 -> 2√5, 18 -> 3√2, 6.25 -> 5/2)
export function simplifyRadical(radicand: number, lang: Language = 'en'): RadicalResult {
  if (radicand === 0) {
    return {
      exactString: '0',
      radicandRaw: 0,
      radicandDisplay: '0',
      outsideFactor: 0,
      insideRadical: 1,
      denominator: 1,
      isInteger: true,
      isFraction: false,
      factorizationSteps: [lang === 'zh' ? '√0 = 0' : '√0 = 0'],
      decimalValue: 0
    };
  }
  const decimalVal = Math.sqrt(radicand);
  const steps: string[] = [];

  const { num, den } = toFraction(radicand);

  // If radicand is pure integer
  if (den === 1) {
    const { squareRoot, remainder, squareFactor } = factorSquare(num);

    if (remainder === 1) {
      // Perfect square integer
      steps.push(
        lang === 'zh'
          ? `√${num} 为完全平方数，直接开方得 ${squareRoot}`
          : `√${num} is a perfect square; square root evaluates to integer ${squareRoot}`
      );
      return {
        exactString: `${squareRoot}`,
        radicandRaw: radicand,
        radicandDisplay: `${num}`,
        outsideFactor: squareRoot,
        insideRadical: 1,
        denominator: 1,
        isInteger: true,
        isFraction: false,
        factorizationSteps: steps,
        decimalValue: decimalVal
      };
    }

    if (squareRoot === 1) {
      // Already square-free prime or product of distinct primes
      steps.push(
        lang === 'zh'
          ? `被开方数 ${num} 无大于1的平方因子，已是最简二次根式`
          : `Radicand ${num} has no square factor greater than 1; already in simplest radical form`
      );
      return {
        exactString: `√${remainder}`,
        radicandRaw: radicand,
        radicandDisplay: `${num}`,
        outsideFactor: 1,
        insideRadical: remainder,
        denominator: 1,
        isInteger: false,
        isFraction: false,
        factorizationSteps: steps,
        decimalValue: decimalVal
      };
    }

    // Can factor out squareRoot
    steps.push(
      lang === 'zh'
        ? `将被开方数因数分解: ${num} = ${squareFactor} × ${remainder} = ${squareRoot}² × ${remainder}`
        : `Prime factorize radicand: ${num} = ${squareFactor} × ${remainder} = ${squareRoot}² × ${remainder}`
    );
    steps.push(
      lang === 'zh'
        ? `提取平方因子: √${num} = √(${squareRoot}² × ${remainder}) = ${squareRoot}√${remainder}`
        : `Extract perfect square factor: √${num} = √(${squareRoot}² × ${remainder}) = ${squareRoot}√${remainder}`
    );

    return {
      exactString: `${squareRoot}√${remainder}`,
      radicandRaw: radicand,
      radicandDisplay: `${num}`,
      outsideFactor: squareRoot,
      insideRadical: remainder,
      denominator: 1,
      isInteger: false,
      isFraction: false,
      factorizationSteps: steps,
      decimalValue: decimalVal
    };
  }

  // Fraction case: √(num / den)
  // Multiply num & den by den to rationalize: √(num * den) / den
  const product = num * den;
  const { squareRoot, remainder, squareFactor } = factorSquare(product);

  const g = gcd(squareRoot, den);
  const finalOutside = squareRoot / g;
  const finalDen = den / g;

  steps.push(
    lang === 'zh'
      ? `转为分式形式: √(${num}/${den})`
      : `Convert to fractional radicand: √(${num}/${den})`
  );

  if (remainder === 1) {
    if (finalDen === 1) {
      steps.push(
        lang === 'zh'
          ? `分子分母开方整除，结果为整数 ${finalOutside}`
          : `Radicand resolves directly to integer ${finalOutside}`
      );
      return {
        exactString: `${finalOutside}`,
        radicandRaw: radicand,
        radicandDisplay: `${num}/${den}`,
        outsideFactor: finalOutside,
        insideRadical: 1,
        denominator: 1,
        isInteger: true,
        isFraction: false,
        factorizationSteps: steps,
        decimalValue: decimalVal
      };
    } else {
      steps.push(
        lang === 'zh'
          ? `开方后得到有理分式: ${finalOutside}/${finalDen}`
          : `Radicand resolves to rational fraction: ${finalOutside}/${finalDen}`
      );
      return {
        exactString: `${finalOutside}/${finalDen}`,
        radicandRaw: radicand,
        radicandDisplay: `${num}/${den}`,
        outsideFactor: finalOutside,
        insideRadical: 1,
        denominator: finalDen,
        isInteger: false,
        isFraction: true,
        factorizationSteps: steps,
        decimalValue: decimalVal
      };
    }
  }

  // Has radical remaining
  let exactStr = '';
  if (finalOutside === 1 && finalDen === 1) {
    exactStr = `√${remainder}`;
  } else if (finalDen === 1) {
    exactStr = `${finalOutside}√${remainder}`;
  } else if (finalOutside === 1) {
    exactStr = `√${remainder}/${finalDen}`;
  } else {
    exactStr = `(${finalOutside}√${remainder})/${finalDen}`;
  }

  steps.push(
    lang === 'zh'
      ? `分母有理化: √(${num}/${den}) = √(${num} × ${den}) / ${den} = √${product} / ${den}`
      : `Rationalize denominator: √(${num}/${den}) = √(${num} × ${den}) / ${den} = √${product} / ${den}`
  );
  if (squareFactor > 1) {
    steps.push(
      lang === 'zh'
        ? `因数分解提取平方数: ${product} = ${squareFactor} × ${remainder} = ${squareRoot}² × ${remainder}`
        : `Factorize numerator: ${product} = ${squareFactor} × ${remainder} = ${squareRoot}² × ${remainder}`
    );
  }
  steps.push(
    lang === 'zh'
      ? `化简得到最简二次根式: ${exactStr}`
      : `Simplest exact radical result: ${exactStr}`
  );

  return {
    exactString: exactStr,
    radicandRaw: radicand,
    radicandDisplay: `${num}/${den}`,
    outsideFactor: finalOutside,
    insideRadical: remainder,
    denominator: finalDen,
    isInteger: false,
    isFraction: true,
    factorizationSteps: steps,
    decimalValue: decimalVal
  };
}

// Solve right triangle
export function solvePythagorean(
  target: 'c' | 'a' | 'b',
  val1: number,
  val2: number,
  unit = '',
  lang: Language = 'en'
): { error?: string; result?: SolveResult } {
  if (isNaN(val1) || isNaN(val2) || val1 <= 0 || val2 <= 0) {
    return {
      error:
        lang === 'zh'
          ? '请输入大于 0 的有效边长数值。'
          : 'Please enter valid side length numbers strictly greater than 0.'
    };
  }

  let a = 0;
  let b = 0;
  let c = 0;
  let radicand = 0;
  let formulaStr = '';
  let subStr = '';
  let sqStr = '';
  let radStr = '';

  if (target === 'c') {
    // val1 = a, val2 = b
    a = val1;
    b = val2;
    radicand = a * a + b * b;
    c = Math.sqrt(radicand);

    formulaStr = 'c = √(a² + b²)';
    subStr = `c = √(${a}² + ${b}²)`;
    sqStr = `c = √(${roundDisplay(a * a)} + ${roundDisplay(b * b)}) = √${roundDisplay(radicand)}`;
    radStr = `√${roundDisplay(radicand)}`;
  } else if (target === 'a') {
    // val1 = c (hypotenuse), val2 = b (leg)
    c = val1;
    b = val2;
    if (c <= b) {
      return {
        error:
          lang === 'zh'
            ? `斜边 c (${c}) 必须严格大于直角边 b (${b})。在直角三角形中斜边永远是最长边！`
            : `Hypotenuse c (${c}) must be strictly greater than leg b (${b}). In a right triangle, hypotenuse is always the longest side!`
      };
    }
    radicand = c * c - b * b;
    a = Math.sqrt(radicand);

    formulaStr = 'a = √(c² - b²)';
    subStr = `a = √(${c}² - ${b}²)`;
    sqStr = `a = √(${roundDisplay(c * c)} - ${roundDisplay(b * b)}) = √${roundDisplay(radicand)}`;
    radStr = `√${roundDisplay(radicand)}`;
  } else {
    // target === 'b'
    // val1 = c (hypotenuse), val2 = a (leg)
    c = val1;
    a = val2;
    if (c <= a) {
      return {
        error:
          lang === 'zh'
            ? `斜边 c (${c}) 必须严格大于直角边 a (${a})。在直角三角形中斜边永远是最长边！`
            : `Hypotenuse c (${c}) must be strictly greater than leg a (${a}). In a right triangle, hypotenuse is always the longest side!`
      };
    }
    radicand = c * c - a * a;
    b = Math.sqrt(radicand);

    formulaStr = 'b = √(c² - a²)';
    subStr = `b = √(${c}² - ${a}²)`;
    sqStr = `b = √(${roundDisplay(c * c)} - ${roundDisplay(a * a)}) = √${roundDisplay(radicand)}`;
    radStr = `√${roundDisplay(radicand)}`;
  }

  const radical = simplifyRadical(radicand, lang);

  // Geometric calculations
  const angleAlphaRad = Math.asin(a / c);
  const angleAlphaDeg = (angleAlphaRad * 180) / Math.PI;
  const angleBetaRad = Math.asin(b / c);
  const angleBetaDeg = (angleBetaRad * 180) / Math.PI;

  const area = 0.5 * a * b;
  const perimeter = a + b + c;
  const heightC = (a * b) / c;
  const inradius = (a + b - c) / 2;
  const circumradius = c / 2;

  const isIntegerSides = Number.isInteger(a) && Number.isInteger(b) && Number.isInteger(c);
  const isPythagoreanTriple = isIntegerSides && Math.round(a * a + b * b) === Math.round(c * c);

  return {
    result: {
      target,
      a,
      b,
      c,
      unit,
      radical,
      angleAlphaDeg,
      angleBetaDeg,
      angleAlphaRad,
      angleBetaRad,
      area,
      perimeter,
      heightC,
      inradius,
      circumradius,
      steps: {
        formula: formulaStr,
        substitution: subStr,
        squareCalculation: sqStr,
        radicalExpression: radStr,
        factorizationNote: radical.factorizationSteps.join(' → '),
        finalExact: radical.exactString + (unit ? ` ${unit}` : ''),
        finalDecimal: decimalValFormat(radical.decimalValue) + (unit ? ` ${unit}` : '')
      },
      isPythagoreanTriple
    }
  };
}

export function roundDisplay(n: number, decimals = 4): string {
  if (n === 0) return '0';
  if (Number.isInteger(n)) return n.toString();

  const absN = Math.abs(n);
  // If the number is smaller than 10^(-decimals), rounding to `decimals` would turn it into "0".
  // Prevent false "0" display and prevent scientific notation leak like 1e-8:
  if (absN < Math.pow(10, -decimals)) {
    const plain = toPlainDecimal(n);
    if (plain.includes('.')) {
      const parts = plain.split('.');
      const frac = parts[1].replace(/0+$/, '');
      if (!frac) return parts[0];
      return `${parts[0]}.${frac.slice(0, 10)}`;
    }
    return plain;
  }

  const fixed = Number(n.toFixed(decimals)).toString();
  if (fixed === '0' && n !== 0) {
    const plain = toPlainDecimal(n);
    if (plain.includes('.')) {
      const parts = plain.split('.');
      const frac = parts[1].replace(/0+$/, '');
      return frac ? `${parts[0]}.${frac.slice(0, 10)}` : parts[0];
    }
    return plain;
  }
  return fixed;
}

export function decimalValFormat(n: number, precision = 4): string {
  if (n === 0) return '0';
  if (Number.isInteger(n)) return n.toString();

  const absN = Math.abs(n);
  if (absN < Math.pow(10, -precision)) {
    const plain = toPlainDecimal(n);
    if (plain.includes('.')) {
      const parts = plain.split('.');
      const frac = parts[1].replace(/0+$/, '');
      if (!frac) return parts[0];
      return `${parts[0]}.${frac.slice(0, 10)}`;
    }
    return plain;
  }

  const fixed = Number(n.toFixed(precision)).toString();
  if (fixed === '0' && n !== 0) {
    const plain = toPlainDecimal(n);
    if (plain.includes('.')) {
      const parts = plain.split('.');
      const frac = parts[1].replace(/0+$/, '');
      return frac ? `${parts[0]}.${frac.slice(0, 10)}` : parts[0];
    }
    return plain;
  }
  return fixed;
}

// Pythagorean Triples Database & Utilities
export interface PythagoreanTriple {
  a: number;
  b: number;
  c: number;
  isPrimitive: boolean; // gcd(a, b, c) === 1
  m?: number;
  n?: number;
}

// Well-known primitive triples list for SEO quick table
export const COMMON_TRIPLES: PythagoreanTriple[] = [
  { a: 3, b: 4, c: 5, isPrimitive: true, m: 2, n: 1 },
  { a: 5, b: 12, c: 13, isPrimitive: true, m: 3, n: 2 },
  { a: 7, b: 24, c: 25, isPrimitive: true, m: 4, n: 3 },
  { a: 8, b: 15, c: 17, isPrimitive: true, m: 4, n: 1 },
  { a: 9, b: 40, c: 41, isPrimitive: true, m: 5, n: 4 },
  { a: 11, b: 60, c: 61, isPrimitive: true, m: 6, n: 5 },
  { a: 12, b: 35, c: 37, isPrimitive: true, m: 6, n: 1 },
  { a: 13, b: 84, c: 85, isPrimitive: true, m: 7, n: 6 },
  { a: 16, b: 63, c: 65, isPrimitive: true, m: 8, n: 1 },
  { a: 20, b: 21, c: 29, isPrimitive: true, m: 5, n: 2 },
  { a: 28, b: 45, c: 53, isPrimitive: true, m: 7, n: 2 },
  { a: 33, b: 56, c: 65, isPrimitive: true, m: 7, n: 4 },
  { a: 36, b: 77, c: 85, isPrimitive: true, m: 9, n: 2 },
  { a: 39, b: 80, c: 89, isPrimitive: true, m: 8, n: 5 },
  { a: 48, b: 55, c: 73, isPrimitive: true, m: 8, n: 3 },
  { a: 65, b: 72, c: 97, isPrimitive: true, m: 9, n: 4 },
  // Popular multiple triples
  { a: 6, b: 8, c: 10, isPrimitive: false },
  { a: 9, b: 12, c: 15, isPrimitive: false },
  { a: 10, b: 24, c: 26, isPrimitive: false },
  { a: 15, b: 20, c: 25, isPrimitive: false },
  { a: 15, b: 36, c: 39, isPrimitive: false },
  { a: 30, b: 40, c: 50, isPrimitive: false },
];

// Generate triple from Euclid's formula: m > n > 0
export function generateEuclidTriple(
  m: number,
  n: number,
  lang: Language = 'en'
): {
  triple?: PythagoreanTriple;
  error?: string;
  diff?: number;
  prod?: number;
  hyp?: number;
} {
  if (isNaN(m) || isNaN(n)) {
    return {
      error:
        lang === 'zh'
          ? '请输入有效的参数数值。'
          : 'Please enter valid numerical parameters.'
    };
  }
  if (!Number.isInteger(m) || !Number.isInteger(n)) {
    return {
      error:
        lang === 'zh'
          ? '参数 m 和 n 必须全部为正整数（不能为小数）。'
          : 'Parameters m and n must both be positive integers (no decimals).'
    };
  }
  if (m <= 0 || n <= 0) {
    return {
      error:
        lang === 'zh'
          ? '参数 m 和 n 必须严格大于 0（正整数）。'
          : 'Parameters m and n must be strictly positive integers (> 0).'
    };
  }
  if (m <= n) {
    return {
      error:
        lang === 'zh'
          ? `参数 m (${m}) 必须严格大于参数 n (${n})。`
          : `Parameter m (${m}) must be strictly greater than parameter n (${n}).`
    };
  }
  const diff = m * m - n * n;
  const prod = 2 * m * n;
  const c = m * m + n * n;
  const isPrimitive = gcd(gcd(diff, prod), c) === 1;

  return {
    diff,
    prod,
    hyp: c,
    triple: {
      a: Math.min(diff, prod),
      b: Math.max(diff, prod),
      c,
      isPrimitive,
      m,
      n
    }
  };
}

// Validate if 3 numbers form a Pythagorean Triple
export function validateTriple(
  x: number,
  y: number,
  z: number,
  lang: Language = 'en'
): {
  isValid: boolean;
  isPrimitive: boolean;
  sorted: [number, number, number];
  message: string;
} {
  if (
    isNaN(x) || isNaN(y) || isNaN(z) ||
    !Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(z) ||
    x <= 0 || y <= 0 || z <= 0 ||
    !Number.isInteger(x) || !Number.isInteger(y) || !Number.isInteger(z)
  ) {
    return {
      isValid: false,
      isPrimitive: false,
      sorted: [x, y, z],
      message:
        lang === 'zh'
          ? '勾股数必须全部为正整数（不能包含小数、负数或零）。'
          : 'Pythagorean triple elements must all be positive integers (no decimals, negatives, or zero).'
    };
  }
  const arr = [x, y, z].sort((a, b) => a - b) as [number, number, number];
  const [a, b, c] = arr;
  const isValid = a * a + b * b === c * c;
  const isPrimitive = isValid && gcd(gcd(a, b), c) === 1;

  let message = '';
  if (isValid) {
    if (isPrimitive) {
      message =
        lang === 'zh'
          ? `(${a}, ${b}, ${c}) 是标准的【本原勾股数】！满足 ${a}² + ${b}² = ${c}² 且三数互质。`
          : `(${a}, ${b}, ${c}) is a valid Primitive Pythagorean Triple! Satisfies ${a}² + ${b}² = ${c}² and is coprime.`;
    } else {
      const g = gcd(gcd(a, b), c);
      message =
        lang === 'zh'
          ? `(${a}, ${b}, ${c}) 是勾股数（派生组），拥有最大公约数 ${g}，其基底本原勾股数为 (${a / g}, ${b / g}, ${c / g})。`
          : `(${a}, ${b}, ${c}) is a derived Pythagorean Triple with greatest common divisor ${g}. Its primitive base is (${a / g}, ${b / g}, ${c / g}).`;
    }
  } else {
    message =
      lang === 'zh'
        ? `(${a}, ${b}, ${c}) 不是勾股数。因为 ${a}² + ${b}² = ${a * a + b * b}，而 ${c}² = ${c * c}，两者不相等。`
        : `(${a}, ${b}, ${c}) is not a Pythagorean Triple. Because ${a}² + ${b}² = ${a * a + b * b}, while ${c}² = ${c * c}, which are not equal.`;
  }

  return {
    isValid,
    isPrimitive,
    sorted: arr,
    message
  };
}
