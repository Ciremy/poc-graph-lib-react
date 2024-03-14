import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    
      colors: {
        // -------------
        // PRINCIPAL
        // -------------
        primary: '#1C3144',
        secondary: '#346C80',
        tertiary: '#BCE8F0',
        card: '#4290A4',
        background: '#142331',
        success: '#69B876',
        danger: '#D93939',
        warn: '#FF8B1C',
        beware: '#D4BC65',
        gray: '#7E989D',
        lightgreen: '#58C5D9',
        lightblue: '#50c8ff',
        light: '#a4adb4',

        // -------------
        // DEACTIVATED
        // -------------
        successDeactivated: 'rgb(105 184 118/0.3)',
        dangerDeactivated: 'rgb(217 57 57 / 0.3)',
        bewareDeactivated: 'rgb(212 188 101/0.3)',

        // -------------
        // HOVER
        // -------------
        hoverPrimary: '#264755',
        hoverSuccess: '#569a64',
        hoverSucessDeactivated: 'rgb(105 184 118/0.5)',
        hoverDanger: '#a82e2e',
        hoverDangerDeactivated: 'rgb(217 57 57 / 0.5)',
        hoverBeware: '#b4a14d',
        hoverBewareDeactivated: 'rgb(212 188 101/0.5)',
        hoverTertiary: '#6FA2B8',
        hoverSecondary: '#4E8FA9',
        hoverLight: '#b6bfc6',
        toggleButton: '#D2D6DA',
      },
    },
  },
  plugins: [],
};
export default config;
