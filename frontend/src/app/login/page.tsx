import React from 'react';
import style from '@/app/style/Login.module.css';

export default function Page() {
  return (
    <div className={style['container-login-all']}>
      <div className={style['container-login-content']}>
        <h1 className={style['title']}>Log In</h1>
        <form>
          <div className={style['form-group']}>
            <label htmlFor="username" className={style['label-text']}>Username</label>
            <input type="text" id="username" name="username" className={style['input-field']} />
          </div>

          <div className={style['form-group']}>
            <label htmlFor="password" className={style['label-text']}>Password</label>
            <input type="password" id="password" name="password" className={style['input-field']} />
          </div>

          <button type="submit" className={style['submit-button']}>Log In</button>
        </form>

        <small className={style['footer-text']}>
          Don't have an account? <a href="/signin">Sign In</a>
        </small>
      </div>
    </div>
  );
}
