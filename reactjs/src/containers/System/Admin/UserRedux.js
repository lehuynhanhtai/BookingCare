import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllcodeService } from '../../../services/userService';
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";

class UserRedux extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            genderArr: []
        }
    }

    async componentDidMount()
    {
        this.props.getGenderStart();
        // this.props.dispatch(actions.getGenderStart())
        // try
        // {
        //     let res = await getAllcodeService('gender');
        //     if (res && res.errCode === 0)
        //     {
        //         this.setState({
        //             genderArr: res.data
        //         })

        //     }
        //     console.log('boyvip check res: ', res)
        // } catch (e)
        // {
        //     console.log(e)
        // }
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if (prevProps.genderRedux !== this.props.genderRedux)
        {
            this.setState({
                genderArr: this.props.genderRedux
            })
        }
    }

    render()
    {
        let genders = this.state.genderArr;
        let language = this.props.language;
        console.log('boyV check props from redux: ', this.props.genderRedux);
        return (
            <div className='user-redux-container'>
                <div className='title'>
                    User Redux boy_v
                </div>
                <div className="user-redux-body" >
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12'>
                                <p>
                                    <FormattedMessage id="manage-user.add" />
                                </p>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.email" /></label>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.password" /></label>
                                <input className='form-control' type='password' />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.firstname" /></label>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.lastname" /></label>
                                <input className='form-control' type='text' />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.phonenumber" /></label>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id="manage-user.address" /></label>
                                <input className='form-control' type='text' />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.gender" /></label>
                                <select className='form-control'>
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) =>
                                        {
                                            return (
                                                <option key={index}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })}


                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.position" /></label>
                                <select className='form-control'>
                                    <option>Chose</option>
                                    <option>ssss</option>
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.roleid" /></label>
                                <select className='form-control'>
                                    <option>Chose</option>
                                    <option>ssss</option>
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.image" /></label>
                                <input type='text' className='form-control' />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-12'>
                                <button className='btn btn-primary mt-3'><FormattedMessage id="manage-user.save" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state =>
{
    return {
        language: state.app.language,
        genderRedux: state.admin.genders
    };
};

const mapDispatchToProps = dispatch =>
{
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
