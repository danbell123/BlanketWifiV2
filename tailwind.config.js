
const config = {
  darkMode: 'class', // Use 'media' or 'class'
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "background": "hsl(var(--background))",
        "foreground": "hsl(var(--foreground))",
        "card": "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",  // Enclosed in quotes
        "popover": "hsl(var(--popover))",
        "popover-foreground": "hsl(var(--popover-foreground))",  // Enclosed in quotes
        "primary": "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",  // Enclosed in quotes
        "secondary": "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",  // Enclosed in quotes
        "muted": "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",  // Enclosed in quotes
        "accent": "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",  // Enclosed in quotes
        "destructive": "hsl(var(--destructive))",
        "destructive-foreground": "hsl(var(--destructive-foreground))",  // Enclosed in quotes
        "border": "hsl(var(--border))",
        "input": "hsl(var(--input))",
        "ring": "hsl(var(--ring))",
    },
    
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config