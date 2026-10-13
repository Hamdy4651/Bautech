import { useScrollDirection } from '@/lib/hooks';

export default function ScrollProgress() {
  const { scrollProgress } = useScrollDirection();

  return (
    <div className="fixed top-0 left-0 z-[10000] h-[2px] w-full bg-transparent">
      <div
        className="h-full transition-[width] duration-75 ease-out"
        style={{
          width: `${scrollProgress * 100}%`,
          background: 'linear-gradient(90deg, var(--color-gold), var(--color-gold-bronze))',
          boxShadow: '0 0 8px rgba(212, 168, 58, 0.5)',
        }}
      />
    </div>
  );
}
