import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../../logics/actions/authActions';
import { RootState } from '../../../logics/reducers/rootReducer';

export const useCreateUserForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [isInputValid, setInputValid] = useState(false);

  const errorMessage = useSelector<RootState, string | null>(
    state => state.auth.errorMessage
  );

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onPassword2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword2(e.target.value);
  };

  const onCreateUser = () => {
    dispatch(createUser(email, password, name));
  };

  useEffect(() => {
    if (
      password.length > 0 &&
      password2.length > 0 &&
      name.length > 0 &&
      password === password2
    ) {
      setInputValid(true);
    } else {
      setInputValid(false);
    }
  }, [password, password2, name]);

  return {
    email,
    name,
    password,
    password2,
    isInputValid,
    errorMessage,
    onEmailChange,
    onNameChange,
    onPasswordChange,
    onPassword2Change,
    onCreateUser
  };
};
