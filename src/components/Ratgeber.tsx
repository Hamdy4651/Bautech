import { motion } from 'framer-motion';
import { ArrowRight, FileText } from 'lucide-react';
import { useI18n } from '@/i18n';

export default function Ratgeber() {
  const { t } = useI18n();
  const articles = Object.entries(t.ratgeber.articles);

  return (
    <section id="ratgeber" className="relative py-24 md:py-32" style={{ background: 'var(--color-warm-white)', color: 'var(--color-anthrazit)' }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
          className="mb-16 text-center"
        >
          <div className="mb-4 text-sm font-medium tracking-[0.3em] uppercase" style={{ color: 'var(--color-gold-bronze)' }}>
            RATGEBER
          </div>
          <h2 className="font-display text-4xl font-bold md:text-5xl lg:text-6xl" style={{ color: 'var(--color-anthrazit)' }}>
            {t.ratgeber.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-black/50">{t.ratgeber.subtitle}</p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map(([key, article], i) => (
            <motion.button
              key={key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden bg-white p-8 text-left shadow-lg transition-shadow hover:shadow-2xl"
              style={{ borderRadius: 'var(--radius-lg)', border: '1px solid rgba(11,14,19,0.06)' }}
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl transition-colors"
                style={{ background: 'rgba(212, 168, 58, 0.1)', color: 'var(--color-gold-bronze)' }}
              >
                <FileText className="h-5 w-5" />
              </div>
              <div className="mb-2 text-xs font-medium tracking-wider text-black/30">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="font-display text-xl font-bold mb-2" style={{ color: 'var(--color-anthrazit)' }}>
                {article.title}
              </h3>
              <p className="text-sm text-black/50">{article.desc}</p>
              <div className="mt-6 flex items-center gap-2 text-sm font-medium transition-all group-hover:gap-3" style={{ color: 'var(--color-gold-bronze)' }}>
                {t.ratgeber.readMore}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
              <div className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full"
                style={{ background: 'linear-gradient(90deg, var(--color-gold), var(--color-gold-bronze))' }}
              />
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
