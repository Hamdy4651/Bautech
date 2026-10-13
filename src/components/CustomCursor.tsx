import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hoverText, setHoverText] = useState('');
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (hidden) setHidden(false);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }

      const target = e.target as HTMLElement;
      const cursorAttr = target.closest('[data-cursor]') as HTMLElement | null;
      setHoverText(cursorAttr?.dataset.cursor || '');
    };

    const onLeave = () => setHidden(true);

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`;
      }
      raf = requestAnimationFrame(animateRing);
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, [hidden]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed z-[9999] h-2 w-2 rounded-full"
        style={{
          background: 'var(--color-gold)',
          marginLeft: '-4px',
          marginTop: '-4px',
          opacity: hidden ? 0 : 1,
          transition: 'opacity 0.2s',
        }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed z-[9998] flex items-center justify-center rounded-full"
        style={{
          width: hoverText ? '80px' : '36px',
          height: hoverText ? '80px' : '36px',
          marginLeft: hoverText ? '-40px' : '-18px',
          marginTop: hoverText ? '-40px' : '-18px',
          border: '1px solid rgba(212, 168, 58, 0.4)',
          background: hoverText ? 'rgba(212, 168, 58, 0.1)' : 'transparent',
          backdropFilter: hoverText ? 'blur(4px)' : 'none',
          opacity: hidden ? 0 : 1,
          transition: 'width 0.3s, height 0.3s, margin 0.3s, opacity 0.2s, background 0.3s',
          fontSize: '0.7rem',
          fontWeight: 500,
          color: 'var(--color-gold)',
          whiteSpace: 'nowrap',
        }}
      >
        {hoverText}
      </div>
    </>
  );
}
