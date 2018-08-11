import * as React from "react";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';


export interface MyHeaderProps { }

export interface LinkPair {
    to: string;
    label: string;
}

export class MyHeader extends React.Component<MyHeaderProps>{

    public links : LinkPair[] = [];

    constructor(props: MyHeaderProps) {
        super(props);
        this.links.push({to: "/FrontaRidicu", label: "Fronta Řidičů"});
        this.links.push({to: "/FrontaObjednavek", label: "Fronta Objednávek"});
        this.links.push({to: "/Dochazka", label: "Docházka"});
        this.links.push({to: "/Objednavky", label: "Objednavky"});
        this.links.push({to: "/Lide", label: "Lidé"});
        this.links.push({to: "/Auta", label: "Auta"});
        this.links.push({to: "/Log", label: "Log"});
        this.links.push({to: "/Info", label: "Info"});
    }

    public render() {

        /*return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-item nav-link active" to='/FrontaRidicu'>Fronta Řidičů</Link>
                        <Link className="nav-item nav-link" to='/FrontaObjednavek'  >Fronta Objednávek</Link>
                        <Link className="nav-item nav-link" to='/Dochazka' >Docházka</Link>
                        <Link className="nav-item nav-link" to='/Lide' >Lidé</Link>
                        <Link className="nav-item nav-link" to='/Objednavky' >Objednávky</Link>
                        <Link className="nav-item nav-link" to='/Auta' >Auta</Link>
                        <Link className="nav-item nav-link" to='/Log' >Log</Link>
                        <Link className="nav-item nav-link" to='/Info' >Info</Link>
                    </div>
                </div>
            </nav>
        );*/

        let key: number = 0;
        
        return (
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="">Taxi Dispečink</a>
                    </div>
                    <ul className="nav navbar-nav">
                        {
                            
                            this.links.map((link) => {
                                return(<li key={key++} className="active"><Link className="nav-item nav-link active" to={link.to}>{link.label}</Link></li>);
                            })
                        }
                    </ul>
                </div>
            </nav>
        );
    }
}