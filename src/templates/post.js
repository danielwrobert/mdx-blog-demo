import React from 'react';
import Layout from '../components/layout';
import { Link, graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import SEO from '../components/seo';

export const postQuery = graphql`
	query MDXQuery($slug: String!) {
		mdx(frontmatter: { slug: { eq: $slug } }) {
			frontmatter {
				title
			}
			body
		}
	}
`;

// export default ({
// 	data: {
// 		mdx: {
// 			frontmatter: { title },
// 			body: content, // renamed to content in the video but can also leave as `body` and use `body` below.
// 		},
// 	},
// }) => (
// 	<Layout>
// 		<h1>{title}</h1>
// 		<MDXRenderer>{content}</MDXRenderer>
// 	</Layout>
// );

// Same as above but a little more explicit, IMO:
export default ({ data }) => {
	const { title } = data.mdx.frontmatter;
	const { body } = data.mdx;

	return (
		<Layout>
			<SEO title={title} />
			<p>
				<Link to={'/blog/'}>&lt; Back to all posts</Link>
			</p>
			<h1>{title}</h1>
			<MDXRenderer>{body}</MDXRenderer>
		</Layout>
	);
};
