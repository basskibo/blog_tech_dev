import React from 'react'
import { Accent } from '.'
import { SiPatreon, SiBuymeacoffee } from "react-icons/si"
import BuyMeCoffee from './custom/buttons/BuyMeACoffe'

const SupportMe = () => {
	return (
		<div>
		<p className="my-5">
			If you like what I do, in order to be updated with the latest posts
			and to vote for new content, please feel free to donate whatever amount you like. Possible options are:{' '}
		</p>
	
		<ul className="flex justify-start items-center space-x-5 my-5">
			<li className="flex items-center space-x-3">
				<SiPatreon />
				<a
					href="https://www.patreon.com/bePatron?u=67759634"
					data-patreon-widget-type="become-patron-button"
					className="text-lime-500 underline decoration-dotted decoration-2 decoration-sky-400 underline-offset-4 hover:no-underline hover:cursor-ne-resize"
				>
					<Accent>Become a Patron!</Accent>
				</a>
			</li>
	
			<li className="flex items-center space-x-3">
				<SiBuymeacoffee />
				<a
					href="https://www.buymeacoffee.com/basskibo"
					target="_blank"
					rel="noreferrer"
					className="text-lime-500 underline decoration-dotted decoration-2 decoration-sky-400 underline-offset-4 hover:no-underline hover:cursor-ne-resize"
				>
					<Accent>Buy me a coffee</Accent>
				</a>
			</li>
		</ul>
	</div>
	
	)
}

export default SupportMe