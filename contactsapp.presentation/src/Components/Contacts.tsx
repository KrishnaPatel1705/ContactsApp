import React from 'react';
import ContactsHeader from './ContactsHeader';
import AddContact from './AddContact';
import ContactsForm from './ContactsForm';
import { ToastContainer } from 'react-toastify';
import LoadingIndicator from '../UtilComponents/LoadingIndicator';
import { connect } from "react-redux";
import { getContactsList } from '../Redux/ContactsList';
import Contact from '../Models/Contacts';

interface IContacts {
    getContactsList: any,
    contactList: Array<Contact>,
}

class Contacts extends React.Component<IContacts> {
    state = {
        loaded: false
    }

    async componentDidMount() {
        await this.props.getContactsList().catch((error: any) => {
            console.log("GetContactsList failed" + error);
        });
        await this.setState({ loaded: true });
    }
    renderContacts = () => {
        if (this.state.loaded) {

            return (
                <>
                    <ContactsHeader />
                    <div className="container ">
                        <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
                            <AddContact />
                            <ContactsForm />
                            <ToastContainer />
                        </div>
                    </div>
                </>
            )
        }
        else {
            return (<LoadingIndicator />)
        }
    }

    render() {
        return (
            this.renderContacts()
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        contactList: state.contactList.contact,
    };
};

const mapDispatchToProps = {
	getContactsList
};

export default connect(mapStateToProps, mapDispatchToProps) (Contacts);