import { motion } from 'framer-motion';
import { useI18n } from '@/i18n';
import { IMAGES } from '@/lib/data';

export default function Team() {
  const { t } = useI18n();
  const members = Object.entries(t.team.members);

  return (
    <section className="relative py-24 md:py-32" style={{ background: 'var(--color-anthrazit)' }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <div className="eyebrow mb-4">TEAM</div>
          <h2 className="font-display text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            {t.team.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/60">{t.team.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {members.map(([key, member], i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.34, 1.56, 0.64, 1] }}
              className="group relative overflow-hidden"
              style={{ borderRadius: 'var(--radius-lg)', isolation: 'isolate' }}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={IMAGES.team[i]}
                  alt={member.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
                  style={{ filter: 'brightness(0.7) contrast(1.1)' }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-display text-xl font-bold text-white">{member.name}</h3>
                <p className="mt-1 text-sm text-gold">{member.role}</p>
              </div>
              <div className="absolute inset-0 border-0 transition-all duration-500 group-hover:border-2"
                style={{ borderColor: 'rgba(212, 168, 58, 0.3)', borderRadius: 'var(--radius-lg)' }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
