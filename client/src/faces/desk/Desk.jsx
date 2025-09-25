import './desk.css';
import profileImg from '../../Images/profile-img.png';

import { FaLinkedin, FaGithub }  from "react-icons/fa";
import linkedin from '../../Images/linkedin.png';
import github from '../../Images/github.png';

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
            <li className="link-list-item"><a target="_blank" rel="noopener noreferrer" href="https://eukarya-est.github.io/Digit-Recognizer-Web-App/">Digit-Recognizer-Web-App</a></li>
            <li className="link-list-item"><a target="_blank" rel="noopener noreferrer" href="https://eukarya-est.github.io/CT-Engineering-Helium/">CT-Engineering-Helium</a></li>
          </ul>
          <ul className="link-icon-list">
            <div className="icon-wrapper">
              <li className="link-icon-list-item"><a href="https://www.linkedin.com/in/dongkyun-park-306945258/">
                <img className="icon-img" id="icon-img-id" src= { linkedin } ></img>
                {/* <FaLinkedin /> */}
              </a></li>
            </div>
            <div className="icon-wrapper">
              <li className="link-icon-list-item"><a href="https://github.com/Eukarya-est">
                <img className="icon-img" id="icon-img-id" src= { github } ></img>
              {/* <FaGithub /> */}
              </a></li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  )
}
