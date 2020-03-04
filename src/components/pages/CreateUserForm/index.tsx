import React from 'react';
import { useCreateUserForm } from './use';
import PositiveButton from '../../atoms/PositiveButton';
import InputTextGroup from '../../atoms/InputText';
import styled from 'styled-components';

const CreateUserForm: React.FC = () => {
  const {
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
  } = useCreateUserForm();

  return (
    <article className="py-2">
      <div className="container">
        <h1>Create User</h1>
        <Form>
          <InputTextGroup
            type="text"
            id="name"
            title="Name"
            value={name}
            onChange={onNameChange}
          />
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
          <InputTextGroup
            type="password"
            id="password2"
            title="Password confirm"
            value={password2}
            onChange={onPassword2Change}
          />
          {errorMessage && (
            <StyledErrorMessage>{errorMessage}</StyledErrorMessage>
          )}
          {isInputValid ? (
            <PositiveButton onClick={onCreateUser}>Create User</PositiveButton>
          ) : (
            <PositiveButton disabled onClick={onCreateUser}>
              Create User
            </PositiveButton>
          )}
        </Form>
      </div>
    </article>
  );
};

export default CreateUserForm;

// Style

const Form = styled.form`
  display: block;
`;

const StyledErrorMessage = styled.div`
  margin: 1rem 0;
  color: red;
`;
