import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';

const EmbeddedLink = ({ url }) => {

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [imageUrl, setImageUrl] = useState('');
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	useEffect(() => {
		const fetchOGData = async () => {
			try {
				const response = await axios.get(url, {
					headers: {
						'origin': 'https://bojanjagetic.com'
					}
				});
				const html = response.data;

				// Parse HTML content using Cheerio
				const $ = cheerio.load(html);
				const ogImage = $('meta[property="og:image"]').attr('content');
				const ogTitle = $('meta[property="og:title"]').attr('content');
				const ogDesc = $('meta[property="og:description"]').attr('content');


				setImageUrl(ogImage || '');
				setTitle(ogTitle || '');
				setDescription(ogDesc || '');
				setLoading(false);
			} catch (error) {
				setError(error);
				setLoading(false);
			}
		};

		fetchOGData();
	}, [url]);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;

	return (
		<div className="embedded-link border-2 p-5 my-3 border-neutral-800 ">

			{imageUrl && <img src={imageUrl} alt={title} className="cover-image max-w-50 w-auto h-auto" />}
			<a href={url} target="_blank" rel="noopener noreferrer" className='text-indigo-500 underline font-bold text-2xl '>
				{title && <h3>{title}</h3>}

			</a>
			{!imageUrl && !title && <p>No preview available</p>}
			<p className='my-3'>{description}</p>
			<p className='text-slate-500'>{url}</p>
		</div>
	);
};

export default EmbeddedLink;
