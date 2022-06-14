import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"

import { Layout } from "../components"
import "tailwindcss/tailwind.css"
import "../styles/globals.scss"
import * as ga from "../lib/analytics"
import { motion, MotionConfig, AnimatePresence } from "framer-motion"

function IguanaDevelopmentTech({ Component, pageProps }) {
	const router = useRouter()

	useEffect(() => {
		const handleRouteChange = (url) => {
			console.log(url)
			ga.pageview(url)
		}
		router.events.on("routeChangeComplete", handleRouteChange)
		return () => {
			router.events.off("routeChangeComplete", handleRouteChange)
		}
	}, [router.events])

	return (
		<Layout>		
			<Component {...pageProps} />{" "}
		</Layout>
	)
}

export default IguanaDevelopmentTech
