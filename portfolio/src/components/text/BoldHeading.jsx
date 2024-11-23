import PropTypes from 'prop-types';

const BoldHeading = ({ text }) => {
    return (
        <div className='mx-4 font-piazzolla text-3xl font-bold'>
            {text}
        </div>
    );
};

BoldHeading.propTypes = {
    text: PropTypes.string.isRequired
};

export default BoldHeading;