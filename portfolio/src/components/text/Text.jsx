import PropTypes from 'prop-types';

const TextParagraph = ({text}) => {
    return (
        <div className=' text-2xl  text-lg-max-w text-left text-black-500 font-piazzolla font-light'>
            <p>{text}</p>
            <br></br>
        </div>
    );
};

TextParagraph.propTypes = {
    text: PropTypes.string.isRequired,
};

export default TextParagraph;