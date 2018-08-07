import * as React from "react";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

export interface MyHeaderProps {

}
export class MyHeader extends React.Component<MyHeaderProps>{
    constructor(props: MyHeaderProps) {
        super(props);
    }
    public render() {
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