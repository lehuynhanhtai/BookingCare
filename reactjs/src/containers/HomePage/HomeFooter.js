import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './HomeFooter.scss';

class HomeFooter extends Component
{

    returnToHome = () =>
    {
        if (this.props.history)
        {
            this.props.history.push(`/home`)
        }
    }

    render()
    {
        return (
            <div className='home-footer'>
                <div className='footer-top'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-5'>
                                <div className='footer-top-left'>
                                    <div className='footer-logo' onClick={() => this.returnToHome()}></div>
                                    <p><b>Công ty Cổ phần Công nghệ BookingCare</b></p>
                                    <span>ĐKKD số: 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015</span>
                                    <br />
                                    <span>28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội</span>
                                </div>
                            </div>
                            <div className='col-4'>
                                <div className='footer-top-between'>
                                    <ul>
                                        <li>Liên hệ hợp tác</li>
                                        <li>Gói chuyển đổi số doanh nghiệp</li>
                                        <li>Tuyển dụng</li>
                                        <li>Câu hỏi thường gặp</li>
                                        <li>Điều khoản sử dụng</li>
                                        <li>Chính sách Bảo mật</li>
                                        <li>Quy trình hỗ trợ giải quyết khiếu nại</li>
                                    </ul>
                                </div>
                            </div>
                            <div className='col-3'>
                                <div className='footer-top-right'>
                                    <div className='address'>
                                        <p><b>Trụ sở tại Hà Nội</b></p>
                                        <span>28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội</span>
                                    </div>
                                    <div className='address'>
                                        <p><b>Văn phòng tại TP Hồ Chí Minh</b></p>
                                        <span>Số 01, Hồ Bá Kiện, Phường 15, Quận 10</span>
                                    </div>
                                    <div className='address'>
                                        <p><b>Hỗ trợ khách hàng</b></p>
                                        <span>support@bookingcare.vn (7h30 - 18h)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='footer-bottom'>
                    <p>&copy; 2022 boyVip_535. More infomation, please visit my youtube channel
                        <a target='_blank' href='https://www.rapidtables.com/web/html/html-codes/html-code-copyright.html'>
                            --Click here--
                        </a>
                    </p>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state =>
{
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch =>
{
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
