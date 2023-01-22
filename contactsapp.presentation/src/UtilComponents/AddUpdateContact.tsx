import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import Contact from '../Models/Contacts';
import * as apiHelper from '../API/ContactsAPI';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { ValidateModelWithErrorList } from './Validation/Validator';
import { ValidationErrorNotification } from './Validation/ValidationErrorNotification';
import NumericInput from './NumericInput';
import { connect } from "react-redux";
import { getContactsList } from '../Redux/ContactsList';

interface IAddUpdateContact {
    showAddUpdateContactPopup: (isShow: boolean) => void,
    isUpdate: boolean,
    contactID: number,
    getContactsList: any,
    contactList: Array<Contact>,
}
class AddUpdateContact extends React.Component<IAddUpdateContact> {
    state = {
        ContactRecord: new Contact(),
        HasError: false
    }

    async componentDidMount() {
        if (this.props.isUpdate) {
            this.setState({ ContactRecord: await apiHelper.getContactsDataByID(this.props.contactID) });
        }
    }

    handleChange = async (e) => {
        try {
            const { ContactRecord } = this.state;
            ContactRecord[e.target.name] = e.target.value;
            await this.setState({ ContactRecord: ContactRecord });
        }
        catch (error) {
            console.error(error);
        }
    }

    submitRecord = async () => {
        try {
            if (!await this.validate()) {
                await apiHelper.addContactsData(this.state.ContactRecord);
                await this.props.getContactsList().catch((error: any) => {
                    console.log("GetContactsList failed" + error);
                });
                this.props.showAddUpdateContactPopup(false);
                toast.success('Record added successfully !', {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    updateRecord = async () => {
        try {
            if (!await this.validate()) {
                await apiHelper.updateContactsData(this.state.ContactRecord);
                await this.props.getContactsList().catch((error: any) => {
                    console.log("GetContactsList failed" + error);
                });
                this.props.showAddUpdateContactPopup(false);
                toast.success('Record updated successfully !', {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    validate = async () => {
        let HasError = false;
        let ContactRecordData = Object.assign(new Contact(), this.state.ContactRecord);
        await ValidateModelWithErrorList(ContactRecordData);
        this.setState({ ContactRecord: ContactRecordData });
        if (ContactRecordData.Errors.length > 0) {
            console.log("Errors found in New Record")
            HasError = true;
        }
        this.setState({ HasError });
        return HasError;
    }

    renderAddUpdateContact = () => {
        return (
            <>
                <div className="model_box">
                    <Modal backdrop="static" keyboard={false} show={true}>
                        <Modal.Header closeButton onClick={() => this.props.showAddUpdateContactPopup(false)}>
                            <Modal.Title>{this.props.isUpdate ? 'Update Record' : 'Add Record'}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="input-group mt-3">
                                <input type="text" className="form-control" id="firstName" name="firstName" placeholder="Enter First Name" onInput={this.handleChange} defaultValue={this.state.ContactRecord.firstName} />
                                {this.state.ContactRecord.Errors?.find(x => x.name == 'firstName') &&
                                    <ValidationErrorNotification HasError={this.state.HasError} SourceField="firstName" Errors={this.state.ContactRecord.Errors} />
                                }
                            </div>
                            <div className="input-group mt-3">
                                <input type="text" className="form-control" id="lastName" name="lastName" placeholder="Enter Last Name" onInput={this.handleChange} defaultValue={this.state.ContactRecord.lastName} />
                            </div>
                            <div className="input-group mt-3">
                                <NumericInput Id="phoneNumber"
                                    Value={this.state.ContactRecord.phoneNumber}
                                    OnChange={this.handleChange}
                                    ClassName="form-control"
                                    PlaceholderText="Enter Phone Number"
                                />
                                {this.state.ContactRecord.Errors?.find(x => x.name == 'phoneNumber') &&
                                    <ValidationErrorNotification HasError={this.state.HasError} SourceField="phoneNumber" Errors={this.state.ContactRecord.Errors} />
                                }
                            </div>
                            {this.props.isUpdate ?
                                <button type="submit" className="btn btn-success mt-4" onClick={this.updateRecord}>Update Record</button>
                                :
                                <button type="submit" className="btn btn-success mt-4" onClick={this.submitRecord}>Add Record</button>
                            }
                        </Modal.Body>

                        <Modal.Footer>
                            <Button type='button' variant="secondary" onClick={() => this.props.showAddUpdateContactPopup(false)}>
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
            this.renderAddUpdateContact()
        );
    }
}

const mapStateToProps = state => {
    return {
        contactList: state.contactList.contact
    };
};

const mapDispatchToProps = {
	getContactsList
};

export default connect(mapStateToProps, mapDispatchToProps) (AddUpdateContact);