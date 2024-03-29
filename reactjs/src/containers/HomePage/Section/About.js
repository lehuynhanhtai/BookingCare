import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class About extends Component
{

    render()
    {
        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    Truyền thông nói về BookingCare
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe width="90%" height="500px"
                            src="https://www.youtube-nocookie.com/embed/FyDQljKtWnI?autoplay=1"
                            title="Cà phê khởi nghiệp VTV1 | BOOKINGCARE | Hệ thống đặt lịch khám bệnh"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen>
                        </iframe>
                    </div>
                    <div className='content-right'>
                        <div className='suckhoedoisong'></div>
                        <div className='vtv1'></div>
                        <div className='ictnews'></div>
                        <div className='vnexpress'></div>
                        <div className='vtcnews'></div>
                        <div className='cuccongnghethongtin'></div>
                        <div className='vtcnews'></div>
                        <div className='vtv1'></div>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
