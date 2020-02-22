import React from 'react';

class AboutPage extends React.Component {

    render() {
        return (
            <>
                <h3>About</h3>
                <p>The website is designed as a simple contact directory.</p>
                <div className="media media-ex">
                    <img className="align-self-center mr-3" src="/static/icons/github.png" height="22" width="auto" alt="github" />
                    <div className="media-body">
                        You can see or download the code on github. Link to repositories
                        <a href="https://github.com/pingvin65/mymelonapp"> mymelonapp</a>.
                    </div>
                </div>
                <div className="media media-ex">
                    <img className="align-self-center mr-3" src="/static/icons/li-logo.png" height="22" width="auto" alt="github" />
                    <div className="media-body">
                    <a href="https://www.linkedin.com/in/sasa-budai-243a6984/"> My profile </a>.
                    </div>
                
                </div>



            </>
        );
    }
}
export default AboutPage;