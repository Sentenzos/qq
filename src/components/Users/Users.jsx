import React, {useRef} from 'react';
import "./Users.css";
import User from "./User";
import Paginator from "../../common/Paginator/Paginator"
import UserSearcher from "./UserSearcher";


const Users = React.memo((props) => {

  const {
    portionSize, url, users, requestSubscribe,
    requestUnsubscribe, isSubscribing, pageNumber,
    portionControl, portionNumber, searchUser,
    totalUsersCount, usersOnPage, userWasNotFound
  } = props;

  const deactivateSearchRef = useRef(null);

  return (
    <div className="users-page">
      <Paginator leftButtonClass="page-buttons__previous-page"
                 rightButtonClass="page-buttons__next-page"
                 paginatorClass="page-buttons"
                 totalItemsCount={totalUsersCount}
                 itemsOnPage={usersOnPage}
                 portionSize={portionSize}
                 url={url}
                 pageNumber={pageNumber}
                 portionControl={portionControl}
                 portionNumber={portionNumber}
      />
      <UserSearcher resetPaginatorPortion={props.resetPaginatorPortion}
                    history={props.history}
                    mode={props.mode}
                    forRef={deactivateSearchRef}


      />
      <div className="users-list">
        {
          props.mode === "search" &&
          <div className="users-list__deactivate-search" onClick={deactivateSearchRef.current}/>
        }
        {
          userWasNotFound ?
            <div className="users-list__was-not-found">User was not found</div> :
            users.map((u) => {
              return <User key={u.id}
                           id={u.id}
                           photos={u.photos}
                           name={u.name}
                           followed={u.followed}
                           requestSubscribe={requestSubscribe}
                           requestUnsubscribe={requestUnsubscribe}
                           isSubscribing={isSubscribing}
                           myId={props.myId}
              />


            })
        }
      </div>
    </div>
  )
});


export default Users;