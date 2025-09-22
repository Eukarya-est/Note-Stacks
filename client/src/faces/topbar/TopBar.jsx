import './topbar.css';

import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function TopBar() {

const navigate = useNavigate();

const setNoteShelf = () =>{ 
  navigate('/shelf');
}

const setDesk = () =>{
  navigate('/desk');
}

  return (
    <div className="top-bar">
      <hr className="stream"></hr>
      <div className="top">
        <div className="top-left">
            The Note Stacks
        </div>
        <div className="top-center">
          <ul className="top-list">
            <li className="top-list-item" onClick={setNoteShelf}>
                NOTESHELF
            </li>
            <li className="top-list-item" onClick={setDesk}>
                DESK
            </li>
          </ul>
        </div>
        <div className="top-right">
          <ul className="top-list">
            <FaSearch className="top-search-icon"/>
          </ul>
        </div>
      </div>
    </div>
  )
}
