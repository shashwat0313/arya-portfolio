import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SmallText from '../text/SmallText';
import { BASE_URL } from '../../Constants';

const UnorderedListLevel2 = ({ unorderedListLevel2Items }) => {
    return (
        <ul className="custom-list ml-8">
            {unorderedListLevel2Items.map((unorderedListLevel2Item)=>{
                <li className="text-xl"> 
                    <Link to={`${BASE_URL}/works/${unorderedListLevel2Item.articleId}`} className="underline"> 
                        <SmallText text={unorderedListLevel2Item.listText} />
                    </Link> 
                </li>
            })}
        </ul>
    );
};

export default UnorderedListLevel2;