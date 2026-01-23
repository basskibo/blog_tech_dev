// @ts-nocheck
/* eslint-disable react/react-in-jsx-scope */
/* @refresh reset */
import {
	SiJenkins,
	SiJavascript,
	SiTypescript,
	SiMarkdown,
	SiMongodb,
	SiNextdotjs,
	SiNodedotjs,
	SiRedis,
	SiReact,
	SiDocker,
	SiAmazonaws,
	SiTailwindcss,
	SiExpress,
	SiAngularjs,
	SiVisualstudiocode,
	SiWebstorm,
	SiVim,
	SiMacos,
	SiUbuntu,
	SiAnsible,
	SiRabbitmq,
	SiGnubash,
	SiNodemon,
	SiCss3,
	SiHtml5,
	SiFastify,
	SiNestjs,
	SiNpm,
	SiNx,
	SiMaterialdesign,
	SiSocketdotio,
	SiFirebase,
	SiHeroku,
	SiSencha,
	SiPostgresql,
	SiIonic,
	SiAndroid,
	SiIos,
	SiSpring
} from 'react-icons/si'
import { DiExtjs } from 'react-icons/di'
import { imageBlob } from './imgBlob'

// Icon mapping - cleaner approach using object instead of if-else chain
const iconMap: Record<string, React.ComponentType> = {
	SiGnubash: SiGnubash,
	SiNodedotjs: SiNodedotjs,
	SiExpress: SiExpress,
	SiNodemon: SiNodemon,
	SiCss3: SiCss3,
	SiHtml5: SiHtml5,
	SiJavascript: SiJavascript,
	SiNextdotjs: SiNextdotjs,
	SiReact: SiReact,
	SiTailwindcss: SiTailwindcss,
	SiNpm: SiNpm,
	SiTypescript: SiTypescript,
	SiNx: SiNx,
	SiMaterialdesign: SiMaterialdesign,
	SiAngularjs: SiAngularjs,
	SiSocketdotio: SiSocketdotio,
	SiNestjs: SiNestjs,
	SiFirebase: SiFirebase,
	SiMongodb: SiMongodb,
	SiRedis: SiRedis,
	SiDocker: SiDocker,
	SiRabbitmq: SiRabbitmq,
	SiAmazonaws: SiAmazonaws,
	SiJenkins: SiJenkins,
	SiHeroku: SiHeroku,
	SiSencha: SiSencha,
	SiPostgresql: SiPostgresql,
	SiIonic: SiIonic,
	SiIos: SiIos,
	SiAndroid: SiAndroid,
	SiSpring: SiSpring,
	DiExtjs: DiExtjs
}

// Technology type definition
interface Technology {
	name: string
	desc: string
	icon: React.ComponentType
}

// Backend technologies
const backendTechnologies: Technology[] = [
	{
		name: 'NodeJS',
		desc: 'Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser.',
		icon: SiNodedotjs
	},
	{ name: 'TypeScript', desc: 'test', icon: SiTypescript },
	{ name: 'Express', desc: 'test', icon: SiExpress },
	{ name: 'Fastify', desc: 'test', icon: SiFastify },
	{ name: 'MongoDB', desc: 'test', icon: SiMongodb },
	{ name: 'Redis', desc: 'test', icon: SiRedis },
	{ name: 'Docker', desc: 'test', icon: SiDocker },
	{ name: 'Amazon Web Services', desc: 'test', icon: SiAmazonaws },
	{ name: 'Jenkins', desc: 'test', icon: SiJenkins },
	{ name: 'RabbitMQ', desc: 'test', icon: SiRabbitmq },
	{ name: 'Ansible', desc: 'test', icon: SiAnsible }
]

// Frontend technologies
const frontendTechnologies: Technology[] = [
	{ name: 'React', desc: 'test', icon: SiReact },
	{ name: 'Nextjs', desc: 'test', icon: SiNextdotjs },
	{ name: 'Angularjs', desc: 'test', icon: SiAngularjs },
	{ name: 'React Native', desc: 'test', icon: SiReact },
	{ name: 'Markdown', desc: 'test', icon: SiMarkdown },
	{ name: 'Tailwind', desc: 'test', icon: SiTailwindcss },
	{ name: 'Material Design', desc: 'test', icon: SiMaterialdesign }
]

// IDE & OS technologies
const ideOsTechnologies: Technology[] = [
	{ name: 'IntelliJ Webstorm', desc: 'test', icon: SiWebstorm },
	{ name: 'Visual Studio Code', desc: 'test', icon: SiVisualstudiocode },
	{ name: 'Vim', desc: 'test', icon: SiVim },
	{ name: 'OSX', desc: 'test', icon: SiMacos },
	{ name: 'Ubuntu', desc: 'test', icon: SiUbuntu }
]

// Generate icon component from icon name string
const generateIcon = (iconName: string): JSX.Element => {
	const IconComponent = iconMap[iconName]
	
	if (!IconComponent) {
		console.warn(`Icon "${iconName}" not found in iconMap`)
		return <span className='text-xl text-white mr-2 mt-1' />
	}
	
	return (
		<span className='text-xl text-white mr-2 mt-1'>
			<IconComponent />
		</span>
	)
}

// Constants object
const constants = {
	CLOUDINARY_CLOUD_NAME: 'dr1sm5gnj',
	imageBlogURI: imageBlob,
	generateIcon,
	BEtechArray: backendTechnologies,
	FEtechArray: frontendTechnologies,
	ideOstechArray: ideOsTechnologies
}

export default constants
