import PropTypes from 'prop-types';

const Heading1 = ({ text }) => {
    return (
        <div className="text-4xl text-center text-black-500 font-piazzolla my-10 mx-4">{text}</div>
    );
};

Heading1.propTypes = {
    text: PropTypes.string.isRequired,
};

export default Heading1;