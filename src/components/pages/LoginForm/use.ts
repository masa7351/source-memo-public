import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../logics/actions/authActions';

export const useLoginForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const login = () => {
    dispatch(loginUser(email, password));
  };

  return {
    email,
    password,
    onEmailChange,
    onPasswordChange,
    login
  };
};
