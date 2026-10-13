import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useI18n } from '@/i18n';
import { useCountUp } from '@/lib/hooks';
import Particles from './Particles';

export default function Stats() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });
  const items = Object.entries(t.stats.items);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-24 md:py-32" style={{ background: 'var(--color-anthrazit-2)' }}>
      {/* Light circles background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, var(--color-gold), transparent 70%)' }} />
        <div className="absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, var(--color-gold-bronze), transparent 70%)' }} />
      </div>
      <Particles count={15} />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <div className="eyebrow mb-4">ZAHLEN</div>
          <h2 className="font-display text-4xl font-bold text-white md:text-5xl lg:text-6xl">{t.stats.title}</h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {items.map(([key, item], i) => (
            <StatItem key={key} value={item.value} suffix={item.suffix} label={item.label} delay={i * 0.15} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({ value, suffix, label, delay, inView }: { value: number; suffix: string; label: string; delay: number; inView: boolean }) {
  const count = useCountUp(value, 2500, inView);
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const progress = inView ? count / value : 0;
  const offset = circumference - progress * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay, ease: [0.34, 1.56, 0.64, 1] }}
      className="flex flex-col items-center text-center"
    >
      <div className="relative mb-6 h-48 w-48">
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r={radius} fill="none" stroke="rgba(212, 168, 58, 0.1)" strokeWidth="2" />
          <motion.circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="url(#goldGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 2.5, ease: 'easeOut' }}
          />
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4A83A" />
              <stop offset="100%" stopColor="#B8860B" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-5xl font-bold text-gradient-gold">
            {count}{suffix}
          </span>
        </div>
      </div>
      <p className="text-lg font-medium text-white/80">{label}</p>
    </motion.div>
  );
}
