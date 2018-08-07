import * as React from 'react';
import { observer } from 'mobx-react';
import { TypPraceSelectComponent } from './TypPraceSelectComponent';
import { TypPraceUzivateleModel } from '../Models/TypPraceUzivateleModel';
import { UzivateleModel } from '../Models/UzivateleModel';
import { UzivatelSelectComponent } from './UzivatelSelectComponent';
import { action } from 'mobx';
import { AutoSelectComponent } from './AutoSelectComponent';
import { AutoModel } from '../Models/AutoModel';

export interface NewDochazkaComponentProps {
    typPraceModel: TypPraceUzivateleModel;
    uzivateleModel: UzivateleModel;
    autoModel: AutoModel;
    prichodRidice: (idUzivatel: string, idTypPrace: string, idAuto: string) => void;
}

@observer
export class NewDochazkaComponent extends React.Component<NewDochazkaComponentProps> {

    constructor(props: NewDochazkaComponentProps) {
        super(props);
    }

    private typPraceId: string;
    private uzivatelId: string;
    private autoId: string;


    public render() {
        return (
            <form className="form-inline">
                <div className="form-group mb-2">
                    <UzivatelSelectComponent uzivatele={this.props.uzivateleModel.uzivatele} selected={this.uzivatelSelected} />
                </div>
                <div className="form-group mx-sm-3 mb-2">
                    <TypPraceSelectComponent typyPrace={this.props.typPraceModel.array} selected={this.typPraceSelected} />
                </div>
                <div className="form-group mx-sm-3 mb-2">
                    <AutoSelectComponent auta={this.props.autoModel.auta} selected={this.autoSelected} />
                </div>
                <button type="button" className="btn btn-primary mb-2" onClick={this.prichodClicked}>Příchod</button>
            </form>
        );
    }

    @action.bound
    typPraceSelected(id: string) {
        this.typPraceId = id;
    }

    @action.bound
    uzivatelSelected(id: string) {
        this.uzivatelId = id;
    }

    @action.bound
    autoSelected(id: string) {
        this.autoId = id;
    }

    @action.bound
    prichodClicked() {
        this.props.prichodRidice(this.uzivatelId, this.typPraceId,  this.autoId);
        console.log("Prichod", this.typPraceId, this.uzivatelId, this.autoId);
    }
}
