import React, { useState, useEffect } from 'react';
import styles from './AnimatedBat.module.scss';

export default function AnimatedBat() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isIdle, setIsIdle] = useState(false);
  const [isFlyingAway, setIsFlyingAway] = useState(false);

  useEffect(() => {
    let idleTimer;

    const handleMouseMove = (e) => {
      // Update the coordinates to exactly where the mouse is
      setPosition({ x: e.clientX, y: e.clientY });

      // If the bat was hanging, trigger the escape animation!
      if (isIdle) {
        setIsIdle(false);
        setIsFlyingAway(true);

        // Remove the flying bat from the DOM completely after 1 second
        setTimeout(() => setIsFlyingAway(false), 1000);
      }

      // Clear the previous countdown
      clearTimeout(idleTimer);

      // Start a new 10-second (10000ms) countdown
      idleTimer = setTimeout(() => {
        setIsIdle(true);
      }, 10000); 
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup the event listener and timer if the component unmounts
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(idleTimer);
    };
  }, [isIdle]);

  // If the mouse is actively moving and no bat is escaping, render nothing.
  if (!isIdle && !isFlyingAway) return null;

  return (
    <div
      className={`${styles.batWrapper} ${isFlyingAway ? styles.flyAway : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      {isIdle ? (
        /* The breathing, upside-down bat */
        <div className={styles['bat-hanging']}></div>
      ) : (
        /* The rapid flapping bat darting away */
        <div className={styles['bat-flying']}></div>
      )}
    </div>
  );
}