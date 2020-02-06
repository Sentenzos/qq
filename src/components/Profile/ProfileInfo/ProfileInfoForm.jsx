import React from "react";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators";
import {Input, Textarea} from "../../../common/FormControl/FormControl";


const maxLength = maxLengthCreator(100);

const ProfileInfoForm = React.memo((props) => {

  const {contacts, handleSubmit, deactivateEditMode} = props;

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <div className="profile-form__cancel-button"
           onClick={deactivateEditMode}
           onMouseDown={(e) => {
             e.preventDefault()
           }}
      >cancel
      </div>
      <label className="profile-form__accept-button-label"
             onMouseDown={(e) => {
               e.preventDefault()
             }}>accept
        <button className="profile-form__accept-button"/>
      </label>
      <div className="profile-form__body">
        <h4 className="profile-form__basic-info">Basic information</h4>
        <Field type={"text"} name={"fullName"} component={Input} placeholder={"Full Name"}
               validate={[maxLength, required]}
               className="profile-form__full-name-input"
               wrapperClassName="profile-form__input-body"
        />
        <Field type={"text"} name={"aboutMe"} component={Input} placeholder={"About me"}
               validate={[maxLength, required]}
               className="profile-form__about-me-input"
               wrapperClassName="profile-form__input-body"
        />
        <Field type={"checkbox"} name={"lookingForAJob"} component={Input}
               className="profile-form__checkbox"
               wrapperClassName="profile-form__input-body"
               textright={"Looking for a job?"}
        />
        <Field name={"lookingForAJobDescription"} component={Textarea}
               placeholder={"Description"} validate={[maxLength, required]}
               className="profile-form__textarea"
               wrapperClassName="profile-form__textarea-body"
        />
        <h4 className="profile-form__contacts">Contacts</h4>
        {Object.keys(contacts).map(key => {
          return <Field key={key} type={"text"}
                        name={`contacts.${key}`}
                        component={Input}
                        placeholder={`${key}`}
                        validate={[maxLength]}
                        className="profile-form__contact"
                        wrapperClassName="profile-form__contact-body"
          />
        })}
      </div>
      {props.error ? <div className="profile-form__async-error">{props.error}</div> : null}
    </form>
  )
});


{/*<form onSubmit={handleSubmit}>*/
}
{/*  <Field type={"text"} name={"fullName"} component={Input} placeholder={"Full Name"} validate={[maxLength]}/>*/
}
{/*  <Field type={"text"} name={"aboutMe"} component={Input} placeholder={"About me"} validate={[maxLength]}/>*/
}
{/*  <span>Looking for a job?</span>*/
}
{/*  <Field type={"checkbox"} name={"lookingForAJob"} component={Input} placeholder={"Looking for a job"}*/
}
{/*         validate={[maxLength]}/>*/
}
{/*  <Field type={"text"} name={"lookingForAJobDescription"} component={Input}*/
}
{/*         placeholder={"Looking for a job description"} validate={[maxLength]}/>*/
}
{/*  <div>*/
}
{/*    <b>Contacts:</b>*/
}
{/*    <ul>*/
}
{/*      {Object.keys(contacts).map(key => {*/
}
{/*        return <Field key={key} type={"text"} name={`contacts.${key}`} component={Input} placeholder={`${key}`}*/
}
{/*                      validate={[maxLength]}/>*/
}
{/*      })}*/
}
{/*    </ul>*/
}
{/*  </div>*/
}
{/*  {props.error ? <div>{props.error}</div> : null}*/
}
{/*  <button>Submit</button>*/
}
{/*</form>*/
}


export default reduxForm(
  {form: "profileData"}
)(ProfileInfoForm);