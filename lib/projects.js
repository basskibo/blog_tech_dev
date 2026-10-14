// Single source of truth for every project shown on the site.
// The array order is the ranking: most interesting first. The homepage and
// /routes/projects both read from here, so reorder entries to re-rank.

export const KINDS = ['AI', 'Web app', 'Tool', 'Library', 'Game']

const projects = [
	{
		slug: 'coinsel',
		post: 'building-coinsel-ai-finance',
		name: 'Coinsel',
		tagline: 'Personal finance without the spreadsheet',
		description:
			'Card payments log themselves from bank SMS, fiscal receipts are read from their QR code, bills and loans stay on track, and an AI analyst answers where the money went. PWA, Android and Linux builds.',
		highlights: ['Bank SMS → expenses', 'Fiscal receipt QR', 'Ask Coinsel AI', 'Payoff simulator'],
		tech: ['Next.js 16', 'React 19', 'Drizzle', 'Postgres', 'Gemini', 'Claude Haiku'],
		kind: 'AI',
		year: 2026,
		status: 'live',
		liveUrl: 'https://coinsel.jageticbojan.com/',
		repoUrl: null,
		image: '/images/projects/coinsel.webp',
		color: '#3ddc84',
		featured: 1
	},
	{
		slug: 'captain-cook',
		post: 'captain-cook-ai-chef',
		name: 'Captain Cook',
		tagline: 'An AI chef that cooks from your fridge',
		description:
			'Snap the fridge or say what you have, and Captain Cook suggests three dishes with step-by-step recipes and timers. Recipes stream in one by one and respect a taste profile: diet, allergies, spice and kitchen gear.',
		highlights: ['Fridge photo → ingredients', 'Voice input', 'Streaming recipes', 'Taste profile'],
		tech: ['Next.js 16', 'React 19', 'Tailwind 4', 'Motion', 'Gemini vision'],
		kind: 'AI',
		year: 2026,
		status: 'live',
		liveUrl: 'https://captain-cook.jageticbojan.com/',
		repoUrl: 'https://github.com/basskibo/Captain-Cook',
		image: '/images/projects/captain-cook.webp',
		color: '#ff7a3d',
		featured: 2
	},
	{
		slug: 'voyage-vault',
		post: 'voyage-vault-scratch-map',
		name: 'Voyage Vault',
		tagline: 'A scratch map of everywhere you have been',
		description:
			'Scratch off the countries you visited, keep a bucket list, see stats per continent and share the map with a link. Works without an account, in five languages.',
		highlights: ['Scratch-off world map', 'Bucket list', 'Stats per continent', 'Share by link'],
		tech: ['Next.js', 'TypeScript', 'Leaflet', 'Framer Motion'],
		kind: 'Web app',
		year: 2026,
		status: 'live',
		liveUrl: 'https://scratch-travel.vercel.app/map/travels',
		repoUrl: null,
		image: '/images/projects/voyage-vault.webp',
		color: '#f5c542',
		featured: 3
	},
	{
		slug: 'singularity',
		post: 'singularity-shared-mcp-notebook',
		name: 'Singularity',
		tagline: 'One shared notebook for every AI agent',
		description:
			'An MCP server and dashboard that gives Cursor, Claude Desktop, Claude Code, Codex and teammates the same notebook. Chats stay separate, decisions and notes are shared and searchable.',
		highlights: ['MCP over HTTP', 'Works with 10 agents', 'Search & remember', 'Self-hosted'],
		tech: ['Next.js', 'TypeScript', 'MCP', 'Node.js', 'systemd'],
		kind: 'AI',
		year: 2026,
		status: 'in development',
		liveUrl: null,
		repoUrl: null,
		image: null,
		color: '#9b8cff',
		spotlight: true,
		terminal: [
			'$ claude mcp add --transport http singularity',
			'✓ connected · 10 agents share one notebook',
			'> brain_search "deploy decision"',
			'  2 notes · from Cursor, Claude Desktop'
		]
	},
	{
		slug: 'ipad-hls',
		post: 'realdebrid-hls-old-ipad',
		name: 'Real-Debrid → HLS',
		tagline: 'Streaming to an iPad that time forgot',
		description:
			'A zero-dependency Node server and Stremio addon that turns Real-Debrid files into HLS on the fly with ffmpeg, so an iOS 12 iPad can play them in Safari with Japanese audio and cleaned-up English subtitles.',
		highlights: ['On-the-fly ffmpeg HLS', 'Stremio addon', 'Subtitle cleanup', 'Resume & next episode'],
		tech: ['Node.js', 'ffmpeg', 'HLS', 'Stremio addon'],
		kind: 'Tool',
		year: 2026,
		status: 'live',
		liveUrl: null,
		repoUrl: null,
		image: null,
		color: '#4cc9f0',
		spotlight: true,
		terminal: [
			'$ npm start',
			'→ http://192.168.1.29:3000/',
			'ffmpeg  hevc 10-bit → h264 · aac · jpn',
			'subs    eng (cleaned) · 3 tracks'
		]
	},
	{
		slug: 'gameroom',
		name: 'Gameroom',
		tagline: 'Browser games, nothing to install',
		description:
			'A growing collection of 3D browser games: tycoons, a world-conquest map and surprise-toy collecting. Plays on a phone or a laptop.',
		tech: ['Three.js', 'JavaScript', 'HTML'],
		kind: 'Game',
		year: 2026,
		status: 'live',
		liveUrl: 'https://gameroom.jageticbojan.com/',
		repoUrl: 'https://github.com/basskibo/Gameroom',
		image: '/images/projects/gameroom.webp',
		color: '#ff4f8b'
	},
	{
		slug: 'last-minute',
		name: 'Poslednji Trenutak',
		tagline: 'Every last-minute trip in one search',
		description:
			'Pick a destination, a month and how many people; it scrapes Serbian agencies, Booking and Airbnb (headless Chromium where needed) and sorts the offers by price or discount.',
		tech: ['Next.js', 'TypeScript', 'Playwright', 'cheerio', 'Upstash Redis'],
		kind: 'Web app',
		year: 2026,
		status: 'live',
		liveUrl: 'https://lastminutefinder.vercel.app/',
		repoUrl: 'https://github.com/basskibo/last_minute',
		image: '/images/projects/last-minute.webp',
		color: '#22d3ee'
	},
	{
		slug: 'game-deal-hub',
		name: 'Game Deal Hub',
		tagline: 'The cheapest key across stores',
		description:
			'Search a game, filter by platform and compare prices from several key stores in one list, sorted by price or discount.',
		tech: ['Python', 'Next.js', 'TypeScript', 'Tailwind'],
		kind: 'Web app',
		year: 2026,
		status: 'in development',
		liveUrl: null,
		repoUrl: null,
		image: null,
		color: '#a3e635'
	},
	{
		slug: 'ha-kiosk',
		name: 'Home Assistant kiosk',
		tagline: 'A wall dashboard for the house',
		description:
			'A custom Home Assistant dashboard built with Vite that a Raspberry Pi pulls and serves through nginx. The Pi only pulls; the token never leaves it.',
		tech: ['Vite', 'JavaScript', 'Home Assistant', 'Raspberry Pi', 'nginx'],
		kind: 'Tool',
		year: 2026,
		status: 'live',
		liveUrl: null,
		repoUrl: 'https://github.com/basskibo/HA-custom-kiosk',
		image: null,
		color: '#38bdf8'
	},
	{
		slug: 'github-top-languages',
		name: 'GitHub Top Languages',
		tagline: 'README cards, rendered on the fly',
		description: 'SVG cards for a GitHub README with your top languages and profile stats, in several themes.',
		tech: ['TypeScript', 'Node.js', 'Vercel'],
		kind: 'Tool',
		year: 2026,
		status: 'live',
		liveUrl: 'https://github-top-languages-sepia.vercel.app/api/lang.html?username=basskibo',
		repoUrl: 'https://github.com/basskibo/github-top-languages',
		image: null,
		color: '#f97316'
	},
	{
		slug: 'spotify-now-playing-card',
		name: 'Spotify Now Playing',
		tagline: 'What I am listening to, as a React component',
		description: 'A React component that shows the track currently playing on Spotify. Published on npm.',
		tech: ['React', 'TypeScript', 'SWR', 'npm'],
		kind: 'Library',
		year: 2023,
		status: 'live',
		liveUrl: 'https://www.npmjs.com/package/spotify-now-playing-card',
		liveLabel: 'npm',
		repoUrl: 'https://github.com/basskibo/spotify-listening-now',
		image: null,
		color: '#1db954'
	},
	{
		slug: 'github-user-repo-card',
		name: 'GitHub User & Repo Card',
		tagline: 'Profile and repository cards for React',
		description: 'A React component that renders a GitHub user profile or repository card. Published on npm.',
		tech: ['React', 'TypeScript', 'npm'],
		kind: 'Library',
		year: 2022,
		status: 'live',
		liveUrl: 'https://www.npmjs.com/package/github-user-repo-card',
		liveLabel: 'npm',
		repoUrl: 'https://github.com/basskibo/github-user-repo-card',
		image: null,
		color: '#e5e7eb'
	},
	{
		slug: 'network-arp-scanner',
		name: 'Network ARP scanner',
		tagline: 'Who is on my network?',
		description: 'A small Python tool that sweeps the local network over ARP and lists the devices it finds.',
		tech: ['Python', 'scapy'],
		kind: 'Tool',
		year: 2026,
		status: 'live',
		liveUrl: null,
		repoUrl: 'https://github.com/basskibo/network-arp-scanner',
		image: null,
		color: '#94a3b8'
	},
	{
		slug: 'map-tracker',
		name: 'Map Tracker',
		tagline: 'Pinned places and routes on a map',
		description: 'A Node server that returns coordinates and a Leaflet view with pins, routing, locate control and satellite layers.',
		tech: ['Node.js', 'Leaflet', 'TypeScript'],
		kind: 'Web app',
		year: 2026,
		status: 'archived',
		liveUrl: null,
		repoUrl: 'https://github.com/basskibo/leaflet-destination-map',
		image: null,
		color: '#60a5fa'
	},
	{
		slug: 'palette-generator',
		name: 'Palette Generator',
		tagline: 'A full palette from one color',
		description: 'Generates a palette of shades from a primary color. Built to try Remix.',
		tech: ['Remix', 'React', 'TypeScript', 'Tailwind'],
		kind: 'Web app',
		year: 2025,
		status: 'archived',
		liveUrl: null,
		repoUrl: 'https://github.com/basskibo/pallete_generator',
		image: null,
		color: '#e879f9'
	},
	{
		slug: 'parallax-jungle',
		name: 'Parallax Jungle',
		tagline: 'A jungle you scroll through',
		description: 'A one-page experiment with layered parallax: each layer of the jungle moves at its own depth.',
		tech: ['HTML', 'CSS', 'JavaScript'],
		kind: 'Web app',
		year: 2023,
		status: 'live',
		liveUrl: 'https://parallax-jungle.vercel.app/',
		repoUrl: 'https://github.com/basskibo/parallax-jungle',
		image: '/images/projects/parallax-jungle.webp',
		color: '#4ade80'
	},
	{
		slug: 'nestjs-jwt-auth',
		name: 'NestJS JWT auth',
		tagline: 'Auth boilerplate that is ready to fork',
		description: 'JWT authentication boilerplate in NestJS with MongoDB and Mongoose.',
		tech: ['NestJS', 'TypeScript', 'MongoDB'],
		kind: 'Library',
		year: 2023,
		status: 'live',
		liveUrl: null,
		repoUrl: 'https://github.com/basskibo/nestjs-jwt-auth-boilerplate',
		image: null,
		color: '#e0234e'
	},
	{
		slug: 'ubuntu-starter-installer',
		name: 'Ubuntu starter installer',
		tagline: 'A fresh machine in one script',
		description: 'A Bash script that installs the essential apps and services on a fresh Ubuntu install.',
		tech: ['Bash', 'Ubuntu'],
		kind: 'Tool',
		year: 2024,
		status: 'live',
		liveUrl: null,
		repoUrl: 'https://github.com/basskibo/ubuntu_starter_installer',
		image: null,
		color: '#e95420'
	},
	{
		slug: 'umami-dockerized',
		name: 'Umami, dockerized',
		tagline: 'Self-hosted analytics in one compose file',
		description: 'Umami analytics with Postgres, packaged with Docker Compose for a quick self-hosted setup.',
		tech: ['Docker', 'Postgres', 'Umami'],
		kind: 'Tool',
		year: 2024,
		status: 'live',
		liveUrl: null,
		repoUrl: 'https://github.com/basskibo/umami-dockerized',
		image: null,
		color: '#a78bfa'
	},
	{
		slug: 'js-algorithms-ts',
		name: 'JS algorithms in TypeScript',
		tagline: 'Common algorithms, solved and typed',
		description: 'Classic algorithm problems with solutions written in TypeScript.',
		tech: ['TypeScript'],
		kind: 'Library',
		year: 2022,
		status: 'archived',
		liveUrl: null,
		repoUrl: 'https://github.com/basskibo/js-algorithms-ts',
		image: null,
		color: '#3178c6'
	}
]

export default projects

export function getFeaturedProjects (list = projects) {
	return list
		.filter((project) => project.featured)
		.sort((a, b) => a.featured - b.featured)
}

export function getSpotlightProjects (list = projects) {
	return list.filter((project) => project.spotlight)
}

export function filterProjects (list, kind) {
	if (!kind || kind === 'All') return list
	return list.filter((project) => project.kind === kind)
}

export function countByKind (list = projects) {
	const counts = { All: list.length }
	for (const kind of KINDS) counts[kind] = 0
	for (const project of list) {
		if (counts[project.kind] === undefined) counts[project.kind] = 0
		counts[project.kind] += 1
	}
	return counts
}

// The link a visitor should follow first: the live app, then the code.
export function primaryLink (project) {
	if (project.liveUrl) {
		return { href: project.liveUrl, label: project.liveLabel || 'Open app' }
	}
	if (project.repoUrl) return { href: project.repoUrl, label: 'View code' }
	return null
}

export function hostOf (url) {
	if (!url) return ''
	try {
		return new URL(url).host.replace(/^www\./, '')
	} catch (error) {
		return ''
	}
}
