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

### Static Query

A static query is a component that uses the `useStaticQuery` hook (previously Render Props) to allow us to fetch data from our GraphQL API in Gatsby. This query can be used anywhere but it does not accept variables or any sort of parameters. In addition, it can not use `context`.

### Page Query

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

### Basic approach

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

The two approaches above are the best way to include images for anything that has to do with the theme or development of your site.

### Static directory

Alternative to relative paths, you can place your images in the `/static` directory and link to them via `/`. For example, if the above astronaut image was stored in the `/static` directory, we could just use it as the image src as `/gatsby-astronaut.png` (`<img src="/gatsby-astronaut.png"/>`).

This is not the suggested best practice, however. We can do much more powerful and dynamic things with our images if Gatsby is aware of them and `/static` is just kind of a hold-all for anything you want to be dumped into the final site output.

### Gatsby Image

Gatsby has a very powerful built-in component that allows you to work with images in a more powerful, performant way than demonstrated above. This is the Gatsby Image component.

### GraphQL	

As opposed to using relative paths to our images, we can query our images via GraphQL. This is a bit more standard than just linking to the images directly (as shown in the first example) because once Gatsby is aware of our images in our system, it can handle a lot of automation and processing to optimize performance.

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

Lastly, we need to set the file location and query for the images, in the same way we did with our blog content MDX files:

```
{
	resolve: `gatsby-source-filesystem`,
	options: {
		name: `images`,
		path: `${__dirname}/src/images`,
	},
},
```

### Fragments

Gatsby has some GraphQL fragments that are available to us by default that we can take advantage of. These are reusable pieces of GraphQL that are really helpful.

### Querying

Once we're set up, we can get a bunch of extra data (`srcset`, webp formats, SVG traces, etc.) from Gatsby Image. We can query our images to get this data from GraphQL.

Query example:

```
query ImageQuery {
  file(relativePath: {eq: "gatsby-astronaut.png"}) {
    id
    childImageSharp {
      sizes {
        src
      }
    }
  }
}
```
OR
```
query ImageQuery {
  file(relativePath: {eq: "gatsby-astronaut.png"}) {
    id
    childImageSharp {
      fixed {
        src
        srcSet
      }
      fluid {
        src
        srcSet
      }
    }
  }
}
```

Note that Gatsby already knows where the images are located because we set that up in our `gatsby-config.js` file. The above are some common queries we might use to grab fixed and/or fluid images, as well as just direct query to an image.

Now we can use this to load images into actual components to be used on our site.

### Photos example

In the example, we create a new component and import the `useStaticQuery` hook to pull our above data from GraphQL. One handy thing to note is that, above we have the `file` data. We can rename that in our query to `image` (as follows) so that when we go to access our data, we can do so by `data.image`, which is more intuitive.

```
query ImageQuery {
	image: file(relativePath: {eq: "gatsby-astronaut.png"}) {
		id
		childImageSharp {
			fixed {
				src
				srcSet
			}
			fluid {
				src
				srcSet
			}
		}
	}
}
```

