# Headles React Stacked Card Scroll

## Install

```bash
pnpm i @sist/react-stacked-card
# or
npm i @sist/react-stacked-card
# or
npm i @sist/react-stacked-card
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

[StackBlitz](https://stackblitz.com/edit/vitejs-vite-6vfnu2jm)