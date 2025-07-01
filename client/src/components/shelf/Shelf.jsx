import './shelf.css'

import { TbBooks, TbBooksOff } from "react-icons/tb";

export default function Shelf(props) {

  // This component is responsible for displaying the shelf categories
  // It receives props from the parent component, including the shelf categories and functions to set the selected category
  // It also includes a toggle button to open or close the shelf
  // The shelf categories are displayed as a list, and clicking on a category sets it as the selected category
  

  return (
    <div className={props.openShelf ? "shelf-container-opend": "shelf-container-closed"}>
      <nav className={props.openShelf ? "shelf-opend": "shelf-closed"}>
        <ul className="shelfList">
          <div className="shelfToggleButton">
            {props.openShelf ?
              <TbBooks className="shelfIcon" id="shelfOn" onClick={props.toggleShelf} />:
              <TbBooksOff className="shelfIcon" id="shelfOff" onClick={props.toggleShelf} />
            }
          </div>
          <li className="shelfTitle">
              STACK
          </li>
          <ul className="shelfItemList">
            {props.shelfCategory.length === 0 ? (
              <li className="shelfLoad">Loading..</li> 
            ) : (
              Object.entries(props.shelfCategory).map(([index, category]) => (     
                <li key={index} className="shelfItem" onClick={() => props.setCategory(category)}>
                  {category}
                </li>
              ))
            )
            }
          </ul>
        </ul>
      </nav>
    </div>
  )
}
