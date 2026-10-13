import { motion } from 'framer-motion';
import { Phone, Mail, Clock } from 'lucide-react';
import { useI18n } from '@/i18n';
import { COMPANY } from '@/lib/data';

export default function Contact() {
  const { t } = useI18n();

  const contactCards = [
    { icon: Phone, label: t.contact.phone, value: COMPANY.phone, href: COMPANY.phoneHref },
    { icon: Mail, label: t.contact.email, value: COMPANY.email, href: COMPANY.emailHref },
    { icon: Clock, label: t.contact.hours, value: t.contact.hoursValue, href: null },
  ];

  return (
    <section id="contact" className="relative py-24 md:py-32" style={{ background: 'var(--color-anthrazit)' }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <div className="eyebrow mb-4">KONTAKT</div>
          <h2 className="font-display text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            {t.contact.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/60">{t.contact.subtitle}</p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-4">
            {contactCards.map((card, i) => (
              <motion.a
                key={i}
                href={card.href || undefined}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`glass block p-6 ${card.href ? 'transition-all hover:border-gold/30 hover:bg-gold/5' : ''}`}
                style={{ borderRadius: 'var(--radius-lg)' }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-gold/20 bg-gold/5">
                  <card.icon className="h-5 w-5 text-gold" />
                </div>
                <div className="mb-1 text-sm text-white/40">{card.label}</div>
                <div className="whitespace-pre-line font-medium text-white">{card.value}</div>
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="glass flex flex-col items-center justify-center gap-5 p-8 text-center md:p-10 lg:col-span-2"
            style={{ borderRadius: 'var(--radius-xl)' }}
          >
            <p className="max-w-lg text-lg text-white/70">{t.contact.subtitle}</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href={COMPANY.emailHref} className="btn-gold flex items-center gap-2 px-6 py-3">
                <Mail className="h-4 w-4" />
                {t.contact.email}
              </a>
              <a href={COMPANY.phoneHref} className="btn-ghost flex items-center gap-2 px-6 py-3">
                <Phone className="h-4 w-4" />
                {t.contact.phone}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
