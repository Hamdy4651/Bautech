import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, ChevronDown, Wrench, Layers, LayoutGrid, Home, Truck, Globe } from 'lucide-react';
import { useI18n } from '@/i18n';
import { useScrollDirection } from '@/lib/hooks';
import { COMPANY, SERVICE_KEYS } from '@/lib/data';

const serviceIcons: Record<string, typeof Wrench> = {
  montage: Wrench,
  trockenbau: Layers,
  boden: LayoutGrid,
  hausmeister: Home,
  umzug: Truck,
};

export default function Header() {
  const { t, lang, setLang } = useI18n();
  const { scrollDir, scrollY } = useScrollDirection();
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrolled = scrollY > 50;
  const hidden = scrollDir === 'down' && scrollY > 200 && !megaOpen && !mobileOpen;

  const navItems = [
    { key: 'home', href: '#hero', label: t.nav.home },
    { key: 'services', href: '#services', label: t.nav.services, mega: true },
    { key: 'gallery', href: '#gallery', label: t.nav.gallery },
    { key: 'whyUs', href: '#why-us', label: t.nav.whyUs },
    { key: 'contact', href: '#contact', label: t.nav.contact },
  ];

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    setMegaOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: hidden ? -120 : 0 }}
        transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
        className={`fixed top-0 left-0 z-[9999] w-full transition-all duration-500 ${
          scrolled ? 'glass shadow-2xl' : 'bg-transparent'
        }`}
        onMouseLeave={() => setMegaOpen(false)}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          {/* Logo */}
          <button
            onClick={() => scrollTo('#hero')}
            className="group flex items-center gap-1 font-display text-2xl font-bold tracking-[0.15em] text-white"
          >
            BAUT<span className="text-gradient-gold">ECH</span>
            <span className="ml-1 h-3 w-[2px] bg-gold transition-all duration-300 group-hover:h-5" />
          </button>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <div
                key={item.key}
                onMouseEnter={() => setMegaOpen(item.mega ?? false)}
              >
                <button
                  onClick={() => scrollTo(item.href)}
                  className="group flex items-center gap-1 text-sm font-medium text-white/80 transition-colors hover:text-gold"
                >
                  {item.label}
                  {item.mega && (
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${megaOpen ? 'rotate-180' : ''}`} />
                  )}
                </button>
              </div>
            ))}
          </nav>

          {/* Right: Language + Call */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLang(lang === 'de' ? 'en' : 'de')}
              className="flex items-center gap-1.5 text-sm font-medium text-white/70 transition-colors hover:text-gold"
            >
              <Globe className="h-4 w-4" />
              {t.nav.lang}
            </button>

            <a
              href={COMPANY.phoneHref}
              className="hidden items-center gap-2 rounded-full border border-gold/30 px-5 py-2 text-sm font-medium text-white transition-all hover:border-gold hover:bg-gold/5 sm:flex"
            >
              <Phone className="h-4 w-4 text-gold" />
              {COMPANY.phone}
            </a>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex flex-col gap-1.5 lg:hidden"
              aria-label="Menu"
            >
              <span className={`h-[2px] w-6 bg-white transition-all duration-300 ${mobileOpen ? 'translate-y-2 rotate-45' : ''}`} />
              <span className={`h-[2px] w-6 bg-white transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`h-[2px] w-6 bg-white transition-all duration-300 ${mobileOpen ? '-translate-y-2 -rotate-45' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mega Menu */}
        <AnimatePresence>
          {megaOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="absolute left-0 top-full w-full border-t border-gold/10 glass"
              onMouseEnter={() => setMegaOpen(true)}
            >
              <div className="mx-auto grid max-w-7xl grid-cols-5 gap-4 px-10 py-8">
                {SERVICE_KEYS.map((sk) => {
                  const Icon = serviceIcons[sk];
                  const item = (t.services.items as Record<string, { title: string; desc: string }>)[sk];
                  return (
                    <button
                      key={sk}
                      onClick={() => scrollTo('#services')}
                      className="group flex flex-col gap-3 rounded-2xl p-4 text-left transition-all hover:bg-gold/5"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold/20 bg-gold/5 transition-all group-hover:border-gold group-hover:bg-gold/10">
                        <Icon className="h-5 w-5 text-gold" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">{item?.title}</div>
                        <div className="mt-1 text-xs text-white/50 line-clamp-2">{item?.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9998] bg-anthrazit lg:hidden"
            style={{ background: 'var(--color-anthrazit)' }}
          >
            <div className="flex flex-col items-center justify-center gap-6 pt-20">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => scrollTo(item.href)}
                  className="font-display text-2xl font-medium text-white/80 transition-colors hover:text-gold"
                >
                  {item.label}
                </motion.button>
              ))}
              <a
                href={COMPANY.phoneHref}
                className="mt-4 flex items-center gap-2 rounded-full border border-gold/30 px-6 py-3 text-white"
              >
                <Phone className="h-4 w-4 text-gold" />
                {COMPANY.phone}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
