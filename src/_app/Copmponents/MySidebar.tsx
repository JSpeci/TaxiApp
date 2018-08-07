import * as React from "react";
import { Route, Link } from 'react-router-dom';

export interface MySidebarProps {

}
export class MySidebar extends React.Component<MySidebarProps>{
    constructor(props: MySidebarProps) {
        super(props);
    }
    public render() {
        alert("adsfadsfadafadsf");
        return (
            <h1>"My Sidebar component !!"</h1>
        );
    }
}