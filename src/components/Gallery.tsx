import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useI18n } from '@/i18n';
import { IMAGES } from '@/lib/data';

const spans = [
  'col-span-1 row-span-1 md:col-span-2 md:row-span-2',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1 md:col-span-2',
  'col-span-1 row-span-1 md:row-span-2',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1 md:col-span-2',
];

export default function Gallery() {
  const { t } = useI18n();
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section id="gallery" className="relative py-24 md:py-32" style={{ background: 'var(--color-anthrazit)' }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px' }}
          transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
          className="mb-12 text-center"
        >
          <div className="eyebrow mb-4">GALERIE</div>
          <h2 className="font-display text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            {t.gallery.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/60">{t.gallery.subtitle}</p>
        </motion.div>

        {/* Masonry Grid */}
        <div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-5"
          style={{ gridAutoRows: '180px' }}
        >
          {IMAGES.gallery.map((img, i) => (
            <motion.button
              key={i}
              type="button"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.34, 1.56, 0.64, 1] }}
              whileHover={{ scale: 0.98 }}
              onClick={() => setLightbox(i)}
              className={`group relative block h-full w-full overflow-hidden ${spans[i] || 'col-span-1 row-span-1'}`}
              style={{ borderRadius: 'var(--radius-lg)' }}
              data-cursor={t.gallery.view}
            >
              <img
                src={img}
                alt={`Gallery ${i + 1}`}
                loading="eager"
                onError={(event) => {
                  event.currentTarget.onerror = null; // يمنع loop لو الـ fallback كمان فشل
                  event.currentTarget.src = IMAGES.heroPoster;
                }}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/30" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="rounded-full border border-gold/40 bg-black/50 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                  {t.gallery.view}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/90 p-6"
          >
            <button
              type="button"
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-gold hover:text-gold"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.img
              key={lightbox}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={IMAGES.gallery[lightbox]}
              alt={`Gallery ${lightbox + 1}`}
              className="max-h-[85vh] max-w-full object-contain md:max-w-5xl"
              style={{ borderRadius: 'var(--radius-xl)' }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}