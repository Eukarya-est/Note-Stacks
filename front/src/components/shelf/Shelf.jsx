import './shelf.css'

import { useState, useEffect } from 'react';
import { TbBooks, TbBooksOff } from "react-icons/tb";

export default function Shelf(props) {

  const [shelfCategory, setshelfCategory] = useState([]);

  const selectCategory = (value) => {
    props.setNotePages(value);
  };

  // Fetch shelf categories when component mounts
  useEffect(() => {   
    fetch(props.apiPage).then(
      response => response.json()
    ).then(
      data => {
        setshelfCategory(data)
      }
    ).catch(
      error => {
        console.error('Failed: Load Shelf; ', error)
      }
    );
  }, []);

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
              {shelfCategory.length === 0 ? (
                <li className="shelfLoad">Loading..</li> 
              ) : (
                Object.entries(shelfCategory).map(([index, category]) => (     
                  <li key={ index } className="shelfItem" onClick={() => selectCategory(category)}>
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
