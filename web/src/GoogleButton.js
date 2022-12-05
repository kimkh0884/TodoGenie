import React, {useEffect, useRef} from 'react';

const clientId = "97764899111-jt22t491iupccou7nev5veemti15g76q.apps.googleusercontent.com";

const useScript = (onload) => {
    useEffect(() => {
        const script = document.createElement('script');

        script.src = "https://accounts.google.com/gsi/client";
        script.onload = onload;
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, [onload]);
};

const GoogleButton = ({tryLoginWithGoogle}) => {
    const googleSignInButton = useRef(null);

    useScript(() => {
        window.google.accounts.id.initialize({
            client_id: clientId,
            callback: tryLoginWithGoogle,
        });
        window.google.accounts.id.renderButton(googleSignInButton.current, {
            width: 300,
            theme: 'filled_blue',
            shape: 'circle',
            text: 'signin_with'
        });
    });

    return(
        <div>
            <button className='google-button margin-1vh align-center' ref={googleSignInButton} />
        </div>
    )
};

export default GoogleButton;