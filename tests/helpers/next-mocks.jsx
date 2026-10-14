// Shared next/* doubles for component tests. Import this module's factories
// from inside vi.mock(...) calls:
//   vi.mock('next/link', async () => (await import('../../helpers/next-mocks')).linkMock)
import React from 'react'

export const push = vi.fn()

export const routerMock = {
	useRouter: () => ({ asPath: '/', pathname: '/', query: {}, push, events: { on: vi.fn(), off: vi.fn() } })
}

export const linkMock = {
	__esModule: true,
	default: React.forwardRef(function Link ({ href, children, prefetch, ...rest }, ref) {
		return <a ref={ref} href={typeof href === 'string' ? href : href?.pathname} {...rest}>{children}</a>
	})
}

export const imageMock = {
	__esModule: true,
	default: function Image ({ src, alt, fill, priority, ...rest }) {
		// eslint-disable-next-line @next/next/no-img-element
		return <img src={typeof src === 'string' ? src : src?.src} alt={alt} {...rest} />
	}
}
