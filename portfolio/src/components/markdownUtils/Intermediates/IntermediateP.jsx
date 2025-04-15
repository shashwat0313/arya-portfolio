import TextParagraph from "../../text/TextParagraph";
import PropTypes from "prop-types";
import React from "react";

// Define the intermediate p component
export default function IntermediateP({ children }) {

    // Hanlding 1 - fail
    // Ensure children is rendered correctly whether it's a string or an array
    // const content = Array.isArray(children) ? children.join('') : children;
    
    // handling 2 - fail
    // const content = React.Children.toArray(children);

    // Handling 3 - okay for now. we remove all non-string elements and join the strings
    // Filter out non-string elements and join the strings
    const content = React.Children.toArray(children)
        .filter((child) => typeof child === "string") // Keep only strings
        .join(""); // Combine strings into a single string

    console.log('IntermediateP component rendered with content:', content);
    return <TextParagraph text={content} />;
}

IntermediateP.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string, // When children is plain text
        PropTypes.arrayOf(PropTypes.node), // When children contains nested elements
    ]).isRequired,
};