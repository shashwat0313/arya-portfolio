import './css/ul-list.css'
import PropTypes from 'prop-types';


const TwoColumns = ({leftContent:LeftContent, rightContent:RightContent}) => {
    return (
        <div className="flex">
            <LeftContent/>
            {RightContent && <RightContent />}
        </div>
    );
};

TwoColumns.propTypes = {
    leftContent: PropTypes.elementType.isRequired,
    rightContent: PropTypes.elementType,
};

export default TwoColumns;