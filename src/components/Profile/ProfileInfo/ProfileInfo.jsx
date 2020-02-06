import React, {useCallback, useState} from "react";
import ProfileInfoForm from "./ProfileInfoForm";
import ProfileDescription from "./ProfileDescription";
import ProfileAvatar from "./ProfileAvatar";

const ProfileInfo = (props) => {

  const [editMode, setEditMode] = useState(false);

  const handleSubmit = useCallback(
    (userData) => {
      props.updateUserData(userData);
      setEditMode(false);
    }, []);

  const activateEditMode = useCallback(
    () => {
      setEditMode(true);
    }, []);

  const deactivateEditMode = useCallback(
    () => {
      props.toggleProfileIsUpdating(false);
      setEditMode(false);
    }, []);

  //отображать только в случае когда выключен эдит мод и не происходит обновление профиля (в ProfileInfoForm )
  const descriptionOrForm = !editMode && !props.profileIsUpdating ?
    <ProfileDescription userData={props.userData}
                        isOwner={props.isOwner}
                        activateEditMode={activateEditMode}
                        userStatus={props.userStatus}
                        sendNewUserStatus={props.sendNewUserStatus}
                        ownerId={props.ownerId}
    />
    //initialValues автоматически раскидывается по полям, так как совпадают имена
    : <ProfileInfoForm contacts={props.userData.contacts}
                       onSubmit={handleSubmit}
                       initialValues={props.userData}
                       deactivateEditMode={deactivateEditMode}
    />;


  return (
    <>
      <ProfileAvatar userAvatar={props.userData.photos}
                     isOwner={props.isOwner}
                     updateUserPhoto={props.updateUserPhoto}
                     ownerId={props.ownerId}
                     startChatting={props.startChatting}
                     history={props.history}
                     urlUserId={props.urlUserId}
      />
      {descriptionOrForm}
    </>
  );

};

export default ProfileInfo;