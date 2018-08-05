import * as React from 'react';
import { observer } from 'mobx-react';
import { Uzivatel } from '../Utils/Interfaces';

export interface UzivatelSelectComponentProps {
    uzivatele: Uzivatel[];
    selected: (id: string) => void;
}

@observer
export class UzivatelSelectComponent extends React.Component<UzivatelSelectComponentProps> {

    constructor(props: UzivatelSelectComponentProps) {
        super(props);
    }

    public render() {
        let list = this.props.uzivatele.map(
            u => {
                return (
                    <option value={u.id} key={u.id}>{u.nickName}</option>
                );
            }
        );

        let first = this.props.uzivatele.find(i => true);
        if(first != null){
            this.props.selected(first.id);
        }

        return (
            <select defaultValue={"směna"} className="form-control" onChange={(e) => this.props.selected(e.target.value)}>
                {list}
            </select>
        );
    }

}
