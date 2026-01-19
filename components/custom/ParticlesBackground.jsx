import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const ParticlesBackground = () => {
	const particlesInit = useCallback(async engine => {

		await loadSlim(engine);
	}, []);

	const particlesLoaded = useCallback(async container => {}, []);

	return (
		<Particles
			id="tsparticles"
			init={particlesInit}
			loaded={particlesLoaded}
			options={{
				background: {
				},
				fpsLimit: 60, // Reduced from 120 to 60 for better performance
				pauseOnBlur: true, // Pause when tab is not visible
				pauseOnOutsideViewport: true, // Pause when outside viewport
				interactivity: {
					events: {
						onClick: {
							enable: false,
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
						color: "#fff",
						distance: 200, // Reduced from 300
						enable: true,
						opacity: 0.2, // Reduced from 0.3
						width: 0.5,
					},
					move: {
						direction: "none",
						enable: true,
						outModes: {
							default: "bounce",
						},
						random: false,
						speed: 2, // Reduced from 4
						straight: false,
					},
					number: {
						density: {
							enable: true,
							area: 2000, // Increased area to reduce density
						},
						value: 8, // Reduced from 15 to 8
					},
					opacity: {
						value: 0.4, // Reduced from 0.5
					},
					shape: {
						type: "circle",
					},
					size: {
						value: { min: 1, max: 2 },
					},
				},
				detectRetina: false, // Disabled for better performance
			}}
		/>
	);
};
export default ParticlesBackground