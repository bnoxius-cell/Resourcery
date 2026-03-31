import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./AnimatedEye.module.scss";

export default function AnimatedEye({ isVisible, onClick }) {
  const buttonRef = useRef(null);
  const eyeRef = useRef(null);
  const upperLidRef = useRef(null);
  const maskPathRef = useRef(null);
  const blinkTl = useRef(null);

  // SVG Path Data for open and closed states
  const paths = {
    lidOpen: "M1 12C1 12 5 4 12 4C19 4 23 12 23 12",
    lidClosed: "M1 12C1 12 5 20 12 20C19 20 23 12 23 12",
    maskOpen: "M1 12C1 12 5 4 12 4C19 4 23 12 23 12V20H12H1V12Z",
    maskClosed: "M1 12C1 12 5 20 12 20C19 20 23 12 23 12V20H12H1V12Z",
  };

  // Mouse Tracking Logic
  useEffect(() => {
    const posMapper = gsap.utils.mapRange(-100, 100, 30, -30);
    let resetCall;

    const handleMouseMove = (e) => {
      if (resetCall) resetCall.kill();
      
      resetCall = gsap.delayedCall(2, () => {
        gsap.to(eyeRef.current, { xPercent: 0, yPercent: 0, duration: 0.2 });
      });

      if (!buttonRef.current) return;
      const bounds = buttonRef.current.getBoundingClientRect();
      
      gsap.set(eyeRef.current, {
        xPercent: gsap.utils.clamp(-30, 30, posMapper(bounds.x - e.clientX)),
        yPercent: gsap.utils.clamp(-30, 30, posMapper(bounds.y - e.clientY)),
      });
    };

    window.addEventListener("pointermove", handleMouseMove);
    return () => {
      window.removeEventListener("pointermove", handleMouseMove);
      if (resetCall) resetCall.kill();
    };
  }, []);

  // Open/Close Morphing and Blinking Logic
  useEffect(() => {
    const duration = 0.05;
    
    const shouldClose = isVisible;

    const startBlinking = () => {
      if (shouldClose) return; 

      const delay = gsap.utils.random(2, 8);
      const blinkDuration = 0.05;
      const repeat = Math.random() > 0.5 ? 3 : 1;

      blinkTl.current = gsap.timeline({
        delay,
        onComplete: startBlinking,
        repeat,
        yoyo: true,
      })
      .to(upperLidRef.current, { attr: { d: paths.lidClosed }, duration: blinkDuration }, 0)
      .to(maskPathRef.current, { attr: { d: paths.maskClosed }, duration: blinkDuration }, 0);
    };

    if (blinkTl.current) blinkTl.current.kill();

    if (shouldClose) {
      gsap.to(upperLidRef.current, { attr: { d: paths.lidClosed }, duration });
      gsap.to(maskPathRef.current, { attr: { d: paths.maskClosed }, duration });
    } else {
      gsap.to(upperLidRef.current, { attr: { d: paths.lidOpen }, duration });
      gsap.to(maskPathRef.current, { attr: { d: paths.maskOpen }, duration, onComplete: startBlinking });
    }

    return () => {
      if (blinkTl.current) blinkTl.current.kill();
    };
  }, [isVisible, paths.lidOpen, paths.lidClosed, paths.maskOpen, paths.maskClosed]);

  return (
    <button
      ref={buttonRef}
      type="button"
      className={styles['animated-eye-btn']}
      onClick={onClick}
      title={isVisible ? "Hide Password" : "Reveal Password"}
      aria-pressed={isVisible}
    >
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <mask id="eye-mask-state">
            <path
              ref={maskPathRef}
              d={paths.maskClosed}
              fill="#D9D9D9"
              stroke="black"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </mask>
        </defs>

        <path
          ref={upperLidRef}
          className="lid lid--upper"
          d={paths.lidClosed}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        <path
          className="lid lid--lower"
          d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        <g mask="url(#eye-mask-state)">
          <g className={styles.eye} ref={eyeRef}>
            <circle cy="12" cx="12" r="4" fill="currentColor" />
            <circle cy="11" cx="13" r="1" fill="white" className={styles['eye-glint']} />
          </g>
        </g>
      </svg>
      <span className={styles['sr-only']}>Reveal Password</span>
    </button>
  );
}