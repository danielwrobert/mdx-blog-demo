import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import Layout from '../components/layout';
import SEO from '../components/seo';

const Photos = () => {
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
	console.log(data);
	return (
		<Layout>
			<SEO title="Welcome to our fine site!" />
			<h1>Photos!</h1>
			<Img fixed={data.image.childImageSharp.fixed} />
			<Img fluid={data.image.childImageSharp.fluid} />
			<hr />
			<h2>Gallery</h2>
			<div className="gallery">
				{data.images.nodes.map(image => (
					<Img key={image.id} fixed={image.childImageSharp.fixed} />
				))}
			</div>
		</Layout>
	);
};

export default Photos;
