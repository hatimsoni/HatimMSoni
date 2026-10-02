import { useEffect } from 'react';

/** Reveal individual blocks so long mobile sections never hide their content as a group. */
export function usePageMotion(contentKey: string) {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(
      '.service-card, .faq-list > details, .section-heading, .toolkit-heading, .project-card, .about-art, .about-copy > :not(.skill-list), .skill-list > div, .timeline article, .education, .contact-copy > *, .contact-form, .footer > *',
    );
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const reveal = (element: HTMLElement) => element.classList.add('motion-visible');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          reveal(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
    targets.forEach(element => {
      element.classList.add('motion-item');
      const siblings = Array.from(element.parentElement?.children ?? []);
      element.style.setProperty('--reveal-delay', `${Math.min(siblings.indexOf(element), 3) * 75}ms`);
      if (preference.matches || element.getBoundingClientRect().bottom < 0) reveal(element);
      else observer.observe(element);
    });
    const showAll = () => { if (preference.matches) targets.forEach(reveal); };
    const showFocused = (event: FocusEvent) => {
      if (event.target instanceof Element) {
        const element = event.target.closest<HTMLElement>('.motion-item');
        if (element) reveal(element);
      }
    };
    preference.addEventListener('change', showAll);
    document.addEventListener('focusin', showFocused);
    return () => {
      observer.disconnect();
      preference.removeEventListener('change', showAll);
      document.removeEventListener('focusin', showFocused);
    };
  }, [contentKey]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const distance = document.documentElement.scrollHeight - innerHeight;
      document.documentElement.style.setProperty('--page-progress', String(distance > 0 ? Math.min(1, Math.max(0, scrollY / distance)) : 0));
      frame = 0;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const resize = new ResizeObserver(schedule);
    resize.observe(document.body);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);
}
