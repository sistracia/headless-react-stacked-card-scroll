'use client';

import { createContext, useContext, useEffect, useRef } from 'react';

type StackedCardsProps<TAs extends React.ElementType> = {
    as?: TAs;
    topSticky?: string;
}

const StackedHeaderContext = createContext<React.RefObject<HTMLElement | null> | null>(
    null,
);

export function StackedCards<TAs extends React.ElementType = 'div'>({
    as: asProp,
    topSticky = '',
    children,
    ...restProps
}: StackedCardsProps<TAs> & React.ComponentPropsWithoutRef<TAs>) {
    const Component = asProp || 'div';
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
                '--top-anchor',
                `calc(var(--top-sticky) + ${totalHeight}px)`,
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

    return (
        <StackedHeaderContext.Provider value={headerRef}>
            <Component
                ref={componentRef as any}
                {...restProps}
                style={{ '--top-anchor': '0', '--top-sticky': topSticky, ...restProps.style }}
            >
                {children}
            </Component>
        </StackedHeaderContext.Provider>
    );
};

type StackedHeaderProps<TAs extends React.ElementType> = {
    as?: TAs;
}

export function StackedHeader<TAs extends React.ElementType = 'div'>({
    as: asProp,
    ...restProps
}: StackedHeaderProps<TAs> & React.ComponentPropsWithoutRef<TAs>) {
    const Component = asProp || 'div';
    const headerRef = useContext(StackedHeaderContext);

    return (
        <Component
            ref={headerRef as any}
            {...restProps}
            style={
                {
                    '--top': headerRef ? 'var(--top-sticky)' : undefined,
                    ...restProps.style,
                } as React.CSSProperties
            }
        />
    );
};
