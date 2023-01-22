import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import Contact from '../Models/Contacts';
import * as apiHelper from '../API/ContactsAPI';
import { toast } from 'react-toastify';
import { getContactsList } from '../Redux/ContactsList';
import { connect } from "react-redux";

interface IAddUpdateContact {
    showDeleteContact: (isShow: boolean) => void,
    title: string,
    bodyText: string,
    contactID: number,
    getContactsList: any,
}
class DeleteContact extends React.Component<IAddUpdateContact> {
    state = {
        ContactRecord: new Contact(),
    }

    deleteRecord = async () => {
        try {
            await apiHelper.deleteContactsData(this.props.contactID);
            await this.props.getContactsList().catch((error: any) => {
                console.log("GetContactsList failed" + error);
            });
            this.props.showDeleteContact(false);
            toast.success('Record deleted successfully !', {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
        catch (error) {
            console.error(error);
        }
    }

    renderDeleteContact = () => {
        return (
            <>
                <div className="model_box">
                    <Modal backdrop="static" keyboard={false} show={true}>
                        <Modal.Header closeButton onClick={() => this.props.showDeleteContact(false)}>
                            <Modal.Title>{this.props.title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>{this.props.bodyText}</p>
                            <button type="submit" className="btn btn-success mt-4" onClick={this.deleteRecord}>{this.props.title}</button>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button type='button' variant="secondary" onClick={() => this.props.showDeleteContact(false)}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </>
        )
    }
    render() {
        return (
            this.renderDeleteContact()
        );
    }
}

const mapDispatchToProps = {
	getContactsList
};

export default connect(null, mapDispatchToProps) (DeleteContact);