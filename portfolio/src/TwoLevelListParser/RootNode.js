import L1ListNode from "./L1ListNode.js";

/**
 * @typedef {import('./L1ListNode.js').default} L1ListNode
 */

class RootNode {
    /**
     * @param {L1ListNode[]} l1Nodes - An array of L1ListNode objects.
     */
    constructor(l1Nodes = []) {
        if (!Array.isArray(l1Nodes) || !l1Nodes.every(node => node instanceof L1ListNode)) {
            throw new TypeError("l1Nodes must be an array of L1ListNode objects.");
        }
        this.l1Nodes = l1Nodes; // Array of L1ListNode objects
    }
}

export default RootNode;
