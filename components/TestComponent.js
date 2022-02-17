export default function TestComponent({ children }) {
	return (
		<div className='prose lg:max-w-full'>
			<blockquote className='mt-0 mb-4'>
				<p className='text-slate-400 mt-0'>{children}</p>
			</blockquote>
		</div>
	)
}
