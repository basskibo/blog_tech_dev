// Single source of truth for everything shown on the Projects page and on the landing page.
// When you add a project, add it here; blog posts link to it via `project: "<slug>"` in their frontmatter
// (and multi-part write-ups additionally use `series`, `seriesTitle` and `seriesPart`).

export type ProjectCategory = 'web' | 'mobile' | 'desktop' | 'games' | 'libraries'

export type ProjectStatus = 'Live' | 'In development' | 'Released' | 'Personal tool'

export type ProjectLink = {
	label: string
	href: string
}

export type Project = {
	slug: string
	name: string
	tagline: string
	description: string
	category: ProjectCategory
	tech: string[]
	highlights: string[]
	status: ProjectStatus
	year: string
	featured?: boolean
	image?: string | null
	liveUrl?: string | null
	repoUrl?: string | null
	extraLinks?: ProjectLink[]
}

export const projectCategories: { id: ProjectCategory | 'all'; label: string }[] = [
	{ id: 'all', label: 'All' },
	{ id: 'web', label: 'Web apps' },
	{ id: 'mobile', label: 'Mobile' },
	{ id: 'desktop', label: 'Desktop & Linux' },
	{ id: 'games', label: 'Games' },
	{ id: 'libraries', label: 'Libraries & tools' }
]

