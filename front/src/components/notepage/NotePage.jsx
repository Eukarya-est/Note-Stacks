import './notepage.css'

import MarkdownWithKatex from '../markdown/Markdown';
import ReactMarkdown from "react-markdown";
import { MathJaxContext, MathJax } from "better-react-mathjax";
import remarkGfm from 'remark-gfm';

import { useState, useEffect } from 'react';

export default function NotePage(props) {

    // This component is responsible for displaying the content of a specific note page
    // It fetches the markdown content from the API based on the selected page
    // It receives props from the parent component, including the API endpoint, category, and selected page

  const [markdown, setMarkdown] = useState("-");

  var apiPage = props.apiPage + '/' + props.category + '/' + props.pageNo;

  useEffect(() => {
    if (props.category !== undefined && props.pageNo !== 0 && props.page[8] !== ' - ' && props.page[8] !== undefined) {
      apiPage += '/' + props.page[8];
        fetch(apiPage)
          .then((response) => response.text())
          .then((text) => setMarkdown(text))
          .catch((error) => {
            console.error('Failed: Load Page Content; ', error);
          });
}
  }, [props.page]);

  return (
    <div className="notePage">
      <div className="infoPart">
          <ul className="mainInfo">
            <li className="mainInfoTitle">COVER</li>
            <li className="mainInfoItem">{props.page == undefined? "-" : props.page[1]}</li>
            <li className="mainInfoTitle">No.</li>
            <li className="mainInfoItem">{props.page == undefined? "-" : props.page[2]}</li>
            <li className="mainInfoTitle">REVISION</li>
            <li className="mainInfoItem">{props.page == undefined? "-" : props.page[3]}</li>
          </ul>
          <ul className="dateInfo">
            <li className="dateInfoTitle">CREATED</li>
            <li className="dateInfoItem">{props.page == undefined? "-" : props.page[4]}</li>
            <li className="dateInfoTitle">REVISED</li>
            <li className="dateInfoItem">{props.page == undefined? "-" : props.page[5]}</li>
          </ul>
        </div>
        <div className="contentPart">
          <ul className="titleInfo">
            <li className="titleTitle">TITLE</li>
            <li className="title">{props.page == undefined? "-" : props.page[6]}</li>
          </ul>
          <ul className="labelInfo">
             <li className="labelTitle">LABEL</li>
            <li className="label"> {props.page == undefined? "-" : props.page[8]} </li>
          </ul>
          <ul className="contentInfo">
            <li className="content">
              <MarkdownWithKatex markdownContent={markdown == '-' ? '': markdown}/>
            </li>
        </ul>
      </div>
    </div>
  )
}
