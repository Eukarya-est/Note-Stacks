import './pagelistcontroller.css'

import { BiLeftArrowAlt, BiRightArrowAlt, BiArrowToLeft, BiArrowToRight } from "react-icons/bi";
import { useState } from 'react'

export default function PageListController(props) {

  // This component is responsible for controlling the page list navigation
  // It allows the user to navigate through pages and select a specific page number 
  // It receives props from the parent component, including the current page number, total pages, and a function to set the page number
  // It also displays the total number of pages available
  // The component uses input to allow the user to enter a page number directly
  // It includes icons for fast forward, fast backward, and regular navigation
  
  const [inputValue, setInputValue] = useState(1);

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
    <div className="pageListCotroller">
      <div className="pageListControllerIcons">
        <BiArrowToLeft 
          className={`pageListControllerIcon${props.pagesBound === undefined || props.pageNo == 1 ? ' disabled' : ''}`}
          onClick={props.pageNo > 1 ? fastBackward : undefined}
        />
        <BiLeftArrowAlt
          className={`pageListControllerIcon${props.pagesBound === undefined || props.pageNo == 1 ? ' disabled' : ''}`}
          onClick={props.pageNo > 1 ? decreasePage : undefined}
        />
        <div className='pageNavigator'>
          <input type="number" name="designedNum" value={props.pageNo == 0 ? 1 : props.pageNo} min="1" max={props.pagesBound == '---' ? 1 : props.pagesBound} onChange={e => props.setPageNo(Number(e.target.value))} />
          <div className="division"></div>
          <div className="pageBound">{props.pagesBound === undefined? "---" : props.pagesBound}</div>
        </div>
        <BiRightArrowAlt 
          className={`pageListControllerIcon${props.pagesBound === undefined || props.pageNo == props.pagesBound ? ' disabled' : ''}`}
          onClick={props.pageNo < props.pagesBound ? increasePage : undefined}
        />
        <BiArrowToRight
          className={`pageListControllerIcon${props.pagesBound === undefined || props.pageNo == props.pagesBound ? ' disabled' : ''}`}
          onClick={props.pageNo < props.pagesBound ? fastForward : undefined}
        />
      </div>
    </div>
  )
}
