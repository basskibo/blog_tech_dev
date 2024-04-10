export const generateRandomQuestionList = (questions) => {

	// Function to shuffle an array
	function shuffle(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]]
		}
		return array
	}

	// Generate an array of indices from 0 to 49
	const indices = Array.from({ length: 50 }, (_, index) => index)

	// Shuffle the indices
	const shuffledIndices = shuffle(indices)

	// Select the first 10 indices
	const selectedIndices = shuffledIndices.slice(0, 10)

	// Get the corresponding questions using the selected indices
	const selectedQuestions = selectedIndices.map(index => questions[index])

	// Output the selected questions
	// console.log(selectedQuestions);
	return selectedQuestions
}

