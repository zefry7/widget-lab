import React, { RefObject, useEffect } from 'react';

const useScroll: React.FC<RefObject<HTMLDivElement>> = (ref) => {
  useEffect(() => {
    let isDown = false;
    let scrollLeft = 0;
    let startX = 0;

    const handleMouseDown = (e) => {
      isDown = true;
      startX = e.pageX;
      scrollLeft = ref.current.scrollLeft;
    };
    const handleMouseUp = () => {
      isDown = false;
    };
    const handleMouseMove = (e) => {
      e.preventDefault();
      if (isDown) {
        const x = e.pageX;
        const walk = (x - startX) * 2;
        ref.current.scrollLeft = scrollLeft - walk;
      }
    };

    if (ref.current) {
      ref.current.addEventListener('mousedown', handleMouseDown);
      ref.current.addEventListener('mouseup', handleMouseUp);
      ref.current.addEventListener('mouseleave', handleMouseUp);
      ref.current.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (ref.current) {
        ref.current.removeAttribute('mousedown');
        ref.current.removeAttribute('mouseup');
        ref.current.removeAttribute('mouseleave');
        ref.current.removeAttribute('mousemove');
      }
    };
  }, []);

  return null;
};

export default useScroll;