export const projects: Project[] = [
	{
		slug: 'coinsel',
		name: 'Coinsel',
		tagline: 'Personal finance without the spreadsheet',
		description:
			'Log small expenses in two seconds, keep bills, loans and debts under control, and let an AI analyst tell you where the money goes. Started as Buddy Bill, grew into a full web + Android app.',
		category: 'web',
		tech: ['Next.js 16', 'React 19', 'Tailwind CSS 4', 'Drizzle ORM', 'Postgres (Neon)', 'PGlite', 'Capacitor', 'Gemini / Claude Haiku', 'Playwright'],
		highlights: [
			'Quick add that reads "coffee 250, groceries 1,800" as three expenses',
			'Scans Serbian payment-slip and fiscal-receipt QR codes',
			'Until-payday budget, bill calendar, budget and price-rise alerts',
			'Android app with widget, biometrics and local notifications'
		],
		status: 'Live',
		year: '2025 – 2026',
		featured: true,
		image: '/images/projects/coinsel.webp',
		liveUrl: 'https://buddy-bill-eight.vercel.app/',
		repoUrl: null
	},
	{
		slug: 'scranton-branch',
		name: 'Scranton Branch',
		tagline: 'A 3D office where AI agents do real work',
		description:
			'A low-poly 3D office where Claude agents write proposals and replies from your own files, and your live Claude Code sessions (plus Cursor, Codex, Gemini CLI and OpenCode) each get a desk you can click into.',
		category: 'desktop',
		tech: ['Node.js', 'Three.js', 'Claude Code', 'Agent skills'],
		highlights: [
			'Live view of every coding-agent session: tool, file, tokens, timeline',
			'Writing desks that only use figures from your own data',
			'Any skill folder becomes a job desk from jobs.json',
			'Read-only, nothing leaves your machine'
		],
		status: 'In development',
		year: '2026',
		featured: true,
		image: '/images/projects/scranton-branch.webp',
		liveUrl: null,
		repoUrl: null
	},
	{
		slug: 'gameroom',
		name: 'Gameroom',
		tagline: 'Browser games, zero installs',
		description:
			'A growing collection of browser games built with plain HTML and Three.js, no build step: idle tycoons, a card table, a map strategy and arcade action, sharing one small SDK for sound, effects and i18n.',
		category: 'games',
		tech: ['JavaScript', 'Three.js', 'HTML5', 'Playwright'],
		highlights: [
			'Cargo Hub, Sawmill Tycoon, Camp Tycoon, Conquer the World and more',
			'Every game is a single static page',
			'Shared SDK for audio, effects and translations (EN / SR)'
		],
		status: 'Live',
		year: '2026',
		featured: true,
		image: '/images/projects/gameroom.webp',
		liveUrl: 'https://gameroom.jageticbojan.com/',
		repoUrl: null
	},
	{
		slug: 'dynamic-island',
		name: 'Dynamic Island for GNOME',
		tagline: 'An iOS-style live island for the Linux desktop',
		description:
			"A GNOME Shell extension that shows what's playing (Spotify, YouTube in the browser, any MPRIS player), plus volume, brightness, charger and download progress. Hover to expand, click to open the player.",
		category: 'desktop',
		tech: ['GJS', 'GNOME Shell', 'MPRIS', 'GSettings'],
		highlights: [
			'Floating or inside the top bar, even wrapped around the clock',
			'Six visualizer styles with configurable colour',
			'Published on extensions.gnome.org'
		],
		status: 'Released',
		year: '2026',
		featured: true,
		image: 'https://github.com/user-attachments/assets/39bb63b9-f8fb-444c-bd9d-0f3f877631af',
		liveUrl: 'https://extensions.gnome.org/extension/11268/dynamic-island/',
		repoUrl: 'https://github.com/basskibo/linux_dynamic_island'
	},
	{
		slug: 'captain-cook',
		name: 'Captain Cook',
		tagline: 'A personal AI cook in your pocket',
		description:
			'Mark what you have in the kitchen (or just photograph the fridge) and Captain Cook suggests three dishes with step-by-step recipes, a hands-free cooking mode and a shopping list.',
		category: 'web',
		tech: ['Next.js 16', 'React 19', 'Tailwind CSS 4', 'Motion', 'Gemini', 'Claude Haiku', 'Resend'],
		highlights: [
			'Fridge photo and voice input to pick ingredients',
			'Recipes stream in one by one, first in about two seconds',
			'Cooking mode with timers taken straight from the steps'
		],
		status: 'Live',
		year: '2026',
		image: '/images/projects/captain-cook.webp',
		liveUrl: 'https://captain-cook.vercel.app/',
		repoUrl: 'https://github.com/basskibo/Captain-Cook'
	},
	{
		slug: 'minim-launcher',
		name: 'Minim',
		tagline: 'An ad-free, iOS-inspired Android launcher',
		description:
			'A modern Android launcher with no INTERNET permission: squircle icons, jiggle-to-edit, App Library, folders, search with a calculator, and a Live Island for music, timers, calls and navigation.',
		category: 'mobile',
		tech: ['Kotlin', 'Jetpack Compose', 'Android'],
		highlights: [
			'Live Island built on notification access',
			'App Library with auto folders and an A–Z rail',
			'Nothing ever leaves the phone'
		],
		status: 'In development',
		year: '2026',
		image: '/images/projects/minim-launcher.webp',
		liveUrl: null,
		repoUrl: null
	},
	{
		slug: 'switchboard',
		name: 'Switchboard',
		tagline: 'All your mail and chats in one window',
		description:
			'A desktop app that puts every web mail and chat service in one window, with unread counts in the tray, a calendar from iCal exports and an end-to-end encrypted setup sync between my computers over the local network.',
		category: 'desktop',
		tech: ['Electron', 'Node.js', 'ical.js'],
		highlights: ['One window for every inbox and chat, grouped Work / Personal', 'Calendar from iCal exports', 'LAN pairing with a 6-digit code (SPAKE2) and AES-GCM sync'],
		status: 'Personal tool',
		year: '2026',
		image: null,
		liveUrl: null,
		repoUrl: null
	},
	{
		slug: 'nautag',
		name: 'Nautag',
		tagline: 'Finder-style colour tags for Nautilus',
		description:
			'Right-click a file in GNOME Files, pick a colour, get a dot next to its name and a tag list in the sidebar. Tags live on the file as extended attributes, so they survive renames and moves.',
		category: 'desktop',
		tech: ['Python', 'nautilus-python', 'GTK', 'xattr'],
		highlights: ['Seven Finder colours, on one or many files', 'Tags in the sidebar', 'Compatible with Dolphin tags'],
		status: 'Released',
		year: '2026',
		image: '/images/projects/nautag.webp',
		liveUrl: null,
		repoUrl: 'https://github.com/basskibo/nautag'
	},
	{
		slug: 'last-minute',
		name: 'Last Minute Finder',
		tagline: 'Last-minute stays and packages in one search',
		description:
			'Enter a destination, a month and the number of people; the app collects offers from several sources live and sorts them by price or discount.',
		category: 'web',
		tech: ['Next.js', 'TypeScript', 'Cheerio', 'Playwright', 'Upstash Redis', 'Radix UI'],
		highlights: ['No database: live scraping with short-lived cache', 'Each source fails independently', 'Headless browser where plain fetch is blocked'],
		status: 'Live',
		year: '2026',
		image: null,
		liveUrl: 'https://lastminutefinder.vercel.app/',
		repoUrl: 'https://github.com/basskibo/last_minute'
	},
	{
		slug: 'mactahoe-setup',
		name: 'MacTahoe setup for Ubuntu',
		tagline: 'A macOS Tahoe look for Ubuntu in one command',
		description:
			"Installs vinceliuice's MacTahoe theme with my own shell and GTK4 overrides, fonts, blur, wallpapers and Dynamic Island, plus an optional login-screen script.",
		category: 'desktop',
		tech: ['Bash', 'GNOME', 'CSS'],
		highlights: ['One install script', 'Translucent GTK4 apps with blur', 'Matching GDM login screen'],
		status: 'Released',
		year: '2026',
		image: null,
		liveUrl: null,
		repoUrl: 'https://github.com/basskibo/ubuntu_mactahoe_theme'
	},
	{
		slug: 'spotify-now-playing-card',
		name: 'Spotify Now Playing Card',
		tagline: 'npm package: show what you are listening to',
		description:
			'A React + TypeScript component that displays your currently playing Spotify track, extracted from this site into a reusable npm package with a small setup CLI.',
		category: 'libraries',
		tech: ['React', 'TypeScript', 'SWR', 'Rollup', 'npm'],
		highlights: ['Drop-in React component', 'Fully typed, customizable styling', 'Setup CLI for Spotify credentials'],
		status: 'Released',
		year: '2026',
		image: 'https://res.cloudinary.com/dr1sm5gnj/image/upload/v1769036892/random/538839449-c45b2c72-e2e2-4888-9b47-fa6a3c443c9f_statno.png',
		liveUrl: 'https://www.npmjs.com/package/spotify-now-playing-card',
		repoUrl: null,
		extraLinks: [{ label: 'Library page', href: '/libary/spotify-listen-now-card' }]
	},
	{
		slug: 'network-arp-scanner',
		name: 'Network ARP Scanner',
		tagline: 'Find every device on your network',
		description: 'A Python ARP scanner that lists devices on the local network and resolves vendors from the IEEE OUI database, locally or online.',
		category: 'libraries',
		tech: ['Python', 'Rich', 'ARP'],
		highlights: ['Vendor lookup from the IEEE database', 'Works offline with a local copy'],
		status: 'Released',
		year: '2026',
		image: null,
		liveUrl: null,
		repoUrl: 'https://github.com/basskibo/network-arp-scanner'
	},
	{
		slug: 'voyage-vault',
		name: 'Voyage Vault',
		tagline: 'Interactive travel scratch map',
		description:
			'Create a personalized scratch travel map, track visited countries and share your adventures with friends, no sign-up required.',
		category: 'web',
		tech: ['Next.js', 'React', 'TypeScript', 'Leaflet', 'Framer Motion', 'Vercel'],
		highlights: ['Scratch countries on an interactive map', 'Share your progress with a link'],
		status: 'Live',
		year: '2026',
		image: 'https://res.cloudinary.com/dr1sm5gnj/image/upload/v1768492935/scratchTravel/pexels-miroalt-176400_fc5g7h.jpg',
		liveUrl: 'https://scratch-travel.vercel.app/',
		repoUrl: null
	},
	{
		slug: 'game-deal-hub',
		name: 'Game Deal Hub',
		tagline: 'Best game deals across stores',
		description: 'Search games and compare prices across several key stores, filtered by platform and sorted by price or discount.',
		category: 'web',
		tech: ['Python', 'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Railway'],
		highlights: ['Multiple stores in one search', 'Filter by platform'],
		status: 'In development',
		year: '2026',
		image: 'https://images.pexels.com/photos/2708981/pexels-photo-2708981.jpeg',
		liveUrl: 'https://gamedealhub.vercel.app/',
		repoUrl: null
	},
	{
		slug: 'remix-pallete-generator',
		name: 'Palette Generator',
		tagline: 'Colour palettes from one primary colour',
		description: 'Pick a primary colour and get accent, analogous, triadic and split-complementary palettes, one click to copy.',
		category: 'web',
		tech: ['Remix', 'React', 'TypeScript', 'Tailwind CSS'],
		highlights: ['Complementary schemes from a single colour', 'Copy hex codes with one click'],
		status: 'Live',
		year: '2025',
		image: 'https://res.cloudinary.com/dr1sm5gnj/image/upload/v1769695596/igutech/post_data/Screenshot_from_2026-01-29_14-12-39_nablzm.png',
		liveUrl: 'https://pallete-generator.vercel.app/',
		repoUrl: 'https://github.com/basskibo/pallete_generator'
	}
]

export const featuredProjects = projects.filter((p) => p.featured)

export const getProject = (slug?: string | null) => projects.find((p) => p.slug === slug)
