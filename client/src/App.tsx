import { BrowserRouter as Router } from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import './App.css'

import Header from './layout/Header';
import Main from './layout/Main';
import Footer from './layout/Footer';
import AuthProvider from './contexts/AuthProvider';
import { ToastProvider } from './contexts/ToastProvider';
import { Flip, ToastContainer } from 'react-toastify';
import ThemeProvider from './contexts/ThemeProvider';

function App() {

  return (
    <Router>
      <HelmetProvider>
        <AuthProvider>
          <ThemeProvider>
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
          </ThemeProvider>
        </AuthProvider>
      </HelmetProvider>
    </Router>
  )
}

export default App
