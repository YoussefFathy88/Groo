/** @type {import('tailwindcss').Config} */
// Tokens from docs/designs/style-guide.md (Direction 1 "Chunky Play").
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        green: { DEFAULT: '#15A655', dark: '#157A42', tint: '#E8F7EE', line: '#A9E3C0' },
        amber: { DEFAULT: '#EE9603', dark: '#C97C00', ink: '#2A1A00' },
        ink: '#1F2A24',
        muted: '#6B7570',
        line: '#E5E5E5',
        banner: { DEFAULT: '#FFF6E0', line: '#FFE2A3' },
      },
      // Each weight is its own font family so it works the same on web and native.
      fontFamily: {
        medium: ['BalooBhaijaan2_500Medium'],
        semibold: ['BalooBhaijaan2_600SemiBold'],
        bold: ['BalooBhaijaan2_700Bold'],
        extrabold: ['BalooBhaijaan2_800ExtraBold'],
      },
    },
  },
  plugins: [],
};
