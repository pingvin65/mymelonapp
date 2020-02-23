import React from 'react';
import { Link } from 'react-router-dom';

function Status(props) {
    
    console.log(props);
    
    function refreshPage() {
        window.location.reload(false);
    }

    if (Array.isArray(props.status.toString().match('Network Error'))) {
        return (<div><div className="alert alert-warning" role="alert">
            <h5>Ups samtin is wrong</h5>
            <h6>Network Error</h6>
            <p>You can visit the website in 15 minutes or try the reload page.</p>

        </div>
            <div>
                <button onClick={refreshPage} type="button" className="btn btn-primary">Click to reload!</button>
            </div>
        </div>
        );
    } else if (Array.isArray(props.status.toString().match('200'))) {
        return '';
    }
    else if (Array.isArray(props.status.toString().match('401'))) {
        
        localStorage.removeItem('melondata');
        
        return (<div>
            {(props.page === 'home') ? <h5>Please login</h5> : <h5>{props.status}</h5>} 
            {/* <h5>{props.status}</h5> */}
            <Link to='/login'>login</Link>
        </div>);
    }
    return <h5>{props.status}</h5>;
}
export default Status;