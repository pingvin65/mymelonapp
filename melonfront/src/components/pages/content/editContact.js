import React from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { InitialContact, formatPhoneforRead } from '../helper/helpers';
import { NoChangeForSave } from '../helper/messages/messages';
import API from '../../../api/api';

class EditContact extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            contact: InitialContact(),
            contactPre: InitialContact(),
            edit: true,
            melondata: localStorage.getItem('melondata'),
            id: null,
            message: '',
            newContact: true,
            noCheenge: false
        }
        this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);
        this.handleSaveSubmit = this.handleSaveSubmit.bind(this);
        this.onClickBack = this.onClickBack.bind(this);
        this.ifNumberEmpty = this.ifNumberEmpty.bind(this);
    }

    ifNumberEmpty(phone = this.state.contact.phone) {
        console.log(phone);
        let poneout = '';


        if (phone.number === null || phone.number === undefined) {
            return poneout;
        }
        let regex = /[^0-9]/g
        console.log(phone);
        let number = '';
        let ext = '';
        if (phone.ext !== null && phone.ext !== undefined && phone.ext.length > 0) {
            number = phone.number.trim().replace(regex, '');
            ext = phone.ext.trim().replace(regex, '');
            poneout = number + 'x' + ext;
            console.log(poneout);

            return poneout
        }
        poneout = phone.number.trim().replace(regex, '');
        console.log(poneout);
        return poneout;
    }

    updateContact() {

        var status = 0;
        console.log(this.state.contact.phone);

        let phone = this.ifNumberEmpty();
        console.log(phone);

        API.patch(`con/${this.state.id.id}/`,
            {
                "first_name": this.state.contact.first_name,
                "last_name": this.state.contact.last_name,
                "email": this.state.contact.email,
                "phone": phone,
                "address": this.state.contact.address
            },
            { headers: { Authorization: `Token ${this.state.melondata}`, 'Content-Type': 'application/json' } })
            .then(res => {
                const message = "Contact successfully updated";
                this.setState({ status: res.status, edit: false, contact: formatPhoneforRead(res.data), message: message })
            }).catch(error => {
                // Error 
                if (error.response) {
                    /*
                     * The request was made and the server responded with a
                     * status code that falls out of the range of 2xx
                     */
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    /*
                     * The request was made but no response was received, `error.request`
                     * is an instance of XMLHttpRequest in the browser and an instance
                     * of http.ClientRequest in Node.js
                     */
                    console.log(error.request);
                    console.log(error.message);
                } else {
                    // Something happened in setting up the request and triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });

        return status
    }

    saveContact() {
        var status = 0;
        let phone = this.ifNumberEmpty();

        console.log(phone);

        API.post(`con/`,
            {
                "first_name": this.state.contact.first_name,
                "last_name": this.state.contact.last_name,
                "email": this.state.contact.email,
                "phone": phone,
                "address": this.state.contact.address
            },
            { headers: { Authorization: `Token ${this.state.melondata}`, 'Content-Type': 'application/json' } })
            .then(res => {
                const message = "Contact successfully recorded";
                console.log(res.data);

                this.setState({ status: res.status, edit: false, contact: formatPhoneforRead(res.data), message: message })
            }).catch(error => {
                // Error 
                if (error.response) {
                    /*
                     * The request was made and the server responded with a
                     * status code that falls out of the range of 2xx
                     */
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    /*
                     * The request was made but no response was received, `error.request`
                     * is an instance of XMLHttpRequest in the browser and an instance
                     * of http.ClientRequest in Node.js
                     */
                    console.log(error.request);
                    console.log(error.message);
                } else {
                    // Something happened in setting up the request and triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });

        return status
    }

    handleUpdateSubmit(event) {
        event.preventDefault();

        let check = (a, b) => {
            if (Object.values(a).length === Object.values(b).length) {
                const ap = Object.getOwnPropertyNames(a);
                for (let i = 0; i < ap.length; i++) {
                    const pname = ap[i];
                    if (a[pname] !== b[pname]) {
                        return false;
                    }
                }
                return true
            }
            return false;
        }
        console.log(check(this.props.con.contact, this.state.contact))
        if (check(this.props.con.contact, this.state.contact)) {
            this.setState({ noCheenge: true });
        } else {
            this.updateContact();
        }
    }

    handleSaveSubmit(event) {
        event.preventDefault();

        console.log(
            this.state.phone
        );
        if (this.state.phone === undefined) {
            this.setState({ phone: 'null' },
                this.saveContact)
        } else {
             this.saveContact();
        }


    }

    componentDidMount() {
        this.setState({
            contact: this.props.con.contact,
            contactPre: this.props.con.contactPre,
            id: this.props.con.id,
            newContact: this.props.con.newContact
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.edit !== this.state.edit && this.state.edit === false) {
            this.props.trigerContactPageOrNew(this.state.contact, this.state.message);
        }
    }


    onClickBack() {
        if (this.state.edit === true && this.state.newContact === true) {

            this.props.history.goBack();

        } else {
            this.setState({ message: null, edit: false })
        }

        // this.setState({edit: false});
    }




    render() {

        return (
            <div>
                <NoChangeForSave
                    show={this.state.noCheenge}
                    onHide={() => this.setState({ noCheenge: false })}
                />
                <h3>{this.state.newContact ? ("New Contact") : ("Edit")}</h3>
                <Form onSubmit={this.state.newContact ? (this.handleSaveSubmit) : (this.handleUpdateSubmit)}>
                    <Form.Row>
                        <Form.Group controlId="formGroupFirstName" className="col-md-5">
                            <Form.Label>First name</Form.Label>
                            {this.state.newContact ?
                                (
                                    <Form.Control name="first_name"
                                        placeholder={this.state.contactPre.first_name}
                                        autoFocus
                                        onChange={e => this.setState({ contact: { ...this.state.contact, first_name: e.target.value } })}
                                        required
                                    />
                                ) : (
                                    <Form.Control name="first_name"
                                        defaultValue={this.state.contact.first_name}
                                        autoFocus
                                        onChange={e => this.setState({ contact: { ...this.state.contact, first_name: e.target.value } })}
                                        required
                                    />
                                )}

                        </Form.Group>


                        <Form.Group controlId="formGroupLastName" className="col-md-5">
                            <Form.Label>Last name</Form.Label>
                            {this.state.newContact ?
                                (
                                    <Form.Control
                                        placeholder={this.state.contactPre.last_name}
                                        onChange={e => this.setState({ contact: { ...this.state.contact, last_name: e.target.value } })}
                                        required
                                    />
                                ) : (
                                    <Form.Control
                                        defaultValue={this.state.contact.last_name}
                                        onChange={e => this.setState({ contact: { ...this.state.contact, last_name: e.target.value } })}
                                        required
                                    />
                                )}
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group controlId="formGroupEmail" className="col-md-5">
                            <Form.Label>Email</Form.Label>
                            {this.state.newContact ?
                                (
                                    <Form.Control
                                        placeholder={this.state.contactPre.email}
                                        onChange={e => this.setState({ contact: { ...this.state.contact, email: e.target.value } })}
                                        required
                                    />
                                ) : (
                                    <Form.Control
                                        defaultValue={this.state.contact.email}
                                        onChange={e => this.setState({ contact: { ...this.state.contact, email: e.target.value } })}
                                        required
                                    />
                                )}
                        </Form.Group>


                        <Form.Group controlId="formGroupPhone" className="col-md-5">
                            <Form.Label>Phone</Form.Label>
                            {this.state.newContact ?
                                (
                                    <Form.Control
                                        defaultValue={null}
                                        placeholder={this.state.contactPre.phone.number}
                                        onChange={e => this.setState({ contact: 
                                            { ...this.state.contact, phone: 
                                                { number: e.target.value,
                                                 ext: this.state.contact.phone.ext 
                                                } } })}
                                    />
                                ) : (
                                    <Form.Control
                                        defaultValue={this.state.contact.phone.number}
                                        onChange={e => this.setState({ contact: 
                                            { ...this.state.contact, phone: 
                                                { number: e.target.value,
                                                    ext: this.state.contact.phone.ext 
                                                 } } })}
                                    />
                                )}
                            <Form.Label>Phone ext.</Form.Label>
                            {this.state.newContact ?
                                (
                                    <Form.Control
                                        defaultValue={null}
                                        placeholder={this.state.contactPre.phone.ext}
                                        onChange={e => this.setState({ contact: 
                                            { ...this.state.contact, phone: { 
                                                ext: e.target.value,
                                                number: this.state.contact.phone.number
                                         } } })}
                                    />
                                ) : (
                                    <Form.Control
                                        defaultValue={this.state.contact.phone.ext}
                                        onChange={e => this.setState({ contact: 
                                            { ...this.state.contact, phone: 
                                                { ext: e.target.value,
                                                    number: this.state.contact.phone.number
                                                 } } })}
                                    />
                                )}

                        </Form.Group>

                    </Form.Row>
                    <Form.Row>
                        <Form.Group controlId="formGroupAddress" className="col-md-10">
                            <Form.Label>Address</Form.Label>
                            {this.state.newContact ?
                                (
                                    <Form.Control
                                        placeholder={this.state.contactPre.address}
                                        onChange={e => this.setState({ contact: { ...this.state.contact, address: e.target.value } })}
                                    />
                                ) : (
                                    <Form.Control
                                        defaultValue={this.state.contact.address}
                                        onChange={e => this.setState({ contact: { ...this.state.contact, address: e.target.value } })}
                                    />
                                )}
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group controlId="formGroupAddress" className="col-md-10">
                            <Button className="mr-md-3" variant="primary" type="submit"> {this.state.newContact ?
                                ("Save") : ("Update Contact")}</Button>
                            <Button className="float-right" variant="secondary" onClick={this.onClickBack}>&#8630; Back</Button>
                        </Form.Group>
                    </Form.Row>
                </Form>
            </div>

        );

    }
}
export default withRouter(EditContact);