import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import Layout from '../components/layout';

const BlogListing = () => {
	const data = useStaticQuery(graphql`
		query PostsQuery {
			allMdx(sort: { fields: frontmatter___date, order: DESC }) {
				nodes {
					frontmatter {
						slug
						title
						excerpt
						date(formatString: "MM.DD.YY")
					}
				}
			}
		}
	`);

	const posts = data.allMdx.nodes;

	return (
		<Layout>
			<h1>Blog Posts</h1>
			<hr />
			{/* {posts.map(post => {})} */}
			{posts.map(({ id, frontmatter: { title, excerpt, slug } }) => (
				<article key={id}>
					<h3>
						<Link to={`/blog/${slug}`}>{title}</Link>
					</h3>
					<p>{excerpt}</p>
				</article>
			))}
		</Layout>
	);
};

export default BlogListing;
