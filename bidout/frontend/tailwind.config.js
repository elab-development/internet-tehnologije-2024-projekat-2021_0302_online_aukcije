/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#204c41',
        green: '#5bbb7b',
        green_100: '#eef8f2',
        gray_100: '#6c727x',
        text: '#222222',
      },
      boxShadow: {
        s1: 'rgba(0,0,0,0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
        s2: 'rgba(0,0,0,0.16) 0px 1px 4px',
        s3: 'rgba(149,157,165,0.2) 0px 8px 24px',
      },
    },
  },
  plugins: [],
};
