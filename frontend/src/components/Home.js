import logo from '../logo.svg';
import '../App.css';

import Register from './Register';

function Home() {
    return (
        <div className="App">
            <Register/>
            <img src={logo} className="App-logo" alt="logo" />
        </div>
    )
}

export default Home
