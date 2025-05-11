import PropTypes from "prop-types";
import Level2ListItem from "./Level2ListItem";

export default function Level2List({ l2Nodes, l2Type }) {

    const ListTag = l2Type

    return (
        <ListTag className={l2Type === "ol" ? "custom-ol-list" : "custom-list ml-8"}>
            {l2Nodes.map((l2Node, index) => (
                <Level2ListItem key={index} l2Node={l2Node} />
            ))}
        </ListTag>
    );
}

Level2List.propTypes = { 
    l2Nodes: PropTypes.array.isRequired, // Array of L2ListNode instances
    l2Type: PropTypes.string.isRequired
};