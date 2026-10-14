import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'node:path'

const root = path.dirname(new URL(import.meta.url).pathname)

export default defineConfig({
	plugins: [react({ include: /\.(js|jsx)$/ })],
	esbuild: { loader: 'jsx', include: /.*\.jsx?$/, exclude: [] },
	resolve: {
		alias: {
			'@/components': path.join(root, 'components'),
			'@/customs': path.join(root, 'components/custom'),
			'@/lib': path.join(root, 'lib'),
			utils: path.join(root, 'utils')
		}
	},
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: ['./tests/setup.js'],
		include: ['tests/**/*.test.{js,jsx}'],
		css: false,
		coverage: {
			provider: 'v8',
			include: ['lib/**', 'components/jagetic/**', 'components/home/**', 'components/projects/**', 'pages/**', 'utils/**', 'services/**', 'scripts/validate-posts.js'],
			reporter: ['text-summary', 'html']
		}
	}
})
