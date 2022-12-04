import React from 'react';
import GoogleLogin from 'react-google-login';

const clientId = "465272069084-thehp3rgl4ji68pf4m65l7d2bbrcn34j.apps.googleusercontent.com";

function GoogleButton() {
    const onSuccess = (response) => {
    	console.log(response);        
    };

    const onFailure = (error) => {
        console.log(error);
    };

    return(
        <div>
            <GoogleLogin
                clientId={clientId}
                responseType={"id_token"}
                onSuccess={onSuccess}
                onFailure={onFailure}/>
        </div>
    )
};

export default GoogleButton;