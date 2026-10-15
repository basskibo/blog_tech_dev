export const ai_1_questionList = [
	{
		id: 1,
		question: 'What is a token in a large language model?',
		answers: ['A secret API key', 'A chunk of text the model reads and writes', 'A database row', 'A CSS unit'],
		correctAnswer: 'A chunk of text the model reads and writes'
	},
	{
		id: 2,
		question: 'What does a higher temperature usually do to model output?',
		answers: ['Makes answers more deterministic', 'Makes sampling more random', 'Increases the context window', 'Disables the system prompt'],
		correctAnswer: 'Makes sampling more random'
	},
	{
		id: 3,
		question: 'What is retrieval-augmented generation (RAG)?',
		answers: ['Training a model from scratch on your laptop', 'Fetching relevant documents and then generating an answer from them', 'Compressing images into vectors', 'A replacement for unit tests'],
		correctAnswer: 'Fetching relevant documents and then generating an answer from them'
	},
	{
		id: 4,
		question: 'What is a hallucination?',
		answers: ['A fluent answer that is not grounded in fact', 'A successful tool call', 'A cached embedding', 'A rate-limit error'],
		correctAnswer: 'A fluent answer that is not grounded in fact'
	},
	{
		id: 5,
		question: 'What is an embedding?',
		answers: ['A vector that represents meaning for similarity search', 'The HTML of a chat widget', 'A fine-tuned checkpoint', 'A system prompt stored in the browser'],
		correctAnswer: 'A vector that represents meaning for similarity search'
	},
	{
		id: 6,
		question: 'What is a context window?',
		answers: ['The browser viewport', 'The maximum amount of text the model can consider at once', 'The number of GPUs in a cluster', 'The size of the training dataset'],
		correctAnswer: 'The maximum amount of text the model can consider at once'
	},
	{
		id: 7,
		question: 'How is prompting different from fine-tuning?',
		answers: ['Prompting updates the model weights', 'Prompting steers a fixed model; fine-tuning changes its weights', 'They are the same process', 'Fine-tuning only changes the temperature'],
		correctAnswer: 'Prompting steers a fixed model; fine-tuning changes its weights'
	},
	{
		id: 8,
		question: 'What is a system prompt for?',
		answers: ['Instructions that set the assistant’s role and rules', 'The user’s latest question only', 'A log of previous API errors', 'The vector index'],
		correctAnswer: 'Instructions that set the assistant’s role and rules'
	},
	{
		id: 9,
		question: 'What is tool calling (function calling)?',
		answers: ['The model returns a structured request for your code to run', 'The model executes SQL directly on your database', 'A way to skip the context window', 'Compressing the chat history into one token'],
		correctAnswer: 'The model returns a structured request for your code to run'
	},
	{
		id: 10,
		question: 'Why do RAG systems chunk documents?',
		answers: ['So only the relevant passages are retrieved and fit in the context window', 'To delete the original files', 'To increase temperature', 'To turn text into images'],
		correctAnswer: 'So only the relevant passages are retrieved and fit in the context window'
	}
]
