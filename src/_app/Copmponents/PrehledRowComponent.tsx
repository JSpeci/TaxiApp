import * as React from 'react';
import { observer } from 'mobx-react';
import { DochazkaRowModel } from '../Models/DochazkaRowModel';
import { StavSelectComponent } from './StavSelectCopmonent';


export interface PrehledRowComponentProps {
    prehledRowModel: DochazkaRowModel;
}

@observer
export class PrehledRowComponent extends React.Component<PrehledRowComponentProps> {

    constructor(props: PrehledRowComponentProps) {
        super(props);
    }

    public render() {

        return (
            <tr className="" key={this.props.prehledRowModel.dochazka.id}>
                <td className="objItem">{this.props.prehledRowModel.dochazka.Uzivatel.nickName}</td>
                <td className="objItem">{this.props.prehledRowModel.dochazka.Uzivatel.role.nazevRole}</td>
                <td className="objItem">{this.props.prehledRowModel.dochazka.prichod}</td>
                {this.getOdchodComponent()}
                <td className={this.getClassNameByStavUzivatele()}>
                    <StavSelectComponent key={this.props.prehledRowModel.dochazka.id} 
                    stavy={this.props.prehledRowModel.stavModel.array}
                    selected={this.props.prehledRowModel.stavChanged}/>
                </td>
                <td className={this.getClassNameByTypPrace()}>{this.props.prehledRowModel.dochazka.TypPraceUzivatele.typPraceUzivatele} </td>
            </tr>
        );
    }

    //

    getOdchodComponent() {
        if (this.props.prehledRowModel.jeVPraci) {
            return (
                <td className="objItem">
                    <button type="button" className="btn btn-success"
                        onClick={() => this.props.prehledRowModel.odchodCreated()}>
                        Odchod
                    </button>
                </td>
            );
        }
        else {
            return <td className="objItem">{this.props.prehledRowModel.dochazka.odchod} </td>
        }
    }

    getClassNameByPracuje() {
        return this.props.prehledRowModel.jeVPraci ? "objItem bg-success" : "objItem bg-danger"
    }


    getClassNameByTypPrace() {
        if (this.props.prehledRowModel.dochazka.TypPraceUzivatele.typPraceUzivatele === "směna") {
            return "objItem bg-primary";
        }
        else {
            return "objItem bg-secondary";
        }
    }

    getClassNameByStavUzivatele() {
        switch (this.props.prehledRowModel.dochazka.StavUzivatele.nazevStavu) {
            case "volny":
                return "objItem bg-success";
            case "obsazeny":
                return "objItem bg-warning";
            case "vedle":
                return "objItem bg-success";
            case "porucha":
                return "objItem bg-danger";
            case "mimo":
                return "objItem bg-info";
            default:
                return "objItem bg-light";
        }
    }
}
