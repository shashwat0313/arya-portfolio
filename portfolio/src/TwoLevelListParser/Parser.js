import RootNode from "./RootNode";
import L1ListNode from "./L1ListNode";
import L2ListNode from "./L2ListNode";

export default function TwoLevelListParser(rawData) {
    const l1Nodes = rawData.map((level1Item) => {
        const l2Nodes = level1Item.l2Nodes.map((level2Item) => {
            return new L2ListNode(level2Item.title, level2Item.articleId);
        });
        return new L1ListNode(level1Item.titleLevel1, l2Nodes, level1Item.l2Type, level1Item.l1ItemBoldP);
    });

    return new RootNode(l1Nodes);
}
