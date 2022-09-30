import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import '../../styles/responsive.scss'


class HomeHeader extends Component
{

    render()
    {
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
                                        <div className='center-title'><b>Chuyên khoa</b></div>
                                        <div className='center-describe'>Tìm bác sĩ theo chuyên khoa</div>
                                    </div>
                                    <div className='child-content'>
                                        <div className='center-title'><b>Cơ sở y tế</b></div>
                                        <div className='center-describe'>Chọn bệnh viện phòng khám</div>
                                    </div>
                                    <div className='child-content'>
                                        <div className='center-title'><b>Bác sĩ</b></div>
                                        <div className='center-describe'>Chọn bác sĩ giỏi</div>
                                    </div>
                                    <div className='child-content'>
                                        <div className='center-title'><b>Gói khám</b></div>
                                        <div className='center-describe'>Khám sức khỏe tổng quát</div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-2 text-center'>
                                <div className='right-content'>
                                    <b>Hỗ trợ</b>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='home-banner-container'>

                    <div className='content-up'>
                        <div className='header-title-top'>NỀN TẢNG Y TẾ</div>
                        <div className='header-title-bottom'>CHĂM SÓC SỨC KHỎE TOÀN DIỆN</div>
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
                                    Khám chuyên khoa
                                </div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'>
                                    <i className='fas fa-mobile-alt'></i>
                                </div>
                                <div className='text-child'>
                                    Khám từ xa
                                </div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'>
                                    <i className='fas fa-procedures'></i>
                                </div>
                                <div className='text-child'>
                                    Khám tổng quát
                                </div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'>
                                    <i className='fas fa-user-md'></i>
                                </div>
                                <div className='text-child'>
                                    Xét nghiệm y học
                                </div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'>
                                    <i className='fas fa-user-md'></i>
                                    <i class="fas fa-yin-yang"></i>
                                </div>
                                <div className='text-child'>
                                    Sức khỏe tinh thần
                                </div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'>
                                    <i className='fas fa-user-md'></i>
                                </div>
                                <div className='text-child'>
                                    Khám nha khoa
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state =>
{
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch =>
{
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
