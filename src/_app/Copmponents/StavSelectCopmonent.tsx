import * as React from 'react';
import { observer } from 'mobx-react';
import { StavUzivatele } from '../Utils/Interfaces';

export interface StavSelectComponentProps {
    stavy: StavUzivatele[];
    selected: (idStav: string) => void;
}

@observer
export class StavSelectComponent extends React.Component<StavSelectComponentProps> {

    constructor(props: StavSelectComponentProps) {
        super(props);
    }

    public render() {
        let list = this.props.stavy.map(
            s => {
                return (
                    <option key={s.id} value={s.id}>{s.nazevStavu}</option>
                );
            }
        );

        let first = this.props.stavy.find(i => true);
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
