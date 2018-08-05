import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { UzivateleModel } from '../Models/UzivateleModel';
import { observer, inject } from 'mobx-react';
import { ObjednavkaComponent } from './ObjednavkaComponent';
import { UzivatelComponent } from './UzivatelComponent';

export interface UzivateleComponentProps {
    uzivateleStore: UzivateleModel;
}

@inject('uzivateleStore', 'dochazkaStore')
@observer
export class UzivateleComponent extends React.Component<UzivateleComponentProps> {

    constructor(props: UzivateleComponentProps) {
        super(props);
    }

    public render() {
        console.log(this.props.uzivateleStore);

        let uzivatele = this.props.uzivateleStore.UzivatelAll.map(u => {
            return (<UzivatelComponent key={u.id} uzivatel={u} />);
        });

        return (
            <ul key={1253} className="list-group">
                {uzivatele}
            </ul>
        );
    }
}
