import './notepage.css'
import Markdown from 'react-markdown'
import { useState, useEffect } from 'react';

export default function NotePage(props) {

    // This component is responsible for displaying the content of a specific note page
    // It fetches the markdown content from the API based on the selected page
    // It receives props from the parent component, including the API endpoint, category, and selected page

    const [markdownContent, setMarkdownContent] = useState("-");

    const apiPage = props.apiPage + '/' + props.category + '/' + props.pageNo + '/' + props.page[8];

useEffect(() => {
     fetch(apiPage)
        .then((response) => response.text())
        .then((text) => setMarkdownContent(text));
    }, [props.page[8]]);

  return (
    <div className="notePage">
        <div className="infoPart">
            <ul className="mainInfo">
                <li className="mainInfoTitle">COVER</li>
                <li className="mainInfoItem">{props.page == null? "-" : props.page[1]}</li>
                <li className="mainInfoTitle">No.</li>
                <li className="mainInfoItem">{props.page == null? "-" : props.page[2]}</li>
                <li className="mainInfoTitle">REVISION</li>
                <li className="mainInfoItem">{props.page == null? "-" : props.page[3]}</li>
            </ul>
            <ul className="dateInfo">
                <li className="dateInfoTitle">CREATED</li>
                <li className="dateInfoItem">{props.page == null? "-" : props.page[4]}</li>
                <li className="dateInfoTitle">REVISED</li>
                <li className="dateInfoItem">{props.page == null? "-" : props.page[5]}</li>
            </ul>
        </div>
        <div className="contentPart">
            <ul className="titleInfo">
                <li className="titleTitle">TITLE</li>
                <li className="title">{props.page[6]}</li>
            </ul>
            <ul className="labelInfo">
                <li className="labelTitle">LABEL</li>
                <li className="label"> {props.page[8]} </li>
            </ul>
            <ul className="contentInfo">
                <li className="content">
                    <Markdown>{markdownContent}</Markdown>
                </li>
            </ul>
        </div>
    </div>
  )
}
