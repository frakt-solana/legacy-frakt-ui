import { useEffect, useRef } from 'react';

interface ChildrenRefs {
  sectionRef: { current: HTMLParagraphElement };
}

export default function useIntersectionObserver(
  parentRef?: { current: HTMLParagraphElement },
  childrenRefs?: ChildrenRefs[],
  callback?: (currentItemId: string) => void,
): void {
  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    const options = {
      root: parentRef?.current || null,
      rootMargin: '0px',
      threshold: 1,
    };

    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback && callback(entry.target.textContent);
        }
      });
    }, options);

    childrenRefs?.forEach((child) => {
      child.sectionRef && observer.current.observe(child.sectionRef.current);
    });

    return function () {
      childrenRefs.forEach((child) => {
        child.sectionRef &&
          observer.current.unobserve(child.sectionRef.current);
      });
    };
  }, [callback, parentRef, childrenRefs]);
}
