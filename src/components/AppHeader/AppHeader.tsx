import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import logo from '../../images/bookLogo.png';
import './appHeader.scss'

const AppHeader = () => {

    return (
        <AppBar position="static">
            <Toolbar sx={{ justifyContent: 'start' }}>
                <div className="same-row cursor-pointer">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h3>Crypto Order Book Data Tracker App</h3>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default AppHeader