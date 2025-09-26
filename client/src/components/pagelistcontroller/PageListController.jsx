import './pagelistcontroller.css';

import { BiLeftArrowAlt, BiRightArrowAlt, BiArrowToLeft, BiArrowToRight } from "react-icons/bi";
import { TbBooks, TbBooksOff } from "react-icons/tb";
import openBook from '../../Images/open-book.png';
import stacks from '../../Images/stacks.png';
import leftXArr from '../../Images/rewind.png';
import leftArr from '../../Images/arrow-left.png';
import rightArr from '../../Images/arrow-right.png';
import rightXArr from '../../Images/fast-forward.png';

export default function PageListController(props) {

  // This component is responsible for controlling the page list navigation
  // It allows the user to navigate through pages and select a specific page number 
  // It receives props from the parent component, including the current page number, total pages, and a function to set the page number
  // It also displays the total number of pages available
  // The component uses input to allow the user to enter a page number directly
  // It includes icons for fast forward, fast backward, and regular navigation


  const increasePage = () => {
    if (props.pageNo < props.pagesBound) {
      props.setPageNo(props.pageNo + 1);
    }
  }

  const decreasePage = () => {
    if (props.pageNo > 1) {
      props.setPageNo(props.pageNo - 1);
    }
  }

  const fastForward = () => {
    if (props.pageNo + 5 < props.pagesBound) {
      props.setPageNo(props.pageNo + 5);
    } else {
      props.setPageNo(props.pagesBound);
    }
  }

  const fastBackward = () => {
    if (props.pageNo > 5) {
      props.setPageNo(props.pageNo - 5);
    } else {
      props.setPageNo(1);
    }
  }

  return (
    <div className="page-list-controller">
      <div className="shelf-toggle-button" id="shelf-toggle-button-id">
        <div className="icon-wrapper-active">
        {/* {props.openShelf ?
          <TbBooks className="shelf-on" id="shelf-icon-id" onClick={props.toggleShelf} />:
          <TbBooksOff className="shelf-off" id="shelf-icon-id" onClick={props.toggleShelf} />
        } */}
          <img className={props.openShelf ? "shelf-on":"shelf-off"} id="shelf-icon-id" src={props.openShelf ? stacks:openBook} onClick={props.toggleShelf}></img>:
        </div>
      </div>
      <div className="page-list-controller-icons">
        <div className={["icon-wrapper", (props.pagesBound === undefined || props.pageNo == 1) ? "inactive" : "active"].join("-")}>
          {/* <BiArrowToLeft 
            id="page-list-controller-icon-id"
            onClick={props.pageNo > 1 ? fastBackward : undefined}
          /> */}
          <img id="page-list-controller-icon-id" src= {leftXArr} onClick={props.pageNo > 1 ? fastBackward : undefined}></img>
        </div>
        <div className={["icon-wrapper", (props.pagesBound === undefined || props.pageNo == 1) ? "inactive" : "active"].join("-")}>
          {/* <BiLeftArrowAlt
            id="page-list-controlloer-icon-id"
            onClick={props.pageNo > 1 ? decreasePage : undefined}
          /> */}
          <img id="page-list-controller-icon-id" src= {leftArr} onClick={props.pageNo > 1 ? decreasePage : undefined}></img>
        </div>
        <div className="page-navigator">
          <input type="number" name="designated-num" value={props.pageNo == 0 ? 1 : props.pageNo} min="1" max={props.pagesBound == '---' ? 1 : props.pagesBound} onChange={e => props.setPageNo(Number(e.target.value))} />
          <div className="division"></div>
          <div className="page-bound">{props.pagesBound === undefined? "---" : props.pagesBound}</div>
        </div>
         <div className={["icon-wrapper", (props.pagesBound === undefined || props.pageNo == props.pagesBound) ? "inactive" : "active"].join("-")}>
          {/* <BiRightArrowAlt 
            id="page-list-controlloer-icon-id"
            onClick={props.pageNo < props.pagesBound ? increasePage : undefined}
          /> */}
          <img id="page-list-controller-icon-id" src= {rightArr} onClick={props.pageNo < props.pagesBound ? increasePage : undefined}></img>
        </div>
        <div className={["icon-wrapper", (props.pagesBound === undefined || props.pageNo == props.pagesBound) ? "inactive" : "active"].join("-")}>
          {/* <BiArrowToRight
            id="page-list-controlloer-icon-id"
            onClick={props.pageNo < props.pagesBound ? fastForward : undefined}
          /> */}
          <img id="page-list-controller-icon-id" src= {rightXArr} onClick={props.pageNo < props.pagesBound ? fastForward : undefined}></img>
        </div>
      </div>
    </div>
  )
}
