import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { observer, inject } from 'mobx-react';
import { DochazkaModel } from './DochazkaModel';
import { DochazkaRowComponent } from './DochazkaRowComponent';
import { NewDochazkaComponent } from './NewDochazkaComponent';
import { DnyDoMinulostiComponent } from '../Copmponents/DnyDoMinulostiComponent';

export interface DochazkaListProps {
    dochazkaStore: DochazkaModel;
}

@inject('dochazkaStore')
@observer
export class DochazkaList extends React.Component<DochazkaListProps> {

    constructor(props: DochazkaListProps) {
        super(props);
    }

    public render() {
        console.log(this.props.dochazkaStore);

        return (
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <NewDochazkaComponent
                            typPraceModel={this.props.dochazkaStore.typPraceModel}
                            uzivateleModel={this.props.dochazkaStore.uzivateleModel}
                            autoModel={this.props.dochazkaStore.autoModel}
                            prichodRidice={this.props.dochazkaStore.prichodOsoby} />
                        <DnyDoMinulostiComponent days={this.props.dochazkaStore.pocetDniDoMinulosti} daysToPastChnaged={this.props.dochazkaStore.changePocetDniDoMinulost} />
                    </div>
                    <div className="card-body">
                        < table key={1234} className="table" >
                            <thead>{this.makeTableHeader()}</thead>
                            <tbody>{this.makeTableRows()}</tbody>
                        </table >
                    </div>
                </div>
            </div>

        );
    }

    makeTableRows() {
        let list1 = this.props.dochazkaStore.DochazkaPritomni.map(d => {
            return (<DochazkaRowComponent dochazkaRowModel={d} key={d.dochazka.id} />);
        });
        let list2 = this.props.dochazkaStore.DochazkaNepritomni.map(d => {
            return (<DochazkaRowComponent dochazkaRowModel={d} key={d.dochazka.id} />);
        });
        
        return list1.concat(list2);
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
