import PropTypes from "prop-types";
import Level1ListItem from "./Level1ListItem";

export default function Level1List({ rootNode }) {
    return (
        <ol className="custom-ol-list text-2xl">
            {rootNode.l1Nodes.map((l1Node, index) => (
                <Level1ListItem key={index} l1Node={l1Node} />
            ))}
        </ol>
    );
}

Level1List.propTypes = {
    rootNode: PropTypes.shape({
        l1Nodes: PropTypes.arrayOf(
            PropTypes.shape({
                titleLevel1: PropTypes.string.isRequired,
                l2Nodes: PropTypes.arrayOf(
                    PropTypes.shape({
                        title: PropTypes.string.isRequired,
                        articleId: PropTypes.string.isRequired,
                    }).isRequired
                ).isRequired,
            }).isRequired
        ).isRequired,
    }).isRequired,
};