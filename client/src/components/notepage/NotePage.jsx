import './notepage.css';
import './style-base.css';
import './style-codemirror.css';
import './style-mathjax-ni.css';
import './style-mathjax.css';
import './style-theme_css.css';

import ReactHtmlParser from 'react-html-parser';
import { ServerURL } from "../../context/constant.jsx";

import { useState, useEffect, useContext } from 'react';
//import NotePageContent from '../notepagecontent/NotePageContent.jsx';

export default function NotePage(props) {

  const server =  useContext(ServerURL);

    // This component is responsible for displaying the content of a specific note page
    // It fetches the document content from the API based on the selected page
    // It receives props from the parent component, including the API endpoint, category, and selected page

  const [document, setDocument] = useState("-");

  useEffect(() => {
    if (props.category !== undefined && props.pageNo !== 0 && props.page[6] !== ' - ' && props.page[6] !== undefined) {
        fetch(server + window.location.pathname + '/' + props.page[6])
          .then((response) => response.text())
          .then((text) => setDocument(text))
          .catch((error) => {
            console.error('Failed: Load Page Content; ', error);
          });
}
  }, [props.page]);

  // var category = props.category
  // var pageNo = props.pageNo
  // var page = props.page

  return (
    <div className="note-page">
      <div className="page">
          <ul className="main-info">
            <li className="main-info-title">COVER</li>
            <li className="main-info-item">{props.page == undefined? "-" : props.page[0]}</li>
            <li className="main-info-title">No.</li>
            <li className="main-info-item">{props.page == undefined? "-" : props.page[1]}</li>
            <li className="main-info-title">REVISION</li>
            <li className="main-info-item">{props.page == undefined? "-" : props.page[2]}</li>
          </ul>
          <ul className="date-info">
            <li className="date-info-title">CREATED</li>
            <li className="date-info-item">{props.page == undefined? "-" : props.page[3]}</li>
            <li className="date-info-title">REVISED</li>
            <li className="date-info-item">{props.page == undefined? "-" : props.page[4]}</li>
          </ul>
        </div>
        <div className="content">
          <ul className="title-info">
            <li className="title-title">TITLE</li>
            <li className="title">{props.page == undefined? "-" : props.page[5]}</li>
          </ul>
          <ul className="content-info">
            <li className="content">
              { ReactHtmlParser(document) }
            </li>
        </ul>
      </div>
    </div>
  )
}
