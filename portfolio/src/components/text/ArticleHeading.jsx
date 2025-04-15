import BoldHeading from "./BoldHeading";
import PropTypes from 'prop-types';

export default function ArticleHeading({ text }) {
    return (
        <>
            <br></br>
                <BoldHeading text={text} />
            <br></br>
        </>
    );
}

ArticleHeading.propTypes = {
    text: PropTypes.string.isRequired
};