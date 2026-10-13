import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Star, ExternalLink, PenLine } from 'lucide-react';
import { useI18n } from '@/i18n';
import { useCountUp, useInView, usePrefersReducedMotion } from '@/lib/hooks';

export default function Testimonials() {
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [100, -100]);
  const { ref: inViewRef, inView } = useInView<HTMLDivElement>(0.2);
  const items = Object.entries(t.testimonials.items);
  const happyCount = useCountUp(850, 2000, inView);
  const recCount = useCountUp(96, 2000, inView);

  const summaryStats = [
    { value: t.testimonials.summary.rating, label: t.testimonials.summary.happy },
    { value: `${happyCount}+`, label: t.testimonials.summary.happy },
    { value: `${recCount}%`, label: t.testimonials.summary.recommendation },
  ];

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-24 md:py-32" style={{ background: 'var(--color-anthrazit-2)' }}>
      <div ref={inViewRef} className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <div className="eyebrow mb-4">KUNDENSTIMMEN</div>
          <h2 className="font-display text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            {t.testimonials.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/60">{t.testimonials.subtitle}</p>
        </motion.div>

        {/* Summary */}
        <div className="mb-12 grid grid-cols-3 gap-4 md:gap-8">
          {summaryStats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="font-display text-3xl font-bold text-gradient-gold md:text-5xl">{stat.value}</div>
              <div className="mt-2 text-xs text-white/50 md:text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Testimonial cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {items.map(([key, item], i) => (
            <motion.div
              key={key}
              style={{ y: i % 2 === 0 ? y : undefined, borderRadius: 'var(--radius-lg)' }}
              initial={{ opacity: 0, z: -50, scale: 0.9 }}
              whileInView={{ opacity: 1, z: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
              className="glass relative p-8 light-sweep"
            >
              <div className="mb-4 flex gap-1">
                {[...Array(5)].map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="mb-6 text-white/80 md:text-lg leading-relaxed">"{item.text}"</p>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/20 bg-gold/5 font-display text-lg font-bold text-gold">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <div className="font-medium text-white">{item.name}</div>
                  <div className="text-sm text-white/40">{item.date}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#"
            className="btn-ghost flex items-center gap-2 px-6 py-3 text-sm"
            data-cursor=""
          >
            <ExternalLink className="h-4 w-4" />
            {t.testimonials.allReviews}
          </a>
          <a
            href="#"
            className="btn-gold flex items-center gap-2 px-6 py-3 text-sm"
            data-cursor=""
          >
            <PenLine className="h-4 w-4" />
            {t.testimonials.writeReview}
          </a>
        </div>
      </div>
    </section>
  );
}
