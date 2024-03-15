/* eslint-disable no-tabs */
import React from 'react'

import constants from '../../lib/constants'
import ReactTooltip from 'react-tooltip'
import { Accent } from '..'

const BEtechArray = constants.BEtechArray
const FEtechArray = constants.FEtechArray
const ideOstechArray = constants.ideOstechArray

const TechnologyStack = () => {
  return (
		<div>
			{' '}
			<h2 className='mb-3'>
				{' '}
				<Accent>Backend  </Accent> frameworks and services I preffer and mostly use{' '}
			</h2>
			<span className='flex '>
				{BEtechArray.map((tech, index) => (
					<div
						className='h-12 mb-3 gap-5 text-white text-xl lg:text-3xl mr-3'
						key={tech.name}
					>
						<tech.icon data-tip data-for={tech.name} />

						<ReactTooltip id={tech.name} type='dark' className=' bg-neutral-700'>
							<h1>Name: {tech.name}</h1>
							<p>Descripton: {tech.desc}</p>
						</ReactTooltip>
					</div>
				))}
			</span>
			<h2 className='mb-3'>
				{' '}
				<Accent>Frontend </Accent> and hybrid mobile frameworks I preffer and mostly use :
			</h2>
			<span className='flex'>
				{FEtechArray.map((tech, index) => (
					<div
						className='h-12 mb-3 gap-5 text-white text-2xl lg:text-3xl mr-3'
						key={tech.name}
					>
						<tech.icon data-tip data-for={tech.name} />

						<ReactTooltip
							id={tech.name}
							type='dark'
							className='absolute bg-neutral-700'
						>
							<h1>Name: {tech.name}</h1>
							<p>Descripton: {tech.desc}</p>
						</ReactTooltip>
					</div>
				))}
			</span>
			<h2 className='mb-3'> IDEs and OS I preffer and mostly use :</h2>
			<span className='flex'>
				{ideOstechArray.map((tech, index) => (
					<div
						className='h-12 mb-3 gap-5 text-white text-2xl lg:text-3xl mr-3'
						key={tech.name}
					>
						<tech.icon data-tip data-for={tech.name} />

						<ReactTooltip
							id={tech.name}
							type='dark'
							className='absolute bg-neutral-700'
						>
							<h1>Name: {tech.name}</h1>
							<p>Descripton: {tech.desc}</p>
						</ReactTooltip>
					</div>
				))}
			</span>
		</div>
  )
}

export default TechnologyStack
