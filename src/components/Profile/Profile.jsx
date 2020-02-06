import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import ProfileWall from "./ProfileWall/ProfileWall";


const Profile = (props) => {

  return (
    <div className="profile-page">
      <ProfileInfo userData={props.userData}
                   updateUserData={props.updateUserData}
                   profileIsUpdating={props.profileIsUpdating}
                   isOwner={props.isOwner}
                   userAvatar={props.userData.photos}
                   updateUserPhoto={props.updateUserPhoto}
                   userStatus={props.userStatus}
                   sendNewUserStatus={props.sendNewUserStatus}
                   urlUserId={props.urlUserId}
                   startChatting={props.startChatting}
                   history={props.history}
                   ownerId={props.ownerId}
                   toggleProfileIsUpdating={props.toggleProfileIsUpdating}

      />
      <ProfileWall wallMessages={props.wallMessages}
                   userAvatar={props.userData.photos}
                   sendNewMessage={props.sendNewMessage}
                   likesControl={props.likesControl}
                   ownerId={props.ownerId}
                   stopAnimation={props.stopAnimation}
                   deleteMessage={props.deleteMessage}
      />
    </div>
  )
};


export default Profile;