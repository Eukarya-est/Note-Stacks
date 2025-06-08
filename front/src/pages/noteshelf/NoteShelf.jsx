import './noteshelf.css'
import Shelf from '../../components/shelf/Shelf'
import NotePageController from '../../components/pagelistcontroller/PageListController'
import NotePages from '../../components/notepages/NotePages'
import NotePage from '../../components/notepage/NotePage'

import { useState } from 'react'
import { useNavigate } from "react-router-dom";

export default function Notes() {
  
  const apiPage = '/api/shelf';

  const navigate = useNavigate();
  
  const [openShelf, setShelf] = useState(true);
  const [category, setCategory] = useState();
  const [pagesSupNo, setSupNo] = useState('---');
  const [pageNo, setPageNo] = useState(1);
  const [page, setPage] = useState([' - ', ' - ', ' - ', ' - ', ' - ', ' - ', ' - ', ' - ', ' - ']);
  
  // Handler for Shelf button click
  const handleCategorySelect = (ctgr) => {
    setCategory(ctgr);
  };

  // Handler for page select (from NotePages)
  const handlePageSelect = (pageObj) => {
    setPage(pageObj);
    navigate(`/shelf/${category}/${pageObj[2]}`);
    setPageNo(pageObj[2]);
  };

  const handleNoController = (No) => {
    if (No < 1 || No > pagesSupNo[0]) {
      alert("Page number out of range");
      return;
    }
    setPageNo(No);
    navigate(`/shelf/${category}/${No}`);
  }

  // Get category and pageNo from URL parameters

  return (
    <div className={openShelf ? "noteframe-shelf-opend": "noteframe-shelf-closed"}>
        <Shelf 
          openShelf={openShelf}
          toggleShelf={() => setShelf(!openShelf)}
          setNotePages={handleCategorySelect}
          category={category}
          apiPage={apiPage}
        />
        <NotePageController 
          pagesSupNo = {pagesSupNo}
          setSupNo = {setSupNo}
          setPageNo = {handleNoController}
          pageNo = {pageNo}
          apiPage={apiPage}
        />
        <NotePages 
          category={category}
          setSupNo={setSupNo}
          setPage={handlePageSelect}
          selectedPage={page}
          setPageNo = {handleNoController}
          pageNo = {pageNo}
          apiPage={apiPage}
        />
        <NotePage
          category={category}  
          pageNo = {pageNo}        
          page = {page}
          apiPage={apiPage}
        />
    </div>
  )
}
