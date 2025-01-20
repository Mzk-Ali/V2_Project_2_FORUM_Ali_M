import { BrowserRouter as Router } from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import './App.css'

import Header from './layout/Header';
import Main from './layout/Main';
import Footer from './layout/Footer';
import AuthProvider from './contexts/AuthProvider';
import { ToastProvider } from './contexts/ToastProvider';
import { Flip, ToastContainer } from 'react-toastify';

function App() {

  return (
    <Router>
      <HelmetProvider>
        <AuthProvider>
          <ToastProvider>
            <Header />
            <Main />
            <Footer />
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
              transition={Flip}
            />
          </ToastProvider>
        </AuthProvider>
      </HelmetProvider>
    </Router>
  )
}

export default App
