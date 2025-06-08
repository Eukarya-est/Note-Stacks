import './topbar.css'

import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function TopBar(props) {

const navigate = useNavigate();

const setNoteShelf = () =>{ 
  navigate('/shelf');
}

const setDesk = () =>{
  navigate('/desk');
}

  return (
    <div className="top">
        <div className="topLeft">
            The Note Stacks
        </div>
        <div className="topCenter">
            <ul className="topList">
                <li className="topListItem" onClick={setNoteShelf}>
                    NOTESHELF
                </li>
                <li className="topListItem" onClick={setDesk}>
                    DESK
                </li>
            </ul>
        </div>
        <div className="topRight">
            <ul className="topList">
                <FaSearch className='topSearchIcon'/>
            </ul>
        </div>
    </div>
  )
}
