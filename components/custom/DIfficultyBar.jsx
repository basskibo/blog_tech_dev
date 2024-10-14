const DifficultyStars = ({ level }) => {
	const maxLevel = 5;

	return (
		<div className="flex space-x-1">
			{Array.from({ length: maxLevel }, (_, index) => (
				<svg
					key={index}
					xmlns="http://www.w3.org/2000/svg"
					fill={index < level ? 'yellow' : 'gray'}
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-6 h-6"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
					/>
				</svg>
			))}
		</div>
	);
};

export default DifficultyStars;
