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
                        <iframe width="100%" height="500px"
                            src="https://www.youtube.com/embed/q-1FuU37zvA"
                            title="SƠN TÙNG M-TP | SKY DECADE | Cơn Mưa Xa Dần"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen>
                        </iframe>
                    </div>
                    <div className='content-right'>
                        sss
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
