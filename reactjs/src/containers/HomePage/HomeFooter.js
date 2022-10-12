import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class HomeFooter extends Component
{

    render()
    {
        return (
            <div className='home-footer'>
                <p>&copy; 2022 boyVip_535. More infomation, please visit my youtube channel
                    <a target='_blank' href='https://www.rapidtables.com/web/html/html-codes/html-code-copyright.html'>
                        --Click here--
                    </a>
                </p>
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
