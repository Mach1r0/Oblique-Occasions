import React from 'react';
import style from '../style/Sign-in.module.css';

export default function SignIn() {
  return (
    <div className={style['container-signin']}>
      <div className={style['container-form']}>
        <h1 className={style['title']}>Sign In</h1>
        <form>
          <div className={style['form-group']}>
            <label htmlFor="username" className={style['label-text']}>Username</label>
            <input type="text" id="username" name="username" className={style['input-field']} />
          </div>

          <div className={style['form-group']}>
            <label htmlFor="name" className={style['label-text']}>Name</label>
            <input type="text" id="name" name="name" className={style['input-field']} />
          </div>

          <div className={style['form-group']}>
            <label htmlFor="email" className={style['label-text']}>Email</label>
            <input type="email" id="email" name="email" className={style['input-field']} />
          </div>

          <div className={style['form-group']}>
            <label htmlFor="password" className={style['label-text']}>Password</label>
            <input type="password" id="password" name="password" className={style['input-field']} />
          </div>

          <button type="submit" className={style['submit-button']}>Sign In</button>
        </form>

        <small className={style['footer-text']}>
          Already have an account? <a href="/login">Log In</a>
        </small>
      </div>
    </div>
  );
}
