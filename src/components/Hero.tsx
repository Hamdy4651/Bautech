import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, ArrowDown, Star, Clock, Euro, Layers, Play } from 'lucide-react';
import { useI18n } from '@/i18n';
import { IMAGES, COMPANY } from '@/lib/data';
import { useScrollDirection, usePrefersReducedMotion } from '@/lib/hooks';

export default function Hero() {
  const { t } = useI18n();
  const { scrollY } = useScrollDirection();
  const reduced = usePrefersReducedMotion();
  const [introDone, setIntroDone] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (reduced) {
      setIntroDone(true);
      setShowVideo(false);
      return;
    }
    const introTimer = setTimeout(() => setIntroDone(true), 3000);
    return () => {
      clearTimeout(introTimer);
    };
  }, [reduced]);

  const heroOpacity = Math.max(0, 1 - scrollY / 600);
  const heroScale = Math.max(0.85, 1 - scrollY / 3000);
  const titleY = scrollY * 0.3;
  const titleBlur = Math.min(scrollY / 100, 8);
  const titleOpacity = Math.max(0, 1 - scrollY / 400);

  const trustChips = [
    { icon: Clock, label: t.hero.trust1 },
    { icon: Euro, label: t.hero.trust2 },
    { icon: Layers, label: t.hero.trust3 },
  ];

  return (
    <section id="hero" className="relative min-h-[100svh] w-full overflow-hidden md:h-screen">
      {/* Intro Animation */}
      <AnimatePresence>
        {!introDone && (
          <motion.div
            className="fixed inset-0 z-[10001] flex items-center justify-center"
            style={{ background: 'var(--color-anthrazit)' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="h-[2px] origin-left bg-gold"
              initial={{ width: 0 }}
              animate={{ width: '40%' }}
              transition={{ duration: 1.8, ease: [0.34, 1.56, 0.64, 1] }}
              style={{ background: 'linear-gradient(90deg, transparent, var(--color-gold), transparent)' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Image/Video */}
      <motion.div
        className="absolute inset-0"
        style={{
          scale: heroScale,
          opacity: heroOpacity,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${IMAGES.heroPoster})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 1,
            transition: 'opacity 1s',
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(11,14,19,0.4) 0%, rgba(11,14,19,0.2) 40%, rgba(11,14,19,0.8) 100%)',
          }}
        />
      </motion.div>

      {/* Content */}
      <div
        className="relative z-10 flex min-h-[100svh] flex-col items-center justify-start px-5 pt-28 pb-16 text-center md:h-full md:min-h-0 md:justify-center md:px-6 md:py-0"
        style={{ opacity: titleOpacity }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={introDone ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="eyebrow mb-4 md:mb-6"
        >
          {t.hero.location}
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={introDone ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
          style={{ transform: `translateY(-${titleY}px)`, filter: `blur(${titleBlur}px)` }}
          className="max-w-5xl font-display text-[3.25rem] font-bold leading-[0.98] text-white text-shadow-gold sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
        >
          {t.hero.title.split(' ').map((word, i) => (
            <span key={i} className={i === t.hero.title.split(' ').length - 1 ? 'text-gradient-gold' : ''}>
              {word}{' '}
            </span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={introDone ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-5 max-w-2xl text-sm leading-6 text-white/70 sm:text-base md:mt-6 md:text-lg md:leading-normal"
        >
          {t.hero.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={introDone ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-7 flex flex-col items-center gap-3 sm:flex-row md:mt-10 md:gap-4"
        >
          <a
            href={COMPANY.phoneHref}
            className="btn-gold flex items-center gap-2 px-8 py-4 text-base"
            data-cursor=""
          >
            <Phone className="h-5 w-5" />
            {t.hero.ctaPrimary}
          </a>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-ghost flex items-center gap-2 px-8 py-4 text-base"
            data-cursor=""
          >
            {t.hero.ctaSecondary}
          </button>
        </motion.div>

        {/* Trust Chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={introDone ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-6 flex max-w-xs flex-wrap items-center justify-center gap-x-4 gap-y-2 md:mt-8 md:max-w-none md:gap-4"
        >
          {trustChips.map((chip, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-white/60">
              <chip.icon className="h-4 w-4 text-gold" />
              {chip.label}
            </div>
          ))}
        </motion.div>

        {/* Google Rating */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={introDone ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-4 flex items-center gap-2 md:mt-6"
        >
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-gold text-gold" />
            ))}
          </div>
          <span className="text-sm text-white/70">
            <span className="font-semibold text-white">{t.hero.rating}</span> · {t.hero.ratingText}
          </span>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      {introDone && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          style={{ opacity: Math.max(0, 1 - scrollY / 200) }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs uppercase tracking-[0.3em] text-white/40">{t.hero.scroll}</span>
            <div className="relative h-10 w-6 rounded-full border border-white/20">
              <div
                className="absolute left-1/2 top-2 h-2 w-1 -translate-x-1/2 rounded-full bg-gold"
                style={{ animation: 'scroll-hint 1.8s ease-in-out infinite' }}
              />
            </div>
            <ArrowDown className="h-4 w-4 text-gold/50" />
          </div>
        </motion.div>
      )}

      {/* Skip Intro */}
      {!introDone && (
        <button
          onClick={() => { setIntroDone(true); setShowVideo(true); }}
          className="absolute bottom-6 right-6 z-[10002] flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-gold"
        >
          <Play className="h-3 w-3" />
          Skip
        </button>
      )}
    </section>
  );
}
