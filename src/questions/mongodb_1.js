export const mongodb_1_questionList = [
	{
		'id': 1,
		'question': 'What is MongoDB?',
		'answers': ['A NoSQL database', 'A relational database', 'A front-end framework', 'A file storage system'],
		'correctAnswer': 'A NoSQL database'
	},
	{
		'id': 2,
		'question': 'How does MongoDB store data?',
		'answers': ['In tables with rows and columns', 'In flat files', 'In JSON-like documents within collections', 'In XML format'],
		'correctAnswer': 'In JSON-like documents within collections'
	},
	{
		'id': 3,
		'question': 'What is the purpose of a replica set in MongoDB?',
		'answers': ['To create indexes on documents', 'To improve read and write performance', 'To ensure high availability through data replication', 'To structure data in a normalized format'],
		'correctAnswer': 'To ensure high availability through data replication'
	},
	{
		'id': 4,
		'question': 'What is the MongoDB aggregation framework used for?',
		'answers': ['To update documents in bulk', 'To create indexes', 'To perform complex data transformations and analysis', 'To handle database transactions'],
		'correctAnswer': 'To perform complex data transformations and analysis'
	},
	{
		'id': 5,
		'question': 'What is a sharded cluster in MongoDB?',
		'answers': ['A cluster used for read operations only', 'A cluster for managing indexes', 'A method of partitioning data across multiple servers to handle large datasets', 'A way to replicate data across multiple regions'],
		'correctAnswer': 'A method of partitioning data across multiple servers to handle large datasets'
	},
	{
		'id': 6,
		'question': 'What is the purpose of an index in MongoDB?',
		'answers': ['To enforce schema rules', 'To improve query performance by allowing fast lookups', 'To replicate data across multiple nodes', 'To perform bulk inserts'],
		'correctAnswer': 'To improve query performance by allowing fast lookups'
	},
	{
		'id': 7,
		'question': 'What is the difference between MongoDB’s find() and aggregate() methods?',
		'answers': ['find() is for basic queries, aggregate() is for more complex data processing and transformations', 'find() is used for writes, aggregate() for reads', 'find() is for indexed collections, aggregate() is for non-indexed collections', 'There is no difference'],
		'correctAnswer': 'find() is for basic queries, aggregate() is for more complex data processing and transformations'
	},
	{
		'id': 8,
		'question': 'What does the term "schema-less" mean in the context of MongoDB?',
		'answers': ['Documents must follow a strict schema', 'There is no enforced structure on the documents stored in collections', 'Indexes are not allowed', 'Documents must be structured with foreign keys and joins'],
		'correctAnswer': 'There is no enforced structure on the documents stored in collections'
	},
	{
		'id': 9,
		'question': 'What is the purpose of the ObjectId type in MongoDB?',
		'answers': ['To serve as a unique identifier for each document', 'To enforce relationships between collections', 'To define the structure of a document', 'To replicate data across shards'],
		'correctAnswer': 'To serve as a unique identifier for each document'
	},
	{
		'id': 10,
		'question': 'How do transactions work in MongoDB?',
		'answers': ['They allow multiple operations to be executed with rollback support in the event of failure', 'They allow data to be locked for exclusive read access', 'They enforce strong consistency across replica sets', 'They are used only for reading data'],
		'correctAnswer': 'They allow multiple operations to be executed with rollback support in the event of failure'
	},
	{
		'id': 11,
		'question': 'What is a capped collection in MongoDB?',
		'answers': ['A collection with fixed size that overwrites oldest documents when the limit is reached', 'A collection that only allows reading', 'A collection that is replicated across multiple regions', 'A collection with enforced schema validation'],
		'correctAnswer': 'A collection with fixed size that overwrites oldest documents when the limit is reached'
	},
	{
		'id': 12,
		'question': 'What is the difference between horizontal and vertical scaling in MongoDB?',
		'answers': ['Horizontal scaling involves adding more CPU power, vertical scaling involves adding more servers', 'Horizontal scaling adds more servers, vertical scaling increases hardware resources on the same server', 'Horizontal scaling refers to adding indexes, vertical scaling to adding collections', 'There is no difference'],
		'correctAnswer': 'Horizontal scaling adds more servers, vertical scaling increases hardware resources on the same server'
	},
	{
		'id': 13,
		'question': 'What is the use of the $lookup operator in MongoDB?',
		'answers': ['To filter documents in a collection', 'To perform a join operation between two collections', 'To sort documents based on a field', 'To update documents in bulk'],
		'correctAnswer': 'To perform a join operation between two collections'
	},
	{
		'id': 14,
		'question': 'How does MongoDB achieve high availability?',
		'answers': ['By using indexes', 'By using sharded clusters', 'By using replica sets that automatically failover', 'By storing data in a single server'],
		'correctAnswer': 'By using replica sets that automatically failover'
	},
	{
		'id': 15,
		'question': 'What is the difference between MongoDB and a relational database?',
		'answers': ['MongoDB uses tables, relational databases use collections', 'MongoDB enforces a strict schema, relational databases do not', 'MongoDB stores data in documents, relational databases store data in rows and columns', 'There is no difference between them'],
		'correctAnswer': 'MongoDB stores data in documents, relational databases store data in rows and columns'
	},
	{
		'id': 16,
		'question': 'What is GridFS in MongoDB?',
		'answers': ['A system to shard collections', 'A file storage specification for storing large files across multiple documents', 'A query optimization tool', 'A way to manage replica sets'],
		'correctAnswer': 'A file storage specification for storing large files across multiple documents'
	},
	{
		'id': 17,
		'question': 'What is the purpose of the $match stage in the aggregation pipeline?',
		'answers': ['To perform write operations', 'To filter documents based on a condition', 'To create indexes on collections', 'To handle transactions'],
		'correctAnswer': 'To filter documents based on a condition'
	},
	{
		'id': 18,
		'question': 'What is the WiredTiger storage engine in MongoDB?',
		'answers': ['An indexing engine for fast lookups', 'The default storage engine that provides compression and concurrency control', 'A query optimization engine', 'A file storage system'],
		'correctAnswer': 'The default storage engine that provides compression and concurrency control'
	},
	{
		'id': 19,
		'question': 'What is the purpose of MongoDB’s $unwind operator?',
		'answers': ['To group documents based on a specific field', 'To flatten arrays from input documents to output one document per element', 'To create an index', 'To update multiple documents in bulk'],
		'correctAnswer': 'To flatten arrays from input documents to output one document per element'
	},
	{
		'id': 20,
		'question': 'How does MongoDB handle consistency in a replica set?',
		'answers': ['It provides eventual consistency by replicating data asynchronously across nodes', 'It enforces strict consistency by default', 'It uses foreign keys and joins', 'It requires transactions to ensure consistency'],
		'correctAnswer': 'It provides eventual consistency by replicating data asynchronously across nodes'
	}
];
