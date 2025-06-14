import './noteshelf.css'
import Shelf from '../../components/shelf/Shelf'
import NotePageController from '../../components/pagelistcontroller/PageListController'
import NotePages from '../../components/notepages/NotePages'
import NotePage from '../../components/notepage/NotePage'

import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

export default function Notes() {
  
  const apiPage = '/api/shelf';

  const navigate = useNavigate();
  
  const [shelfCategory, setshelfCategory] = useState([]);
  const [openShelf, setShelf] = useState(true);
  const [category, setCategory] = useState();
  const [pageSupNo, setSupNo] = useState('---');
  const [pageNo, setPageNo] = useState(0);
  const [page, setPage] = useState();

  // Fetch shelf categories when component mounts
  useEffect(() => {
    // If shelfCategory is empty, fetch it from the API
    if(shelfCategory.length == 0) {  
      fetch(apiPage).then(
        response => response.json()
      ).then(
        data => {
          setshelfCategory(data);
        }
      ).catch(
        error => {
          console.error('Failed: Load Shelf; ', error)
        }
      );
    };

    // First Page(NoteShelf → Select Category)
    // If the URL contains a category, set it as the current category
    if (category !== undefined && pageNo == 0) {
      fetch(apiPage + '/' + category).then(
        response => response.json()
      ).then(
        data => {
          setSupNo(data); 
          setPageNo(data);
          navigate(`/shelf/${category}/${data}`);                                                                                            
        }
      ).catch(
        error => {
          console.error('Failed: Load Pages; ', error)
        }
      );
    // When a category was changed (Select Category → Select Category)
    } else if (category !== undefined && pageNo !== 0) {
      fetch(apiPage + '/' + category).then(
        response => response.json()
      ).then(
        data => {
          setSupNo(data); 
          setPageNo(data);
          navigate(`/shelf/${category}/${data}`);                                                                                             
        }
      ).catch(
        error => {
          console.error('Failed: Load Pages; ', error)
        }
      );
    };
  }, [category]);
  
  // Handler for Shelf button click
  const handleCategorySelect = (ctgr) => {
    setCategory(ctgr);
    navigate(`/shelf/${ctgr}`);
  };

  // Handler for page select (from NotePages)
  const handlePageSelect = (pageObj) => {

    // Validate the page number
    if (pageObj[2] < 1 || pageObj[2] > pageSupNo) {
      alert("Page number out of range");
      return;
    } else if (pageObj[2] === ' - ' || pageObj[2] === undefined) {
      alert("This page is not available");
      return;
    } else {
      setPage(pageObj);
    }
  };

  // Handler for page number input (from NotePageController)
  const handlePageNumber = (No) => {
    if (No < 1 || No > pageSupNo[0]) {
      alert("Page number out of range");
      return;
    }
    setPageNo(No);
    navigate(`/shelf/${category}/${No}`);
  };


  return (
    <div className={openShelf ? "noteframe-shelf-opend": "noteframe-shelf-closed"}>
        <Shelf 
          openShelf={openShelf}
          toggleShelf={() => setShelf(!openShelf)}
          shelfCategory={shelfCategory}
          setCategory={handleCategorySelect}
          category={category}
        />
        <NotePageController 
          pageSupNo={pageSupNo}
          setSupNo={setSupNo}
          setPageNo={handlePageNumber}
          pageNo={pageNo}
        />
        <NotePages 
          category={category}
          setPageNo={handlePageNumber}
          pageNo={pageNo}
          setPage={handlePageSelect}
          page={page}
          apiPage={apiPage}
        />
        <NotePage
          category={category}  
          pageNo={pageNo}        
          page={page}
          apiPage={apiPage}
        />
    </div>
  )
}
