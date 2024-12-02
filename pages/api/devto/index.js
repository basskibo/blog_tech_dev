// File: pages/api/devto.js
export default async function handler(req, res) {
	if (req.method === 'GET') {
		try {
			const response = await fetch('https://dev.to/api/articles/me/published', {
				headers: {
					'Content-Type': 'application/json',
					'api-key': process.env.DEVTO_API_KEY, // Store your Dev.to API key in an environment variable
				},
			});

			if (!response.ok) {
				throw new Error(`Error fetching data: ${response.status}`);
			}

			const articles = await response.json();

			// Sort articles by page_views_count in descending order
			const sortedArticles = articles.sort((a, b) => b.page_views_count - a.page_views_count);

			// Extract the top 3 articles with relevant fields
			const topArticles = sortedArticles.slice(0, 3).map(article => ({
				title: article.title,
				pageViews: article.page_views_count,
				url: article.url,
				publicReactions: article.public_reactions_count,
				img: article.cover_image
			}));

			res.status(200).json(topArticles );
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Failed to fetch or process data from Dev.to' });
		}
	} else {
		res.status(405).json({ error: 'Method Not Allowed' });
	}
}
