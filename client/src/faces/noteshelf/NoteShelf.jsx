import './noteshelf.css'
import Shelf from '../../components/shelf/Shelf'
import NotePageController from '../../components/pagelistcontroller/PageListController'
import NotePages from '../../components/notepages/NotePages'
import NotePage from '../../components/notepage/NotePage'
import { ServerURL, ShelfURL } from "../../context/constant.jsx"

import { useState, useEffect, useContext } from 'react'
import { useNavigate } from "react-router-dom";

export default function Notes() {
  
  const server =  useContext(ServerURL);
  const shelf =  useContext(ShelfURL);

  const navigate = useNavigate();

  const [shelfCategory, setshelfCategory] = useState([]);
  const [openShelf, setShelf] = useState(true);
  const [category, setCategory] = useState();
  const [pagesBound, setBound] = useState();
  const [pageNo, setPageNo] = useState(0);
  const [pages, setPages] = useState();
  const [page, setPage] = useState();

  // Handler for Shelf button click
  const handleCategorySelect = (ctgr) => {
    navigate(`/shelf/${ctgr}`);
    setCategory(ctgr);
  };

  // Handler for page select (from NotePages)
  const handlePageSelect = (pageObj) => {

    // Validate the page number
    if (pageObj[2] < 1 || pageObj[2] > pagesBound) {
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
    if (No < 1 || No > pagesBound[0]) {
      alert("Page number out of range");
      return;
    }
    setPageNo(No);
    navigate(`/shelf/${category}/${No}`);
  };

  // Fetch shelf categories when component mounts
  useEffect(() => {

    var pathname = window.location.pathname;
    var pathSegments = pathname.split('/');

    console.log(history)

    // If shelfCategory is empty, fetch it from the API
    if(pathSegments[1] == 'shelf') { 
      if(shelfCategory.length == 0){
        fetch(server + shelf).then(
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
    };

    //When a category was changed
    if (pathSegments[2] !== undefined) {
      fetch(server + shelf + '/' + pathSegments[2]).then(
        response => response.json()
      ).then(
      data => {
          setBound(data['bound']); 
          setCategory(data['category']);
        }
      ).catch(
        error => {
          console.error('Failed: Load Pages; ', error)
        }
      );
    };

    //When a category was changed
    if (pathSegments[2] !== undefined && pathSegments[3] !== undefined) {
      if(pathSegments[3] > 0 && pathSegments[3] < pagesBound + 1){
        fetch(server + shelf + '/' + pathSegments[2] + '/' + pathSegments[3]).then(
        response => response.json()
          ).then(
          data => {
              setPages(data);
            }
          ).catch(
            error => {
              console.error('Failed: Load Pages; ', error)
            }
          );
        fetch(server + shelf + '/' + pathSegments[2] + '/' + pathSegments[3]+ '/' + 'page').then(
        response => response.json()
          ).then(
          data => {
              setPage(data);
              console.log('PAGE');
            }
          ).catch(
            error => {
              console.error('Failed: Load Pages; ', error)
            }
          );
        };
      };

  }, [window.location.pathname]);

  useEffect(() => {

      var pathname = window.location.pathname;
      var pathSegments = pathname.split('/');

    if (category !== undefined && pathSegments[2] === encodeURI(category)) {
      fetch(server + shelf + '/' + category).then(
        response => response.json()
      ).then(
      data => {
          setPageNo(data['bound']); 
          setPages(data['pages']);
          navigate(shelf + '/' + data['category'] + '/' + data['bound']);        
        }
      ).catch(
        error => {
          console.error('Failed: Load Pages; ', error)
        }
      );
    };
  }, [category]);

  return (
    <ServerURL.Provider value={server}>
    <ShelfURL.Provider value={shelf}>
      <div className={openShelf ? "noteframe-shelf-opend": "noteframe-shelf-closed"}>
          <Shelf 
            openShelf={openShelf}
            toggleShelf={() => setShelf(!openShelf)}
            shelfCategory={shelfCategory}
            setCategory={handleCategorySelect}
            category={category}
          />
          <NotePageController 
            pagesBound={pagesBound}
            setBound={setBound}
            setPageNo={handlePageNumber}
            pageNo={pageNo}
          />
          <NotePages 
            category={category}
            setPageNo={handlePageNumber}
            pageNo={pageNo}
            pages={pages}
            setPage={handlePageSelect}
            page={page}
          />
          <NotePage
            category={category}  
            pageNo={pageNo}        
            page={page}
          />
      </div>
    </ShelfURL.Provider>
    </ServerURL.Provider>
  )
}
