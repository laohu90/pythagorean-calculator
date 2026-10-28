import React, { useState } from 'react';
import { Search, CheckCircle2, XCircle, Sparkles, Wand2, Filter, ArrowUpRight } from 'lucide-react';
import { COMMON_TRIPLES, validateTriple, generateEuclidTriple, PythagoreanTriple } from '../utils/pythagorean';
import { Language, translations } from '../i18n/translations';

interface Props {
  lang: Language;
  onSelectTriple?: (a: number, b: number) => void;
}

export const TriplesExplorer: React.FC<Props> = ({ lang, onSelectTriple }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'primitive' | 'under50'>('all');

  const t = translations[lang].triples;

  // Validator inputs
  const [valA, setValA] = useState('3');
  const [valB, setValB] = useState('4');
  const [valC, setValC] = useState('5');
  const [validationResult, setValidationResult] = useState<ReturnType<typeof validateTriple> | null>(null);

  // Euclid Generator inputs
  const [genM, setGenM] = useState('3');
  const [genN, setGenN] = useState('2');
  const [generatorResult, setGeneratorResult] = useState<ReturnType<typeof generateEuclidTriple>>(() =>
    generateEuclidTriple(3, 2, lang)
  );

  // Filter triples table
  const filteredTriples = COMMON_TRIPLES.filter((item) => {
    if (searchTerm.trim()) {
      const q = searchTerm.trim();
      const match =
        item.a.toString().includes(q) ||
        item.b.toString().includes(q) ||
        item.c.toString().includes(q);
      if (!match) return false;
    }

    if (filterType === 'primitive') return item.isPrimitive;
    if (filterType === 'under50') return item.c <= 50;
    return true;
  });

  // Handle validate
  const handleValidate = () => {
    const na = Number(valA);
    const nb = Number(valB);
    const nc = Number(valC);
    setValidationResult(validateTriple(na, nb, nc, lang));
  };

  // Handle Euclid generator
  const handleGenerate = () => {
    const m = Number(genM);
    const n = Number(genN);
    const res = generateEuclidTriple(m, n, lang);
    setGeneratorResult(res);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          {t.badge}
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          {t.title}
        </h2>
        <p className="text-sm text-slate-500 mt-2 max-w-3xl leading-relaxed">
          {t.desc}
        </p>
      </div>

      {/* Grid: 2 Interactive Mini-Tools (Validator & Generator) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tool 1: 勾股数验证器 */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90">
          <h3 className="font-bold text-slate-800 text-base mb-1 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            {t.validatorTitle}
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            {t.validatorDesc}
          </p>

          <div className="grid grid-cols-3 gap-3 mb-4">
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">{t.side1}</label>
              <input
                type="number"
                value={valA}
                onChange={(e) => setValA(e.target.value)}
                placeholder="3"
                className="w-full bg-white px-3 py-2 text-sm font-mono font-bold text-slate-800 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">{t.side2}</label>
              <input
                type="number"
                value={valB}
                onChange={(e) => setValB(e.target.value)}
                placeholder="4"
                className="w-full bg-white px-3 py-2 text-sm font-mono font-bold text-slate-800 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">{t.side3}</label>
              <input
                type="number"
                value={valC}
                onChange={(e) => setValC(e.target.value)}
                placeholder="5"
                className="w-full bg-white px-3 py-2 text-sm font-mono font-bold text-slate-800 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            onClick={handleValidate}
            className="w-full py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs transition-colors cursor-pointer shadow-2xs"
          >
            {t.validateBtn}
          </button>

          {validationResult && (
            <div
              className={`mt-4 p-3.5 rounded-xl border text-xs leading-relaxed ${
                validationResult.isValid
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}
            >
              <div className="flex items-center gap-2 font-bold mb-1">
                {validationResult.isValid ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{t.validHeader}</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-600" />
                    <span>{t.invalidHeader}</span>
                  </>
                )}
              </div>
              <p>{validationResult.message}</p>
            </div>
          )}
        </div>

        {/* Tool 2: 欧几里得公式生成器 */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90">
          <h3 className="font-bold text-slate-800 text-base mb-1 flex items-center gap-2">
            <Wand2 className="w-4 h-4 text-indigo-600" />
            {t.generatorTitle}
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            {t.generatorDesc}
          </p>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">{t.paramM}</label>
              <input
                type="number"
                min="2"
                value={genM}
                onChange={(e) => setGenM(e.target.value)}
                placeholder="3"
                className="w-full bg-white px-3 py-2 text-sm font-mono font-bold text-slate-800 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">{t.paramN}</label>
              <input
                type="number"
                min="1"
                value={genN}
                onChange={(e) => setGenN(e.target.value)}
                placeholder="2"
                className="w-full bg-white px-3 py-2 text-sm font-mono font-bold text-slate-800 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <button
            onClick={handleGenerate}
            className="w-full py-2 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs transition-colors cursor-pointer shadow-2xs"
          >
            {t.generateBtn}
          </button>

          {generatorResult.error && (
            <div className="mt-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs leading-relaxed">
              <div className="flex items-center gap-2 font-bold mb-1">
                <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{lang === 'zh' ? '参数校验未通过' : 'Invalid Parameters'}</span>
              </div>
              <p>{generatorResult.error}</p>
            </div>
          )}

          {generatorResult.triple && generatorResult.diff !== undefined && generatorResult.prod !== undefined && (
            <div className="mt-4 p-3.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-indigo-800">
                  {t.generatedTitle(generatorResult.triple.a, generatorResult.triple.b, generatorResult.triple.c)}
                </span>
                {onSelectTriple && (
                  <button
                    onClick={() => onSelectTriple(generatorResult.triple!.a, generatorResult.triple!.b)}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                  >
                    {t.applyBtn}
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <div className="font-mono text-[11px] text-indigo-700 space-y-1">
                <div>m² - n² = {genM}² - {genN}² = {generatorResult.diff}</div>
                <div>2mn = 2 × {genM} × {genN} = {generatorResult.prod}</div>
                <div>c = m² + n² = {genM}² + {genN}² = {generatorResult.hyp}</div>
                <div className="pt-1 border-t border-indigo-200/60 font-sans text-indigo-800 font-medium">
                  {lang === 'zh'
                    ? `勾股数三元组 (a, b, c) = (${generatorResult.triple.a}, ${generatorResult.triple.b}, ${generatorResult.triple.c})`
                    : `Pythagorean Triple (a, b, c) = (${generatorResult.triple.a}, ${generatorResult.triple.b}, ${generatorResult.triple.c})`}
                </div>
                <div className="font-sans text-indigo-600">
                  {generatorResult.triple.isPrimitive ? t.isPrimitiveText : t.isDerivedText}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Triples Quick Table Section */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-600" />
            {t.tableTitle(filteredTriples.length)}
          </h3>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
              />
            </div>

            {/* Filter Pill Buttons */}
            <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-xs">
              <button
                onClick={() => setFilterType('all')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  filterType === 'all' ? 'bg-white text-blue-700 shadow-2xs font-bold' : 'text-slate-600'
                }`}
              >
                {t.filterAll}
              </button>
              <button
                onClick={() => setFilterType('primitive')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  filterType === 'primitive' ? 'bg-white text-blue-700 shadow-2xs font-bold' : 'text-slate-600'
                }`}
              >
                {t.filterPrimitive}
              </button>
              <button
                onClick={() => setFilterType('under50')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  filterType === 'under50' ? 'bg-white text-blue-700 shadow-2xs font-bold' : 'text-slate-600'
                }`}
              >
                {t.filterUnder50}
              </button>
            </div>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider">
                <th className="py-3 px-4">{t.colIndex}</th>
                <th className="py-3 px-4">{t.colA}</th>
                <th className="py-3 px-4">{t.colB}</th>
                <th className="py-3 px-4 text-blue-700">{t.colC}</th>
                <th className="py-3 px-4">{t.colFormula}</th>
                <th className="py-3 px-4">{t.colType}</th>
                <th className="py-3 px-4 text-right">{t.colAction}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredTriples.map((item, idx) => (
                <tr key={idx} className="hover:bg-blue-50/40 transition-colors group">
                  <td className="py-3 px-4 font-mono text-slate-400 font-medium">#{idx + 1}</td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-800">{item.a}</td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-800">{item.b}</td>
                  <td className="py-3 px-4 font-mono font-extrabold text-blue-700">{item.c}</td>
                  <td className="py-3 px-4 font-mono text-slate-500">
                    {item.a}² + {item.b}² = {item.a * item.a} + {item.b * item.b} = {item.c * item.c}
                  </td>
                  <td className="py-3 px-4">
                    {item.isPrimitive ? (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold text-[10px]">
                        {t.typePrimitive}
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium text-[10px]">
                        {t.typeDerived}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    {onSelectTriple && (
                      <button
                        onClick={() => onSelectTriple(item.a, item.b)}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-800 group-hover:underline cursor-pointer"
                      >
                        {t.applyBtn}
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
