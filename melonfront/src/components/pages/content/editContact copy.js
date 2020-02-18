import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { InitialContact, } from '../helper/helpers';
import { NoChangeForSave } from '../helper/messages/messageModal';
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
            // message: {
            //     code: 200,
            //     text: ''
            // },
            message: '',
            newContact: true,
            noCheenge: false
        }
        this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);
        this.handleSaveSubmit = this.handleSaveSubmit.bind(this);
        this.onClickBack = this.onClickBack.bind(this);
    }

    updateContact() {
        var status = 0;
        API.patch(`con/${this.state.id.id}/`,
            {
                "first_name": this.state.contact.first_name,
                "last_name": this.state.contact.last_name,
                "email": this.state.contact.email,
                "phone": this.state.contact.phone,
                "address": this.state.contact.address
            },
            { headers: { Authorization: `Token ${this.state.melondata}`, 'Content-Type': 'application/json' } })
            .then(res => {
                const message = "Contact successfully updated";
                this.setState({ status: res.status, edit: false, contact: res.data, message: message })
            }).catch(error => {
                console.log(error);
            });

        return status
    }

    saveContact() {
        var status = 0;
        API.post(`con/`,
            {
                "first_name": this.state.contact.first_name,
                "last_name": this.state.contact.last_name,
                "email": this.state.contact.email,
                "phone": this.state.contact.phone,
                "address": this.state.contact.address
            },
            { headers: { Authorization: `Token ${this.state.melondata}`, 'Content-Type': 'application/json' } })
            .then(res => {
                const message = "Contact successfully recorded";
                this.setState({ status: res.status, edit: false, contact: res.data, message: message })
            }).catch(error => {
                // Error 😨
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
        let arrayprops = Object.values(this.props.con.contact).sort();
        let arraystate = Object.values(this.state.contact).sort();
        const check = (arrayprops, arraystate) => {

            if (arrayprops.length === arraystate.length) {

                for (var i = 0; i < arrayprops.length; i++) {
                    if (arrayprops[i] !== arraystate[i]) {
                        return false;
                    }
                }
            }
            return true;
        }
        check(arraystate, arrayprops)
        if (check(arraystate, arrayprops)) {
            this.setState({ noCheenge: true });
        } else {
            this.updateContact();
        }

    }

    handleSaveSubmit(event) {
        event.preventDefault();

        this.saveContact();

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
        // console.log(prevProps.match.params.id);
        // console.log(this.props.match.params.id);
        console.log(prevState);
        console.log(this.state);
        if (prevState.edit !== this.state.edit && this.state.edit === false) {
            this.props.trigerContactPage(this.state.contact, this.state.message);
        }

    }

    onClickBack() {
        this.setState({ message: null, edit: false })
        // this.setState({edit: false});
    }

    render() {

        if (this.state.newContact === false) {
            return (
                <div>
                    <NoChangeForSave
                        show={this.state.noCheenge}
                        onHide={() => this.setState({ noCheenge: false })}
                    />
                    <h3>Edit</h3>
                    <Form onSubmit={this.handleUpdateSubmit}>
                        <Form.Row>
                            <Form.Group controlId="formGroupFirstName" className="col-md-5">
                                <Form.Label>First name</Form.Label>
                                <Form.Control name="first_name"
                                    defaultValue={this.state.contact.first_name}
                                    // placeholder={this.state.contact.first_name}
                                    autoFocus
                                    onChange={e => this.setState({ contact: { ...this.state.contact, first_name: e.target.value } })}
                                    required
                                />
                            </Form.Group>


                            <Form.Group controlId="formGroupLastName" className="col-md-5">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control
                                    defaultValue={this.state.contact.last_name}
                                    // placeholder={this.state.contact.last_name}
                                    onChange={e => this.setState({ contact: { ...this.state.contact, last_name: e.target.value } })}
                                    required
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group controlId="formGroupEmail" className="col-md-5">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    defaultValue={this.state.contact.email}
                                    // placeholder={this.state.contact.email}
                                    onChange={e => this.setState({ contact: { ...this.state.contact, email: e.target.value } })}
                                    required
                                />
                            </Form.Group>


                            <Form.Group controlId="formGroupPhone" className="col-md-5">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                    defaultValue={this.state.contact.phone}
                                    // placeholder={this.state.contact.phone}
                                    onChange={e => this.setState({ contact: { ...this.state.contact, phone: e.target.value } })}
                                />
                            </Form.Group>

                        </Form.Row>
                        <Form.Row>
                            <Form.Group controlId="formGroupAddress" className="col-md-10">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    defaultValue={this.state.contact.address}
                                    // placeholder={this.state.contact.address}
                                    onChange={e => this.setState({ contact: { ...this.state.contact, address: e.target.value } })}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group controlId="formGroupAddress" className="col-md-10">
                                <Button className="mr-md-3" variant="primary" type="submit">Update Contact</Button>
                                <Button className="float-right" variant="primary" onClick={this.onClickBack}>&#8630; Back</Button>
                            </Form.Group>
                        </Form.Row>
                    </Form>
                </div>

            );
        } else {
            return (
                <div>
                    <NoChangeForSave
                        show={this.state.noCheenge}
                        onHide={() => this.setState({ noCheenge: false })}
                    />
                    <h3>New Contact</h3>
                    <Form onSubmit={this.handleSaveSubmit}>
                        <Form.Row>


                            <Form.Group controlId="formGroupFirstName" className="col-md-5">
                                <Form.Label>First name</Form.Label>
                                <Form.Control name="first_name"
                                    placeholder={this.state.contactPre.first_name}
                                    autoFocus
                                    onChange={e => this.setState({ contact: { ...this.state.contact, first_name: e.target.value } })}
                                    required
                                />
                            </Form.Group>


                            <Form.Group controlId="formGroupLastName" className="col-md-5">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control
                                    placeholder={this.state.contactPre.last_name}
                                    onChange={e => this.setState({ contact: { ...this.state.contact, last_name: e.target.value } })}
                                    required
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group controlId="formGroupEmail" className="col-md-5">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    placeholder={this.state.contactPre.email}
                                    onChange={e => this.setState({ contact: { ...this.state.contact, email: e.target.value } })}
                                    required
                                />
                            </Form.Group>


                            <Form.Group controlId="formGroupPhone" className="col-md-5">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                    placeholder={this.state.contactPre.phone}
                                    onChange={e => this.setState({ contact: { ...this.state.contact, phone: e.target.value } })}
                                />
                            </Form.Group>

                        </Form.Row>
                        <Form.Row>
                            <Form.Group controlId="formGroupAddress" className="col-md-10">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    placeholder={this.state.contactPre.address}
                                    onChange={e => this.setState({ contact: { ...this.state.contact, address: e.target.value } })}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group controlId="formGroupAddress" className="col-md-10">
                                <Button className="mr-md-3" variant="primary" type="submit">Save</Button>
                                <Button className="float-right" variant="primary" onClick={this.onClickBack}>&#8630; Back</Button>
                            </Form.Group>
                        </Form.Row>
                    </Form>
                </div>

            );
        }
    }
}
export default EditContact;