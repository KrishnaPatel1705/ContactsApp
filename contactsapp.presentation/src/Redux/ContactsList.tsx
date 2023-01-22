import initialState from "./InitialState";
import { getContactsData } from '../API/ContactsAPI';

export default function contactListReducer(state = initialState, action: any) {
    switch (action.type) {
        case "Contacts_List":
            return { ...state, contacts: action.data };
        case "Filter_List":
            return { ...state, filterContacts: action.data };
        default:
            return state;
    }
}


export function getContactsList() {
    return async function (dispatch: any) {
        return await getContactsData().then(data => {
            dispatch({ type: "Contacts_List", data });
            dispatch({ type: "Filter_List", data });
        }).catch(error => {
            throw error;
        })
    }
}

export function filterByValue(value: string) {
    return async function (dispatch: any, getState : any) {
        let { contacts } = getState().contactList;
        let data = await contacts?.length > 0 && contacts?.filter(x => x?.lastName.toLowerCase().includes(value));
        return dispatch({ type: "Filter_List", data });
    }
}