const plugin = require("tailwindcss/plugin");
const fs = require("fs");
const postcss = require("postcss");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx,svg}",
  ],
  important: '.vuefinder',
  darkMode: 'class',
  theme: {
    extend: {},
    // fontSize: {
    //   xs: ['0.75em', { lineHeight: '1em' }],
    //   sm: ['0.875em', { lineHeight: '1.25em' }],
    //   base: ['1em', { lineHeight: '1.5em' }],
    //   lg: ['1.125em', { lineHeight: '1.75em' }],
    //   xl: ['1.25em', { lineHeight: '1.75em' }],
    //   '2xl': ['1.5em', { lineHeight: '2em' }],
    //   '3xl': ['1.875em', { lineHeight: '2.25em' }],
    //   '4xl': ['2.25em', { lineHeight: '2.5em' }],
    //   '5xl': ['3em', { lineHeight: '1' }],
    //   '6xl': ['3.75em', { lineHeight: '1' }],
    //   '7xl': ['4.5em', { lineHeight: '1' }],
    //   '8xl': ['6em', { lineHeight: '1' }],
    //   '9xl': ['8em', { lineHeight: '1' }],
    // },
    fontSize: {
      xs: ['12px', { lineHeight: '16px' }],
      sm: ['14px', { lineHeight: '20px' }],
      base: ['16px', { lineHeight: '24px' }],
      lg: ['18px', { lineHeight: '28px' }],
      xl: ['20px', { lineHeight: '28px' }],
      '2xl': ['24px', { lineHeight: '32px' }],
      '3xl': ['30px', { lineHeight: '36px' }],
      '4xl': ['36px', { lineHeight: '40px' }],
      '5xl': ['48px', { lineHeight: '1' }],
      '6xl': ['60px', { lineHeight: '1' }],
      '7xl': ['72px', { lineHeight: '1' }],
      '8xl': ['96px', { lineHeight: '1' }],
      '9xl': ['128px', { lineHeight: '1' }],
    },
    spacing: {
      "0": "0px",
      "1": "4px",
      "2": "8px",
      "3": "12px",
      "4": "16px",
      "5": "20px",
      "6": "24px",
      "7": "28px",
      "8": "32px",
      "9": "36px",
      "10": "40px",
      "11": "44px",
      "12": "48px",
      "14": "56px",
      "16": "64px",
      "20": "80px",
      "24": "96px",
      "28": "112px",
      "32": "128px",
      "36": "144px",
      "40": "160px",
      "44": "176px",
      "48": "192px",
      "52": "208px",
      "56": "224px",
      "60": "240px",
      "64": "256px",
      "72": "288px",
      "80": "320px",
      "96": "384px",
      "px": "1px",
      "0.5": "2px",
      "1.5": "6px",
      "2.5": "10px",
      "3.5": "14px"
    }
  },
  plugins: [
    /* Preflight but limit to only apply our components */
    // https://github.com/tailwindlabs/tailwindcss/discussions/10332#discussioncomment-4699227
    plugin(({ addBase }) => {
      const preflightStyles = postcss.parse(
        fs.readFileSync(require.resolve('./src/assets/css/preflight.css'), "utf8")
      )

      // Scope the selectors to specific components
      preflightStyles.walkRules((rule) => {
        rule.selector = rule.selectors
          .map(selector => ".vuefinder " + selector)
          .join(",");
      });

      addBase(preflightStyles.nodes)
    })
  ],
  corePlugins: {
    preflight: false,
  }
}
