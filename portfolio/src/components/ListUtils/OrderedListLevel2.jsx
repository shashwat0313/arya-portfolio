import { Link } from "react-router-dom";
import { BASE_URL } from "../../Constants";
import SmallText from "../text/SmallText";

const OrderedListLevel2 = ({orderedListLevel2ItemList}) => {
    return (
        <>
            <ol className="custom-ol-list">
                {
                    orderedListLevel2ItemList.map((articleItemLevel2, index)=>{
                        <li className="text-xl">
                            <Link to={`${BASE_URL}/works/${articleItemLevel2.articleId}`} className="underline">
                                <SmallText text={articleItemLevel2.listText} />
                            </Link>
                        </li>
                    })
                }        
            </ol>
        </>
    );
};

export default OrderedListLevel2;