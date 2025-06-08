import './notepages.css'

import { useState, useEffect } from 'react';

export default function NotesPages(props) {

  // This component is responsible for displaying the list of pages in a category
  // It fetches the list of pages from the API based on the category and page number
  // It allows the user to select a page by clicking on it
  // It receives props from the parent component, including the category, page number, and functions to set the selected page and supreme number of pages

  const [list, setList] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    let apiPage;
    if (props.category === undefined || props.category === null) {
      // If category is not defined, use the default apiPage
      apiPage = props.apiPage;
    } else {
      if (props.pageNo === undefined || props.pageNo === null || isNaN(parseInt(props.pageNo))) {
        // If pageNo is not defined, use the default apiPage with category
        apiPage = props.apiPage + '/' + props.category;
      } else {
        // If both category and pageNo are defined, construct the apiPage with both
        apiPage = props.apiPage + '/' + props.category + '/' + props.pageNo;
      } 
    }
    fetch(apiPage).then(
      response => response.json()
    ).then(
      data => {
        if(data.length > 1) {
          // Supreme Number of list
          props.setSupNo(data[0]);                                                      
    
          data.splice(0, 1); 
          setList(data);
          props.setPage(data[0]);                                         
        }
      }
    ).catch(
      error => {
        console.error('Failed: Load Pages; ', error)
      }
    );
  }, [props.category, props.apiPage]);

  return (
      <div className="notePages">
        <ul className="pageNumberList">
          <li className="pageNumberListTitle">#</li>
            {(!list || list.length === 0) ? (
              Array.from({ length: 5 }).map((_, i) => (
                <li className="pageNumberListItem" key={i}>-</li>
              ))
            ) : (Object.entries(list).map(([index, item], i) => {
                let style = {};
                if (item[2] === ' - ') {
                  style.cursor = 'default';
                } else if (item[2] === props.pageNo) {
                  style.cursor = 'default';
                  style.fontWeight = 'bold';
                  style.backgroundColor = '#f0f0f0'; // Highlight the current page
                }
              return (
                <li             
                  key={index}
                  className={`pageNumberListItem${hoveredIndex === i  ? ' hovered' : ''}`}
                  onMouseEnter={() => {if (!(item[2] === ' - ' || item[2] === props.pageNo)) setHoveredIndex(i);}}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={item[2] === ' - ' || item[2] === props.pageNo ? () => undefined : undefined }
                  style={style}
                >
                  {item[2]}
                </li>
              )}
            ))}
        </ul>
        <ul className="pageNameList">
          <li className="pageNameListTitle">TITLE</li>
            {(!list || list.length === 0) ? (
              Array.from({ length: 5 }).map((_, i) => (
                <li className="pageNameListItem" key={i}>-</li>
              ))
            ) : (Object.entries(list).map(([index, item], i) => {
                let style = {};
                if (item[2] === ' - ') {
                  style.cursor = 'default';
                } else if (item[2] === props.pageNo) {
                  style.cursor = 'default';
                  style.fontWeight = 'bold';
                  style.backgroundColor = '#f0f0f0'; 
                }
              return (
                <li             
                  key={index}
                  className={`pageNameListItem${hoveredIndex === i  ? ' hovered' : ''}`}
                  onMouseEnter={() => {if (!(item[2] === ' - ' || item[2] === props.pageNo)) setHoveredIndex(i);}}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={item[2] === ' - ' || item[2] === props.pageNo ? () => undefined : undefined }
                  style={style}
                >
                  {item[6]}
                </li>
              )}
            ))}
        </ul>
      </div>
  )
}
