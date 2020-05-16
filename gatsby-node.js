const path = require('path');

// Dynamically create Post pages from markdown files.
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
			context: {
				slug: post.frontmatter.slug, // This does not necessarily have to match the `path` above. We can also pass multiple things here.
			},
		});
	});
};

// Set absolute import paths from /src
exports.onCreateWebpackConfig = ({ actions: { setWebpackConfig } }) => {
	setWebpackConfig({
		resolve: {
			modules: [path.resolve(__dirname, 'src'), 'node_modules'],
		},
	});
};
