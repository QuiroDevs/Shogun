import React, { useEffect, useRef } from 'react'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AnimatedTitle = ({ title, containerClass = '' }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: '100 bottom',
          end: 'center bottom',
          toggleActions: 'play none none reverse'
        }
      });

      titleAnimation.to('.animated-word', {
        opacity: 1,
        transform: 'translate3d(0,0,0) rotateY(0deg) rotateX(0deg)',
        ease: 'power2.inOut',
        stagger: 0.02,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`animated-title special-font text-center ${containerClass}`}
    >
      {title.split('<br />').map((line, index) => (
        <div
          key={index}
          className="flex justify-center items-center max-w-full flex-wrap gap-[1px] px-6 md:gap-[2px]"
        >
          {[...line.matchAll(/(<b>.*?<\/b>|.)/g)].map((match, i) => (
            <span
              key={i}
              className="animated-word mr-1 tracking-tighter"
              dangerouslySetInnerHTML={{ __html: match[0] }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default AnimatedTitle;
