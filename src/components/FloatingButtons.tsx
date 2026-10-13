import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { useI18n } from '@/i18n';
import { COMPANY } from '@/lib/data';

export default function FloatingButtons() {
  const { t } = useI18n();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* WhatsApp - desktop bottom right */}
          <motion.a
            href={COMPANY.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0, x: 50 }}
            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            className="fixed bottom-6 right-6 z-[9990] hidden items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-white shadow-2xl md:flex"
            style={{ background: '#25D366', borderRadius: 'var(--radius-full)' }}
            data-cursor=""
          >
            <MessageCircle className="h-5 w-5" />
            {t.floating.whatsapp}
          </motion.a>

          {/* Call button - mobile bottom right */}
          <motion.a
            href={COMPANY.phoneHref}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            className="fixed bottom-6 right-6 z-[9990] flex h-14 w-14 items-center justify-center rounded-full text-white shadow-2xl md:hidden"
            style={{ background: 'linear-gradient(135deg, var(--color-gold), var(--color-gold-bronze))' }}
            aria-label={t.floating.call}
          >
            <Phone className="h-6 w-6" />
          </motion.a>
        </>
      )}
    </AnimatePresence>
  );
}
