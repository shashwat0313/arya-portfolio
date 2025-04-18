export class OrderedListLevel1Item{
    constructor(text, optionalBoldtext, level2List) {
        this.text = text; // A string
        this.optionalBoldtext = optionalBoldtext;
        this.level2List = level2List; // An object of type OrderedListLevel2
    }
}