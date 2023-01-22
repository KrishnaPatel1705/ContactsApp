import { get, post, put, deleteData } from './CommonAPIHelper';
import Contact from '../Models/Contacts'; 

let setAPIURL="";
export function getConfig() {
    return async function (dispatch : any, getState : any) {
        let { apiUrl } = await getState().apiUrl;
        setAPIURL = apiUrl;
    }
}

export async function getContactsData() {
    return await get<Array<Contact>>(setAPIURL+"Contacts/GetContactsData");
}

export async function addContactsData(contact: Contact) {
    return await post<boolean>(setAPIURL+"Contacts/AddContactsData",contact);
}

export async function getContactsDataByID(contactID: number) {
    return await get<Contact>(setAPIURL+"Contacts/getContactsDataByID?contactID="+contactID);
}

export async function updateContactsData(contact: Contact) {
    return await put<boolean>(setAPIURL+"Contacts/UpdateContactsData",contact);
}

export async function deleteContactsData(contactID: number) {
    return await deleteData<boolean>(setAPIURL+"Contacts/DeleteContactsData?contactID="+contactID);
}