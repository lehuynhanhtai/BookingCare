import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import * as actions from "../../../store/actions";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";
import { getDetailInforDoctor } from '../../../services/userService';


const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageDoctor extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            //save to Markdown table
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listDoctors: [],
            hasOldData: false,


            //Save to doctor_infor table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listClinic: [],
            listSpecialty: [],

            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedClinic: '',
            selectedSpecialty: '',

            nameClinic: '',
            addressClinic: '',
            note: '',
            clinicId: '',
            specialtyId: ''

        }

    }

    componentDidMount()
    {
        this.props.fetchAllDoctor();
        this.props.getAllRequiredDoctorInfor();
    }

    buildDataInputSelect = (inPutData, type) =>
    {
        let result = [];
        let { language } = this.props;
        if (inPutData && inPutData.length > 0)
        {
            if (type === 'USERS')
            {
                inPutData.map((item, index) =>
                {
                    let object = {}
                    let labelVi = `${item.lastName} ${item.firstName}`;
                    let labelEn = `${item.firstName} ${item.lastName}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object)
                })
            }
            if (type === 'PRICE')
            {
                inPutData.map((item, index) =>
                {
                    let object = {};
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn} USD`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object)
                })
            }
            if (type === 'PAYMENT' || type === 'PROVINCE')
            {
                inPutData.map((item, index) =>
                {
                    let object = {};
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object)
                })
            }
            if (type === 'SPECIALTY')
            {
                inPutData.map((item, index) =>
                {
                    let object = {};
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object)
                })
            }
        }

        return result
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if (prevProps.allDoctors !== this.props.allDoctors)
        {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS')
            this.setState({
                listDoctors: dataSelect
            })
        }

        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor)
        {
            let { resPrice, resPayment, resProvince, resSpecialty } = this.props.allRequiredDoctorInfor;

            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProVince = this.buildDataInputSelect(resProvince, 'PROVINCE');
            let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY');

            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProVince,
                listSpecialty: dataSelectSpecialty
            })
        }

        if (prevProps.language !== this.props.language)
        {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS')
            let { resPrice, resPayment, resProvince } = this.props.allRequiredDoctorInfor;
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProVince = this.buildDataInputSelect(resProvince, 'PROVINCE')
            this.setState({
                listDoctors: dataSelect,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProVince,
            })
        }
    }

    handleEditorChange = ({ html, text }) =>
    {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleSaveContentMarkdown = () =>
    {
        let { hasOldData } = this.state;
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            clinicId: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : '',
            specialtyId: this.state.selectedSpecialty.value,
        })
    }

    handleChangeSelect = async (selectedOption) =>
    {
        this.setState({ selectedOption });
        let { listPrice, listPayment, listProvince } = this.state;

        let res = await getDetailInforDoctor(selectedOption.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown)
        {
            let markdown = res.data.Markdown;

            let addressClinic = '', nameClinic = '', note = '',
                paymentId = '', priceId = '', provinceId = '',
                selectedPrice = '', selectedPayment = '', selectedProvince = '';

            if (res.data.Doctor_infor)
            {
                addressClinic = res.data.Doctor_infor.addressClinic
                nameClinic = res.data.Doctor_infor.nameClinic
                note = res.data.Doctor_infor.note

                paymentId = res.data.Doctor_infor.paymentId
                priceId = res.data.Doctor_infor.priceId
                provinceId = res.data.Doctor_infor.provinceId


                selectedPrice = listPrice.find(item =>
                {
                    return item && item.value === priceId
                })
                selectedPayment = listPayment.find(item =>
                {
                    return item && item.value === paymentId
                })
                selectedProvince = listProvince.find(item =>
                {
                    return item && item.value === provinceId
                })
            }

            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
                addressClinic: addressClinic,
                nameClinic: nameClinic,
                note: note,
                selectedPrice: selectedPrice,
                selectedPayment: selectedPayment,
                selectedProvince: selectedProvince
            })
        } else
        {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
                addressClinic: '',
                nameClinic: '',
                note: ''
            })
        }
        console.log("check value selectedOption: ", res)
    };

    handleChangeSelectDoctorÌnor = async (selectedOption, name) =>
    {
        let stateName = name.name;
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedOption;

        this.setState({
            ...stateCopy
        })

        console.log('check new select on change: ', selectedOption, stateName)
    }


    handleOnChangeText = (event, id) =>
    {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }
    render()
    {
        let { hasOldData, listSpecialty } = this.state;
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                    <FormattedMessage id="admin.manage-doctor.title" />
                </div>
                <div className='more-infor'>
                    <div className='content-left form group'>
                        <label><FormattedMessage id="admin.manage-doctor.select-doctor" /></label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                            placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor" />}
                        />
                    </div>

                    <div className='content-right'>
                        <label><FormattedMessage id="admin.manage-doctor.intro-infor" /></label>
                        <textarea
                            className='form-control'
                            rows="4"
                            onChange={(event) => this.handleOnChangeText(event, 'description')}
                            value={this.state.description}
                        >

                        </textarea>
                    </div>
                </div>


                <div className='more-infor-extra row'>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.price" /></label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectDoctorÌnor}
                            options={this.state.listPrice}
                            placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
                            name="selectedPrice"
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.payment" /></label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectDoctorÌnor}
                            options={this.state.listPayment}
                            placeholder={<FormattedMessage id="admin.manage-doctor.payment" />}
                            name="selectedPayment"
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.province" /></label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectDoctorÌnor}
                            options={this.state.listProvince}
                            placeholder={<FormattedMessage id="admin.manage-doctor.province" />}
                            name="selectedProvince"
                        />
                    </div>

                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.nameClinic" /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'nameClinic')}
                            value={this.state.nameClinic}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.addressClinic" /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'addressClinic')}
                            value={this.state.addressClinic}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.note" /></label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'note')}
                            value={this.state.note}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col 4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.speciality" /></label>
                        <Select
                            value={this.state.selectedSpecialty}
                            options={this.state.listSpecialty}
                            placeholder={<FormattedMessage id="admin.manage-doctor.speciality" />}
                            onChange={this.handleChangeSelectDoctorÌnor}
                            name="selectedSpecialty"
                        />
                    </div>
                    <div className='col 4 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.select-clinic" /></label>
                        <Select
                            value={this.state.selectedClinic}
                            onChange={this.handleChangeSelectDoctorÌnor}
                            options={this.state.listClinic}
                            placeholder={<FormattedMessage id="admin.manage-doctor.select-clinic" />}
                            name="selectedClinic"
                        />
                    </div>
                </div>
                <div className='manage-doctor-editer'>
                    <MdEditor
                        style={{ height: '300px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown} />
                </div>

                <button
                    onClick={() => this.handleSaveContentMarkdown()}
                    className={hasOldData === true ? "save-content-doctor" : "create-content-doctor"}>
                    {hasOldData === true ?
                        <span><FormattedMessage id="admin.manage-doctor.save" /></span>
                        :
                        <span><FormattedMessage id="admin.manage-doctor.add" /></span>
                    }
                </button>
            </div>
        );
    }

}

const mapStateToProps = state =>
{
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor
    };
};

const mapDispatchToProps = dispatch =>
{
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        getAllRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),

        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
