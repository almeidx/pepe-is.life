module.exports = {
  content: ['./src/pages/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['"Noto Sans KR"', 'sans-serif'],
    },
    extend: {
      backgroundColor: {
        'discord-dark': '#202327',
        'discord-slightly-darker': '#1B1E21',
        'discord-not-quite-black': '#2f3136',
        'discord-green': '#3ea25e',
        'discord-lighter-green': '#24c558',
      },
      textColor: {
        'discord-red': '#ED4245',
      },
    },
    gridTemplateAreas: {
      // prettier-ignore
      guild: [
        'icon name join',
        'icon members join',
      ],
    },
  },
  plugins: [require('@savvywombat/tailwindcss-grid-areas')],
};
