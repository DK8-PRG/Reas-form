import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
  --color-primary-50: #e0f2fe;
  --color-primary-100: #bae6fd;
  --color-primary-200: #7dd3fc;
  --color-primary-300: #38bdf8;
  --color-primary-400: #0ea5e9;
  --color-primary-500: #0284c7; /* primary main */
  --color-primary-600: #0369a1;
  --color-primary-700: #075985;
  --color-primary-800: #0c4a6e;
  --color-primary-900: #0a364a;

  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-200: #e5e7eb;
  --color-gray-300: #d1d5db;
  --color-gray-400: #9ca3af;
  --color-gray-500: #6b7280; /* gray main */
  --color-gray-600: #4b5563;
  --color-gray-700: #374151;
  --color-gray-800: #1f2937;
  --color-gray-900: #111827;

  --border-radius-sm: 5px;
  --border-radius-md: 7px;
  --border-radius-lg: 9px;

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);

  --font-size-xl: 2.5rem;
  --font-size-lg: 2rem;
  --font-size-md: 1.5rem;
  --font-size-sm: 1.2rem;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html {
  font-size: 62.5%;
}

body {
  font-family: "Poppins", sans-serif;
  color: var(--color-gray-900);
  background-color: var(--color-gray-50);
  line-height: 1.5;
  font-size: 1.6rem;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--color-primary-500);
  outline-offset: -1px;
}

`;

export default GlobalStyles;
