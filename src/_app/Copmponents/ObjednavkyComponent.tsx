import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ObjednavkyModel } from '../Models/ObjednavkyModel';
import { observer, inject } from 'mobx-react';
import { ObjednavkaComponent } from './ObjednavkaComponent';



export interface ObjednavkyProps {
    objednavkyStore: ObjednavkyModel;
}

@inject('objednavkyStore')
@observer
export class ObjednavkyComponent extends React.Component<ObjednavkyProps> {

    constructor(props: ObjednavkyProps) {
        super(props);
    }

    public render() {
        console.log(this.props.objednavkyStore);

        let objednavky = this.props.objednavkyStore.ObjednavkyAll.map(o => {
            return (<ObjednavkaComponent key={o.id} objednavka={o} />);
        });

        return (
            <ul key={1234} className="list-group">
                {objednavky}
            </ul>
        );
    }
}
