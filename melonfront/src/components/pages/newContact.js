import React from 'react';

import EditContact from './content/editContact';
import { InitialContact, } from './helper/helpers';
import ContactPage from './contactPage';
import { NeedLogin } from './helper/messages/messages';
import { AppContext } from '../../appContext';

class NewConect extends ContactPage {
    static contextType = AppContext;
    constructor(props) {
        super(props)
        this.state = {
            contact: InitialContact(),
            contactPre: InitialContact('templet'),
            errormessage: null,
            message: null,
            edit: true,
            id: null,
            newContact: true,
            redirectHome: false,
            modalShowDelete: false

        };
        this.onSaveNewContact = this.onSaveNewContact.bind(this);
    }

    onSaveNewContact(contact, message = null) {
        this.setState({ edit: false, contact: contact, message: message, id:{id: contact.id}, melondata: this.context.melondata });
    }


    componentDidMount() {
        if (this.context.login) {
            console.log(this.context.login);
        }
    }

    // render() {
    //     if (this.context.login) {
    //         return (
    //             <div>
    //                 <doSomething />
    //                 <EditContact con={this.state} trigerContactPageOrNew={this.onSaveNewContact} />
    //                 </div>
    //                 );
    //     }
    //     return (
    //         <NeedLogin />
    //     )
    // }

    render() {
        console.log(this.state);
        if (this.state.melondata === null) {
            return <NeedLogin />
        }
        if (this.state.errormessage !== null) {
            return (
           <this.messageError />
            );
        }
        else if (this.state.edit === true) {
            return <EditContact con={this.state} trigerContactPageOrNew={this.onSaveNewContact} />;
        }
        else if (this.state.contact !== null) {
            return (
                <this.contact />
            );
        }
        else {
            return <h3>Ups s r</h3>;
        }

    }
}
export default NewConect;
