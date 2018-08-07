import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { Uzivatel } from '../Utils/Interfaces';


export interface UzivatelComponentProps {
    uzivatel: Uzivatel;
}

@observer
export class UzivatelComponent extends React.Component<UzivatelComponentProps> {

    constructor(props: UzivatelComponentProps) {
        super(props);
    }

    public render() {
        return (
            <li className="list-group-item d-flex justify-content-between align-items-center"
             key={this.props.uzivatel.id}> {this.props.uzivatel.nickName} </li>
        );
    }
}
