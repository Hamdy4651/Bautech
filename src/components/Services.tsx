import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Wrench, Layers, LayoutGrid, Home, Truck, ArrowRight } from 'lucide-react';
import { useI18n } from '@/i18n';
import { IMAGES, SERVICE_KEYS, type ServiceKey } from '@/lib/data';
import { usePrefersReducedMotion } from '@/lib/hooks';

const serviceIcons: Record<ServiceKey, typeof Wrench> = {
  montage: Wrench,
  trockenbau: Layers,
  boden: LayoutGrid,
  hausmeister: Home,
  umzug: Truck,
};

const serviceImages: Record<ServiceKey, string> = {
  montage: IMAGES.services.montage,
  trockenbau: IMAGES.services.trockenbau,
  boden: IMAGES.services.boden,
  hausmeister: IMAGES.services.hausmeister,
  umzug: IMAGES.services.umzug,
};

export default function Services() {
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="services" className="relative py-24 md:py-32" style={{ background: 'var(--color-anthrazit)' }}>
      {/* Section header */}
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <div className="eyebrow mb-4">LEISTUNGEN</div>
          <h2 className="font-display text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            {t.services.title.split(' — ')[0]}
            <span className="text-gradient-gold"> — {t.services.title.split(' — ')[1]}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/60">{t.services.subtitle}</p>
        </motion.div>
      </div>

      {/* Stacking Cards */}
      <div ref={containerRef} className="mt-16 flex flex-col gap-6 px-6 lg:px-10">
        {SERVICE_KEYS.map((sk, index) => (
          <ServiceCard
            key={sk}
            serviceKey={sk}
            index={index}
            total={SERVICE_KEYS.length}
            reduced={reduced}
          />
        ))}
      </div>
    </section>
  );
}

function ServiceCard({
  serviceKey,
  index,
  total,
  reduced,
}: {
  serviceKey: ServiceKey;
  index: number;
  total: number;
  reduced: boolean;
}) {
  const { t } = useI18n();
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start center', 'end center'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], reduced ? [1, 1, 1] : [1, 1, 0.5]);
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -40]);

  const Icon = serviceIcons[serviceKey];
  const item = (t.services.items as Record<string, { title: string; desc: string }>)[serviceKey];
  const image = serviceImages[serviceKey];

  return (
    <motion.div
      ref={cardRef}
      style={{ scale, opacity, y, zIndex: index + 1 }}
      className="relative mx-auto w-full max-w-6xl"
    >
      <div
        className="group relative overflow-hidden card-glass light-sweep"
        data-cursor={t.services.details}
        style={{ borderRadius: 'var(--radius-xl)' }}
        onMouseMove={(e) => {
          if (reduced) return;
          const rect = e.currentTarget.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const yVal = (e.clientY - rect.top) / rect.height - 0.5;
          e.currentTarget.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-yVal * 5}deg)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
        }}
      >
        <div className="grid md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto" style={{ isolation: 'isolate' }}>
            <img
              src={image}
              alt={item?.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r" />
            {/* Number badge */}
            <div className="absolute left-6 top-6 font-display text-6xl font-bold text-white/10">
              0{index + 1}
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center gap-5 p-8 md:p-12">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/20 bg-gold/5">
              <Icon className="h-6 w-6 text-gold" />
            </div>
            <h3 className="font-display text-3xl font-bold text-white md:text-4xl">{item?.title}</h3>
            <p className="text-white/60 md:text-lg">{item?.desc}</p>
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="group/btn flex w-fit items-center gap-2 text-sm font-medium text-gold transition-all hover:gap-3"
            >
              {t.services.details}
              <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Gold glare on hover */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: 'radial-gradient(circle at 50% 0%, rgba(212, 168, 58, 0.08), transparent 70%)',
          }}
        />
      </div>
    </motion.div>
  );
}
