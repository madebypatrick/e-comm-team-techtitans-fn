import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import {
  Signup,
  setEmailVerificationStatus,
  verifyEmail,
} from '../../Redux/Features/signup/SignupSlice';
import hola from '../.././assets/images/logo.png';
import left from '../.././assets/images/_image.svg';
import '../../scss/Auth/SignupForm.scss';
import googleIcon from '../.././assets/images/google-icon.svg';
import { BASE_URL } from '../../utils/apiUtilis';

//sign up with google
const handleSignUp = () => {
  window.open(`${BASE_URL}/api/v1/auth/google/callback`, '_self');
};

const SignupForm = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailConfirmation, setEmailConfirmation] = useState(false);

  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.signup);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      return;
    }

    dispatch(
      Signup({
        fullname,
        email,
        password,
        confirmPassword,
      }),
    )
      .then(() => {
        dispatch(setEmailVerificationStatus(false));
      })
      .catch(error);
  };

  useEffect(() => {
    if (emailConfirmation) {
      dispatch(verifyEmail());
    }
  }, [emailConfirmation, dispatch]);
  return (
    <div>
      <div className="signup_container mt-1 decoration-0 p-8">
        {status === 'loading' && <div className="signup-right">Loading...</div>}
        {status === 'failed' && (
          <div className="signup-right">
            {' '}
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert severity="warning">{error}</Alert>
            </Stack>
          </div>
        )}
        {status === 'succeeded' && (
          <div className="signup-right">
            {' '}
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert severity="success">check inbox to verify email</Alert>
            </Stack>
          </div>
        )}
        <div className="left-container">
          <div className="left-on">
            <img src={left} alt="" />
          </div>
          <div className="signup-left">
            <div className="main-container-form">
              <div className="form-signup_logo">
                <h1>
                  <span>
                    <img src={hola} alt="" />
                  </span>
                </h1>
                <h1>Create Account</h1>
              </div>
              <form onSubmit={handleSubmit} className="form">
                <div className="my-4">
                  <input
                    className="input"
                    type="text"
                    id="fullname"
                    value={fullname}
                    placeholder="Full Name"
                    onChange={(event) => setFullname(event.target.value)}
                    required
                  />
                </div>
                <div className="my-4">
                  <input
                    className="input"
                    type="email"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </div>
                <div className="my-4">
                  <input
                    className="input"
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                </div>
                <div className="my-4">
                  <input
                    className="input"
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    required
                  />
                </div>
                <button
                  className="btn"
                  type="submit"
                  onClick={() => setEmailConfirmation(true)}
                >
                  Sign Up
                </button>
                <span className="or">OR</span>
                <div className="gmailLogo">
                  <a href="#" onClick={handleSignUp} className="gmail-btn">
                    <img
                      src={googleIcon}
                      alt="gmail logo"
                      className="googleLogo"
                    />
                    Sign up with Google
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
