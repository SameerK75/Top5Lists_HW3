import jsTPS_Transaction from "../common/jsTPS.js"

export default class UpdateItem_Transaction extends jsTPS_Transaction {
    constructor(store, oldName, newName, index){
        super();
        this.store = store;
        this.oldName = oldName;
        this.newName = newName;
        this.index = index;
    }

    doTransaction() {
        this.store.updateItem(this.newName, this.index);
    }

    undoTransaction() {
        this.store.updateItem(this.oldName, this.index);
    }
}