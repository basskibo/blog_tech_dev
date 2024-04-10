import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const ParticlesBackground = () => {
	const particlesInit = useCallback(async engine => {

		await loadSlim(engine);
	}, []);

	const particlesLoaded = useCallback(async container => {
		console.log(container);
	}, []);

	return (
		<Particles
			id="tsparticles"
			init={particlesInit}
			loaded={particlesLoaded}
			options={{
				background: {
				},
				fpsLimit: 120,
				interactivity: {
					events: {
						onClick: {
							enable: true,
							mode: "push",
						},
						onHover: {
							enable: false,
							mode: "repulse",
						},
						resize: true,
					},
					modes: {
						push: {
							quantity: 1,
						},
						repulse: {
							distance: 100,
							duration: 0.3,
						},
					},
				},
				particles: {
					color: {
						value: "#c1c1c1",
					},
					links: {
						color: "#c2c2c2",
						distance: 200,
						enable: true,
						opacity: 0.3,
						width: 0.5,
					},
					move: {
						direction: "none",
						enable: true,
						outModes: {
							default: "bounce",
						},
						random: false,
						speed: 4,
						straight: false,
					},
					number: {
						density: {
							enable: true,
							area: 1200,
						},
						value: 50,
					},
					opacity: {
						value: 0.3,
					},
					shape: {
						type: "circle",
					},
					size: {
						value: { min: 1, max: 3 },
					},
				},
				detectRetina: true,
			}}
		/>
	);
};
export default ParticlesBackground