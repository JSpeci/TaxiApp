import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { observer, inject } from 'mobx-react';
import { DochazkaModel } from '../Models/DochazkaModel';
import { DochazkaRowComponent } from './DochazkaRowComponent';
import { PrehledRowComponent } from './PrehledRowComponent';

export interface PrehledComponentProps {
    dochazkaStore: DochazkaModel;
}

@inject('dochazkaStore')
@observer
export class PrehledComponent extends React.Component<PrehledComponentProps> {

    constructor(props: PrehledComponentProps) {
        super(props);
    }

    public render() {
        console.log(this.props.dochazkaStore);

        return (
            <div className="container">
                <table key={1234} className="table block">
                    <thead>{this.makeTableHeader()}</thead>
                    <tbody>{this.makeTableRows()}</tbody>
                </table>
            </div>
        );
    }

    makeTableRows() {
        let list = this.props.dochazkaStore.DochazkaPritomni.map(d => {
            return (<PrehledRowComponent prehledRowModel={d} key={d.dochazka.id} />);
        });
        return list;
    }

    makeTableHeader() {
        let result = (
            <tr>
                <th>
                    Jméno
                </th>
                <th>
                    Role
                </th>
                <th>
                    Příchod
                </th>
                <th>
                    Odchod
                </th>
                <th>
                    Stav
                </th>
                <th>
                    Typ prace
                </th>
            </tr>
        );
        return result;
    }

}
