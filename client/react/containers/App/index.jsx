import React from 'react';
import { Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Home from '../Home';
import Navbar from '../../components/Navbar';
import SignUp from '../Signup';
import SignIn from '../SignIn';
import UploadPrograms from '../UploadPrograms';
import ProgramSearchResults from '../ProgramSearchResults';
import Program from '../Program';
import Footer from '../../components/Footer'
import './styles.css';
import 'react-toastify/dist/ReactToastify.min.css';

const App = () => (
    <div>
        <header>
            <Navbar />
        </header>
        <main>
            <ToastContainer />
            <Route exact path="/" component={Home} />
            <Route exact path="/sign-up" component={SignUp} />
            <Route exact path="/sign-in" component={SignIn} />
            <Route exact path="/upload-programs" component={UploadPrograms} />
            <Route exact path="/programs" component={ProgramSearchResults} />
            <Route exact path="/programs/:programId" component={Program} />
        </main>
        <footer>
            <Footer />
        </footer>
    </div>
)

export default App;
