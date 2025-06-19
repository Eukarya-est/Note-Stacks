import './notepages.css'

import { useState, useEffect } from 'react';

export default function NotesPages(props) {

  // This component is responsible for displaying the list of pages in a category
  // It fetches the list of pages from the API based on the category and page number
  // It allows the user to select a page by clicking on it
  // It receives props from the parent component, including the category, page number, and functions to set the selected page and supreme number of pages

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [list, setList] = useState();

  const apiPage = props.apiPage + '/' + props.category + '/' + props.pageNo;
  
  useEffect(() => {
    if (props.category !== undefined && props.pageNo !== 0) {
      fetch(apiPage)
        .then((response) => response.json())
        .then((data) => {
          setList(data['pages']);
          props.setPage(data['page']);
        })
        .catch((error) => {
          console.error('Failed: Load Pages; ', error);
        });
    }
  }, [props.pageNo]);
  
  return (
      <div className="notePages">
        <ul className="pageNumberList">
          <li className="pageNumberListTitle">#</li>
            {(!list || list.length === 0) ? (
              Array.from({ length: 5 }).map((_, i) => (
                <li className="pageNumberListItem" key={i}>-</li>
              ))
            ) : (Object.entries(list).map(([index, item], i) => {
                const isDisabled = item[0] === ' - ';
                const isSelected = item[0] === props.pageNo;
                const isHovered = hoveredIndex === i && !isDisabled && !isSelected;
                  return (
                    <li
                      key={index}
                      className={[
                        "pageNumberListItem",
                        isHovered ? "hovered" : "",
                        isSelected ? "selected" : "",
                      ].join(" ")}
                      onMouseEnter={() => {
                        if (!isDisabled && !isSelected) setHoveredIndex(i);
                      }}
                      onMouseLeave={() => setHoveredIndex(null)}
                      onClick={!isDisabled && !isSelected ? () => props.setPageNo(item[0]) : undefined}
                    >
                      {item[0]}
                    </li>
                  )
              }))
            }
        </ul>
        <ul className="pageNameList">
          <li className="pageNameListTitle">TITLE</li>
            {(!list || list.length === 0) ? (
              Array.from({ length: 5 }).map((_, i) => (
                <li className="pageNameListItem" key={i}>-</li>
              ))
            ) : (Object.entries(list).map(([index, item], i) => {
                const isDisabled = item[0] === ' - ';
                const isSelected = item[0] === props.pageNo;
                const isHovered = hoveredIndex === i && !isDisabled && !isSelected;

                return (
                  <li
                    key={index}
                    className={[
                      "pageNameListItem",
                      isHovered ? "hovered" : "",
                      isSelected ? "selected" : "",// Debugging line to check item[1]
                    ].join(" ")}
                    onMouseEnter={() => {
                      if (!isDisabled && !isSelected) setHoveredIndex(i);
                    }}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={!isDisabled && !isSelected ? () => props.setPageNo(item[0]) : undefined}
                  >
                    {item[1]}
                  </li>
              )}
            ))}
        </ul>
      </div>
  )
}
