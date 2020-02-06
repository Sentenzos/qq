import React, {useEffect, useState} from "react";


const ProfileStatus = React.memo((props) => {

  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(props.userStatus);

  useEffect(() => {
    setStatus(props.userStatus);
  }, [props.userStatus]);

  const activateEditMode = () => {
    setEditMode(true);
  };

  const offEditModeAndSendStatus = () => {
    if (status && status.length <= 60) {
      props.sendNewUserStatus(status);
    }
    setEditMode(false);
  };

  return (
    <>
      {
        editMode ?
          <div className="profile-description__status">
            <input value={status}
                   onChange={(e) => setStatus(e.target.value)}
                   autoFocus={true}
                   onBlur={offEditModeAndSendStatus}
                   className="profile-description__status-input"
            />
          </div>
          :
          <div className="profile-description__status">
            <span
              onDoubleClick={props.isOwner ? activateEditMode : null}
              className="profile-description__status-span"
              onMouseDown={(e) => {
                e.preventDefault()
              }}
            >
              {props.userStatus || "My status"}
            </span>
          </div>
      }
    </>
  )
});

export default ProfileStatus

