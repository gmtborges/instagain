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
					primary: '#8b5cf6',
					secondary: '#E66643',
					accent: '#43E6B3',
					neutral: '#CCCCCC',
					'base-100': '#FFFFFF'
				}
			}
		]
	},

	plugins: [daisyui, typography]
};