With our data, we can plug into Gatsby Image. This component takes in a bunch of properties that are worth looking into [at the documentation](https://www.gatsbyjs.org/packages/gatsby-image/#gatsby-image-props).

In this example we cover `fixed` and `fluid` props, as shown from our query above.

The `fixed` prop is going to output a set width and the `fluid` prop will set the image to be 100% of it's container.

Instead of hardcoding the data we need, as we did above, we can use the provided Gatsby Transformer Sharp [fragments from Gatsby Image](https://www.gatsbyjs.org/packages/gatsby-image/#gatsby-transformer-sharp). There are a bunch of handy props from className to [color filters](https://www.gatsbyjs.org/packages/gatsby-image/#query) - worth checking out!

the th this in mind, the above query shoudld be re-written as follows:

```
query ImageQuery {
	image: file(relativePath: {eq: "gatsby-astronaut.png"}) {
		id
		childImageSharp {
			fixed {
				...GatsbyImageSharpFixed
			}
			fluid {
				...GatsbyImageSharpFluid
			}
		}
	}
}
```

This ensures that the Gatsby Image component will get all of the specific data that it wansts/expects.

### Fixed

We can optionally pass in a set width to the `fixed` query, which will ensure that the width is fixed to that size:

```
query ImageQuery {
	image: file(relativePath: {eq: "gatsby-astronaut.png"}) {
		id
		childImageSharp {
			fixed( width: 400 ) {
				...GatsbyImageSharpFixed
			}
			fluid {
				...GatsbyImageSharpFluid
			}
		}
	}
}
```

### Fluid

If you change the `Img` prop from `fixed` to `fluid`, you'll see that the image will always be set to 100% of it's container, as noted above.

Another nice thing is that these will be optimized for device width. If you are on a large screen, it will provide a larger image. If you're on a smaller screen, it will serve a smaller image.

### Multiple Images

Sometimes you want to get multiple images, for example a photo gallery. To do this, you can adjust your query to run against all files, instead of a single file. You can then filter by the relative directory path so you only get the images you want.

```
const data = useStaticQuery(graphql`
	query ImageQuery {
		images: allFile(filter: { relativeDirectory: { eq: "gallery" } }) {
			nodes {
				id
				childImageSharp {
					fixed(width: 200, height: 200) {
						...GatsbyImageSharpFixed
					}
				}
			}
		}
		image: file(relativePath: { eq: "allie-smith.jpg" }) {
			id
			childImageSharp {
				fixed(width: 400, duotone: { highlight: "#ff0000", shadow: "#ffffff" }) {
					...GatsbyImageSharpFixed
				}
				fluid {
					...GatsbyImageSharpFluid
				}
			}
		}
	}
`);
```

With these queries in place, we can map over our images for the `images` query or output a single image with the `image` query:

```
// Single image (one fixed, one fluid):
<Img fixed={data.image.childImageSharp.fixed} />
<Img fluid={data.image.childImageSharp.fluid} />

// Multiple images;
{data.images.nodes.map(image => (
	<Img key={image.id} fixed={image.childImageSharp.fixed} />
))}
```

## Images in Markdown

To use images in our Markdown, we'll need to install the `gatsby-remark-images` plugin (see [plugin page](https://www.gatsbyjs.org/packages/gatsby-remark-images/)).

```
npm install --save gatsby-remark-images gatsby-plugin-sharp
```

With that installed, we need to go into our config file. Instead of configuring a new plugin, we'll update our confguration for Gatsby MDX (`gatsby-plugin-mdx`).

We can update our Gatsby Plugin MDX configuration by adding the following to the `options` object (underneath `extensions` - see [the plugin docs](https://www.gatsbyjs.org/packages/gatsby-plugin-mdx/#gatsby-remark-plugins) for additional options/details):

```
gatsbyRemarkPlugins: [
	{
		resolve: `gatsby-remark-images`,
		options: {
			maxWidth: 590,
		},
],
	},
```

In addition to the `maxWidth` in the example above, there are a bunch of other configuration options that are listed in [the documentation](https://www.gatsbyjs.org/packages/gatsby-remark-images/#options) for the `gatsby-remark-images` plugin.

With the above in place, we can import our images directly, as follows:

```
![White and Yellow Flowers](./images/allie-smith.jpg)
```

We may, however, wish to have a little more control over our image options. In this case, we can create an image wrapper component (see `src/components/mdx-image-wrapper.js`):

```
import React from 'react';

const MDXImage = ({ float, width, margin, children }) => {
	const style = {
		float: float || 'none',
		width: width || '50%',
		margin: margin || '10px',
	};
	console.log(children);

	return <div style={style}>{children.props.children}</div>;
};

export default MDXImage;
```

There are a couple of things to note about the above:

First of all, why are we outputting `children.props.children`?

This is because, when you add the image wrapper, you need to add an additional space before and after the markdown for the image, otherwise it will output that markdown as a string. Because of these extra spaces, the output will wrap the image in an additional `<p>` tag.

Another improtant thing to note is that you do not want to indent the markdown for the image, otherwise it will be treated as `<code>` and output as text.

So with the above component, you can use it as follows:

```
import MDXImage from 'components/mdx-image-wrapper';

<MDXImage float="right" width="200px" margin="0 0 10px 10px">

![White and Yellow Flowers](./images/allie-smith.jpg)

</MDXImage>
```

Notice the extra lines between the component tag and the markdown text. Also notice the lack of indentation to the markdown text.