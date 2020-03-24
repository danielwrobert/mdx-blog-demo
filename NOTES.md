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

## Adding React components to MDX Files

In this lesson we modify the `gatsby-node.js` file to add an additional config which allows us to type imports with the assumption that you're starting at the root `src/` directory. For example, this adjsutment allows you to import from `components/Shoutout` as opposed to `../../src/components/Shoutout`.

We then adjusted the MDX plugin in VC Code to read all `.md` files as `.mdx` files. This is done in the preferences (settings.json) by adding the following config:

```
	"files.associations": {
		"*md": "mdx"
	},
```

**Update:** I've removed this setting because it messes up all of the deafult MD settings, such as the Preview mode in VS Code. Can keep the plugin and, if I want to use MDX, I will name the files with that ext.

We then created a wrapper component as an example of using React Components in our MDX files.

## SEO Metadata with React Helmet

In this lesson we cover adding an SEO component and setting up our Metadata with React Helmet. A great reference point for this is the official Gatsby Starter Default starter.

## Working with Images in Gatsby

**Basic approach**

The easiest and most basic way to work with images in Gatsby is to simply import the image file and use that import as the src of an `<img>` element in your site.

```
import gatsbyAstronaut from '../images/gatsby-astronaut.png';

export default () => (
	<Layout>
		<SEO title="Welcome to our fine site!" />
		<h1>Hello world!</h1>
		<img src={gatsbyAstronaut} alt="Gatsby Astronaut" />
		<p>
			Read more <Link to={'/about'}>about me</Link>.
		</p>
	</Layout>
);
```

This is a good use case for decorative images that are a part of your site/theme - something that is actually for the design or layout itself. Not the best approach for content, however.

Another area where you would commonly use images is in your stylesheets. To do this, you just point to the relative path of your image from your stylesheet - just like you would any other basic static site:

```
.shoutout {
  /* background: lightgoldenrodyellow; */
  background: url(../images/gatsby-icon.png);
  padding: 1rem;
}
```

**Static directory**

Alternative to relative paths, you can place your images in the `/static` directory and link to them via `/`. For example, if the above astronaut image was stored in the `/static` directory, we could just use it as the image src as `/gatsby-astronaut.png` (`<img src="/gatsby-astronaut.png"/>`).

This is not the suggested best practice, however. We can do much more powerful and dynamic things with our images if Gatsby is aware of them and `/static` is just kind of a hold-all for anything you want to be dumped into the final site output.

**Gatsby Image**

Gatsby has a very powerful built-in component that allows you to work with images in a more powerful, performant way than demonstrated above. This is the Gatsby Image component.

**GraphQL**

As opposed to using relative paths to our images, we can query our images via GraphQL.

## Working with Gatsby Image

- [Docs](https://www.gatsbyjs.org/packages/gatsby-image/)
- [Demo](https://using-gatsby-image.gatsbyjs.org/)

**Note:** `gatsby-image` is not a drop-in replacement for `<img />`. It’s optimized for fixed width/height images and images that stretch the full-width of a container. Some ways you can use `<img />` won’t work with `gatsby-image`.

To set up, we need to include [gatsby-transformer-sharp](https://www.gatsbyjs.org/packages/gatsby-transformer-sharp/) and [gatsby-plugin-sharp](https://www.gatsbyjs.org/packages/gatsby-plugin-sharp/) as well, and make sure they are installed and included in your `gatsby-config` file.

```
npm install --save gatsby-image gatsby-transformer-sharp gatsby-plugin-sharp
```

Then in your `gatsby-config.js`:

```
plugins: [`gatsby-transformer-sharp`, `gatsby-plugin-sharp`]
```

With that in place, we can use the `Img` component from `gatsby-image`.