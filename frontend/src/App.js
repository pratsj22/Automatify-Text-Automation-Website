import './App.css';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar';
import TextSummarizer from './pages/Text-Summarizer/TextSummarizer';
import TextExtractor from './pages/Text-Extractor/TextExtractor';
import React from 'react';
import{Outlet,createBrowserRouter,RouterProvider} from "react-router-dom";
import LanguageTranslator from './pages/Language-Translator/LanguageTranslator';
const Layout=()=>{
  return(
    <>
    <Navbar/>
    <Outlet/>
    </>
  )
}
const router = createBrowserRouter([
  {
    path:"/",
    element:<Layout/>,
    
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:"/textsummarizer",
        element:<TextSummarizer/>
      },
      {
        path:"/textextractor",
        element:<TextExtractor/>
      },
      {
        path:"/language-translator",
        element:<LanguageTranslator/>
      }
    ]
  }
])
function App() {
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
