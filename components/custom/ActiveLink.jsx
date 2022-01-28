import { useRouter } from "next/router"
import clsx from "clsx"

function ActiveLink({ children, href }) {
	const router = useRouter()
	const style = {
		marginRight: 10,
		marginTop: 5,
	}

	const handleClick = (e) => {
		e.preventDefault()
		router.push(href)
	}

	return (
		<a
			href={href}
			onClick={handleClick}
			style={style}
			className={clsx(
				"font-semibold",
				router.asPath === href
					? "lg:text-transparent lg:bg-clip-text lg:bg-gradient-to-r lg:from-sky-400 to-lime-500  underline decoration-dashed decoration-sky-400 underline-offset-2"
					: "text-white"
			)}
		>
			{children}
		</a>
	)
}

export default ActiveLink
