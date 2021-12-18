import { useRef, React } from 'react';
function LoginForm({ handleLoginClick }) {
  const usernameInput = useRef(null);
  const passwordInput = useRef(null);
  return (
    <div>
      <h1>log in to application</h1>
      <p> username </p>
      <input ref={usernameInput} id="usernameInput" />
      <p> password </p>
      <input ref={passwordInput} id="passwordInput" />
      <button
        onClick={() => {
          handleLoginClick(
            usernameInput.current.value,
            passwordInput.current.value
          );
        }}
      >
        {' '}
        login{' '}
      </button>
    </div>
  );
}

export default LoginForm;
