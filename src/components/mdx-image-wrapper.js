import React from 'react';

const MDXImage = ({ float, width, margin, children }) => {
	const style = {
		float: float || 'none',
		width: width || '50%',
		margin: margin || '10px',
	};

	// return <div style={style}>{children}</div>;
	// By accessing the children of the children, we can remove the automatically-added `p` tag from the output!
	// This `p` tag is added because you need to output the markdown image with extra blank lines around it, otherwise it will output as a string.
	// See https://github.com/ChristopherBiscardi/gatsby-mdx/issues/251.
	return <div style={style}>{children.props.children}</div>;
};

export default MDXImage;
