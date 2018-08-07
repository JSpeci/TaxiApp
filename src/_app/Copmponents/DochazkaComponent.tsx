import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { observer, inject } from 'mobx-react';
import { DochazkaModel } from '../Models/DochazkaModel';
import { DochazkaRowComponent } from './DochazkaRowComponent';
import { NewDochazkaComponent } from './NewDochazkaComponent';

export interface DochazkaComponentProps {
    dochazkaStore: DochazkaModel;
}

@inject('dochazkaStore')
@observer
export class DochazkaComponent extends React.Component<DochazkaComponentProps> {

    constructor(props: DochazkaComponentProps) {
        super(props);
    }

    public render() {
        console.log(this.props.dochazkaStore);

        return (
            <div className="card">
                <div className="card-header">
                    <NewDochazkaComponent
                        typPraceModel={this.props.dochazkaStore.typPraceModel}
                        uzivateleModel={this.props.dochazkaStore.uzivateleModel}
                        autoModel={this.props.dochazkaStore.autoModel}
                        prichodRidice={this.props.dochazkaStore.prichodOsoby} />
                </div>
                <div className="card-body">
                    < table key={1234} className="table" >
                        <thead>{this.makeTableHeader()}</thead>
                        <tbody>{this.makeTableRows()}</tbody>
                    </table >
                </div>
            </div>

        );
    }

    makeTableRows() {
        let list = this.props.dochazkaStore.DochazkaRowModelsAll.map(d => {
            return (<DochazkaRowComponent dochazkaRowModel={d} key={d.dochazka.id} />);
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
                    Příchod
                </th>
                <th>
                    Odchod
                </th>
                <th>
                    Typ prace
                </th>
                <th>
                    Pracuje
                </th>
                <th>
                    Doba
                </th>
            </tr>
        );
        return result;
    }

}
