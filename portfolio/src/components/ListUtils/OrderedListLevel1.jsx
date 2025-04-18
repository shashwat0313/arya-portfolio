const OrderedListLevel1 = ({ level2ListItemsList }) => {
    return (
        <ol className="custom-ol-list text-2xl">            
            {level2ListItemsList.map((orderedListLevel2Item, index)=>{
                <li className="font-piazzolla" id={index}>{orderedListLevel2Item.text}
                    <p className="text-lg ml-5 font-semibold">
                        {orderedListLevel2Item.optionalBoldtext ? orderedListLevel2Item.optionalBoldtext : ""}
                    </p>
                    {orderedListLevel2Item.level2List}
                </li>
            }
        )}
        </ol>
    );
};

export default OrderedListLevel1;