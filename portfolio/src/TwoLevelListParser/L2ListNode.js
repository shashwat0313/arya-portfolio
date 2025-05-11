class L2ListNode {
    constructor(title = "", 
                // link = "",
                articleId
            ){
        if (typeof title !== "string"
            || typeof articleId !== "string"
        ) {
            throw new TypeError("title/articleId must be a string.");
        }
        // if (typeof link !== "string") {
        //     throw new TypeError("link must be a string.");
        // }
        this.title = title; // String field for the title
        this.articleId = articleId;
        // this.link = link;   // String field for the link
    }
}

export default L2ListNode;
