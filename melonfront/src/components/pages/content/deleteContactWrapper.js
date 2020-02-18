import React from 'react';
import { EmptyContact, DeleteDialogBox2 } from '../helper/helpers';

class DeleteContactWrapper extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            contact: EmptyContact(),
            contactPre: null,
            errormessage: null,
            message: null,
            edit: false,
            id: null,
            newContact: false,
            redirectHome: false,
            modalShowDelete: false
        }
    }
    componentDidMount() {
        // console.log(this.props.wrapperData);
        this.setState(this.props.wrapperData);

    }

    componentDidUpdate(prevProps, prevState) {

        if (prevProps.wrapperData !== this.props.wrapperData) {
            this.setState(this.props.wrapperData);
        }
        if (prevState !== this.state) {

        }
    }

    render() {
        return (
            <div>
                <h6>wraper </h6>
                <DeleteDialogBox2
                    contact={this.state.contact}
                    show={this.state.modalShowDelete}
                    // onHide={() => this.setState({modalShowDelete: false})}
                    onHide={this.onClickHide}
                // isDelited={() => this.setState({modalShowDelete: false})}
                // isDelited = {this.resetContact}
                />
            </div>

        )
    }
}

export default DeleteContactWrapper;