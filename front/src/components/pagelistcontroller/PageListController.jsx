import './pagelistcontroller.css'
import { BiLeftArrowAlt, BiRightArrowAlt, BiArrowToLeft, BiArrowToRight} from "react-icons/bi";

export default function PageListController(props) {

  // This component is responsible for controlling the page list navigation
  // It allows the user to navigate through pages and select a specific page number 
  // It receives props from the parent component, including the current page number, total pages, and a function to set the page number
  // It also displays the total number of pages available
  // The component uses input to allow the user to enter a page number directly
  // It includes icons for fast forward, fast backward, and regular navigation

  const increasePage = () => {
    if (props.pageNo < props.pagesSupNo[0]) {
      props.setPageNo(props.pageNo + 1);
    }
  }

  const decreasePage = () => {
    if (props.pageNo > 1) {
      props.setPageNo(props.pageNo - 1);
    }
  }

  const fastForward = () => {
    if (props.pageNo + 5 < props.pagesSupNo[0]) {
      props.setPageNo(props.pageNo + 5);
    } else {
      props.setPageNo(props.pagesSupNo[0]);
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
              className={`pageListControllerIcon${props.pageNo == 1 ? ' disabled' : ''}`}
              onClick={props.pageNo > 1 ? fastBackward : undefined}
            />
            <BiLeftArrowAlt
              className={`pageListControllerIcon${props.pageNo == 1 ? ' disabled' : ''}`}
              onClick={props.pageNo > 1 ? decreasePage : undefined}
            />
            <div className='pageNavigator'>
              <input type="number" name="designedNum" value={ props.pageNo } min="1" max={ props.pagesSupNo[0]} onChange={e => props.setPageNo(e.target.value)} />
              <div className="pageSupremeNum"> / { props.pagesSupNo[0] === null? "---" : props.pagesSupNo[0] }</div>
            </div>
            <BiRightArrowAlt 
              className={`pageListControllerIcon${props.pageNo == props.pagesSupNo[0] ? ' disabled' : ''}`}
              onClick={props.pageNo < props.pagesSupNo[0]? increasePage : undefined}
            />
            <BiArrowToRight
              className={`pageListControllerIcon${props.pageNo == props.pagesSupNo[0] ? ' disabled' : ''}`}
              onClick={props.pageNo < props.pagesSupNo[0]? fastForward : undefined}
            />
        </div>
    </div>
  )
}
