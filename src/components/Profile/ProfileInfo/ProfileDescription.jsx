import React from "react";
import ProfileStatus from "./ProfileStatus";
import editImg from "../../../assets/img/edit.gif";

const ProfileDescription = React.memo((props) => {

  const {
    userData: {
      fullName, aboutMe, contacts,
      lookingForAJob, lookingForAJobDescription
    },
    isOwner, activateEditMode
  } = props;

  const isContacts = Object.values(contacts).find(value => {
    return value
  });

  return (
    <div className="profile-description">
      {
        isOwner &&
        <div className="edit-button" onClick={activateEditMode}><img className="edit-button__img" src={editImg}/></div>
      }
      <div className="profile-description__name">{fullName}</div>
      <ProfileStatus userStatus={props.userStatus}
                     sendNewUserStatus={props.sendNewUserStatus}
                     isOwner={isOwner}
      />
      <div className="profile-description__data">
        <table className="profile-description__about-user">
          <caption className="about-user__caption">Basic information</caption>
          <thead/>
          <tbody>
          <tr>
            <td className="about-user__point">About me:</td>
            <td className="about-user__answer">{aboutMe || "-"}</td>
          </tr>
          <tr>
            <td className="about-user__point">
              Looking for a job:
            </td>
            <td className="about-user__answer">
              {lookingForAJob ? "Yes" : "No"}
            </td>
          </tr>
          <tr>
            <td className="about-user__point">
              Description:
            </td>
            <td className="about-user__answer">
              {lookingForAJobDescription || "-"}
            </td>
          </tr>
          </tbody>
        </table>
        <table className="profile-description__contacts">
          <caption className="contacts__caption">Contacts</caption>
          <thead/>
          <tbody>
          {
            isContacts ?
              Object.keys(contacts).map(key => {
                if (contacts[key]) {
                  return (
                    <tr key={key}>
                      <td className="contacts__contact-name">{key}</td>
                      <td className="contacts__contact-link">{contacts[key]}</td>
                    </tr>)
                }
              }) : <tr>
                <td>Not specified</td>
              </tr>
          }
          </tbody>
        </table>
      </div>
    </div>
  )
});

{/*<div>*/
}
{/*  <ProfileStatus userStatus={props.userStatus}*/
}
{/*                 sendNewUserStatus={props.sendNewUserStatus}*/
}
{/*  />*/
}
{/*  <div><b>Full Name: </b>{fullName}</div>*/
}
{/*  <div><b>About me: </b>{aboutMe}</div>*/
}
{/*  <div><b>Looking for a job: </b>{lookingForAJob ? "Yes" : "No"}</div>*/
}
{/*  <div><b>Description: </b>{lookingForAJobDescription}</div>*/
}
{/*  {isContacts &&*/
}
{/*  <div>*/
}
{/*    <b>Contacts:</b>*/
}
{/*    <ul>*/
}
{/*      {Object.keys(contacts).map(key => {*/
}
{/*        if (contacts[key]) {*/
}
{/*          return (*/
}
{/*            <li key={key}>*/
}
{/*              <b>{key}: </b>{contacts[key]}*/
}
{/*            </li>)*/
}
{/*        }*/
}
{/*      })}*/
}
{/*    </ul>*/
}
{/*  </div>}*/
}
{/*  {isOwner && <button onClick={activateEditMode}>Edit</button>}*/
}
{/*  {!isOwner && ownerId && <button onClick={startChat}>ChatWall</button>}*/
}
{/*</div>*/
}

export default ProfileDescription;