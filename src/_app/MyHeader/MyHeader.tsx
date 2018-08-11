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


        let key: number = 0;
        
        return (
            <nav className="navbar-fixed navbar-inverse ">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="http://localhost/TaxiApp/src/public/">Taxi Dispečink</a>
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