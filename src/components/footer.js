import React from 'react';
import useSiteMetadata from '../hooks/use-sitemetadata';

const Footer = () => {
	const { title, description } = useSiteMetadata();

	return (
		<footer>
			<hr />
			<p>
				Proudly powered by Gatsby. Copyright {title} - {description}
			</p>
		</footer>
	);
};

export default Footer;
