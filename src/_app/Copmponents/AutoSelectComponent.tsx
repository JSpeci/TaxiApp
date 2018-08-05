import * as React from 'react';
import { observer } from 'mobx-react';
import { Auto } from '../Utils/Interfaces';

export interface AutoSelectComponentProps {
    auta: Auto[];
    selected: (id: string) => void;
}

@observer
export class AutoSelectComponent extends React.Component<AutoSelectComponentProps> {

    constructor(props: AutoSelectComponentProps) {
        super(props);
    }

    public render() {
        let list = this.props.auta.map(
            a => {
                return (
                    <option key={a.id} value={a.id}>{a.znacka} {a.barva} {a.idVysilacka}</option>
                );
            }
        );

        let first = this.props.auta.find(i => true);
        if(first != null){
            this.props.selected(first.id);
        }
        

        return (
            <select
                className="form-control"
                onChange={(e) => { this.props.selected(e.target.value) }}>
                {list}
            </select>
        );
    }

}