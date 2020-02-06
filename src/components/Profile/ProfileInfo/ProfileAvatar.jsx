import React, {useEffect, useRef} from 'react';
import "../Profile.css"
// import avatar from "../../../assets/img/avatar.png";

const ProfileAvatar = (props) => {

  const {
    userAvatar: {large},
    updateUserPhoto, startChatting,
    history, isOwner, ownerId, urlUserId
  } = props;

  let myAvatar = useRef(null);

  useEffect(() => {
    if (!large) return;
    myAvatar.current.style.backgroundImage = `url(${large})`;
  }, [large]);

  const handlePhotoSelect = (e) => {
    if (e.target.files.length) {
      updateUserPhoto(e.target.files[0]);
    }
  };

  const startChat = async () => {
    await startChatting(urlUserId);
    history.push("/dialogs");
  };

  return (
    <div className="profile-avatar">
      <div className="profile-avatar__avatar" ref={myAvatar}/>
      {
        isOwner && <label className="profile-avatar__Label">
          <input type="file"
                 name="userPhoto"
                 className="profile-avatar__file"
                 onChange={handlePhotoSelect}/>
          Edit avatar
        </label>
      }
      {
        //не хозяин страницы и залогинен
        !isOwner && ownerId &&
        <div className="profile-avatar__Label" onClick={startChat}>Start chat</div>
      }
    </div>
  )
};


export default ProfileAvatar;