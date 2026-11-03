export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          DEFAULT: '#0D9488',
          dark: '#0F766E',
          deep: '#115E59',
          light: '#CCFBF1',
          50: '#F0FDFA',
        },
        info: {
          DEFAULT: '#2563EB',
          dark: '#1D4ED8',
          light: '#DBEAFE',
        },
        canvas: '#F8FAFC',
        ink: {
          DEFAULT: '#1E293B',
          muted: '#64748B',
        },
        line: '#E2E8F0',
        success: {
          DEFAULT: '#16A34A',
          dark: '#15803D',
          light: '#DCFCE7',
        },
        warning: {
          DEFAULT: '#F59E0B',
          dark: '#B45309',
          light: '#FEF3C7',
        },
        danger: {
          DEFAULT: '#DC2626',
          dark: '#B91C1C',
          light: '#FEE2E2',
        },
      },
      fontSize: {
        display: ['42px', { lineHeight: '50px', letterSpacing: '-0.02em' }],
        title: ['36px', { lineHeight: '44px', letterSpacing: '-0.02em' }],
        section: ['28px', { lineHeight: '36px', letterSpacing: '-0.01em' }],
        card: ['21px', { lineHeight: '28px' }],
        'body-lg': ['18px', { lineHeight: '28px' }],
        body: ['17px', { lineHeight: '26px' }],
        button: ['19px', { lineHeight: '24px' }],
        value: ['46px', { lineHeight: '52px', letterSpacing: '-0.02em' }],
      },
      boxShadow: {
        card: '0 1px 2px rgba(15, 23, 42, 0.04), 0 6px 20px rgba(15, 23, 42, 0.06)',
        dialog: '0 24px 64px rgba(15, 23, 42, 0.24)',
      },
    },
  },
};
