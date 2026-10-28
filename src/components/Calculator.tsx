import React, { useState, useEffect } from 'react';
import { RotateCcw, HelpCircle, History, Trash2, ArrowRight } from 'lucide-react';
import { solvePythagorean, SolveResult } from '../utils/pythagorean';
import { ResultDisplay } from './ResultDisplay';
import { TriangleVisualizer } from './TriangleVisualizer';
import { Language, translations } from '../i18n/translations';

interface Props {
  lang: Language;
  onCalculationChange?: (result: SolveResult | null) => void;
  presetInjection?: { target: 'c' | 'a' | 'b'; val1: number; val2: number; timestamp: number } | null;
}

interface HistoryItem {
  id: string;
  time: string;
  target: 'c' | 'a' | 'b';
  val1: number;
  val2: number;
  unit: string;
  resultStr: string;
}

export const Calculator: React.FC<Props> = ({ lang, onCalculationChange, presetInjection }) => {
  const [target, setTarget] = useState<'c' | 'a' | 'b'>('c');
  const [val1, setVal1] = useState<string>('3');
  const [val2, setVal2] = useState<string>('4');
  const [unit, setUnit] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('pythagorean_unit');
      if (saved !== null) return saved;
    } catch {
      // ignore
    }
    return 'cm';
  });
  const [precision, setPrecision] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('pythagorean_precision');
      if (saved) {
        const p = parseInt(saved, 10);
        if ([2, 4, 6, 8].includes(p)) return p;
      }
    } catch {
      // ignore
    }
    return 4;
  });
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('pythagorean_history');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore
    }
    return [];
  });
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);

  const t = translations[lang].calc;
  const lastAddedKeyRef = React.useRef<string>('c:3:4:5:cm');

  // React to external preset injections (e.g. from Triples table or Special Triangles)
  useEffect(() => {
    if (presetInjection) {
      setTarget(presetInjection.target);
      setVal1(presetInjection.val1.toString());
      setVal2(presetInjection.val2.toString());
      lastAddedKeyRef.current = '';
    }
  }, [presetInjection]);

  // Label configuration based on target
  const getLabels = () => {
    switch (target) {
      case 'c':
        return {
          title1: t.legA,
          title2: t.legB,
          hint1: t.hintLeg1,
          hint2: t.hintLeg2,
          formula: t.targetCFormula
        };
      case 'a':
        return {
          title1: t.hypotenuseLongest,
          title2: t.legB,
          hint1: t.hintHypotenuse,
          hint2: t.hintLeg2,
          formula: t.targetAFormula
        };
      case 'b':
        return {
          title1: t.hypotenuseLongest,
          title2: t.legA,
          hint1: t.hintHypotenuse,
          hint2: t.hintLeg1,
          formula: t.targetBFormula
        };
    }
  };

  const labels = getLabels();

  // Run calculation
  const num1 = parseFloat(val1);
  const num2 = parseFloat(val2);
  const calculation = solvePythagorean(target, num1, num2, unit, lang);

  // Sync with parent if needed
  useEffect(() => {
    if (onCalculationChange) {
      onCalculationChange(calculation.result || null);
    }
  }, [calculation.result]);

  // Add calculation to history with persistence
  const addToHistory = (result: SolveResult) => {
    const { target: resTarget, a, b, c, unit: resUnit, radical } = result;
    const unitStr = resUnit ? ` ${resUnit}` : '';
    let resultStr = '';
    let v1 = 0;
    let v2 = 0;

    if (resTarget === 'c') {
      v1 = a;
      v2 = b;
      resultStr = `a = ${a}, b = ${b} → c = ${radical.exactString}${unitStr}`;
    } else if (resTarget === 'a') {
      v1 = c;
      v2 = b;
      resultStr = `c = ${c}, b = ${b} → a = ${radical.exactString}${unitStr}`;
    } else {
      v1 = c;
      v2 = a;
      resultStr = `c = ${c}, a = ${a} → b = ${radical.exactString}${unitStr}`;
    }

    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

    setHistory((prev) => {
      // Prevent consecutive duplicate calculation
      if (prev.length > 0) {
        const first = prev[0];
        if (
          first.target === resTarget &&
          first.val1 === v1 &&
          first.val2 === v2 &&
          first.unit === (resUnit || '')
        ) {
          return prev;
        }
      }

      const newItem: HistoryItem = {
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        time: timeStr,
        target: resTarget,
        val1: v1,
        val2: v2,
        unit: resUnit || '',
        resultStr
      };

      const filtered = prev.filter(
        (item) =>
          !(
            item.target === resTarget &&
            item.val1 === v1 &&
            item.val2 === v2 &&
            item.unit === (resUnit || '')
          )
      );
      const updated = [newItem, ...filtered].slice(0, 10);
      try {
        localStorage.setItem('pythagorean_history', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  // Automatically record calculations to history after user finishes typing
  useEffect(() => {
    if (!calculation.result) return;
    const res = calculation.result;
    const currentKey = `${res.target}:${res.a}:${res.b}:${res.c}:${res.unit}`;

    if (lastAddedKeyRef.current === currentKey) return;

    const timer = setTimeout(() => {
      lastAddedKeyRef.current = currentKey;
      addToHistory(res);
    }, 500);

    return () => clearTimeout(timer);
  }, [calculation.result, unit]);

  const handleInputBlur = () => {
    if (calculation.result) {
      const res = calculation.result;
      const currentKey = `${res.target}:${res.a}:${res.b}:${res.c}:${res.unit}`;
      if (lastAddedKeyRef.current !== currentKey) {
        lastAddedKeyRef.current = currentKey;
        addToHistory(res);
      }
    }
  };

  const handleUnitChange = (newUnit: string) => {
    setUnit(newUnit);
    try {
      localStorage.setItem('pythagorean_unit', newUnit);
    } catch {
      // ignore
    }
  };

  const handlePrecisionChange = (newPrecision: number) => {
    setPrecision(newPrecision);
    try {
      localStorage.setItem('pythagorean_precision', newPrecision.toString());
    } catch {
      // ignore
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem('pythagorean_history');
    } catch {
      // ignore
    }
  };

  const handleRemoveHistoryItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setHistory((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      try {
        localStorage.setItem('pythagorean_history', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  // Quick preset loader
  const applyPreset = (newTarget: 'c' | 'a' | 'b', v1: number, v2: number) => {
    setTarget(newTarget);
    setVal1(v1.toString());
    setVal2(v2.toString());
    lastAddedKeyRef.current = '';
  };

  // Reset inputs
  const handleReset = () => {
    setVal1('3');
    setVal2('4');
    setTarget('c');
    lastAddedKeyRef.current = 'c:3:4:5:cm';
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
      {/* Target Selector Tabs */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            {t.step1}
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowHistoryModal(!showHistoryModal)}
              className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-blue-600 font-medium cursor-pointer transition-colors"
            >
              <History className="w-3.5 h-3.5" />
              {t.history} ({history.length})
            </button>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              {t.reset}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200">
          <button
            type="button"
            onClick={() => setTarget('c')}
            className={`py-3 px-4 rounded-xl text-sm font-semibold transition-all cursor-pointer flex flex-col items-center gap-0.5 ${
              target === 'c'
                ? 'bg-white text-blue-700 shadow-sm border border-slate-200/80 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <span>{t.targetC}</span>
            <span className="text-[11px] font-normal text-slate-500 font-mono">c = √(a² + b²)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setTarget('a');
              if (num1 <= num2) {
                setVal1('5');
                setVal2('4');
              }
            }}
            className={`py-3 px-4 rounded-xl text-sm font-semibold transition-all cursor-pointer flex flex-col items-center gap-0.5 ${
              target === 'a'
                ? 'bg-white text-blue-700 shadow-sm border border-slate-200/80 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <span>{t.targetA}</span>
            <span className="text-[11px] font-normal text-slate-500 font-mono">a = √(c² - b²)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setTarget('b');
              if (num1 <= num2) {
                setVal1('5');
                setVal2('3');
              }
            }}
            className={`py-3 px-4 rounded-xl text-sm font-semibold transition-all cursor-pointer flex flex-col items-center gap-0.5 ${
              target === 'b'
                ? 'bg-white text-blue-700 shadow-sm border border-slate-200/80 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <span>{t.targetB}</span>
            <span className="text-[11px] font-normal text-slate-500 font-mono">b = √(c² - a²)</span>
          </button>
        </div>
      </div>

      {/* Input Fields & Global Unit/Precision Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
        {/* Input 1 */}
        <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200">
          <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
            {labels.title1}
          </label>
          <div className="relative">
            <input
              type="number"
              step="any"
              min="0.0001"
              value={val1}
              onChange={(e) => setVal1(e.target.value)}
              onBlur={handleInputBlur}
              placeholder={t.inputPlaceholder}
              className="w-full bg-white px-4 py-3 text-lg font-mono font-bold text-slate-900 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-2xs"
            />
            {unit && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400 pointer-events-none">
                {unit}
              </span>
            )}
          </div>
          <span className="text-[11px] text-slate-500 mt-1.5 block">
            {labels.hint1}
          </span>
        </div>

        {/* Input 2 */}
        <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200">
          <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
            {labels.title2}
          </label>
          <div className="relative">
            <input
              type="number"
              step="any"
              min="0.0001"
              value={val2}
              onChange={(e) => setVal2(e.target.value)}
              onBlur={handleInputBlur}
              placeholder={t.inputPlaceholder}
              className="w-full bg-white px-4 py-3 text-lg font-mono font-bold text-slate-900 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-2xs"
            />
            {unit && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400 pointer-events-none">
                {unit}
              </span>
            )}
          </div>
          <span className="text-[11px] text-slate-500 mt-1.5 block">
            {labels.hint2}
          </span>
        </div>
      </div>

      {/* Control Strip: Unit Selector, Precision Selector, Presets */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-6 text-xs text-slate-700">
        <div className="flex flex-wrap items-center gap-4">
          {/* Unit selection */}
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-600">{t.unitLabel}</span>
            <select
              value={unit}
              onChange={(e) => handleUnitChange(e.target.value)}
              aria-label={t.unitLabel}
              className="bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-2xs"
            >
              <option value="cm">{t.units.cm}</option>
              <option value="m">{t.units.m}</option>
              <option value="mm">{t.units.mm}</option>
              <option value="in">{t.units.in}</option>
              <option value="ft">{t.units.ft}</option>
              <option value="">{t.units.pure}</option>
            </select>
          </div>

          {/* Decimal Precision */}
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-600">{t.precisionLabel}</span>
            <select
              value={precision}
              onChange={(e) => handlePrecisionChange(parseInt(e.target.value, 10))}
              aria-label={t.precisionLabel}
              className="bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-2xs"
            >
              <option value={2}>{t.precisions.p2}</option>
              <option value={4}>{t.precisions.p4}</option>
              <option value={6}>{t.precisions.p6}</option>
              <option value={8}>{t.precisions.p8}</option>
            </select>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          <span className="text-slate-400 font-medium">{t.presetsLabel}</span>
          <button
            onClick={() => applyPreset('c', 3, 4)}
            className="px-2 py-1 rounded-md bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 transition-colors cursor-pointer font-mono font-medium"
          >
            3 & 4
          </button>
          <button
            onClick={() => applyPreset('c', 5, 12)}
            className="px-2 py-1 rounded-md bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 transition-colors cursor-pointer font-mono font-medium"
          >
            5 & 12
          </button>
          <button
            onClick={() => applyPreset('c', 1, 1)}
            className="px-2 py-1 rounded-md bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 transition-colors cursor-pointer font-mono font-medium"
          >
            1 & 1 (√2)
          </button>
          <button
            onClick={() => applyPreset('c', 2, 4)}
            className="px-2 py-1 rounded-md bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 transition-colors cursor-pointer font-mono font-medium"
          >
            2 & 4 (2√5)
          </button>
          <button
            onClick={() => applyPreset('c', 3, 3)}
            className="px-2 py-1 rounded-md bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 transition-colors cursor-pointer font-mono font-medium"
          >
            3 & 3 (3√2)
          </button>
          <button
            onClick={() => applyPreset('a', 10, 6)}
            className="px-2 py-1 rounded-md bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-600 transition-colors cursor-pointer font-mono font-medium"
          >
            10 & 6
          </button>
        </div>
      </div>

      {/* History Drawer Modal / Popup */}
      {showHistoryModal && (
        <div className="mb-6 p-4 rounded-2xl bg-blue-50/50 border border-blue-200">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
              <History className="w-3.5 h-3.5 text-blue-700" />
              {t.historyTitle}
            </h4>
            {history.length > 0 && (
              <button
                onClick={handleClearHistory}
                className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3 h-3" />
                {t.clearHistory}
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <p className="text-xs text-slate-500 py-2">{t.noHistory}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {history.map((h) => (
                <div
                  key={h.id}
                  onClick={() => {
                    setTarget(h.target);
                    setVal1(h.val1.toString());
                    setVal2(h.val2.toString());
                    if (h.unit) handleUnitChange(h.unit);
                  }}
                  className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-blue-400 flex items-center justify-between cursor-pointer transition-all shadow-2xs group"
                >
                  <div className="min-w-0 pr-2">
                    <span className="text-[11px] text-slate-400 block">{h.time}</span>
                    <span className="text-xs font-mono font-bold text-slate-800 group-hover:text-blue-600 truncate block">
                      {h.resultStr}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => handleRemoveHistoryItem(h.id, e)}
                      title="Delete"
                      className="p-1 rounded-md text-slate-300 hover:text-rose-500 hover:bg-rose-50 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Calculation Output Section */}
      {calculation.error ? (
        <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-sm flex items-start gap-3">
          <HelpCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold mb-1">
              {lang === 'zh' ? '输入提示' : 'Input Notice'}
            </h4>
            <p className="leading-relaxed">{calculation.error}</p>
          </div>
        </div>
      ) : calculation.result ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Result Details & Step-by-Step */}
          <div className="lg:col-span-7">
            <ResultDisplay
              data={calculation.result}
              precision={precision}
              lang={lang}
            />
          </div>

          {/* Right: SVG Triangle Visualization */}
          <div className="lg:col-span-5">
            <TriangleVisualizer
              data={calculation.result}
              lang={lang}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};
