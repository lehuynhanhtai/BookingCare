import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import '../../styles/responsive.scss'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp } from '../../store/actions/appActions';

class HomeHeader extends Component
{
    changeLanguage = (language) =>
    {
        this.props.changeLanguageAppRedux(language)
    }

    render()
    {
        let language = this.props.language;
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-3 text-center'>
                                <div className='left-content'>
                                    <i className='fas fa-bars icon-bars'></i>
                                    <div className='header-logo'></div>
                                </div>
                            </div>
                            <div className='col-7'>
                                <div className='center-content'>
                                    <div className='child-content'>
                                        <div className='center-title'><b><FormattedMessage id="homeheader.speciality" /></b></div>
                                        <div className='center-describe'><FormattedMessage id="homeheader.searchDoctor" /></div>
                                    </div>
                                    <div className='child-content'>
                                        <div className='center-title'><b><FormattedMessage id="homeheader.healthFacilities" /></b></div>
                                        <div className='center-describe'><FormattedMessage id="homeheader.chooseHospital" /></div>
                                    </div>
                                    <div className='child-content'>
                                        <div className='center-title'><b><FormattedMessage id="homeheader.doctor" /></b></div>
                                        <div className='center-describe'><FormattedMessage id="homeheader.goodDoctor" /></div>
                                    </div>
                                    <div className='child-content'>
                                        <div className='center-title'><b><FormattedMessage id="homeheader.checkupPackage" /></b></div>
                                        <div className='center-describe'><FormattedMessage id="homeheader.generalHealthCheck" /></div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-2 text-center'>
                                <div className='right-content'>
                                    <div className='support'><i className="fas fa-question-circle mx-1"></i><b><FormattedMessage id="homeheader.support" /></b></div>
                                    <div className='swichLang'>
                                        <span onClick={() => this.changeLanguage(LANGUAGES.VI)} className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}>VI</span>
                                        <span className='mx-1'>/</span>
                                        <span onClick={() => this.changeLanguage(LANGUAGES.EN)} className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}>EN</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner === true &&
                    <div className='home-banner-container'>

                        <div className='content-up'>
                            <div className='header-title-top'><FormattedMessage id="banner.titleBanner1" /></div>
                            <div className='header-title-bottom'><FormattedMessage id="banner.titleBanner2" /></div>
                            <div className='header-search'>
                                <i className='fas fa-search search-icon' />
                                <input type='text' placeholder='Tìm chuyên khoa khám bệnh' />
                            </div>
                        </div>

                        <div className='content-down'>
                            <div className='header-option'>
                                <div className='option-child'>
                                    <div className='icon-child'>
                                        <i className='far fa-hospital'></i>
                                    </div>
                                    <div className='text-child'>
                                        <FormattedMessage id="banner.textChild1" />
                                    </div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'>
                                        <i className='fas fa-mobile-alt'></i>
                                    </div>
                                    <div className='text-child'>
                                        <FormattedMessage id="banner.textChild2" />
                                    </div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'>
                                        <i className='fas fa-procedures'></i>
                                    </div>
                                    <div className='text-child'>
                                        <FormattedMessage id="banner.textChild3" />
                                    </div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'>
                                        <i className='fas fa-flask'></i>
                                    </div>
                                    <div className='text-child'>
                                        <FormattedMessage id="banner.textChild4" />
                                    </div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'>
                                        <i className='fas fa-user-md'></i>
                                    </div>
                                    <div className='text-child'>
                                        <FormattedMessage id="banner.textChild5" />
                                    </div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'>
                                        <i className='fas fa-user-md'></i>
                                    </div>
                                    <div className='text-child'>
                                        <FormattedMessage id="banner.textChild6" />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                }
            </React.Fragment>
        );
    }

}

const mapStateToProps = state =>
{
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch =>
{
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
