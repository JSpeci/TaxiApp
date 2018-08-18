import * as React from 'react';
import { observer } from 'mobx-react';

export interface DnyDoMinulostiComponentProps {
    days: number;
    daysToPastChnaged: (days: number) => void;
}

@observer
export class DnyDoMinulostiComponent extends React.Component<DnyDoMinulostiComponentProps> {

    constructor(props: DnyDoMinulostiComponentProps) {
        super(props);
        this.pocetDni = this.props.days;
    }

    private pocetDni: number;

    public render() {
        return (

            <form className="form-inline float_right">
                <div className="form-group mx-sm-3 mb-2">
                    <input className="form-control mx-sm-2 mb-2" defaultValue={this.pocetDni.toString()} type="number" min="1" max="365" onChange={(e) => this.pocetDniChanged(e.target.value)} />
                </div>
                <button type="button" className="btn btn-primary mb-2" onClick={(e) => this.pocetDniClicked()}>Dnů nazpět</button>
            </form>
        );
    }

    pocetDniChanged(input: string) {
        //parse to number
        this.pocetDni = Number(input);
    }

    // TO DO
    validateInput(input: string) : boolean {
        return false;
    }

    pocetDniClicked() {
        this.props.daysToPastChnaged(this.pocetDni);
    }

}