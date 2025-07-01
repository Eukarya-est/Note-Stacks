import './desk.css'
import profileImg from '../../Images/logo_goldenEagle.jpg'

import { FaLinkedin, FaGithub }  from "react-icons/fa";

export default function Desk() {
  return (
    <div className="desk">
      <div className="profileBox">
        <img className="profileImg" src={ profileImg } alt="logo" />
        <div className="profileContents">
          <ul className="profileList">
            <li className="profileListItem">Eukarya</li>
          </ul>
          <ul className="linkList2">TEST WEBPAGE
            <li className="linkList2Item">LINK1</li>
            <li className="linkList2Item">LINK2</li>
            <li className="linkList2Item">LINK3</li>
          </ul>
          <ul className="linkList">
            <li className="linkListItem"><FaLinkedin /></li>
            <li className="linkListItem"><FaGithub /></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
