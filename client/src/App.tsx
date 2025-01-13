import { BrowserRouter as Router } from 'react-router-dom';
import './App.css'

import Header from './layout/Header';
import Main from './layout/Main';
import Footer from './layout/Footer';

function App() {

  return (
    <Router>
      <Header />
      <Main />
      <Footer />
    </Router>
  )
}

export default App
