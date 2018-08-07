import * as React from "react";
import { Link } from 'react-router-dom';

export interface MyHeaderProps {

}
export class MyHeader extends React.Component<MyHeaderProps>{
    constructor(props: MyHeaderProps) {
        super(props);
    }
    public render() {

        return (
            "MyHeader component"
        );
    }
}