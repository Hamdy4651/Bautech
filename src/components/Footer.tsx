import { motion } from 'framer-motion';
import { Phone, Mail, Facebook, Instagram, Linkedin } from 'lucide-react';
import { useI18n } from '@/i18n';
import { COMPANY, SERVICE_KEYS } from '@/lib/data';

export default function Footer() {
  const { t } = useI18n();

  const quickLinks = [
    { label: t.nav.home, href: '#hero' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.gallery, href: '#gallery' },
    { label: t.nav.whyUs, href: '#why-us' },
    { label: t.nav.contact, href: '#contact' },
  ];

  const legalLinks = [
    { label: t.footer.legal, href: '#' },
    { label: t.footer.privacy, href: '#' },
    { label: t.footer.agb, href: '#' },
  ];

  const socials = [Facebook, Instagram, Linkedin];

  return (
    <footer className="relative overflow-hidden pt-20 pb-8" style={{ background: 'var(--color-anthrazit-2)' }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="font-display text-3xl font-bold tracking-[0.15em] text-white mb-4">
              BAUT<span className="text-gradient-gold">ECH</span>
            </div>
            <p className="text-sm text-white/50 mb-6">{t.footer.desc}</p>
            <div className="space-y-2">
              <a href={COMPANY.phoneHref} className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-gold">
                <Phone className="h-4 w-4 text-gold" /> {COMPANY.phone}
              </a>
              <a href={COMPANY.emailHref} className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-gold">
                <Mail className="h-4 w-4 text-gold" /> {COMPANY.email}
              </a>
            </div>
            <div className="mt-6 flex gap-3">
              {socials.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/20 text-white/60 transition-all hover:border-gold hover:text-gold hover:bg-gold/5"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-gold mb-4">{t.footer.quickLinks}</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-white/50 transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-gold mb-4">{t.footer.services}</h4>
            <ul className="space-y-2">
              {SERVICE_KEYS.map((sk) => {
                const item = (t.services.items as Record<string, { title: string }>)[sk];
                return (
                  <li key={sk}>
                    <a href="#services" className="text-sm text-white/50 transition-colors hover:text-white">
                      {item?.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-gold mb-4">Legal</h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-white/50 transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Curtain reveal giant logo */}
        <motion.div
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
          className="mt-16 flex justify-center overflow-hidden"
        >
          <span className="font-display text-[12vw] font-bold leading-none tracking-[0.1em] text-white/[0.03] select-none">
            BAUTECH
          </span>
        </motion.div>

        {/* Copyright */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-xs text-white/30">{t.footer.rights}</p>
          <p className="text-xs text-white/30">Designed & built with precision</p>
        </div>
      </div>
    </footer>
  );
}
