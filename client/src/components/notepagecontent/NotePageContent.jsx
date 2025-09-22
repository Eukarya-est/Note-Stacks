// import './style-base.css';
// import './style-codemirror.css';
// import './style-mathjax-ni.css';
// import './style-mathjax.css';
// import './style-theme_css.css';
// import { Controlled as CodeMirror } from 'react-codemirror2';

// import { ServerURL } from "../../context/constant.jsx";

// import { useState, useEffect, useContext } from 'react';
// import ShadowDom from "react-shadow";
// import ReactHtmlParser from 'react-html-parser';

// export default function NotePageContent(props) {

//   const server = useContext(ServerURL);

//   const [document, setDocument] = useState("-");

//   useEffect(() => {
//     if (props.category !== undefined && props.pageNo !== 0 && props.page[6] !== ' - ' && props.page[6] !== undefined) {
//         fetch(server + window.location.pathname + '/' + props.page[6])
//           .then((response) => response.text())
//           .then((text) => setDocument(text))
//           .catch((error) => {
//             console.error('Failed: Load Page Content; ', error);
//           });
// }
//   }, [props.page]);

//   return (
//     <ShadowDom.div id="shadow-dom">
//       { ReactHtmlParser(document) }
//     </ShadowDom.div>
//   )
// }
