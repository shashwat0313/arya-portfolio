import PropTypes from "prop-types";
import Level2List from "./Level2List";
import { useEffect } from "react";

export default function Level1ListItem({ l1Node }) {
    // l1ItemBoldP
    useEffect(()=>{console.log("l1Node" + JSON.stringify(l1Node));
    }, [])

    return (
        <li className="font-piazzolla">
            {l1Node.titleLevel1}
            {l1Node.l1ItemBoldP ? (
                <p className="text-lg ml-5 font-semibold">
                    {l1Node.l1ItemBoldP}
                </p>
            ) : (
                <p></p>
            )}
            <Level2List l2Nodes={l1Node.l2Nodes} l2Type={l1Node.l2Type} />
        </li>
    );
}

Level1ListItem.propTypes = {
    l1Node: PropTypes.shape({
        titleLevel1: PropTypes.string.isRequired,
        l2Nodes: PropTypes.arrayOf(
            PropTypes.shape({
                title: PropTypes.string.isRequired,
                articleId: PropTypes.string.isRequired,
            }).isRequired
        ).isRequired,
        l2Type: PropTypes.string.isRequired,
        l1ItemBoldP: PropTypes.string, // Optional field
    }).isRequired,
};
