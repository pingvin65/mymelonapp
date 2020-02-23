import React from 'react';

function Footer(props) {

    return (
        <footer className="footer">
            <div className="container">
                <span className="media float-left">
                    <img className="align-self-center mr-3" src="/static/melon.svg" height="22" width="auto" alt="Generic placeholder" />
                    <div className="media-body">
                      Melon
                    </div>
                </span>
                <span className="float-right">
                    2020
                </span>
            </div>
        </footer>
    );
}
export default Footer;