import React from 'react';
import Contact from '../Models/Contacts';
import { Button } from 'react-bootstrap';
import AddUpdateContact from '../UtilComponents/AddUpdateContact';
import DeleteContact from '../UtilComponents/DeleteContact';
import { connect } from "react-redux";
import { filterByValue } from '../Redux/ContactsList';
import ListGroup from 'react-bootstrap/ListGroup';
import { Telephone } from 'react-bootstrap-icons';

interface IContactsForm {
    contactList: Array<Contact>,
    filteredData: Array<Contact>,
    filterByValue: any,
}

class ContactsForm extends React.Component<IContactsForm> {
    state =
        {
            contactsData: Array<Contact>(),
            filterData: Array<Contact>(),
            showAddUpdateContact: false,
            showDeleteContact: false,
            contactID: 0
        }

    generateRows = (contact: Contact) => {
        return (

            <ul className="list-group" key={contact.contactID}>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                        <div className="fw-bold textLeft"><span className='fontSize'>{contact.firstName}</span> <span className='fontSize'>{contact.lastName}</span></div>
                        <div className='textLeft'>
                        <Telephone /> {contact.phoneNumber}
                        </div>
                    </div>
                    <span>
                        <Button variant="primary" onClick={() => this.setState({ showAddUpdateContact: true, contactID: contact.contactID })}> Update </Button>
                        <Button variant="danger" className="ms-2" onClick={() => this.setState({ showDeleteContact: true, contactID: contact.contactID })}> Delete </Button>
                    </span>
                </li>
            </ul>
        )
    }

    showAddUpdateContactPopup = async (isShow: boolean) => {
        await this.setState({ showAddUpdateContact: isShow });
    }

    showDeletePopup = async (isShow: boolean) => {
        await this.setState({ showDeleteContact: isShow });
    }

    searchData = async (e) => {
        try {
            this.props.filterByValue(e.target.value.toLowerCase());
        }
        catch (error) {
            console.error(error);
        }
    }

    renderContactsForm = () => {
        return (
            <>
                <div className="col-sm-12 mb-4 text-gred">
                    <div className="search">
                        <form className="form-inline">
                            <input className="form-control mr-sm-2" type="text" placeholder="Search for contact by last name..." onChange={this.searchData} />
                        </form>
                    </div>
                </div>
                <div className="crud shadow-lg p-3 bg-body rounded">
                    <div className="row">
                        <div className="table-responsive " >
                            <ListGroup as="ol" numbered>
                                {
                                    this.props.filteredData?.length > 0 && this.props.filteredData?.map(contact => {
                                        return (this.generateRows(contact))
                                    })
                                }
                            </ListGroup>
                        </div>
                    </div>
                </div>
                {this.state.showAddUpdateContact &&
                    <AddUpdateContact showAddUpdateContactPopup={this.showAddUpdateContactPopup} isUpdate={true} contactID={this.state.contactID} />
                }
                {this.state.showDeleteContact &&
                    <DeleteContact showDeleteContact={this.showDeletePopup} contactID={this.state.contactID} title="Delete Record" bodyText="Are you sure you want to delete this Record?" />
                }
            </>
        )
    }
    render() {
        return (
            this.renderContactsForm()
        );
    }
}

const mapStateToProps = state => {
    return {
        contactList: state.contactList.contacts,
        filteredData: state.contactList.filterContacts
    };
};

const mapDispatchToProps = {
    filterByValue
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactsForm);