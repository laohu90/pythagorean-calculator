import React, { useState, useEffect } from 'react';
import {
  Calculator as CalcIcon,
  Compass,
  Search,
  BookOpen,
  Share2,
  Check,
  Sparkles,
  ChevronRight,
  Triangle,
  Globe
} from 'lucide-react';
import { Calculator } from './components/Calculator';
import { TriplesExplorer } from './components/TriplesExplorer';
import { SpecialTriangles } from './components/SpecialTriangles';
import { SeoContent } from './components/SeoContent';
import { Language, SupportedLang, translations, resolveInitialLanguage } from './i18n/translations';

export default function App() {
  // Default to English as requested, but respect URL query param ?lang= for Googlebot
  const [lang, setLang] = useState<Language>(() => {
    try {
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const urlLang = params.get('lang');
        if (urlLang === 'zh' || urlLang === 'en') return urlLang;
      }
      const saved = localStorage.getItem('pythagorean_lang') as Language;
      if (saved === 'en' || saved === 'zh') return saved;
      return 'en';
    } catch {
      return 'en';
    }
  });

  const [activeTab, setActiveTab] = useState<'calc' | 'triples' | 'special' | 'guide'>(() => {
    try {
      if (typeof window !== 'undefined') {
        const hash = window.location.hash.replace('#', '');
        if (hash === 'triples' || hash === 'special' || hash === 'guide') {
          return hash;
        }
      }
    } catch {
      // ignore
    }
    return 'calc';
  });

  const [copiedLink, setCopiedLink] = useState(false);
  const [presetInjection, setPresetInjection] = useState<{
    target: 'c' | 'a' | 'b';
    val1: number;
    val2: number;
    timestamp: number;
  } | null>(null);

  const t = translations[lang];

  // Sync document head and metadata dynamically for SEO
  useEffect(() => {
    document.title = t.meta.title;
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', t.meta.description);
    }
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', t.meta.keywords);
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', t.meta.title);
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', t.meta.description);
    }
  }, [lang, t]);

  // Language switch handler with URL sync
  const handleToggleLanguage = (newLang: Language) => {
    setLang(newLang);
    try {
      localStorage.setItem('pythagorean_lang', newLang);
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        url.searchParams.set('lang', newLang);
        window.history.replaceState({}, '', url.toString());
      }
    } catch {
      // ignore
    }
  };

  const handleTabChange = (tab: 'calc' | 'triples' | 'special' | 'guide') => {
    setActiveTab(tab);
    try {
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        url.hash = tab === 'calc' ? '' : tab;
        window.history.replaceState({}, '', url.toString());
      }
    } catch {
      // ignore
    }
  };

  // Handle preset injection from triples or special triangles
  const handleLoadTriple = (a: number, b: number) => {
    setPresetInjection({
      target: 'c',
      val1: a,
      val2: b,
      timestamp: Date.now()
    });
    setActiveTab('calc');
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: t.meta.title,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Notice / Announcement bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 text-center font-medium border-b border-slate-800">
        <span className="inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>{t.notice}</span>
        </span>
      </div>

      {/* Primary Sticky Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm shadow-blue-500/20">
              <Triangle className="w-5 h-5 fill-current" />
            </div>
            <div>
              <span className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight block leading-tight">
                {lang === 'zh' ? '勾股定理计算器' : 'Pythagorean Calculator'}
              </span>
              <span className="text-[11px] text-slate-500 font-mono block leading-tight">
                a² + b² = c² · {lang === 'zh' ? '在线求解与根号化简' : 'Exact Radical & Hypotenuse Solver'}
              </span>
            </div>
          </div>

          {/* Desktop Nav Pills */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => handleTabChange('calc')}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'calc'
                  ? 'bg-white text-blue-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <CalcIcon className="w-3.5 h-3.5" />
              <span>{t.nav.calc}</span>
            </button>
            <button
              onClick={() => handleTabChange('triples')}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'triples'
                  ? 'bg-white text-blue-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>{t.nav.triples}</span>
            </button>
            <button
              onClick={() => handleTabChange('special')}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'special'
                  ? 'bg-white text-blue-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>{t.nav.special}</span>
            </button>
            <button
              onClick={() => handleTabChange('guide')}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'guide'
                  ? 'bg-white text-blue-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{t.nav.guide}</span>
            </button>
          </nav>

          {/* Action buttons: Bilingual Toggle + Share */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <div className="inline-flex rounded-xl border border-slate-200 bg-slate-100 p-1 text-xs font-semibold">
              <button
                onClick={() => handleToggleLanguage('en')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                  lang === 'en'
                    ? 'bg-white text-blue-700 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Switch to English"
              >
                <Globe className="w-3 h-3" />
                <span>EN</span>
              </button>
              <button
                onClick={() => handleToggleLanguage('zh')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                  lang === 'zh'
                    ? 'bg-white text-blue-700 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="切换为中文"
              >
                <span>中文</span>
              </button>
            </div>

            {/* Share button */}
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
              title={t.nav.share}
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600">{t.nav.copied}</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-slate-600" />
                  <span className="hidden sm:inline">{t.nav.share}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="md:hidden flex items-center justify-around border-t border-slate-100 px-2 py-2 overflow-x-auto text-xs font-medium">
          <button
            onClick={() => handleTabChange('calc')}
            className={`px-3 py-1.5 rounded-lg shrink-0 ${
              activeTab === 'calc' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600'
            }`}
          >
            {t.nav.calc}
          </button>
          <button
            onClick={() => handleTabChange('triples')}
            className={`px-3 py-1.5 rounded-lg shrink-0 ${
              activeTab === 'triples' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600'
            }`}
          >
            {t.nav.triples}
          </button>
          <button
            onClick={() => handleTabChange('special')}
            className={`px-3 py-1.5 rounded-lg shrink-0 ${
              activeTab === 'special' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600'
            }`}
          >
            {t.nav.special}
          </button>
          <button
            onClick={() => handleTabChange('guide')}
            className={`px-3 py-1.5 rounded-lg shrink-0 ${
              activeTab === 'guide' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600'
            }`}
          >
            {t.nav.guide}
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10">
        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            {t.hero.badge}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {t.hero.title}
            <span className="block text-2xl sm:text-3xl font-bold text-blue-600 mt-1 font-mono">
              a² + b² = c²
            </span>
          </h1>

          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {t.hero.subtitle}
          </p>

          {/* Value Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs text-slate-600">
            <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200">
              {t.hero.badges.radical}
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200">
              {t.hero.badges.steps}
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200">
              {t.hero.badges.visual}
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200">
              {t.hero.badges.triples}
            </span>
          </div>
        </section>

        {/* Tab View or Dynamic Sections */}
        {activeTab === 'calc' && (
          <div className="space-y-10">
            {/* Main Interactive Calculator */}
            <section id="calculator">
              <Calculator
                lang={lang}
                presetInjection={presetInjection}
              />
            </section>

            {/* Quick Link Cards to other modules */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                onClick={() => {
                  setActiveTab('triples');
                  window.scrollTo({ top: 200, behavior: 'smooth' });
                }}
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-sm text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-slate-800 text-sm group-hover:text-blue-600">
                    {t.quickLinks.triplesTitle}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <p className="text-xs text-slate-500">
                  {t.quickLinks.triplesDesc}
                </p>
              </button>

              <button
                onClick={() => {
                  setActiveTab('special');
                  window.scrollTo({ top: 200, behavior: 'smooth' });
                }}
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-sm text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-slate-800 text-sm group-hover:text-blue-600">
                    {t.quickLinks.specialTitle}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <p className="text-xs text-slate-500">
                  {t.quickLinks.specialDesc}
                </p>
              </button>

              <button
                onClick={() => {
                  setActiveTab('guide');
                  window.scrollTo({ top: 200, behavior: 'smooth' });
                }}
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-sm text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-slate-800 text-sm group-hover:text-blue-600">
                    {t.quickLinks.guideTitle}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <p className="text-xs text-slate-500">
                  {t.quickLinks.guideDesc}
                </p>
              </button>
            </div>

            {/* Embedded SEO Content & Guide right below calculator */}
            <SeoContent lang={lang} />
          </div>
        )}

        {activeTab === 'triples' && (
          <div className="space-y-8">
            <TriplesExplorer
              lang={lang}
              onSelectTriple={handleLoadTriple}
            />
          </div>
        )}

        {activeTab === 'special' && (
          <div className="space-y-8">
            <SpecialTriangles
              lang={lang}
              onApplySpecial={handleLoadTriple}
            />
          </div>
        )}

        {activeTab === 'guide' && (
          <div className="space-y-8">
            <SeoContent lang={lang} />
          </div>
        )}
      </main>

      {/* Footer with SEO Breadcrumbs and Formulas */}
      <footer className="bg-slate-50 border-t border-slate-200 mt-20 pt-12 pb-8 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Formula Recap Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 pb-8 border-b border-slate-200">
            <div>
              <h4 className="font-bold text-slate-900 mb-2">{t.footer.col1Title}</h4>
              <ul className="space-y-1 font-mono text-[11px] text-slate-600">
                <li>c = √(a² + b²)</li>
                <li>a = √(c² - b²)</li>
                <li>b = √(c² - a²)</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-2">{t.footer.col2Title}</h4>
              <ul className="space-y-1 font-mono text-[11px] text-slate-600">
                <li>S = ½ · a · b</li>
                <li>P = a + b + c</li>
                <li>h_c = (a · b) / c</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-2">{t.footer.col3Title}</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                {t.footer.col3Desc}
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-2">{t.footer.col4Title}</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                {t.footer.col4Desc}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400">
            <p>{t.footer.copyright}</p>
            <div className="flex items-center gap-4">
              <span>{t.footer.seoTag}</span>
              <span>{t.footer.designTag}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
