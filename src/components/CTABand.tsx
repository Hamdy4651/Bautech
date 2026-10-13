import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import { useI18n } from '@/i18n';
import { COMPANY } from '@/lib/data';

export default function CTABand() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const marqueeX = useTransform(scrollYProgress, [0, 1], ['5%', '-15%']);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-24 md:py-32" style={{ background: 'var(--color-anthrazit)' }}>
      {/* Marquee */}
      <div className="mb-20 overflow-hidden">
        <motion.div
          style={{ x: marqueeX }}
          className="whitespace-nowrap"
        >
          <span className="marquee-text text-6xl md:text-8xl lg:text-9xl">
            {t.ctaBand.marquee.repeat(4)}
          </span>
        </motion.div>
      </div>

      {/* CTA Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
        className="mx-auto max-w-4xl px-6 text-center"
      >
        <div className="glass relative overflow-hidden p-12 md:p-16 light-sweep"
          style={{ borderRadius: 'var(--radius-xl)' }}
        >
          <h2 className="font-display text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            {t.ctaBand.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/60">{t.ctaBand.subtitle}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-gold flex items-center gap-2 px-8 py-4 text-base"
              data-cursor=""
            >
              {t.ctaBand.button}
              <ArrowRight className="h-5 w-5" />
            </button>
            <a
              href={COMPANY.phoneHref}
              className="btn-ghost flex items-center gap-2 px-8 py-4 text-base"
              data-cursor=""
            >
              <Phone className="h-5 w-5 text-gold" />
              {COMPANY.phone}
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
