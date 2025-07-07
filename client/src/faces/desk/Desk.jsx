import './desk.css'
import profileImg from '../../Images/profile-img.png'

import { FaLinkedin, FaGithub }  from "react-icons/fa";

export default function Desk() {
  return (
    <div className="desk">
      <div className="profile-box">
        <div className="image-wrapper">
          <img className="profile-img" id="profile-img-id" src={ profileImg } alt="logo" />
        </div>
        <div className="profile-contents">
          <ul className="profile-list">
            <li className="profile-list-item">Eukarya</li>
          </ul>
          <ul className="link-list">TEST WEBPAGE
            <li className="link-list-item">LINK1</li>
            <li className="link-list-item">LINK2</li>
          </ul>
          <ul className="link-icon-list">
            <div className="icon-wrapper">
              <li className="link-icon-list-item"><FaLinkedin /></li>
            </div>
            <div className="icon-wrapper">
              <li className="link-icon-list-item"><FaGithub /></li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  )
}
