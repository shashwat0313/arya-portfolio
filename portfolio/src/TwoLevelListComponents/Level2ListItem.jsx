import { Link } from "react-router-dom";
import { BASE_URL } from "../Constants";
import SmallText from "../components/text/SmallText";
import PropTypes from "prop-types";


export default function Level2ListItem({ l2Node }) {
    return (
        <li className="text-xl">
            <Link to={`${BASE_URL}/works/${l2Node.articleId}`} className="underline">
                <SmallText text={l2Node.title} />
            </Link>
        </li>
    );
}

Level2ListItem.propTypes = {
    l2Node: PropTypes.shape({
        title: PropTypes.string.isRequired,
        articleId: PropTypes.string.isRequired,
    }).isRequired,
};