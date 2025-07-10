# Headles React Stacked Card Scroll

## Install

```bash
pnpm add @sist/react-stacked-card
# or
npm install @sist/react-stacked-card
# or
yarn add @sist/react-stacked-card
# or other package manager equivalent
```

## API

### Components

#### `StackedCards`

Props:

- `as?: React.ElementType = 'button'`, the element that is used to render the component, the possible value is an HTML tag, like 'a', 'p', 'div', etc.
- `topSticky?: string = '0px'`, the value for the `--top-sticky` CSS variable will be used as the CSS `top` property value. Only supports [Numbers, lengths, and percentages](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Values_and_units#numbers_lengths_and_percentages).

CSS variable:

- `--top-anchor`, the position used by the `StackedHeader` (if any) to stop.
- `--top-sticky`, the position used by the `StackedCard` to stop.

#### `StackedHeader`

Props:

- `as?: React.ElementType = 'button'`, the element that is used to render the component, the possible value is an HTML tag, like 'a', 'p', 'div', etc.

## Example

```ts
import { StackedCards, StackedHeader } from '@sist/react-stacked-card';

export function App() {
  return (
    <>
      <div style={blackBox}></div>
      <StackedCards style={stackedCards}>
        <StackedHeader as="h1" style={stickyHeader}>
          This is title
        </StackedHeader>
        <div
          style={
            {
              ...card,
              '--content-top': `calc(${0} * var(--peek-space))`,
            } as React.CSSProperties
          }
        >
          Lorem ipsum dolor sit amet, ....
        </div>
        <div
          style={
            {
              ...card,
              '--content-top': `calc(${1} * var(--peek-space))`,
            } as React.CSSProperties
          }
        >
          Lorem ipsum dolor sit amet, ....
        </div>
        <div
          style={
            {
              ...card,
              '--content-top': `calc(${2} * var(--peek-space))`,
            } as React.CSSProperties
          }
        >
          Lorem ipsum dolor sit amet, ....
        </div>
      </StackedCards>
      <div style={blackBox}></div>
    </>
  );
}

const blackBox: React.CSSProperties = {
  width: '100vw',
  height: '100vh',
  backgroundColor: '#111',
};

const stackedCards: React.CSSProperties = {
  width: '100vw',
  backgroundColor: '#fff',
  padding: '100px',
};

const stickyHeader: React.CSSProperties = {
  position: 'sticky',
  top: 'var(--top-anchor)',
  margin: 0,
  padding: '20px 0px',
};

const card: React.CSSProperties = {
  '--peek-space': '50px',
  border: '1px solid #111',
  padding: '25px',
  backgroundColor: '#fff',
  position: 'sticky',
  top: 'calc(var(--top-sticky) + var(--content-top))',
} as React.CSSProperties;
```

[StackBlitz](https://stackblitz.com/edit/vitejs-vite-6vfnu2jm)