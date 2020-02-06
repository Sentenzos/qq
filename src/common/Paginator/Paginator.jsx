import React from "react";
import {NavLink} from "react-router-dom";
import "./Paginator.css";
import leftArrowImg from "../../assets/img/leftArrow.gif";
import rightArrowImg from "../../assets/img/rightArrow.gif";
import cn from "classnames";


const Paginator = (props) => {
  const {portionSize, totalItemsCount, itemsOnPage, url, pageNumber, portionNumber} = props;
  const totalPages = Math.ceil(totalItemsCount / itemsOnPage);
  const totalPortions = Math.ceil(totalPages / portionSize);
  const lastPageButton = portionNumber * portionSize;
  const firstPageButton = lastPageButton - portionSize + 1;
  const pages = [];
  for (let i = 1; i <= totalPages; i++) pages.push(i);

  return (
    <div className={props.paginatorClass}>

      <div className={cn(props.leftButtonClass, portionNumber === 1 && "is-deactivated")}
           onClick={portionNumber > 1 ? () => props.portionControl(false) : null}>
        <img src={leftArrowImg}/>
      </div>

      <ul>
        {pages.map(p => {
          if (p >= firstPageButton && p <= lastPageButton) {
            let newUrl = url.replace('$pageNumber$', p);
            return (
              <li key={p}>
                <NavLink className={cn(+pageNumber === p && "present-page")}
                         to={newUrl}>{p}
                </NavLink>
              </li>
            )
          }
        })}
      </ul>

      <div className={cn(props.rightButtonClass, portionNumber === totalPortions && "is-deactivated")}
           onClick={portionNumber < totalPortions ? () => props.portionControl(true) : null}>
        <img src={rightArrowImg}/>
      </div>

    </div>
  )
};

export default Paginator