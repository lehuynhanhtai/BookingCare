import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from "../../../store/actions";


class TableManageUser extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {

        }

    }

    componentDidMount()
    {
        this.props.fetchUserRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if (prevProps.listUsers !== this.props.listUsers)
        {
            this.setState({
                usersRedux: this.props.listUsers
            })
        }
    }
    handleDeleteUser = (user) =>
    {
        this.props.deleteAUserRedux(user.id);
    }
    render()
    {
        console.log('Boyv check all users: ', this.props.listUsers);
        console.log('boyv check state: ', this.state.usersRedux);
        let arrUsers = this.state.usersRedux
        return (
            <div className='users-table my-5'>
                <table id='tablemanageuser'>
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                        {arrUsers && arrUsers.length > 0 &&
                            arrUsers.map((item, index) =>
                            {
                                return (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn-edit'><i className="fas fa-pencil-alt"></i></button>
                                            <button
                                                className='btn-delete'
                                                onClick={() => this.handleDeleteUser(item)}
                                            ><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })}




                    </tbody>
                </table>
            </div>
        );
    }

}

const mapStateToProps = state =>
{
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch =>
{
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
