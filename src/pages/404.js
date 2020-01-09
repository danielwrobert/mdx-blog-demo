import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout';

export default () => (
	<Layout>
		<h1>404</h1>
		<p>
			Page not found. Go back <Link to={'/'}>home</Link>.
		</p>
	</Layout>
);
