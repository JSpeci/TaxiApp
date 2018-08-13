import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { DochazkaModel } from '../Models/DochazkaModel';
import { DochazkaList } from './DochazkaList';

export interface DochazkaComponentProps {
    dochazkaStore: DochazkaModel;
}

@inject('dochazkaStore')
@observer
export class DochazkaLoaderComponent extends React.Component<DochazkaComponentProps> {

    constructor(props: DochazkaComponentProps) {
        super(props);
    }

    public render() {
        if (this.props.dochazkaStore.loading) {
            //console.log("LOADING projects");
            return (<div>should render loading gif</div>);
        }
        else {
            return (
                <DochazkaList dochazkaStore={this.props.dochazkaStore} />
            );
        }

    }

    public componentDidMount() {
        console.log("Did mount called");
        console.log("Loading dochazkaStore");
        this.props.dochazkaStore.load();
        console.log("Did mount finished");
    }

}
