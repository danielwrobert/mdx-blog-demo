const path = require('path');

exports.createPages = async ({ graphql, actions: { createPage }, reporter }) => {
	const postsQuery = await graphql(`
		query {
			allMdx {
				nodes {
					id
					frontmatter {
						slug
					}
				}
			}
		}
	`);

	if (postsQuery.errors) {
		reporter.panic('unable to create page', postsQuery.errors);
	}

	const posts = postsQuery.data.allMdx.nodes;
	posts.forEach(post => {
		createPage({
			path: `/blog/${post.frontmatter.slug}`,
			component: require.resolve(`./src/templates/post.js`),
		});
	});
};
