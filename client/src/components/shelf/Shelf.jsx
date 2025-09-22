import './shelf.css';
import loadImg from '../../Images/load-img.gif';

export default function Shelf(props) {

  // This component is responsible for displaying the shelf categories
  // It receives props from the parent component, including the shelf categories and functions to set the selected category
  // It also includes a toggle button to open or close the shelf
  // The shelf categories are displayed as a list, and clicking on a category sets it as the selected category
  

  return (
    <div className={props.openShelf ? "shelf-container-opend": "shelf-container-closed"}>
      <nav className={props.openShelf ? "shelf-opend": "shelf-closed"}>
        <ul className="shelf-list">
          <li className="shelf-title">
              STACK
          </li>
          <ul className="shelf-item-list">
            {props.shelfCategory.length === 0 ? (
              <li className="shelfLoad">
                <img className="loading-img" id="loading-img-id" src={ loadImg } alt="logo" />
              </li> 
            ) : (
              Object.entries(props.shelfCategory).map(([index, category]) => (     
                <li key={index} className="shelf-item" onClick={() => props.setCategory(category)}>
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
