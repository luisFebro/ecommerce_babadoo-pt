import React from 'react';
import GoogleLogin from 'react-google-login';
import PropTypes from 'prop-types';
import { useStoreActions } from 'easy-peasy';


export default function GoogleAuth() {
    const showMenuBarLogin = useStoreActions(actions => actions.dataLogin.showMenuBarLogin);

    const responseGoogle = response => {
        showMenuBarLogin([response, {name: "google"}]);
    }

    return (
        <GoogleLogin
            clientId={process.env.REACT_APP_SOCIAL_GOOGLE}
            render={renderProps => (
              <button
                className="btn login-btn"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                style={{backgroundColor: "#CB4024", border: "none", margin: 5, display: "block" }}
               >
                   <img
                        src="img/icons/buttonslogin/google.png"
                        alt="ícone de login do google"
                        className="btn-icon"
                    />
                   <span className="btn-txt">Entrar com <strong>Google</strong></span>
               </button>
            )}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />
    );
}


