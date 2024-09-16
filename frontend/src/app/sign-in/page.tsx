'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import React from 'react';
import style from '../style/Sign-in.module.css';
import { useAuth } from '../Context/AuthContext';

export default function SignIn() {
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      setLoading(true);
      const response = await signUp(name, username, email, password);
      setLoading(false);
      if (response.ok) {
        router.push('/login');
      } else {
        setError(response.error || "Failed to sign up");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      setError("Failed to sign up");
    }
  };

  return (
    <div className={style['container-signin']}>
      <div className={style['container-form']}>
        <h1 className={style['title']}>Sign In</h1>
        <form onSubmit={handleSignIn}>
          <div className={style['form-group']}>
            <label htmlFor="username" className={style['label-text']}>Username</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              className={style['input-field']} 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className={style['form-group']}>
            <label htmlFor="name" className={style['label-text']}>Name</label>
            <input type="text" id="name" name="name" className={style['input-field']} value={name}  onChange={(e) => setName(e.target.value)}/>
          </div>

          <div className={style['form-group']}>
            <label htmlFor="email" className={style['label-text']}>Email</label>
            <input type="email" id="email" name="email" className={style['input-field']} value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className={style['form-group']}>
            <label htmlFor="password" className={style['label-text']}>Password</label>
            <input type="password" id="password" name="password" className={style['input-field']} value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>

          <div className={style['form-group']}>
            <label htmlFor="confirmPassword" className={style['label-text']}>Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" className={style['input-field']} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
          </div>

          <button type="submit" className={style['submit-button']} disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {error && <div className={style['error-message']}>{error}</div>}

        <small className={style['footer-text']}>
          Already have an account? <a href="/login">Log In</a>
        </small>
      </div>
    </div>
  );
}