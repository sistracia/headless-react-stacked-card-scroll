"use client";

import { createContext, useContext, useEffect, useRef } from "react";

const StackedHeaderContext =
  createContext<React.RefObject<HTMLElement | null> | null>(null);

export type StackedCardsProps<TAs extends React.ElementType> = {
  as?: TAs;
  topSticky?: string;
};

export function StackedCards<TAs extends React.ElementType = "div">({
  as: asProp,
  topSticky: topStickyProp = "0px",
  children,
  ...restProps
}: StackedCardsProps<TAs> & React.ComponentPropsWithoutRef<TAs>) {
  const Component = asProp || "div";
  const componentRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const updateHeight = () => {
      if (!headerRef.current || !componentRef.current) {
        return;
      }

      const computedStyle = window.getComputedStyle(headerRef.current);
      const headerHeight = headerRef.current.offsetHeight;

      const marginTop = parseFloat(computedStyle.marginTop);
      const marginBottom = parseFloat(computedStyle.marginBottom);

      const totalHeight = headerHeight + marginTop + marginBottom;
      componentRef.current.style.setProperty(
        "--top-sticky",
        `calc(var(--top-anchor) + ${totalHeight}px)`,
      );
    };

    updateHeight();

    let rAF = 0;
    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(rAF);
      rAF = window.requestAnimationFrame(updateHeight);
    });

    if (headerRef.current) {
      resizeObserver.observe(headerRef.current);
    }

    return () => {
      window.cancelAnimationFrame(rAF);
      resizeObserver.disconnect();
    };
  }, []);

  const topSticky = Number.isNaN(Number(topStickyProp))
    ? topStickyProp
    : `${topStickyProp}px`;

  return (
    <StackedHeaderContext.Provider value={headerRef}>
      <Component
        ref={componentRef}
        {...restProps}
        style={{
          "--top-anchor": topSticky,
          "--top-sticky": topSticky,
          ...restProps.style,
        }}
      >
        {children}
      </Component>
    </StackedHeaderContext.Provider>
  );
}

export type StackedHeaderProps<TAs extends React.ElementType> = {
  as?: TAs;
};

export function StackedHeader<TAs extends React.ElementType = "div">({
  as: asProp,
  ...restProps
}: StackedHeaderProps<TAs> & React.ComponentPropsWithoutRef<TAs>) {
  const Component = asProp || "div";
  const headerRef = useContext(StackedHeaderContext);

  return <Component ref={headerRef} {...restProps} />;
}
