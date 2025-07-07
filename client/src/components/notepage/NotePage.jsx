import './notepage.css'

import MarkdownWithKatex from '../markdown/Markdown';
import { ServerURL } from "../../context/constant.jsx"

import { useState, useEffect, useContext } from 'react';

export default function NotePage(props) {

  const server =  useContext(ServerURL);

    // This component is responsible for displaying the content of a specific note page
    // It fetches the markdown content from the API based on the selected page
    // It receives props from the parent component, including the API endpoint, category, and selected page

  const [markdown, setMarkdown] = useState("-");

  useEffect(() => {
    if (props.category !== undefined && props.pageNo !== 0 && props.page[8] !== ' - ' && props.page[8] !== undefined) {
        fetch(server + window.location.pathname + '/' + props.page[8])
          .then((response) => response.text())
          .then((text) => setMarkdown(text))
          .catch((error) => {
            console.error('Failed: Load Page Content; ', error);
          });
}
  }, [props.page]);

  return (
    <div className="note-page">
      <div className="page">
          <ul className="main-info">
            <li className="main-info-title">COVER</li>
            <li className="main-info-item">{props.page == undefined? "-" : props.page[1]}</li>
            <li className="main-info-title">No.</li>
            <li className="main-info-item">{props.page == undefined? "-" : props.page[2]}</li>
            <li className="main-info-title">REVISION</li>
            <li className="main-info-item">{props.page == undefined? "-" : props.page[3]}</li>
          </ul>
          <ul className="date-info">
            <li className="date-info-title">CREATED</li>
            <li className="date-info-item">{props.page == undefined? "-" : props.page[4]}</li>
            <li className="date-info-title">REVISED</li>
            <li className="date-info-item">{props.page == undefined? "-" : props.page[5]}</li>
          </ul>
        </div>
        <div className="content">
          <ul className="title-info">
            <li className="title-title">TITLE</li>
            <li className="title">{props.page == undefined? "-" : props.page[6]}</li>
          </ul>
          <ul className="label-info">
             <li className="label-title">LABEL</li>
            <li className="label"> {props.page == undefined? "-" : props.page[8]} </li>
          </ul>
          <ul className="content-info">
            <li className="content">
              <MarkdownWithKatex markdownContent={markdown == '-' ? '': markdown}/>
            </li>
        </ul>
      </div>
    </div>
  )
}
