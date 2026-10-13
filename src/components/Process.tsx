import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useI18n } from '@/i18n';
import { usePrefersReducedMotion } from '@/lib/hooks';

export default function Process() {
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], reduced ? ['100%', '100%'] : ['0%', '100%']);
  const steps = Object.entries(t.process.steps);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32" style={{ background: 'var(--color-anthrazit-2)' }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <div className="eyebrow mb-4">SO FUNKTIONIERT'S</div>
          <h2 className="font-display text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            {t.process.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/60">{t.process.subtitle}</p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 hidden md:block" style={{ background: 'rgba(212, 168, 58, 0.1)' }}>
            <motion.div
              className="absolute top-0 left-0 w-full"
              style={{
                height: lineHeight,
                background: 'linear-gradient(180deg, var(--color-gold), var(--color-gold-bronze))',
              }}
            />
          </div>

          <div className="space-y-12 md:space-y-0">
            {steps.map(([key, step], i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
                className={`relative flex flex-col items-center gap-6 md:flex-row md:items-center ${
                  i % 2 === 0 ? 'md:justify-start' : 'md:justify-end'
                } md:py-12`}
              >
                {/* Big number */}
                <div className={`flex-shrink-0 ${i % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                  <div className="relative flex items-center justify-center">
                    <span className="font-display text-7xl font-bold text-transparent md:text-8xl lg:text-9xl"
                      style={{ WebkitTextStroke: '1px rgba(212, 168, 58, 0.3)' }}
                    >
                      0{i + 1}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className={`glass max-w-md p-6 md:p-8 ${i % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}
                  style={{ borderRadius: 'var(--radius-lg)' }}
                >
                  <h3 className="mb-2 font-display text-2xl font-bold text-white">{step.title}</h3>
                  <p className="text-white/60">{step.desc}</p>
                </div>

                {/* Node on line */}
                <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block">
                  <div className="h-4 w-4 rounded-full" style={{ background: 'var(--color-gold)', boxShadow: '0 0 12px rgba(212, 168, 58, 0.5)' }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
