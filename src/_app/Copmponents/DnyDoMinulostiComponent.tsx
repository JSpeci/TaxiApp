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

            <form className="form">
                <div className="form-group mx-sm-3 mb-2">
                    <label>Počet dní do minulosti: </label>
                    <input className="form-control col-sm-5" defaultValue={this.pocetDni.toString()} type="text" onChange={(e) => this.pocetDniChanged(e.target.value)} />
                </div>
                <button type="button" className="btn btn-primary mb-2" onClick={(e) => this.pocetDniClicked()}>Nastav</button>
            </form>
        );
    }

    pocetDniChanged(input: string) {
        //parse to number
        this.pocetDni = Number(input);
    }

    pocetDniClicked() {
        this.props.daysToPastChnaged(this.pocetDni);
    }

}