import * as React from "react";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

export interface MyMenuProps {

}
export class MyMenu extends React.Component<MyMenuProps>{
    constructor(props: MyMenuProps) {
        super(props);
    }
    public render() {
        /*return (
            <nav className="navbar sticky-top navbar-light bg-light">
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to='/Prehled' className="navbar-brand">Fronta Řidičů</Link>
                        </li>
                        <li className="nav-item ">
                            <Link to='/Objednavky' className="navbar-brand" >Fronta Objednávek</Link>
                        </li>
                        <li className="nav-item ">
                            <Link to='/Dochazka' className="navbar-brand" >Docházka</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );*/

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-item nav-link active" to='/Prehled'>Fronta Řidičů</Link>
                        <Link className="nav-item nav-link" to='/Objednavky'  >Fronta Objednávek</Link>
                        <Link className="nav-item nav-link" to='/Dochazka' >Docházka</Link>
                    </div>
                </div>
            </nav>
        );
    }
}