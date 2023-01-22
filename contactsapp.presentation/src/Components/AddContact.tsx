import React from 'react';
import AddUpdateContact from '../UtilComponents/AddUpdateContact';
import { Button } from 'react-bootstrap';

export default class AddContact extends React.Component {
    state = {
        showAddUpdateContact: false
    }

    showAddUpdateContactPopup = (isShow: boolean) => {
        this.setState({ showAddUpdateContact: isShow });
    }

    renderAddContact = () => {
        return (
            <>
                <div className="row ">
                    <div className="col-sm-3 mt-5 mb-4 text-gred">
                        <h3 className='textLeft'>Contacts</h3>
                    </div>
                    <div className="col-sm-3 offset-sm-2"></div>
                    <div className="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred textRight">
                        <Button variant="primary" onClick={() => this.setState({showAddUpdateContact : true})}>
                            Add Contact
                        </Button>
                    </div>
                </div>
                {this.state.showAddUpdateContact &&
                    <AddUpdateContact showAddUpdateContactPopup={this.showAddUpdateContactPopup} isUpdate={false} contactID={0}/>
                }
            </>
        )
    }
    render() {
        return (
            this.renderAddContact()
        );
    }
}