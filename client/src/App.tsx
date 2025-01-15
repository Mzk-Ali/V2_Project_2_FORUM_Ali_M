import { BrowserRouter as Router } from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import './App.css'

import Header from './layout/Header';
import Main from './layout/Main';
import Footer from './layout/Footer';

function App() {

  return (
    <Router>
      <HelmetProvider>
        <Header />
        <Main />
        <Footer />
      </HelmetProvider>
    </Router>
  )
}

export default App
