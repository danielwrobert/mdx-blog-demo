import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';

import gatsbyAstronaut from '../images/gatsby-astronaut.png';

export default () => (
	<Layout>
		<SEO title="Welcome to our fine site!" />
		<h1>Hello world!</h1>
		<img src={gatsbyAstronaut} alt="Gatsby Astronaut" style={{ width: `500px` }} />
		<p>
			Read more <Link to={'/about'}>about me</Link>.
		</p>
	</Layout>
);
