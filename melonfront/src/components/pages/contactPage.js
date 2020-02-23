import React from 'react';
import { Redirect } from 'react-router-dom';
import { NeedLogin, DeleteContact } from './helper/messages/messages';
import { AppContext } from '../../appContext';
import API from '../../api/api';
import { Button, Table, ButtonToolbar, ButtonGroup } from 'react-bootstrap';
import { CheckVaribla, InitialContact, Message, formatPhoneforRead } from './helper/helpers';
import { LinkContainer } from 'react-router-bootstrap'
import EditContact from './content/editContact';


class ContactPage extends React.Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);
        this.state = {
            contact: null,
            contactPre: null,
            errormessage: null,
            message: null,
            edit: false,
            id: null,
            newContact: false,
            redirectHome: false,
            modalShowDelete: false,
            melondata: null

        };
        this.onClickSetRedirectHome = this.onClickSetRedirectHome.bind(this);
        this.onUpdateContact = this.onUpdateContact.bind(this);
        this.onClikEdit = this.onClikEdit.bind(this);
        this.contact = this.contact.bind(this);
        this.messageError = this.messageError.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this);
        this.onClickDeleteDone = this.onClickDeleteDone.bind(this);
        this.onClickModalChange = this.onClickModalChange.bind(this);
    }

    componentDidMount() {

        const { id } = this.props.match.params;
        if (this.context.melondata !== null && this.context.melondata.length > 8 && id !== undefined) {
            this.setState({
                melondata: this.context.melondata,
                id: this.props.match.params
            },
                this.getContactData);

        } else if (id !== undefined) {
            // this.setState({ id: this.props.match.params })
            // this.getContactData(id);
        } else {
            this.setState({ edit: true, newContact: true, contact: InitialContact(), contactPre: InitialContact('templet') });
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(this.state.modalShowDelete);

        if (prevProps.match.params.id !== this.props.match.params.id && this.props.match.params.id === undefined) {
            this.setState({ edit: true, newContact: true, contact: InitialContact(), contactPre: InitialContact('templet') });
        }
    }

    getContactData() {
        console.log(this.state.id.id);

        API.get(`con/${this.state.id.id}/`, { headers: { Authorization: `Token ${this.state.melondata}` } })
            .then(res => {
                console.log(formatPhoneforRead(res.data));

                this.setState({ contact: formatPhoneforRead(res.data), errormessage: null });
            }).catch(error => {

                this.setState({ contact: null, errormessage: { name: 'Error', message: error.toString() } });

            });
    }

    onClikEdit() {
        this.setState({ edit: true, newContact: false, contactPre: this.state.contact })

    }

    renderRedirectHome() {
        if (this.state.redirectHome) {
            return (<Redirect to='/' />);
        }
    }

    messageSuccess(message) {
        if (message !== null) {
            return <Message text={message} type="success" />
        }
        return '';
    }

    onClickSetRedirectHome() {
        this.setState({
            redirectHome: true
        })
    }

    onUpdateContact(contact, message = null) {
        this.setState({ edit: false, contact: contact, message: message, melondata: this.context.melondata });
    }

    onClickDelete(event) {
        this.setState({ modalShowDelete: true })
    }

    onClickDeleteDone(contact = InitialContact(), redirectHome = false) {
        this.setState({ contact: contact, redirectHome: redirectHome })
    }

    onClickModalChange() {
        this.setState({
            modalShowDelete: false
        })
    }

    messageError() {
        return (
            <div>
                <h3>{this.state.errormessage.name}</h3>
                <p>{this.state.errormessage.message}</p>
                <p></p>
            </div>
        );
    }
    contact() {
        let ext = '';
        console.log(this.state.contact.phone.ext);

        if (this.state.contact.phone.ext !== undefined
            && this.state.contact.phone.ext !== null
            && this.state.contact.phone.ext.length !== 0 )
            ext = <span>ext. {this.state.contact.phone.ext}</span>

        return (
            <div className="container">
                {this.renderRedirectHome()}
                {this.messageSuccess(this.state.message)}
                <DeleteContact
                    contact={this.state.contact}
                    modalShowDelete={this.state.modalShowDelete}
                    trigerDeleteContact={this.onClickDeleteDone}
                    trigermodalShowDelete={this.onClickModalChange}
                />
                <h3>{CheckVaribla(this.state.contact.first_name)} {CheckVaribla(this.state.contact.last_name)}</h3>
                <Table striped bordered hover>
                    <tbody>
                        <tr>
                            <td>email</td>
                            <td>{CheckVaribla(this.state.contact.email)}</td>
                        </tr>
                        <tr>
                            <td>phone</td>
                            <td>{CheckVaribla(this.state.contact.phone.number)} {ext}</td>
                        </tr>
                        <tr>
                            <td>address</td>
                            <td>{CheckVaribla(this.state.contact.address)}</td>
                        </tr>
                    </tbody>

                </Table>
                <ButtonToolbar aria-label="Toolbar with button groups">
                    <ButtonGroup className="mr-2 mb-2" aria-label="Edit">
                        <Button variant="primary" onClick={this.onClikEdit}>Edit</Button>
                    </ButtonGroup>

                    <ButtonGroup className="mr-2 mb-2" aria-label="New Contacts">
                        <LinkContainer to="/contact/new">
                            <Button variant="primary">New</Button>
                        </LinkContainer>
                    </ButtonGroup>

                    <ButtonGroup className="mr-2 mb-2" aria-label="Delete">
                        <Button variant="danger" onClick={this.onClickDelete}>Delete</Button>
                    </ButtonGroup>
                    <ButtonGroup className="mb-2" aria-label="Home">
                        <Button variant="primary" onClick={this.onClickSetRedirectHome}>Home</Button>
                    </ButtonGroup>


                </ButtonToolbar>

            </div>

        );
    }

    render() {
        console.log(this.state.modalShowDelete);
        if (this.state.melondata === null) {
            return <NeedLogin />
        }
        if (this.state.errormessage !== null) {
            return (
                <this.messageError />
            );
        }
        else if (this.state.edit === true) {
            return (
                <EditContact con={this.state} trigerContactPageOrNew={this.onUpdateContact} />
            );
        }
        else if (this.state.contact !== null) {
            return (
                <div>
                    <this.contact />
                </div>
            );
        }
        else {
            return <h3>Ups</h3>;
        }

    }
}

export default ContactPage;