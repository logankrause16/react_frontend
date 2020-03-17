import React, { Component } from 'react';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import './datagrid.css';

class DataGrid extends Component {
    constructor(props) {
        super(props);
        this.dragEnd = this.dragEnd.bind(this);
    }

    dragStart(e) {
        console.log(e)
        // Do not allow dragging multiple rows by checking the number of items
        if (e.dataTransfer.items.length > 1) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        var row = e.target.parentNode; // Source needs to be TR, not the grab handle TD - JZ
        var col = null; // Set column D&D source to null to avoid any issues
        e.dataTransfer.setData('text', '');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.dropEffect = 'move';
    }

    /**
     * Handle the Drag & Drop 'dragend' event where a draggable elemnt is dropped in a drop zone.
     *
     * This only works with row D&D.
     *
     * Gets the new row order and sends it to the server as a requested change (since the order has
     * only been changed on the client so far).
     * @param {*} e 
     */
    dragEnd(e) {
        e.preventDefault();
        // Get new row order and send it to the server as a requested change
        var gMatrix = document.getElementById(this.props.tableName);
        var new_order = [];
        console.log(gMatrix.lastElementChild.children)
        for (var i = 0; i < gMatrix.lastElementChild.children.length; i++) {
            new_order.push(parseInt(gMatrix.lastElementChild.children[i].getAttribute("data-dbid")));
        }
        switch (this.props.tableName) {
            case "gfm":
                // Only send over the new row order if it's different than the current order
                // if (mpd.arrays_are_equal(new_order, mpd.data.gfmRowOrderList)) {
                //     return;
                // }
                // // Send updated order to the server
                // ws.send("gfm.row.sort.arbitrary", {
                //     "gfm_row_order_list": new_order,
                // });
                break;
            case "contractBoard":
                // Only send over the new row order if it's different than the current order
                // if (mpd.arrays_are_equal(new_order, mpd.data.conBoardRowOrderList)) {
                //     return;
                // }
                // // Send updated order to the server
                // ws.send("conBoard.row.sort.arbitrary", {
                //     "conBoard_row_order_list": new_order,
                // });
                break;
            case "constraints":
                // Only send over the new row order if it's different than the current order
                // if (mpd.arrays_are_equal(new_order, mpd.data.constraintsRowOrderList)) {
                //     return;
                // }
                // // Send updated order to the server
                // ws.send("constraints.row.sort.arbitrary", {
                //     "constraints_row_order_list": new_order,
                // });
                break;
            default:
                console.error("mpd.generalMatrix.row.drag_end: invalid table: tableName = ", this.props.tableName);
        }
    }

