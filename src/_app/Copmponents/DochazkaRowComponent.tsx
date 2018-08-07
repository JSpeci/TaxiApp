import * as React from 'react';
import { observer } from 'mobx-react';
import { DochazkaRowModel } from '../Models/DochazkaRowModel';


export interface DochazkaRowComponentProps {
    dochazkaRowModel: DochazkaRowModel;
}

@observer
export class DochazkaRowComponent extends React.Component<DochazkaRowComponentProps> {

    constructor(props: DochazkaRowComponentProps) {
        super(props);
    }

    public render() {

        return (
            <tr className="" key={this.props.dochazkaRowModel.dochazka.id}>
                <td className="objItem">{this.props.dochazkaRowModel.dochazka.Uzivatel.nickName}</td>
                <td className="objItem">{this.props.dochazkaRowModel.dochazka.prichod}</td>
                {this.getOdchodComponent()}
                <td className={this.getClassNameByTypPrace()}>{this.props.dochazkaRowModel.dochazka.TypPraceUzivatele.typPraceUzivatele} </td>
                <td className={this.getClassNameByPracuje()}>{this.props.dochazkaRowModel.jeVPraci ? "v praci" : "nepracuje"} </td>
                <td>{this.props.dochazkaRowModel.odpracovanaDoba}</td>
            </tr>
        );
    }

    getOdchodComponent() {
        if (this.props.dochazkaRowModel.jeVPraci) {
            return <td className="objItem">
                <button type="button" className="btn btn-success"
                    onClick={() => this.props.dochazkaRowModel.odchodCreated()}>
                    Odchod
                    </button>
            </td>
        }
        else {
            return <td className="objItem">{this.props.dochazkaRowModel.dochazka.odchod} </td>
        }
    }

    getClassNameByPracuje() {
        return this.props.dochazkaRowModel.jeVPraci ? "objItem bg-success" : "objItem bg-danger"
    }


    getClassNameByTypPrace() {
        if (this.props.dochazkaRowModel.dochazka.TypPraceUzivatele.typPraceUzivatele === "směna") {
            return "objItem bg-primary";
        }
        else {
            return "objItem bg-secondary";
        }
    }

    getClassNameByStavUzivatele() {
        switch (this.props.dochazkaRowModel.dochazka.StavUzivatele.nazevStavu) {
            case "volny":
                return "objItem bg-success";
            case "obsazeny":
                return "objItem bg-waarning";
            case "vedle":
                return "objItem bg-success";
            case "mimo":
                return "objItem bg-info";
            default:
                return "objItem bg-light";
        }
    }
}
