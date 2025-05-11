import L2ListNode from "./L2ListNode.js";

/**
 * @typedef {import('./L2ListNode.js').default} L2ListNode
 */

class L1ListNode {
    /**
     * @param {string} titleLevel1 - The title for level 1.
     * @param {L2ListNode[]} l2Nodes - An array of L2ListNode objects.
     */
    constructor(titleLevel1 = "", l2Nodes = [], l2Type, l1ItemBoldP) {
        if (typeof titleLevel1 !== "string") {
            throw new TypeError("titleLevel1 must be a string.");
        }
        if (!Array.isArray(l2Nodes) || !l2Nodes.every(node => node instanceof L2ListNode)) {
            throw new TypeError("l2Nodes must be an array of L2ListNode objects.");
        }
        this.titleLevel1 = titleLevel1; // String field for the title of level 1
        this.l2Nodes = l2Nodes;         // Array of L2ListNode objects
        this.l2Type = l2Type
        this.l1ItemBoldP = l1ItemBoldP

    }
}

export default L1ListNode;