    /**
     * Handle the Drag & Drop 'dragenter' event where a draggable element enters a drop zone.
     *
     * The drop zone here is the region below the header row.
     * @param {*} e 
     */
    dragEnter(e) {
        e.preventDefault() // For Firefox to work with Drag&Drop

        // When a row is dragged below the column headings row...
        if (mpd.generalMatrix.row.source !== null) {
            var target = e.target;
            while (target.nodeName !== "TR") {
                target = target.parentNode;
            }
            if (mpd.generalMatrix.row.source !== target) {
                if (mpd.generalMatrix.row.isBefore(mpd.generalMatrix.row.source, target)) {
                    target.parentNode.insertBefore(mpd.generalMatrix.row.source, target);
                } else {
                    target.parentNode.insertBefore(mpd.generalMatrix.row.source, target.nextSibling);
                }
            }
        }

        // When a column is dragged below the column headings row...
        if (mpd.generalMatrix.col.source !== null) {
            var temp = e.target;
            while (temp.nodeName !== "TD") {
                temp = temp.parentNode;
            }
            var targetIndex = [].slice.call(temp.parentNode.children).indexOf(temp);
            var target = temp.parentNode.parentNode.parentNode.firstElementChild.firstElementChild.children[targetIndex];
            var sourceColumnIndex = [].slice.call(target.parentNode.children).indexOf(mpd.generalMatrix.col.source);
            var targetColumnIndex = [].slice.call(target.parentNode.children).indexOf(target);
            if (sourceColumnIndex !== targetColumnIndex) {
                var numPreColumnsMinusOne = 0; // PreColumns are the first couple of columns of the table that shouldn't be displaced, e.g., drag-handle`, `menu`, and `mission-type-color-indicator` columns
                switch (mpd.view.current) {
                    case mpd.view.all.gfm:
                        numPreColumnsMinusOne = 2;
                        break;
                    case mpd.view.all.contractBoard:
                        numPreColumnsMinusOne = 1;
                        break;
                    case mpd.view.all.constraints:
                        numPreColumnsMinusOne = 1;
                        break;
                    default:
                        console.error("mpd.generalMatrix.row.drag_enter: invalid view: mpd.view.current = ", mpd.view.current);
                }
                if (sourceColumnIndex > numPreColumnsMinusOne && targetColumnIndex > numPreColumnsMinusOne) { // we don't want to displace the PreColumns
                    var tbody = target.parentNode.parentNode.parentNode.lastElementChild;
                    var trs = tbody.children;
                    if (mpd.generalMatrix.row.isBefore(mpd.generalMatrix.col.source, target)) {
                        target.parentNode.insertBefore(mpd.generalMatrix.col.source, target);
                        for (var i = 0, len = trs.length; i < len; i++) {
                            trs[i].insertBefore(trs[i].children[sourceColumnIndex], trs[i].children[targetColumnIndex])
                        }
                    } else {
                        target.parentNode.insertBefore(mpd.generalMatrix.col.source, target.nextSibling);
                        for (var i = 0, len = trs.length; i < len; i++) {
                            trs[i].insertBefore(trs[i].children[sourceColumnIndex], trs[i].children[targetColumnIndex].nextSibling)
                        }
                    }
                }
            }
        }
        return false;
    }

    dragDrop(e) {
        console.log(e)
    }

    /**
     * Handle the Drag & Drop 'dragover' event.
     *
     * Currently this only handles cross-browser support and does nothing else.
     * @param {*} e 
     */
    dragOver(e) {
        // The following two lines are necessary to make DND work properly over different browsers.
        e.preventDefault(); // This prevents “not-allowed” mouse pointer from showing.
        return false;
    }

    render() {
        return (
            <div>
                <table id={this.props.tableName} className="spread-sheet zebra-stripe highlight-rows-on-hover">
                    <thead>
                        <tr>
                            {/* Always have a blank first header for the drag row */}
                            <TableHeader header={""} />
                            {/* Itterate over and add the headers */}
                            {this.props.headers.map((header, i) => <TableHeader key={i} header={header} />)}
                        </tr>
                    </thead>
                    <tbody>
                        {/* Itterate over and add the actual data. Breaks it down into row and then into dynamic values. */}
                        {this.props.data.map((element, i) =>
                            <tr data-dbid={i} key={i} onDrop={this.dragDrop} onDragOver={this.dragOver}>
                                <th className="firstCellSizing">
                                    <span draggable="true" onDragStart={this.dragStart}
                                        onDragEnd={this.dragEnd} data-col-id="-2" data-col-name="drag-handle" className="context-button grab-handle">
                                        <DragHandleIcon />
                                    </span>
                                    <span data-col-id="-1" data-col-name="menu" className="context-button">
                                        <MoreVertIcon />
                                    </span>
                                </th>
                                {Object.keys(element).map((e, i) => <TableElement key={i} data={element[e]} />)}
                            </tr>)}
                    </tbody>
                </table>
            </div>
        );
    }

    /**
     * This function is called to check if the component should update on a prop change
     * @param {*} nextProps 
     */
    shouldComponentUpdate(nextProps) {
        if (nextProps != this.props)
            return true;
    }
}

/**
 * This class is used as the header to the table. Each instance of this is a single header.
 */
class TableHeader extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <th>
                {this.props.header}
            </th>
        );
    }
}

/**
 * This class is used as the element for each table row. One of these is one element in the table.
 */
class TableElement extends Component {
    render() {
        return (
            <td className="spread-sheet-value"><input value={this.props.data} onChange={this.onValueChange}></input></td>
        );
    }

    onValueChange(event) {
        console.log(event)
    }

}

export default DataGrid;