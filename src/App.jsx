import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navigation from './layouts/navigation';
import Dashboard from './pages/dashboard';
import Drs_patients from './pages/drs_and_patients' ;
import CreateAppt from './pages/create_appointment';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={
                    <Navigation>
                        <Dashboard />
                    </Navigation>
                } />

                <Route path='/doctors_and_patients' element={
                    <Navigation>
                        <Drs_patients />
                    </Navigation>
                } />

                <Route path='/create_appointment' element={
                    <Navigation>
                        <CreateAppt />
                    </Navigation>
                } />
            </Routes>
        </BrowserRouter>
    )
}
export default App;