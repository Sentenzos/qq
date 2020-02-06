import React, {useMemo, useCallback} from 'react';
import styles from './Login.css';
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../utils/validators";
import {Input} from "../../common/FormControl/FormControl"





const LoginForm = React.memo((props) => {

  const maxLength = useCallback(maxLengthCreator(50), []);

  return (
    //handleSubmit - обработчик переданный reduxForm
    //внутри себя он вызовет переданный нами в props onSubmit
    <form onSubmit={props.handleSubmit} className="login-form">
      <Field className="login-form__email-input" type={"text"} name={"email"} component={Input} placeholder={"email"}
             validate={[required, maxLength]}
             wrapperClassName={"login-form__input-body"}
      />
      <Field className="login-form__password-input" type={"password"} name={"password"} component={Input} placeholder={"password"}
             validate={[required, maxLength]}
             wrapperClassName={"login-form__input-body"}
      />
      <Field className="login-form__checkbox"
             wrapperClassName={"login-form__checkbox-body"}
             type="checkbox" name="rememberMe"
             component={Input}
             textleft="remember me"

      />
      {props.captchaUrl && <div className="login-form__captcha"> <img alt="captcha" className="login-form__captcha-img" src={props.captchaUrl}/></div>}
      {props.captchaUrl && <Field className="login-form__captcha-input" type={"text"} name={"captcha"} component={Input}
                                  validate={[required, maxLength]}
                                  wrapperClassName={"login-form__input-body"}
      />}
      {/*Асинхронная ошибка*/}
      {props.error ? <div className="login-form__async-error">{props.error}</div> : null}
      <label className="login-form__button">
        <button className="login-form__hidden-button"/>
        Enter
      </label>
    </form>
  )
});

export default reduxForm({
  form: "login"
})(LoginForm);

