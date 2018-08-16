import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { DochazkaModel } from './DochazkaModel';
import { DochazkaList } from './DochazkaList';
import Loading from 'react-loading-components';

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
            return (
                <Loading className="" type='ball_triangle' width={100} height={100} fill='#f44242' />
            );
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
