/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';
import typography from '@tailwindcss/typography';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				display: ['Lobster', ...defaultTheme.fontFamily.sans],
				body: ['Poppins', ...defaultTheme.fontFamily.serif]
			}
		}
	},
	daisyui: {
		themes: [
			{
				light: {
					primary: '#9333ea',
					secondary: '#f97316',
					accent: '#34d399',
					neutral: '#CCCCCC',
					success: '#4ade80',
					'base-100': '#ffffff'
				}
			}
		]
	},

	plugins: [daisyui, typography]
};
