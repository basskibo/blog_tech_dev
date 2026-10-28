// @vitest-environment node
const created = vi.hoisted(() => ({ handler: vi.fn(), options: null }))

vi.mock('spotify-now-playing-card', () => ({
	createSpotifyHandler: vi.fn((options) => {
		created.options = options
		return created.handler
	})
}))

describe('/api/spotify', () => {
	beforeEach(() => {
		vi.resetModules()
		vi.stubEnv('SPOTIFY_CLIENT_ID', 'id')
		vi.stubEnv('SPOTIFY_CLIENT_SECRET', 'secret')
		vi.stubEnv('SPOTIFY_REFRESH_TOKEN', 'refresh')
	})
	afterEach(() => vi.unstubAllEnvs())

	it('exports the handler built from the Spotify env credentials', async () => {
		const { default: handler } = await import('../../pages/api/spotify')
		expect(handler).toBe(created.handler)
		expect(created.options).toEqual({ clientId: 'id', clientSecret: 'secret', refreshToken: 'refresh' })
	})
})
