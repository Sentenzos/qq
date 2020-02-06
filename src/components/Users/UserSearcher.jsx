import findImg from "../../assets/img/find.png";
import React, {useCallback} from "react";
import {Field, reduxForm} from "redux-form";
import {Input} from "../../common/FormControl/FormControl";


const UserSearcher = (props) => {

  const activateSearchMode = (userName) => {
    props.resetPaginatorPortion();
    props.history.push(`/users/search/1/${userName}`);
  };

  const deactivateSearchMode = () => {
    if (props.mode === "all") return;
    //Тут нет сброса пагинатора потому что он сбрасывается в useEffect
    // при размонтировании, если mode == "search".
    props.history.push(`/users/all/1/`);
  };

  props.forRef.current = deactivateSearchMode;

  const searchControl = useCallback(
    (userName) => {
      if (!userName.userSearcher) {
        deactivateSearchMode();
        return
      }
      activateSearchMode(userName.userSearcher);
    }, [activateSearchMode, deactivateSearchMode]);

  return (
    <UserSearcherForm onSubmit={searchControl}/>
  )
};


let UserSearcherForm = (props) => {
  return (
    <form className="user-searcher" onSubmit={props.handleSubmit}>
      <label className="user-searcher__button-wrapper">
        <button className="user-searcher__button"/>
        <img src={findImg} className="user-searcher__img"/>
      </label>
      <Field component={Input} type="text" placeholder="Search user . . ." className="user-searcher__input"
             name="userSearcher"/>
    </form>
  )
};


UserSearcherForm = reduxForm({
  form: "userSearcher"
})(UserSearcherForm);

export default UserSearcher