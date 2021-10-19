import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();

    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        history.push("/");
        store.closeCurrentList();
    }

    function doNothing() {
    }

    let undoStatus = true;
    let undoButtonClass = "top5-button-disabled";
    if (store.hasUndo()) {
        undoStatus = false;
        undoButtonClass = "top5-button";
    }
    let redoStatus = true;
    let redoButtonClass = "top5-button-disabled";
    if (store.hasRedo()) {
        redoStatus = false;
        redoButtonClass = "top5-button";
    }
    let listStatus = true;
    let closeButtonClass = "top5-button-disabled";
    if (store.currentList !== null) {
        listStatus = false;
        closeButtonClass = "top5-button";
    }
    if (store.isListNameEditActive || store.isItemEditActive) {
        listStatus = true;
        undoStatus = true;
        redoStatus = true;
        closeButtonClass = "top5-button-disabled";
        undoButtonClass = "top5-button-disabled";
        redoButtonClass = "top5-button-disabled";
    }
    return (
        <div id="edit-toolbar">
            <div
                disabled={undoStatus}
                id='undo-button'
                onClick={undoStatus ? doNothing : handleUndo}
                className={undoButtonClass}>
                &#x21B6;
            </div>
            <div
                disabled={redoStatus}
                id='redo-button'
                onClick={redoStatus ? doNothing : handleRedo}
                className={redoButtonClass}>
                &#x21B7;
            </div>
            <div
                disabled = {listStatus}
                id='close-button'
                onClick={listStatus ? doNothing : handleClose}
                className={closeButtonClass}>
                &#x24E7;
            </div>
        </div>
    )
}

export default EditToolbar;