  import React, {useState} from 'react'
  // import React, { useState } from 'react'
  import NavBar from './components/NavBar'
  import News from './components/News'
  import LoadingBar from 'react-top-loading-bar'
  import { BrowserRouter as Router,Routes,Route, } from 'react-router-dom';


  //c42302db59fe4fb1ac77a697f2a142a2

  const App = () => {
    const pageSize=9;
    const apiKey=process.env.REACT_APP_NEWS_API
    // const [progress,setProgress] = useState(0);  
    const [progress, setProgress] = useState(0)


      return (
        <div>
          <Router>
          <NavBar />
          <LoadingBar
          color='#f11946'
          progress={progress}
          // onLoaderFinished={() => setProgress(0)}
        />
          <Routes>
              <Route exact path='/general'  element={ <News apiKey={apiKey} setProgress={setProgress} key="general" pageSize={pageSize} country="in" category="general" /> }
              ></Route>
              <Route exact path='/business' element={ <News apiKey={apiKey} setProgress={setProgress} key="business" pageSize={pageSize} country="in" category="business" /> }></Route>
              <Route exact path='/entertainment' element={ <News apiKey={apiKey} setProgress={setProgress} key="entertaiment" pageSize={pageSize} country="in" category="entertainment" /> }></Route>
              <Route exact path='/health' element={ <News apiKey={apiKey} setProgress={setProgress} key="health" pageSize={pageSize} country="in" category="health" /> }></Route>
              <Route exact path='/science' element={ <News apiKey={apiKey} setProgress={setProgress} key="science" pageSize={pageSize} country="in" category="science" /> }></Route>
              <Route exact path='/sports' element={ <News apiKey={apiKey} setProgress={setProgress} key="sports" pageSize={pageSize} country="in" category="sports" /> }></Route>
              <Route exact path='/technology' element={ <News apiKey={apiKey} setProgress={setProgress} key="technology" pageSize={pageSize} country="in" category="technology" /> }></Route>
          </Routes>
          </Router>
        </div>
      )
  }

  export default App