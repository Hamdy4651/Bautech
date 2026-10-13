import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '@/i18n';
import { IMAGES } from '@/lib/data';

export default function BeforeAfter() {
  const { t } = useI18n();
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, pct)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    updatePosition(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    updatePosition(e.clientX);
  };

  const onPointerUp = () => {
    isDragging.current = false;
  };

  return (
    <section className="relative py-24 md:py-32" style={{ background: 'var(--color-anthrazit-2)' }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
          className="mb-12 text-center"
        >
          <div className="eyebrow mb-4">BEFORE / AFTER</div>
          <h2 className="font-display text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            {t.beforeAfter.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/60">{t.beforeAfter.subtitle}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          className="relative mx-auto max-w-5xl select-none"
          data-cursor={t.beforeAfter.drag}
        >
          <div
            ref={containerRef}
            className="relative aspect-[16/10] overflow-hidden"
            style={{ borderRadius: 'var(--radius-xl)', cursor: 'ew-resize' }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
          >
            {/* After image (background) */}
            <img
              src={IMAGES.beforeAfter.after}
              alt={t.beforeAfter.after}
              className="absolute inset-0 h-full w-full object-cover"
              draggable={false}
            />
            <div className="absolute right-4 top-4 rounded-full bg-black/60 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
              {t.beforeAfter.after}
            </div>

            {/* Before image (clipped) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${position}%` }}
            >
              <img
                src={IMAGES.beforeAfter.before}
                alt={t.beforeAfter.before}
                className="absolute inset-0 h-full w-full object-cover"
                style={{ width: `${100 / position * 100}%`, maxWidth: 'none' }}
                draggable={false}
              />
              <div className="absolute left-4 top-4 rounded-full bg-black/60 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
                {t.beforeAfter.before}
              </div>
            </div>

            {/* Handle */}
            <div
              className="absolute top-0 bottom-0 z-10 w-1"
              style={{ left: `${position}%`, transform: 'translateX(-50%)', background: 'linear-gradient(180deg, var(--color-gold), var(--color-gold-bronze))' }}
            >
              <div className="absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2"
                style={{
                  borderColor: 'var(--color-gold)',
                  background: 'var(--color-anthrazit)',
                  boxShadow: '0 0 20px rgba(212, 168, 58, 0.4)',
                }}
              >
                <div className="relative">
                  <span className="absolute h-10 w-10 rounded-full" style={{ background: 'rgba(212, 168, 58, 0.2)', animation: 'pulse-ring 2s ease-out infinite' }} />
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="relative">
                    <path d="M8 6L2 12L8 18" stroke="var(--color-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 6L22 12L16 18" stroke="var(--color-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
