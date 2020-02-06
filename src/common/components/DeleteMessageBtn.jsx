import React from "react";

const DeleteMessageBtn = (props) => {
  return (
    <div className={props.className}
         onDoubleClick={props.disabled ? null : props.eventHandler}
         onMouseDown={(e)=>e.preventDefault()}
    />
  )
};

export default DeleteMessageBtn