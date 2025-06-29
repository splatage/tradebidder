module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',   // Vibrant blue for CTA
        secondary: '#22c55e', // Friendly green for success
        accent: '#fbbf24',    // Warm yellow accent
        neutral: '#f4f4f5',   // Soft background
        card: '#ffffff',      // Card surface
        dark: '#1e293b',      // Headings, buttons, etc.
      },
      borderRadius: {
        'xl': '1.25rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'card': '0 4px 24px 0 rgba(37,99,235,0.08)'
      }
    }
  },
  plugins: [],
}
