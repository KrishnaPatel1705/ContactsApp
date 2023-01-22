import * as React from "react";
import LoadingImg from "../Images/Magnifying-Glass-Load-Purple.gif";

export default class LoadingIndicator extends React.Component {
    render() {
        return (<div className="centered"><img alt="Loading..." src={LoadingImg} /></div>)
    }
}