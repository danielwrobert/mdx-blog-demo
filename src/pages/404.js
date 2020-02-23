import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';

export default () => (
	<Layout>
		<SEO title="Not found!" />
		<h1>404</h1>
		<p>
			Page not found. Go back <Link to={'/'}>home</Link>.
		</p>
	</Layout>
);
