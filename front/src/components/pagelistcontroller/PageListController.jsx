import './pagelistcontroller.css'

import { BiLeftArrowAlt, BiRightArrowAlt, BiArrowToLeft, BiArrowToRight } from "react-icons/bi";

export default function PageListController(props) {

  // This component is responsible for controlling the page list navigation
  // It allows the user to navigate through pages and select a specific page number 
  // It receives props from the parent component, including the current page number, total pages, and a function to set the page number
  // It also displays the total number of pages available
  // The component uses input to allow the user to enter a page number directly
  // It includes icons for fast forward, fast backward, and regular navigation

  const increasePage = () => {
    if (props.pageNo < props.pageSupNo) {
      props.setPageNo(props.pageNo + 1);
    }
  }

  const decreasePage = () => {
    if (props.pageNo > 1) {
      props.setPageNo(props.pageNo - 1);
    }
  }

  const fastForward = () => {
    if (props.pageNo + 5 < props.pageSupNo) {
      props.setPageNo(props.pageNo + 5);
    } else {
      props.setPageNo(props.pageSupNo);
    }
  }

  const fastBackward = () => {
    if (props.pageNo > 5) {
      props.setPageNo(props.pageNo + 5);
    } else {
      props.setPageNo(1);
    }
  }
  
  return (
    <div className="pageListCotroller">
      <div className="pageListControllerIcons">
        <BiArrowToLeft 
          className={`pageListControllerIcon${props.pageSupNo == '---' || props.pageNo == 1 ? ' disabled' : ''}`}
          onClick={props.pageNo > 1 ? fastBackward : undefined}
        />
        <BiLeftArrowAlt
          className={`pageListControllerIcon${props.pageSupNo == '---' || props.pageNo == 1 ? ' disabled' : ''}`}
          onClick={props.pageNo > 1 ? decreasePage : undefined}
        />
        <div className='pageNavigator'>
          <input type="number" name="designedNum" value={props.pageNo == 0 ? 1 : props.pageNo} min="1" max={props.pageSupNo == '---' ? 1 : props.pageSupNo} onChange={e => props.setPageNo(e.target.value)} />
          <div className="pageSupremeNum"> / {props.pageSupNo === undefined? "---" : props.pageSupNo}</div>
        </div>
        <BiRightArrowAlt 
          className={`pageListControllerIcon${props.pageSupNo == '---' || props.pageNo == props.pageSupNo ? ' disabled' : ''}`}
          onClick={props.pageNo < props.pageSupNo ? increasePage : undefined}
        />
        <BiArrowToRight
          className={`pageListControllerIcon${props.pageSupNo == '---' || props.pageNo == props.pageSupNo ? ' disabled' : ''}`}
          onClick={props.pageNo < props.pageSupNo ? fastForward : undefined}
        />
      </div>
    </div>
  )
}
