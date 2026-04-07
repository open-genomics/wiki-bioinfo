import React, {type ReactNode, useEffect, useState, useCallback} from 'react';

function ReadingProgress() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scrollTop = el.scrollTop || document.body.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      setWidth(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    };
    window.addEventListener('scroll', update, {passive: true});
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div className="progress-bar-wrap">
      <div className="progress-bar-inner" style={{width: `${width}%`}} />
    </div>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', toggle, {passive: true});
    return () => window.removeEventListener('scroll', toggle);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, []);

  return (
    <button
      className={`back-to-top-btn${visible ? ' visible' : ''}`}
      onClick={scrollToTop}
      aria-label="回到顶部"
      type="button"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m18 15-6-6-6 6" />
      </svg>
    </button>
  );
}

export default function Root({children}: {children: ReactNode}): ReactNode {
  return (
    <>
      <ReadingProgress />
      {children}
      <BackToTop />
    </>
  );
}
