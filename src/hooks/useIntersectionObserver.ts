import { useEffect, useRef } from 'react';

interface ObserverProps {
  parentRef: HTMLElement;
  childRef: HTMLElement;
  callback: () => void;
}

export default function useIntersectionObserver(parentRef, childRef, callback) {
  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    const options = {
      root: parentRef.cuechange,
      rootMargin: '0px',
      threshold: 0,
    };

    observer.current = new IntersectionObserver(([target]) => {
      if (target.isIntersecting) {
        callback();
      }
    }, options);

    observer.current.observe(childRef.current);

    return function () {
      observer.current.unobserve(childRef.current);
    };
  }, [callback, parentRef, childRef]);
}
