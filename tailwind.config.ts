import type { Config } from "tailwindcss";
const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	screens: {
  		hg: {
  			min: '1921px'
  		},
  		xgg: {
  			max: '1920px'
  		},
  		gg: {
  			max: '1739px'
  		},
  		xxl: {
  			max: '1535px'
  		},
  		xl: {
  			max: '1279px'
  		},
  		lg: {
  			max: '1023px'
  		},
  		md: {
  			max: '767px'
  		},
  		sm: {
  			max: '639px'
  		},
  		xs: {
  			max: '479px'
  		},
  		xxs: {
  			max: '364px'
  		}
  	},
  	extend: {
  		fontFamily: {
  			sansita: ["Sansita", "sans-serif"]
  		},
  		padding: {
  			default: 'var(--default-padding)'
  		},
  		colors: {
  			default: 'var(--default-color)',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			discount: 'var(--discount-color)',
  			informal: 'var(--informal-color)',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		backgroundColor: {
  			primary: 'var(--primary-color)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
