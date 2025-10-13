import React, { useEffect, useRef } from 'react';

const LatexRenderer = ({ children, display = false, className = '', style = {} }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    if (elementRef.current && window.MathJax) {
      // Clear any existing MathJax content
      elementRef.current.innerHTML = children;
      
      // Typeset the math content
      window.MathJax.typesetPromise([elementRef.current]).catch((err) => {
        console.error('MathJax typesetting error:', err);
      });
    }
  }, [children]);

  // If MathJax is not loaded yet, just render the content as-is
  if (!window.MathJax) {
    return (
      <span className={className} style={style}>
        {children}
      </span>
    );
  }

  return (
    <span 
      ref={elementRef}
      className={className}
      style={style}
    >
      {children}
    </span>
  );
};

export default LatexRenderer;
