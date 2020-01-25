# Gatsby Basics - Course Notes

## Using the createPages API

Go back and add some notes here. Also see Level Up Tutorials: Pro Gatsby v2 notes.

## Creating Dynamic Page Templates

We can filter in GraphQL using the `eq:` (see GraphIQL). In [https://javascriptforwp.com/courses/gatsby-basics/sections/creating-dynamic-page-templates-1031/](this lesson), we demonstrate this at about 1:30 in to the video.

Here is an example of querying the slug for the value of "first-post":

```
query MyQuery {
  mdx(frontmatter: {slug: {eq: "first-post"}}) {
    frontmatter {
      title
    }
  }
}
```

We can also add variables and query dynamically:

```
query MyQuery($slug: String!) {
  mdx(frontmatter: {slug: {eq: $slug}}) {
    frontmatter {
      title
    }
  }
}
```

In the above example, we are replacing the hard-coded "first-post" value with a dynamic variable. We are stating that it expects a String and that it is required (`!`). In GraphiQL, we can set that value under the `QUERY VARIABLES` section, as follows:

```
{
  "slug": "second-post"
}
```

Back in Gatsby, we can use this by passing variables back into our template from the `gatsby-note.js` file. We do this by using React's Context API:

```
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
```

In our page templates, we don't need to use the StaticQuery like we did for our other templates/components. In our page templates, we can just export our query - when it is built GraphQL both gathers the data and then exports it.

Inside of our GraphQL data, we have a `code` option with a `body` property (which I've seen previusly in issues research). This is a function that will execute and give us the data that we need. We can't just display this funciton in our HTML so we need to modofy our query so that we can utilize the component [`MDXRenderer`](https://www.gatsbyjs.org/packages/gatsby-plugin-mdx/#mdxrenderer) that we get with MDX that will allow us to work with the code body data.


## Creating Listing Pages

The easiest way to create a listing page in Gatsby is to just make a template/page manually. Because this is a static file, we need to run our query via a static query, using the `useStaticQuery` hook.

**Static Query**

A static query is a component that uses the `useStaticQuery` hook (previously Render Props) to allow us to fetch data from our GraphQL API in Gatsby. This query can be used anywhere but it does not accept variables or any sort of parameters. In addition, it can not use `context`.

**Page Query**

A page query only works with Pages in Gatsby.