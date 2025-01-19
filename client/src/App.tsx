import { BrowserRouter as Router } from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import './App.css'

import Header from './layout/Header';
import Main from './layout/Main';
import Footer from './layout/Footer';
import AuthProvider from './contexts/AuthProvider';

function App() {

  return (
    <Router>
      <HelmetProvider>
        <AuthProvider>
          <Header />
          <Main />
          <Footer />
        </AuthProvider>
      </HelmetProvider>
    </Router>
  )
}

export default App
