export const nodeQuestions = {
	totalQuestions: 5,
	questions: [
		{
			"id": 1,
			"question": "What is Node.js?",
			"answers": ["A JavaScript runtime environment", "A front-end framework", "A database management system", "A programming language"],
			"correctAnswer": "A JavaScript runtime environment"
		},
		{
			"id": 2,
			"question": "What does the event loop in Node.js do?",
			"answers": ["Processes incoming requests", "Handles asynchronous operations", "Manages database connections", "Creates user interfaces"],
			"correctAnswer": "Handles asynchronous operations"
		},
		{
			"id": 3,
			"question": "What is npm?",
			"answers": ["Node Package Manager", "Node Process Manager", "Node Programming Module", "Node Project Manager"],
			"correctAnswer": "Node Package Manager"
		},
		{
			"id": 4,
			"question": "What is the purpose of package.json in a Node.js project?",
			"answers": ["To store code comments", "To define project dependencies", "To manage database connections", "To specify UI layout"],
			"correctAnswer": "To define project dependencies"
		},
		{
			"id": 5,
			"question": "What is the difference between 'require' and 'import' in Node.js?",
			"answers": ["They are interchangeable", "'require' is used for built-in modules and 'import' for external modules", "'require' is for synchronous loading and 'import' for asynchronous loading", "There is no difference"],
			"correctAnswer": "'require' is used for built-in modules and 'import' for external modules"
		},
		{
			"id": 6,
			"question": "How do you handle errors in Node.js?",
			"answers": ["Using try-catch blocks", "Using if-else statements", "Using switch-case statements", "By ignoring them"],
			"correctAnswer": "Using try-catch blocks"
		},
		// {
		// 	"id": 7,
		// 	"question": "What is middleware in Node.js?",
		// 	"answers": ["A type of database", "A function that handles requests before they reach the route handler", "A front-end framework", "A security protocol"],
		// 	"correctAnswer": "A function that handles requests before they reach the route handler"
		// },
		// {
		// 	"id": 8,
		// 	"question": "What is the purpose of 'module.exports' in Node.js?",
		// 	"answers": ["To define global variables", "To export functions and objects from a module", "To import modules", "To execute a script"],
		// 	"correctAnswer": "To export functions and objects from a module"
		// },
		// {
		// 	"id": 9,
		// 	"question": "What is the role of 'body-parser' middleware in Express.js?",
		// 	"answers": ["To parse HTML responses", "To parse JSON data in request bodies", "To parse URL-encoded data in request bodies", "To handle authentication"],
		// 	"correctAnswer": "To parse JSON data in request bodies"
		// },
		// {
		// 	"id": 10,
		// 	"question": "What is the difference between 'const' and 'let' in JavaScript?",
		// 	"answers": ["They are interchangeable", "'const' is block-scoped and 'let' is function-scoped", "'const' cannot be reassigned and 'let' can", "There is no difference"],
		// 	"correctAnswer": "'const' cannot be reassigned and 'let' can"
		// },
		// {
		// 	"id": 11,
		// 	"question": "What is callback hell?",
		// 	"answers": ["A place where callbacks are used extensively", "A pattern for asynchronous code execution", "A situation where multiple nested callbacks make code hard to read and maintain", "A debugging tool"],
		// 	"correctAnswer": "A situation where multiple nested callbacks make code hard to read and maintain"
		// },
		// {
		// 	"id": 12,
		// 	"question": "What is the purpose of the 'fs' module in Node.js?",
		// 	"answers": ["To handle file system operations", "To create web servers", "To perform mathematical calculations", "To manage databases"],
		// 	"correctAnswer": "To handle file system operations"
		// },
		// {
		// 	"id": 13,
		// 	"question": "What is 'async/await' in Node.js?",
		// 	"answers": ["A method for handling synchronous code", "A way to make asynchronous code appear synchronous", "A module for encryption", "A database management system"],
		// 	"correctAnswer": "A way to make asynchronous code appear synchronous"
		// },
		// {
		// 	"id": 14,
		// 	"question": "Explain the concept of 'streams' in Node.js.",
		// 	"answers": ["A way to represent data in binary format", "A method for reading and writing data piece by piece", "A security feature", "A type of data structure"],
		// 	"correctAnswer": "A method for reading and writing data piece by piece"
		// },
		// {
		// 	"id": 15,
		// 	"question": "What is the purpose of the 'path' module in Node.js?",
		// 	"answers": ["To manipulate file paths", "To perform arithmetic calculations", "To manage HTTP requests", "To handle authentication"],
		// 	"correctAnswer": "To manipulate file paths"
		// },
		// {
		// 	"id": 16,
		// 	"question": "How can you handle environment variables in a Node.js application?",
		// 	"answers": ["By hardcoding them in the code", "By using the 'dotenv' module", "By passing them as command line arguments", "By storing them in a database"],
		// 	"correctAnswer": "By using the 'dotenv' module"
		// },
		// {
		// 	"id": 17,
		// 	"question": "What is clustering in Node.js?",
		// 	"answers": ["A way to organize code into clusters", "A technique for load balancing", "A security feature", "A database management system"],
		// 	"correctAnswer": "A technique for load balancing"
		// },
		// {
		// 	"id": 18,
		// 	"question": "What is the purpose of the 'crypto' module in Node.js?",
		// 	"answers": ["To create cryptographic hashes", "To manage user authentication", "To generate random numbers", "To manipulate strings"],
		// 	"correctAnswer": "To create cryptographic hashes"
		// },
		// {
		// 	"id": 19,
		// 	"question": "What is the role of the 'http' module in Node.js?",
		// 	"answers": ["To handle HTTP requests and responses", "To manage database connections", "To perform data validation", "To create user interfaces"],
		// 	"correctAnswer": "To handle HTTP requests and responses"
		// },
		// {
		// 	"id": 20,
		// 	"question": "Explain the concept of 'promises' in Node.js.",
		// 	"answers": ["A guarantee that a value will be available in the future", "A way to represent asynchronous operations", "A method for handling errors", "A security feature"],
		// 	"correctAnswer": "A way to represent asynchronous operations"
		// },
		// {
		// 	"id": 21,
		// 	"question": "What is the 'event loop' in Node.js?",
		// 	"answers": ["A feature for handling file I/O operations", "A process for managing asynchronous operations", "A security mechanism", "A way to manage CPU resources"],
		// 	"correctAnswer": "A process for managing asynchronous operations"
		// },
		// {
		// 	"id": 22,
		// 	"question": "What is the purpose of the 'npm' command in Node.js?",
		// 	"answers": ["To install packages and manage dependencies", "To execute JavaScript code", "To create database connections", "To perform mathematical calculations"],
		// 	"correctAnswer": "To install packages and manage dependencies"
		// },
		// {
		// 	"id": 23,
		// 	"question": "Explain the concept of middleware in Express.js.",
		// 	"answers": ["A type of database", "A function that has access to the request and response objects", "A security feature", "A method for routing HTTP requests"],
		// 	"correctAnswer": "A function that has access to the request and response objects"
		// },
		// {
		// 	"id": 24,
		// 	"question": "What is the purpose of the 'cluster' module in Node.js?",
		// 	"answers": ["To handle clustering of servers", "To manage file system operations", "To perform encryption", "To manipulate strings"],
		// 	"correctAnswer": "To handle clustering of servers"
		// },
		// {
		// 	"id": 25,
		// 	"question": "What is the role of the 'child_process' module in Node.js?",
		// 	"answers": ["To create child processes", "To manage database connections", "To handle HTTP requests and responses", "To generate random numbers"],
		// 	"correctAnswer": "To create child processes"
		// },
		// {
		// 	"id": 26,
		// 	"question": "What is the purpose of the 'dotenv' module in Node.js applications?",
		// 	"answers": ["To manage environment variables", "To handle database operations", "To perform string manipulation", "To generate cryptographic hashes"],
		// 	"correctAnswer": "To manage environment variables"
		// },
		// {
		// 	"id": 27,
		// 	"question": "What is the role of 'npm scripts' in a Node.js project?",
		// 	"answers": ["To execute shell commands", "To manage package dependencies", "To create user interfaces", "To handle HTTP requests and responses"],
		// 	"correctAnswer": "To execute shell commands"
		// },
		// {
		// 	"id": 28,
		// 	"question": "What are 'streams' in Node.js? How do they differ from traditional data handling?",
		// 	"answers": ["A way to represent data in binary format", "A method for reading and writing data piece by piece", "A type of data structure", "A technique for handling HTTP requests"],
		// 	"correctAnswer": "A method for reading and writing data piece by piece"
		// },
		// {
		// 	"id": 29,
		// 	"question": "What is the role of the 'assert' module in Node.js?",
		// 	"answers": ["To perform data validation", "To manage user authentication", "To create cryptographic hashes", "To manipulate file paths"],
		// 	"correctAnswer": "To perform data validation"
		// },
		// {
		// 	"id": 30,
		// 	"question": "Explain the concept of 'error handling' in Node.js applications.",
		// 	"answers": ["A process for managing asynchronous operations", "A technique for load balancing", "A method for handling errors", "A way to manipulate strings"],
		// 	"correctAnswer": "A method for handling errors"
		// },
		// {
		// 	"id": 31,
		// 	"question": "What is the purpose of the 'cluster' module in Node.js?",
		// 	"answers": ["To handle clustering of servers", "To manage file system operations", "To perform encryption", "To manipulate strings"],
		// 	"correctAnswer": "To handle clustering of servers"
		// },
		// {
		// 	"id": 32,
		// 	"question": "What is the role of the 'child_process' module in Node.js?",
		// 	"answers": ["To create child processes", "To manage database connections", "To handle HTTP requests and responses", "To generate random numbers"],
		// 	"correctAnswer": "To create child processes"
		// },
		// {
		// 	"id": 33,
		// 	"question": "What is the purpose of the 'dotenv' module in Node.js applications?",
		// 	"answers": ["To manage environment variables", "To handle database operations", "To perform string manipulation", "To generate cryptographic hashes"],
		// 	"correctAnswer": "To manage environment variables"
		// },
		// {
		// 	"id": 34,
		// 	"question": "What is the role of 'npm scripts' in a Node.js project?",
		// 	"answers": ["To execute shell commands", "To manage package dependencies", "To create user interfaces", "To handle HTTP requests and responses"],
		// 	"correctAnswer": "To execute shell commands"
		// },
		// {
		// 	"id": 35,
		// 	"question": "What are 'streams' in Node.js? How do they differ from traditional data handling?",
		// 	"answers": ["A way to represent data in binary format", "A method for reading and writing data piece by piece", "A type of data structure", "A technique for handling HTTP requests"],
		// 	"correctAnswer": "A method for reading and writing data piece by piece"
		// },
		// {
		// 	"id": 36,
		// 	"question": "What is the role of the 'assert' module in Node.js?",
		// 	"answers": ["To perform data validation", "To manage user authentication", "To create cryptographic hashes", "To manipulate file paths"],
		// 	"correctAnswer": "To perform data validation"
		// },
		// {
		// 	"id": 37,
		// 	"question": "Explain the concept of 'error handling' in Node.js applications.",
		// 	"answers": ["A process for managing asynchronous operations", "A technique for load balancing", "A method for handling errors", "A way to manipulate strings"],
		// 	"correctAnswer": "A method for handling errors"
		// },
		// {
		// 	"id": 38,
		// 	"question": "What are the advantages and disadvantages of using Node.js for backend development?",
		// 	"answers": ["Advantages: non-blocking I/O, scalability, rich ecosystem. Disadvantages: single-threaded nature, callback hell, less suitable for CPU-bound tasks.", "Advantages: easy to learn, wide adoption, extensive community support. Disadvantages: performance bottlenecks, limited CPU usage, callback hell."],
		// 	"correctAnswer": "Advantages: non-blocking I/O, scalability, rich ecosystem. Disadvantages: single-threaded nature, callback hell, less suitable for CPU-bound tasks."
		// },
		// {
		// 	"id": 39,
		// 	"question": "How does Node.js handle concurrency?",
		// 	"answers": ["By using an event-driven, non-blocking I/O model", "By spawning multiple threads for parallel processing", "By relying on synchronous function calls", "By delegating tasks to worker processes"],
		// 	"correctAnswer": "By using an event-driven, non-blocking I/O model"
		// },
		// {
		// 	"id": 40,
		// 	"question": "What is the role of the 'fs' module in Node.js, and what are its main functions?",
		// 	"answers": ["To perform file system operations such as reading, writing, and manipulating files", "To manage HTTP requests and responses", "To handle database connections", "To generate random numbers"],
		// 	"correctAnswer": "To perform file system operations such as reading, writing, and manipulating files"
		// },
		// {
		// 	"id": 41,
		// 	"question": "What is the difference between 'require' and 'import' in Node.js?",
		// 	"answers": ["'require' is used to import modules in CommonJS format, while 'import' is used for ES6 modules", "'require' is synchronous, while 'import' is asynchronous", "'require' is deprecated in favor of 'import'", "'import' is used for server-side code, while 'require' is used for client-side code"],
		// 	"correctAnswer": "'require' is used to import modules in CommonJS format, while 'import' is used for ES6 modules"
		// },
		// {
		// 	"id": 42,
		// 	"question": "What is the 'package.json' file in Node.js projects, and what is its significance?",
		// 	"answers": ["It is a metadata file that contains information about the project, such as dependencies, version, and scripts", "It is a configuration file for setting up server environments", "It is a cache file used by the Node.js runtime", "It is a backup file for storing project snapshots"],
		// 	"correctAnswer": "It is a metadata file that contains information about the project, such as dependencies, version, and scripts"
		// },
		// {
		// 	"id": 43,
		// 	"question": "Explain the concept of 'callback hell' in Node.js, and how can it be mitigated?",
		// 	"answers": ["Callback hell refers to the nesting of multiple callbacks, leading to unreadable and difficult-to-maintain code", "It can be mitigated by using promises, async/await, or modularizing code", "It is an error handling mechanism in Node.js", "It is a performance optimization technique"],
		// 	"correctAnswer": "Callback hell refers to the nesting of multiple callbacks, leading to unreadable and difficult-to-maintain code"
		// },
		// {
		// 	"id": 44,
		// 	"question": "What is the role of the 'http' module in Node.js, and how is it used?",
		// 	"answers": ["To create HTTP servers and handle incoming requests", "To perform cryptographic operations", "To manipulate HTML documents", "To manage file system operations"],
		// 	"correctAnswer": "To create HTTP servers and handle incoming requests"
		// },
		// {
		// 	"id": 45,
		// 	"question": "What is the purpose of the 'crypto' module in Node.js, and what are some common use cases?",
		// 	"answers": ["To provide cryptographic functionality, such as encryption, decryption, and hashing", "To manage HTTP requests and responses", "To handle database connections", "To generate random numbers"],
		// 	"correctAnswer": "To provide cryptographic functionality, such as encryption, decryption, and hashing"
		// },
		// {
		// 	"id": 46,
		// 	"question": "Explain the concept of 'middleware' in Express.js, and provide an example of its usage.",
		// 	"answers": ["Middleware functions are functions that have access to the request and response objects, and can modify them or terminate the request-response cycle", "Middleware is used for database operations in Express.js", "Middleware is a routing mechanism in Express.js", "Middleware is a security feature in Express.js"],
		// 	"correctAnswer": "Middleware functions are functions that have access to the request and response objects, and can modify them or terminate the request-response cycle"
		// },
		// {
		// 	"id": 47,
		// 	"question": "What are some popular databases used with Node.js, and why are they chosen?",
		// 	"answers": ["MongoDB, for its flexibility and scalability", "MySQL, for its relational model and ACID compliance", "PostgreSQL, for its performance and features", "Redis, for its speed and simplicity"],
		// 	"correctAnswer": "MongoDB, for its flexibility and scalability"
		// },
		// {
		// 	"id": 48,
		// 	"question": "What is the purpose of the 'path' module in Node.js, and how is it used?",
		// 	"answers": ["To handle file paths and directory paths in a platform-independent manner", "To manage HTTP requests and responses", "To manipulate strings", "To perform mathematical calculations"],
		// 	"correctAnswer": "To handle file paths and directory paths in a platform-independent manner"
		// },
		// {
		// 	"id": 49,
		// 	"question": "Explain the concept of 'event-driven programming' in Node.js, and how it differs from traditional programming paradigms.",
		// 	"answers": ["Event-driven programming is a programming paradigm where the flow of the program is determined by events, such as user actions or system events", "It differs from traditional programming paradigms, such as procedural or object-oriented programming, by focusing on responding to events rather than executing code sequentially", "It is a performance optimization technique in Node.js", "It is a security feature in Node.js"],
		// 	"correctAnswer": "Event-driven programming is a programming paradigm where the flow of the program is determined by events, such as user actions or system events"
		// },
		// {
		// 	"id": 50,
		// 	"question": "What is the purpose of the 'os' module in Node.js, and what are some common use cases?",
		// 	"answers": ["To provide information about the operating system on which the Node.js application is running", "To manage HTTP requests and responses", "To perform cryptographic operations", "To generate random numbers"],
		// 	"correctAnswer": "To provide information about the operating system on which the Node.js application is running"
		// }
			
	]

};