import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import styles from './Login.module.css';
import { useLogin } from './Login.hooks';
import useUserStore from '../../database/store';

function Login() {
  const {
    register, handleSubmit, formState: { errors },
  } = useForm();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const loginMutation = useLogin();
  const navigate = useNavigate()
  const token = useUserStore(state => state.token)

  if (token) {
    return <Navigate to={'/'} replace />
  }

  const onSubmit = () => {
    loginMutation.mutate({
      email, password,
    });
  };

  const handleUsernameChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  return (
    <div className={styles.container}>
      <div>
        <div className="input-group mb-3" onSubmit={handleSubmit(onSubmit)}>
          <form>
            <div className={styles['form-group']}>
              {loginMutation.error && (
                <div className="alert alert-danger" role="alert">
                  {loginMutation.error.message}
                </div>
              )}

              <input placeholder="Email" type="text" className={errors.email ? 'form-control is-invalid' : 'form-control'} id="validationServerUsername" aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback" {...register('email', { required: true })} onChange={handleUsernameChange} />
              <input placeholder="Password" type="text" className={errors.password ? 'form-control is-invalid' : 'form-control'} id="validationServerPassword" aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback" {...register('password', { required: true })} onChange={handlePasswordChange} />

              <button type="submit" className='btn btn-primary'>Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
