export const reactjs_1_questionList = [
	{
		'id': 1,
		'question': 'What is the virtual DOM in React?',
		'answers': ['A direct representation of the actual DOM', 'A lightweight copy of the real DOM used for reconciliation', 'A tool for server-side rendering', 'A CSS-in-JS library'],
		'correctAnswer': 'A lightweight copy of the real DOM used for reconciliation'
	},
	{
		'id': 2,
		'question': 'What is the purpose of React Hooks?',
		'answers': ['To manage state and side effects in functional components', 'To manage routing in React', 'To create class-based components', 'To handle forms in React'],
		'correctAnswer': 'To manage state and side effects in functional components'
	},
	{
		'id': 3,
		'question': 'What is the useMemo Hook used for in React?',
		'answers': ['For side effect management', 'To optimize performance by memoizing expensive calculations', 'To store state locally in a component', 'To handle asynchronous data fetching'],
		'correctAnswer': 'To optimize performance by memoizing expensive calculations'
	},
	{
		'id': 4,
		'question': 'What is the difference between useEffect and useLayoutEffect?',
		'answers': ['useEffect runs after the DOM has been painted, useLayoutEffect runs synchronously before painting', 'useEffect runs on the server, useLayoutEffect runs on the client', 'useEffect is for side effects, useLayoutEffect is for animations', 'There is no difference between the two'],
		'correctAnswer': 'useEffect runs after the DOM has been painted, useLayoutEffect runs synchronously before painting'
	},
	{
		'id': 5,
		'question': 'What is the context API in React used for?',
		'answers': ['To handle routing', 'To manage global state across components without prop drilling', 'To fetch data from an API', 'To render lists efficiently'],
		'correctAnswer': 'To manage global state across components without prop drilling'
	},
	{
		'id': 6,
		'question': 'How does the React key prop help in rendering lists?',
		'answers': ['It defines unique IDs for elements', 'It optimizes re-rendering by helping React identify which items have changed', 'It handles asynchronous data updates', 'It enables data binding between elements'],
		'correctAnswer': 'It optimizes re-rendering by helping React identify which items have changed'
	},
	{
		'id': 7,
		'question': 'What is server-side rendering (SSR) in React?',
		'answers': ['Rendering components on the server to improve SEO and performance', 'A method to store React state on the server', 'An alternative to the virtual DOM', 'A way to implement API calls in React'],
		'correctAnswer': 'Rendering components on the server to improve SEO and performance'
	},
	{
		'id': 8,
		'question': 'How can you avoid unnecessary re-renders in React?',
		'answers': ['By using state in functional components', 'By memoizing components using React.memo and using Hooks like useCallback', 'By creating higher-order components', 'By using class-based components only'],
		'correctAnswer': 'By memoizing components using React.memo and using Hooks like useCallback'
	},
	{
		'id': 9,
		'question': 'What is the purpose of the useRef hook in React?',
		'answers': ['To trigger side effects', 'To create references to DOM elements or store mutable values across renders', 'To manage global state', 'To execute asynchronous actions'],
		'correctAnswer': 'To create references to DOM elements or store mutable values across renders'
	},
	{
		'id': 10,
		'question': 'What is the difference between controlled and uncontrolled components in React?',
		'answers': ['Controlled components rely on React state, uncontrolled components rely on the DOM for state management', 'Uncontrolled components use React state, controlled components manage their state internally', 'Both controlled and uncontrolled components always use React state', 'There is no difference between them'],
		'correctAnswer': 'Controlled components rely on React state, uncontrolled components rely on the DOM for state management'
	},
	{
		'id': 11,
		'question': 'What is React.lazy used for?',
		'answers': ['For state management', 'For lazy-loading components to improve performance', 'For routing between different pages', 'For handling side effects'],
		'correctAnswer': 'For lazy-loading components to improve performance'
	},
	{
		'id': 12,
		'question': 'How does React’s reconciliation algorithm work?',
		'answers': ['It replaces the entire DOM when changes are detected', 'It compares the virtual DOM with the real DOM and updates only the changed elements', 'It synchronizes state between components', 'It merges multiple React components into a single one'],
		'correctAnswer': 'It compares the virtual DOM with the real DOM and updates only the changed elements'
	},
	{
		'id': 13,
		'question': 'What is the useReducer hook in React, and when would you use it?',
		'answers': ['It is used for conditional rendering', 'It is an alternative to useState for managing more complex state logic', 'It is a tool for CSS-in-JS solutions', 'It handles asynchronous code execution'],
		'correctAnswer': 'It is an alternative to useState for managing more complex state logic'
	},
	{
		'id': 14,
		'question': 'What is a higher-order component (HOC) in React?',
		'answers': ['A function that takes a component and returns a new component with additional functionality', 'A component that manages asynchronous data fetching', 'A utility for routing in React applications', 'A component that manages state across multiple components'],
		'correctAnswer': 'A function that takes a component and returns a new component with additional functionality'
	},
	{
		'id': 15,
		'question': 'What is PropTypes in React used for?',
		'answers': ['For rendering lists of elements', 'For validating props to ensure correct types are passed to components', 'For managing component lifecycle', 'For handling CSS styles in components'],
		'correctAnswer': 'For validating props to ensure correct types are passed to components'
	},
	{
		'id': 16,
		'question': 'How do you optimize performance in a large React application?',
		'answers': ['By breaking components into smaller pieces', 'By using class-based components only', 'By avoiding React hooks', 'By using uncontrolled components everywhere'],
		'correctAnswer': 'By breaking components into smaller pieces'
	},
	{
		'id': 17,
		'question': 'What is code splitting in React, and why is it important?',
		'answers': ['It divides code into smaller chunks for easier debugging', 'It breaks up large bundles into smaller pieces to load resources as needed, improving performance', 'It manages state across different components', 'It allows conditional rendering based on state'],
		'correctAnswer': 'It breaks up large bundles into smaller pieces to load resources as needed, improving performance'
	},
	{
		'id': 18,
		'question': 'What is React’s Concurrent Mode?',
		'answers': ['A method for managing multiple APIs at once', 'An experimental feature for making React apps more responsive by breaking rendering work into smaller units', 'A tool for managing asynchronous actions in React', 'A way to handle animations in React components'],
		'correctAnswer': 'An experimental feature for making React apps more responsive by breaking rendering work into smaller units'
	},
	{
		'id': 19,
		'question': 'What is React.Fragment used for?',
		'answers': ['To handle state in functional components', 'To wrap multiple elements without adding extra nodes to the DOM', 'To memoize a component', 'To handle side effects in class components'],
		'correctAnswer': 'To wrap multiple elements without adding extra nodes to the DOM'
	},
	{
		'id': 20,
		'question': 'What is the difference between React.Component and React.PureComponent?',
		'answers': ['React.Component uses shallow comparison, React.PureComponent always re-renders', 'React.PureComponent uses shallow comparison for props and state to prevent unnecessary re-renders', 'React.Component is for functional components, React.PureComponent is for class components', 'There is no difference between them'],
		'correctAnswer': 'React.PureComponent uses shallow comparison for props and state to prevent unnecessary re-renders'
	}
];
