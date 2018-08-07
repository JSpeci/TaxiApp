import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import { TypPraceUzivatele } from '../Utils/Interfaces';

export interface TypPraceSelectComponentProps {
    typyPrace: TypPraceUzivatele[];
    selected: (id: string) => void;
}

@observer
export class TypPraceSelectComponent extends React.Component<TypPraceSelectComponentProps> {

    constructor(props: TypPraceSelectComponentProps) {
        super(props);
    }

    public render() {
        let list = this.props.typyPrace.map(
            t => {
                return (
                    <option key={t.id} value={t.id}>{t.typPraceUzivatele}</option>
                );
            }
        );

        let first = this.props.typyPrace.find(i => true);
        if(first != null){
            this.props.selected(first.id);
        }

        return (
            <select defaultValue={"směna"}
                className="form-control"
                onChange={(e) => { this.props.selected(e.target.value) }}>
                {list}
            </select>
        );
    }

}
