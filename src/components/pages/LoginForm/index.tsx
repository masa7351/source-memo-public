import React from 'react';
import { useLoginForm } from './use';
import PositiveButton from '../../atoms/PositiveButton';
import InputTextGroup from '../../atoms/InputText';
import styled from 'styled-components';

const LoginForm: React.FC = () => {
  const {
    email,
    password,
    onEmailChange,
    onPasswordChange,
    login
  } = useLoginForm();

  return (
    <article className="py-2">
      <div className="container">
        <h1>Login</h1>
        <Form>
          <InputTextGroup
            type="email"
            id="email"
            title="Email"
            value={email}
            onChange={onEmailChange}
          />
          <InputTextGroup
            type="password"
            id="password"
            title="Password"
            value={password}
            onChange={onPasswordChange}
          />
          <PositiveButton onClick={login}>ログイン</PositiveButton>
        </Form>
      </div>
    </article>
  );
};

export default LoginForm;

// Style

const Form = styled.form`
  display: block;
`;
