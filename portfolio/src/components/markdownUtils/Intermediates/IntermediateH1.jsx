import ArticleHeading from "../../text/ArticleHeading";
import PropTypes from 'prop-types';

// Define the intermediate h1 component
export default function IntermediateH1({ children }) {
    return <ArticleHeading text={children} />;
}

IntermediateH1.propTypes = {
    children: PropTypes.node.isRequired, // Validate children as React nodes
};