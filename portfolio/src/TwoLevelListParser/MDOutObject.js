export class L2Node {
    constructor(title, articleId) {
        this.title = title;
        this.articleId = articleId;
    }
}

export class L1Node {
    constructor(titleLevel1, l2Nodes = [], l2Type = "ul", l1ItemBoldP) {
        this.titleLevel1 = titleLevel1;
        this.l2Nodes = l2Nodes; // Array of L2Node
        this.l2Type = l2Type; // "ol" or "ul"
        this.l1ItemBoldP = l1ItemBoldP
    }
}

export class MDOutObject {
    constructor(l1Nodes = []) {
        this.l1Nodes = l1Nodes; // Array of L1Node
    }
}
