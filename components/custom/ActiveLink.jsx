import { useRouter } from "next/router"
import clsx from "clsx"

function ActiveLink({ children, href, className, id }) {
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
			id={id}
			href={href}
			onClick={handleClick}
			style={style}
			className={clsx(
				"font-semibold",
				className ? className : "",
				router.asPath === href
					? " underline decoration-solid decoration-2	decoration-lime-400 underline-offset-4 "
					: "text-white"
			)}
		>
			{children}
		</a>
	)
}

export default ActiveLink
