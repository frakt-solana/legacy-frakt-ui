import { useEffect, useRef } from 'react';

interface ObserverProps {
  parentRef: HTMLElement;
  childRef: HTMLElement;
  callback: () => void;
}

export default function useIntersectionObserver(
  parentRef,
  childrenRefs,
  callback,
) {
  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    const options = {
      root: parentRef.cuechange,
      rootMargin: '0px',
      threshold: 0,
    };

    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback();
        }
      });
    }, options);

    observer.current.observe(childrenRefs.current);

    return function () {
      childrenRefs.current.forEach((child) => {
        observer.current.unobserve(child);
      });
    };
  }, [callback, parentRef, childrenRefs]);
}
