import React from 'react';
import Helmet from 'react-helmet';
import useSiteMetadata from '../hooks/use-sitemetadata';

const SEO = ({ title, description, lang = 'en' }) => {
	const site = useSiteMetadata(); // Returns full object to `site`, as opposed to destructuring out the `title` and `description` like we did in footer.php
	const seo = {
		title: title || site.title,
		description: description || site.description,
	};
	return (
		<Helmet htmlAttributes={{ lang }} title={seo.title} titleTemplate={`%s | ${site.title}`}>
			<meta name="description" content={seo.description} />

			<meta name="og:title" content={seo.title} />
			<meta name="og:description" content={seo.description} />

			<meta name="twitter:title" content={seo.title} />
			<meta name="twitter:description" content={seo.description} />
		</Helmet>
	);
};

export default SEO;
