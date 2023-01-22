import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CSS/ContactsApp.css';
import Contacts from './Components/Contacts';
import { connect } from "react-redux";
import { getApiUrl } from './Redux/APIUrl';
import LoadingIndicator from './UtilComponents/LoadingIndicator';

interface IApp {
	getApiUrl: any;
}

class App extends React.Component<IApp> {
  state = {
    loaded : false
  }
  async componentDidMount() {
    await this.props.getApiUrl().catch((error : any) => {
        console.log("GetAPIUrl failed" + error);
    });
    await this.setState({ loaded : true });
  }

  renderApp = () => {
    if(this.state.loaded){
    return (
      <>
        <div className="App">
          <Contacts />
        </div>
      </>
    );
    }
    else {
      return (<LoadingIndicator/>)    
    }
  }
  render() {
    return (
      this.renderApp()
    );
  }
}

const mapDispatchToProps = {
	getApiUrl
};

export default connect(null, mapDispatchToProps) (App);