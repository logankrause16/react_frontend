import React, { Component } from 'react';
import Datagrid from '../../shared/datagrid/Datagrid';

export class ContractBoard extends Component {

    constructor() {
        super();
        this.state = {
            headers: ['Contract Name', 'Criteria', 'Authority', 'Comm', 'Freq', 'Action'],
            data: [
                { 
                    "name": 'Contract1', "criteria": 'odds', "auth": 'general', 
                    "comm": 'unclasss', "freq": 'localhost', "action": 'stand'
                }
            ]
        }
    }

    render() {
        return (
            <div>
                <Datagrid tableName="constraints" headers={this.state.headers} data={this.state.data} />
            </div>    
        )
    }

}

export default ContractBoard;