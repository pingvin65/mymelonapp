import React from 'react';
import { Link } from 'react-router-dom';

import { Table } from 'react-bootstrap';
class Contacts extends React.Component {
    constructor(props) {
        super(props);
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);

        this.state = {
            contacts: []
        }
    };

    forceUpdateHandler() {
        this.forceUpdate();
    };

    checkempty(contacts) {
        if (contacts === null ||
            contacts === undefined ||
            contacts === 0) {
            return false;
        }
        else {
            return true;
        }
    }
    componentDidMount() {
        this.setState({ contacts: this.props.contacts });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.contacts !== this.props.contacts) {
            this.setState({ contacts: this.props.contacts });
        }
    }
    listItem(listItems = []) {
        if (Array.isArray(listItems) && listItems.length) {
            var coter = 1;
            return (<tbody>{listItems.map((contact) => <tr key={contact.id.toString()}>
                <td className="align-middle col-sm-1">{coter++}</td>
                <td className="align-middle"><Link to={`/contact/${contact.id}/`}>{contact.first_name} {contact.last_name}s</Link></td>
            </tr>
            )}</tbody>);
        } else {
            return null;
        }
    }

    render() {

        return (
            <Table striped bordered hover className="table-td-list">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Contact</th>
                        {/* <th> </th> */}
                    </tr>
                </thead>
                {this.listItem(this.state.contacts)}
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Contact</th>
                    </tr>
                </thead>
            </Table>);
    }
}
export default Contacts;
