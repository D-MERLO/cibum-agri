import React from 'react';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

interface GoogleLoginButtonProps {
  onSuccess: (response: GoogleLoginResponse | GoogleLoginResponseOffline) => void;
  onFailure: (response: any) => void;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ onSuccess, onFailure }) => {
  return (
    <GoogleLogin
      clientId="YOUR_GOOGLE_CLIENT_ID" //agregar mis datos
      buttonText="Iniciar sesión con Google"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={'single_host_origin'}
      className="button-contrast register-button mt-3"
    />
  );
};

export default GoogleLoginButton;
