import PropTypes from 'prop-types';

const SmallText = ({text}) => {
    return (
        <span className=' text-lg text-left text-black-500 font-piazzolla font-light'>
            {text}
        </span>
    );
};

SmallText.propTypes = {
    text: PropTypes.string.isRequired,
};

export default SmallText;