import './notepages.css'

import { useState, useEffect } from 'react';

export default function NotesPages(props) {

  // This component is responsible for displaying the list of pages in a category
  // It fetches the list of pages from the API based on the category and page number
  // It allows the user to select a page by clicking on it
  // It receives props from the parent component, including the category, page number, and functions to set the selected page and supreme number of pages

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [list, setList] = useState();
  
  useEffect(() => {
    setList(props.pages);
  }, [props.pages]);
  
  return (
      <div className="note-pages">
        <ul className="page-number-list">
          <li className="page-number-list-title">#</li>
            {(!list || list.length === 0) ? (
              Array.from({ length: 5 }).map((_, i) => (
                <li className="page-number-list-item" id="page-number-list-item-id" key={i}>-</li>
              ))
            ) : (Object.entries(list).map(([index, item], i) => {
                const isDisable = item[0] === ' - ';
                const isSelected = item[0] === props.pageNo;
                const isEnable = hoveredIndex === i && !isDisable && !isSelected;
                return (
                  <li
                    key={index}
                    className={["page",
                      isEnable ? "-enable" : "",
                      isSelected ? "-selected" : "",
                      isDisable ? "-disable" : ""
                    ].join("")}
                    id="page-number-list-item-id"
                    onMouseEnter={() => {
                      if (!isDisable && !isSelected) setHoveredIndex(i);
                    }}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={!isDisable && !isSelected ? () => props.setPageNo(item[0]) : undefined}
                  >
                    {item[0]}
                  </li>
                  )
              }))
            }
        </ul>
        <ul className="page-name-list">
          <li className="page-name-list-title">TITLE</li>
            {(!list || list.length === 0) ? (
              Array.from({ length: 5 }).map((_, i) => (
                <li className="page-name-list-item" id="page-name-list-item-id" key={i}>-</li>
              ))
            ) : (Object.entries(list).map(([index, item], i) => {
                const isDisable = item[0] === ' - ';
                const isSelected = item[0] === props.pageNo;
                const isEnable = hoveredIndex === i && !isDisable && !isSelected;
                return (
                  <li
                    key={index}
                    className={["page",
                      isEnable ? "-enable" : "",
                      isSelected ? "-selected" : "",
                      isDisable ? "-disable" : ""
                    ].join("")}
                    id="page-name-list-item-id"
                    onMouseEnter={() => {
                      if (!isDisable && !isSelected) setHoveredIndex(i);
                    }}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={!isDisable && !isSelected ? () => props.setPageNo(item[0]) : undefined}
                  >
                    {item[1]}
                  </li>
              )}
            ))}
        </ul>
      </div>
  )
}
