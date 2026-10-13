import { motion } from 'framer-motion';
import { Euro, Smile, Calendar, Layers } from 'lucide-react';
import { useI18n } from '@/i18n';

const icons = [Euro, Smile, Calendar, Layers];

export default function WhyUs() {
  const { t } = useI18n();
  const items = Object.entries(t.whyUs.items);

  return (
    <section id="why-us" className="relative py-24 md:py-32" style={{ background: 'var(--color-anthrazit)' }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
          className="mb-16 text-center"
        >
          <div className="eyebrow mb-4">WARUM BAUTECH</div>
          <h2 className="font-display text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            {t.whyUs.title.split(' — ')[0]}
            <span className="text-gradient-gold"> — {t.whyUs.title.split(' — ')[1]}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/60">{t.whyUs.subtitle}</p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(([key, item], i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.34, 1.56, 0.64, 1] }}
                className="group glass relative overflow-hidden p-8 light-sweep"
                style={{ borderRadius: 'var(--radius-lg)' }}
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-gold/20 bg-gold/5 transition-all group-hover:border-gold group-hover:bg-gold/10">
                  <Icon className="h-7 w-7 text-gold" />
                </div>
                <h3 className="mb-3 font-display text-xl font-bold text-white">{item.title}</h3>
                <p className="text-sm text-white/50">{item.desc}</p>
                <div className="mt-6 h-[2px] w-0 transition-all duration-500 group-hover:w-full"
                  style={{ background: 'linear-gradient(90deg, var(--color-gold), transparent)' }} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
