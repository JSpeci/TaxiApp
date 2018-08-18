import * as React from 'react';
import Loading from 'react-loading-components';

export interface LoadingProgressBarComponentProps {

    type: string;
    width:number;
    height:number;
}

export class LoadingProgressBarComponent extends React.Component<LoadingProgressBarComponentProps> {

    constructor(props: LoadingProgressBarComponentProps) {
        super(props);
    }

    public render() {
            return (
                <div className="loader_component">
                    <div className="center_loader">
                        <Loading className="" type={this.props.type} width={this.props.width} height={this.props.height} fill='#30194c' />
                    </div>
                </div>
            );

    }
}
