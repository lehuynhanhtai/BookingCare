
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { emitter } from "../../utils/emitter"
import _ from 'lodash';


class ModalEditUser extends Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }
    }

    componentDidMount()
    {
        let user = this.props.currentUser;
        if (user && !_.isEmpty(user))
        {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'hardcode',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address
            })
        }
        console.log('didmout edit modal: ', this.props.currentUser)
    }

    toggle = () =>
    {
        this.props.toggleFromParent();
    }

    handleOnchangeInput = (event, id) =>
    {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });
    }

    checkValidateInput = () =>
    {
        let isValit = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++)
        {
            if (!this.state[arrInput[i]])
            {
                isValit = false;
                alert('Missing Parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValit;
    }

    handleSaveUser = () =>
    {
        let isValit = this.checkValidateInput();
        if (isValit === true)
        {
            //call api edit modal
            this.props.editUser(this.state);
        }
    }

    render()
    {
        console.log('check props from parent: ', this.props)
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-user-container'}
                size="lg">

                <ModalHeader toggle={() => { this.toggle() }}>Edit User</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input type='text'
                                onChange={(event) => { this.handleOnchangeInput(event, "email") }}
                                value={this.state.email}
                                disabled
                            />
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input type='password'
                                onChange={(event) => { this.handleOnchangeInput(event, "password") }}
                                value={this.state.password}
                                disabled
                            />
                        </div>
                    </div>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>First name</label>
                            <input type='text'
                                onChange={(event) => { this.handleOnchangeInput(event, "firstName") }}
                                value={this.state.firstName}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Last name</label>
                            <input type='text'
                                onChange={(event) => { this.handleOnchangeInput(event, "lastName") }}
                                value={this.state.lastName}
                            />
                        </div>
                    </div>
                    <div className='modal-user-body'>
                        <div className='input-container w-100'>
                            <label>Address</label>
                            <input type='text'
                                onChange={(event) => { this.handleOnchangeInput(event, "address") }}
                                value={this.state.address}
                            />
                        </div>
                    </div>



                </ModalBody>
                <ModalFooter>
                    <Button
                        className='px-3'
                        color="primary"
                        onClick={() => { this.handleSaveUser() }}>Save</Button>{' '}
                    <Button className='px-3' color="secondary" onClick={() => { this.toggle() }}>Close</Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state =>
{
    return {
    };
};

const mapDispatchToProps = dispatch =>
{
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);