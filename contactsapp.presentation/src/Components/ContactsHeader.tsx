import React from 'react';
import { JournalText } from 'react-bootstrap-icons';

export default class ContactsHeader extends React.Component {
    renderContactsHeader = () => {
        return (
            <>
                <h1>
                    <JournalText />
                    Phone Book App
                </h1>
            </>
        )
    }
    render() {
        return (
            this.renderContactsHeader()
        );
    }
}