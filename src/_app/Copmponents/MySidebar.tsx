import * as React from "react";
import { Route, Link } from 'react-router-dom';

export interface MySidebarProps {

}
export class MySidebar extends React.Component<MySidebarProps>{
    constructor(props: MySidebarProps) {
        super(props);
    }
    public render() {
        console.log("Rendering sidebar");
        return (
            ""
        );
    }
}