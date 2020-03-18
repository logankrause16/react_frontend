import DragHandleIcon from '@material-ui/icons/DragHandle';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete'
import { Dropdown } from 'react-bootstrap';
import React, { Component } from 'react';
import './datagrid.css';

/**
 * This class is used as a dynamic table component that could be used in multiple locations.
 *  It is recommended that you call it like '<Table tableName="constraints" headers={this.state.headers} data={this.state.data} />'
 *  and make sure to use the state as it will then auto update if you update your state data.
 */
class DataGrid extends Component {

    // Drag event row
    row;
    // Drag event column
    col;

    // Special table names
    GFMTABLENAME = "gfm";
    CONSTRAINTABLENAME = "constraints";
    CONTRACTBOARDTABLENAME = "contractBoard";


    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
        }
        this.rowDragEnd = this.rowDragEnd.bind(this);
        this.rowDragEnter = this.rowDragEnter.bind(this);
        this.rowDragStart = this.rowDragStart.bind(this);


        this.colDragEnd = this.colDragEnd.bind(this);
        this.colDragEnter = this.colDragEnter.bind(this);
        this.colDragStart = this.colDragStart.bind(this);
    }



    /**
     * Handle the column Drag & Drop 'dragstart' event where a draggable element is grabbed and begins dragging.
     *
     * This sets the source element to the Matrix column header. This nulls the row D&D source to prevent possible conflicts and sets several
     * attributes to handle cross-browser support.
     */
    colDragStart(e) {
        this.col = e.target; // Column being dragged
        this.row = null; // Set row D&D source to null to avoid any issues
        e.dataTransfer.setData('text', ''); // For Firefox to work with dnd
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.dropEffect = 'move';
    }

    /**
     * Get current order of Matrix columns (via DOM), send this ordering to the server if it has changed.
     *
     * This is triggered by 'dragend' within the column headers, and only works with the matrix's column D&D.
     *
     * Gets the new column order and sends it to the server as a requested change (since the order has
     * only been changed on the client so far).
     */
    colDragEnd(e) {
        e.preventDefault()
        this.col = null;
        var boolDiff = false;
        var new_order = [];
        var children = document.getElementById("tableHeaders").children;
        for (var i = 0; i < children.length; i++) {
            var colid = parseInt(children[i].getAttribute("data-col-id"));
            if (colid >= 0) {
                new_order.push(colid);
            }
        }
        var old_order = this.props.headers;
        if (new_order.length === old_order.length) {
            for (var i = 0; i < new_order.length; i++) { // Loop through the two orders and see if they are in fact different
                if (new_order[i] !== old_order[i]) {
                    boolDiff = true;
                    break;
                }
            }
            if (boolDiff === false) {
                return; // the two orders are the same and we should NOT send any event to the server
            }
        }

        switch (this.props.tableName) {
            case this.GFMTABLENAME:
                // The two orders are different, so send the event to the server
                // ws.send("gfm.col.reorder", {
                //     "new_column_order": new_order,
                // });
                break;
            case this.CONTRACTBOARDTABLENAME:
                // The two orders are different, so send the event to the server
                // ws.send("conBoard.col.reorder", {
                //     "new_column_order": new_order,
                // });
                break;
            case this.CONSTRAINTABLENAME:
                // The two orders are different, so send the event to the server
                // ws.send("constraints.col.reorder", {
                //     "new_column_order": new_order,
                // });
                break;
        }
    }

    /**
     * Handle the Drag & Drop 'dragenter' event where a draggable element enters a drop zone.
     * The drop zone here is the table header row.
     *
     * Only column drag 'dragenter' events are handled here (as filtered by the main if block)
     */
    colDragEnter(e) {
        e.preventDefault();
        // Don't do anything if the source is null
        // Object being dragged is not a table header
        if (this.col !== null) {
            var target = e.target;
            while (target.nodeName !== "TH") {
                target = target.parentNode;
            }
            var sourceColumnIndex = [].slice.call(target.parentNode.children).indexOf(this.col);
            var targetColumnIndex = [].slice.call(target.parentNode.children).indexOf(target);
            if (sourceColumnIndex !== targetColumnIndex) {
                var numPreColumnsMinusOne = 0; // PreColumns are the first couple of columns of the table that shouldn't be displaced, e.g., drag-handle`, `menu`, and `mission-type-color-indicator` columns
                switch (this.props.tableName) {
                    case this.GFMTABLENAME:
                        numPreColumnsMinusOne = 1;
                        break;
                    case this.CONTRACTBOARDTABLENAME:
                        // numPreColumnsMinusOne = 1;
                        break;
                    case this.CONSTRAINTABLENAME:
                        // numPreColumnsMinusOne = 1;
                        break;
                    default:
                        console.error("TableRow rowDragEnter: invalid table name: tableName = ", this.props.tableName);
                }
                if (sourceColumnIndex > numPreColumnsMinusOne && targetColumnIndex > numPreColumnsMinusOne) { // we don't want to displace the PreColumns
                    var tbody = target.parentNode.parentNode.parentNode.lastElementChild;
                    var trs = tbody.children;
                    if (this.isBefore(this.col, target)) {
                        target.parentNode.insertBefore(this.col, target);
                        for (var i = 0, len = trs.length; i < len; i++) {
                            trs[i].insertBefore(trs[i].children[sourceColumnIndex], trs[i].children[targetColumnIndex])
                        }
                    } else {
                        target.parentNode.insertBefore(this.col, target.nextSibling);
                        for (var i = 0, len = trs.length; i < len; i++) {
                            trs[i].insertBefore(trs[i].children[sourceColumnIndex], trs[i].children[targetColumnIndex].nextSibling)
                        }
                    }
                }
            }
        }
    }


    /**
     * Handle the row Drag & Drop 'dragstart' event where a draggable element is grabbed and begins dragging.
     *
     * This sets the source element to the row (i.e. TR) and not the grab handle (i.e. the
     * source TD). This nulls the column D&D source to prevent possible conflicts and sets several
     * attributes to handle cross-browser support.
     * @param {*} e 
     */
    rowDragStart(e) {
        // Do not allow dragging multiple rows by checking the number of items
        if (e.dataTransfer.items.length > 1) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        this.row = e.target.parentNode.parentNode; // Source needs to be TR, not the grab handle TD - JZ
        this.col = null;
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
    rowDragEnd(e) {
        e.preventDefault();
        this.row = null; // Wipe the row as the drag is over.
        // Get new row order and send it to the server as a requested change
        var gMatrix = document.getElementById(this.props.tableName);
        var new_order = [];
        for (var i = 0; i < gMatrix.lastElementChild.children.length; i++) {
            new_order.push(parseInt(gMatrix.lastElementChild.children[i].getAttribute("data-dbid")));
        }
        switch (this.props.tableName) {
            case this.GFMTABLENAME:
                // Only send over the new row order if it's different than the current order
                // if (mpd.arrays_are_equal(new_order, mpd.data.gfmRowOrderList)) {
                //     return;
                // }
                // // Send updated order to the server
                // ws.send("gfm.row.sort.arbitrary", {
                //     "gfm_row_order_list": new_order,
                // });
                break;
            case this.CONTRACTBOARDTABLENAME:
                // Only send over the new row order if it's different than the current order
                // if (mpd.arrays_are_equal(new_order, mpd.data.conBoardRowOrderList)) {
                //     return;
                // }
                // // Send updated order to the server
                // ws.send("conBoard.row.sort.arbitrary", {
                //     "conBoard_row_order_list": new_order,
                // });
                break;
            case this.CONSTRAINTABLENAME:
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
                console.error("TableRow rowDragEnd: invalid table name: tableName = ", this.props.tableName);
        }
    }

    /**
     * Handle the Drag & Drop 'dragenter' event where a draggable element enters a drop zone.
     *
     * The drop zone here is the region below the header row.
     * @param {*} e 
     */
    rowDragEnter(e) {
        e.preventDefault() // For Firefox to work with Drag&Drop
        // // When a row is dragged below the column headings row...
        if (this.row !== null) {
            var target = e.target;
            while (target.nodeName !== "TR") {
                target = target.parentNode;
            }
            if (this.source !== target) {
                if (this.isBefore(this.row, target)) {
                    target.parentNode.insertBefore(this.row, target);
                } else {
                    target.parentNode.insertBefore(this.row, target.nextSibling);
                }
            }
        }

        // When a column is dragged below the column headings row...
        if (this.col !== null) {
            var temp = e.target;
            while (temp.nodeName !== "TD") {
                temp = temp.parentNode;
            }
            var targetIndex = [].slice.call(temp.parentNode.children).indexOf(temp);
            var target = temp.parentNode.parentNode.parentNode.firstElementChild.firstElementChild.children[targetIndex];
            var sourceColumnIndex = [].slice.call(target.parentNode.children).indexOf(this.col);
            var targetColumnIndex = [].slice.call(target.parentNode.children).indexOf(target);
            if (sourceColumnIndex !== targetColumnIndex) {
                var numPreColumnsMinusOne = 0; // PreColumns are the first couple of columns of the table that shouldn't be displaced, e.g., drag-handle`, `menu`, and `mission-type-color-indicator` columns
                switch (this.props.tableName) {
                    case this.GFMTABLENAME:
                        numPreColumnsMinusOne = 1;
                        break;
                    case this.CONTRACTBOARDTABLENAME:
                        // numPreColumnsMinusOne = 0;
                        break;
                    case this.CONSTRAINTABLENAME:
                        // numPreColumnsMinusOne = 0;
                        break;
                    default:
                        console.error("TableRow rowDragEnter: invalid table name: tableName = ", this.props.tableName);
                }
                if (sourceColumnIndex > numPreColumnsMinusOne && targetColumnIndex > numPreColumnsMinusOne) { // we don't want to displace the PreColumns
                    var tbody = target.parentNode.parentNode.parentNode.lastElementChild;
                    var trs = tbody.children;
                    if (this.isBefore(this.col, target)) {
                        target.parentNode.insertBefore(this.col, target);
                        for (var i = 0, len = trs.length; i < len; i++) {
                            trs[i].insertBefore(trs[i].children[sourceColumnIndex], trs[i].children[targetColumnIndex])
                        }
                    } else {
                        target.parentNode.insertBefore(this.col, target.nextSibling);
                        for (var i = 0, len = trs.length; i < len; i++) {
                            trs[i].insertBefore(trs[i].children[sourceColumnIndex], trs[i].children[targetColumnIndex].nextSibling)
                        }
                    }
                }
            }
        }
        return false;
    }

    /**
     * Return true if element A is before element B, or false otherwise.
     */
    isBefore(a, b) {
        if (a.parentNode === b.parentNode) {
            for (var cur = a; cur; cur = cur.previousSibling) {
                if (cur === b) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Handle the Drag & Drop 'dragover' event.
     *
     * Currently this only handles cross-browser support and does nothing else.
     * @param {*} e 
     */
    rowDragOver(e) {
        // The following two lines are necessary to make DND work properly over different browsers.
        e.preventDefault(); // This prevents “not-allowed” mouse pointer from showing.
        return false;
    }

    /**
     * This function is called when the delete button is clicked.
     * 
     * Currently no functionality.
     */
    deleteRowClick(e) {
        console.log(e)
    }

    render() {
        return (
            <div>
                <table id={this.props.tableName} className="spread-sheet zebra-stripe highlight-rows-on-hover">
                    <thead>
                        <tr id="tableHeaders">
                            {/* Always have a blank first header for the drag row */}
                            <TableHeader element={-1} header={""} colDragStart={this.colDragStart} colDragEnter={this.colDragEnter} colDragEnd={this.colDragEnd} />
                            {/* Itterate over and add the headers */}
                            {this.props.headers.map((header, i) =>
                                <TableHeader key={i} element={i} header={header} colDragStart={this.colDragStart} colDragEnter={this.colDragEnter} colDragEnd={this.colDragEnd} />)}
                        </tr>
                    </thead>
                    <tbody>
                        {/* Itterate over and add the actual data. Breaks it down into row and then into dynamic values. */}
                        {this.state.data.map((element, i) =>
                            <tr data-dbid={i} key={i} onDragEnter={this.rowDragEnter} onDragOver={this.rowDragOver}>
                                <th className="firstCellSizing">
                                    {/* Draggable button */}
                                    <span draggable="true" onDragStart={this.rowDragStart}
                                        onDragEnd={this.rowDragEnd} data-col-id="-2" data-col-name="drag-handle" className="context-button grab-handle">
                                        <DragHandleIcon />
                                    </span>
                                    {/* More button */}
                                    <span>
                                        <Dropdown>
                                            <Dropdown.Toggle  id="dropDownTableToggle">
                                                <MoreVertIcon />
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="dropdown-content">
                                                <Dropdown.Item href="#" onClick={this.deleteRowClick}
                                                    title="Delete this constraint"><DeleteIcon />Delete</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
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
            <th draggable="true" data-col-id={this.props.element} onDragStart={this.props.colDragStart} onDragEnd={this.props.colDragEnd} onDragEnter={this.props.colDragEnter}>
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