import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import DashBoard from './DashBoard';
import StackManage from './StackManage';
import AllActiveUSers from '../Users/AllActiveUSers';
import UsersSection from './UsersSections';
import AllUsers from '../Users/AllUsers';
import InActiveUSers from '../Users/InActiveUSers';
import BlockUsers from '../Users/BlockUsers';
import IncomeReport from './IncomeReport';
// import SigningBonus from '../IncomeReports/SigningBonus';
// import RoboTradingBonus from '../IncomeReports/RoboTradingBonus';
// import TeamGrowthBonus from '../IncomeReports/TeamGrowthBonus';
// import DepositFunds from './DepositFunds';
// import PendingDeposite from '../DepositsFunds/PendingDeposite';
// import CompleteDeposite from '../DepositsFunds/CompleteDeposite';
// import RejectDeposite from '../DepositsFunds/RejectDeposite';
import { Avatar } from '@mui/material';
import RequestHistory from '../Withdraw-requests/RequestHistory';
import WithdrawReport from './WithdrawReport';
import ContactUs from './ContactUs';
import ProfilePage from './ProfilePage';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ContactMailIcon from '@mui/icons-material/ContactMail'
import MyIncome from '../IncomeReports copy/MyIncome';
import MyTeamIncome from '../IncomeReports copy/MyTeamIncome';


const drawerWidth = 240;

function Header(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const navigate = useNavigate();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar sx={{ background: 'black', placeContent: 'center' }}>
                <img
                    src="htx-logo.png"
                    alt="Your Alt Text"
                    style={{ width: '100px', cursor: 'pointer', height: 'auto' }}
                />
            </Toolbar>
            <Divider />
            <List sx={{ color: 'white', background: '#161616', }}>
                <ListItem disablePadding sx={{ display: 'block', padding: '5px', borderBottom: '1px solid #2e2a2a' }} >
                    <ListItemButton

                        onClick={() => navigate("/")}  >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                justifyContent: 'center',
                            }}
                        >
                            <AvTimerIcon sx={{ color: "white", marginRight: '10px', fontSize: "30px" }} />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{ display: 'block', padding: '5px', borderBottom: '1px solid #2e2a2a' }} >
                    <ListItemButton
                        onClick={() => navigate("/Profilepage")}  >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                justifyContent: 'center',
                            }}
                        >
                            <ManageAccountsIcon sx={{ color: "white", marginRight: '10px', fontSize: "30px" }} />
                        </ListItemIcon>
                        <ListItemText primary=" Admin Profile" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{ display: 'block', padding: '5px', borderBottom: '1px solid #2e2a2a' }} >
                    <ListItemButton

                        onClick={() => navigate("/StackManage")}  >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                justifyContent: 'center',
                            }}

                        >
                            <SubtitlesIcon sx={{ color: "white", marginRight: '10px', fontSize: "30px" }} />
                        </ListItemIcon>
                        <ListItemText primary="Transactions" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding sx={{ display: 'block', borderBottom: '1px solid #2e2a2a' }} >

                    <UsersSection />

                </ListItem>
                <ListItem disablePadding sx={{ display: 'block', borderBottom: '1px solid #2e2a2a' }} >

                    <IncomeReport />

                </ListItem>
                {/* <ListItem disablePadding sx={{ display: 'block', borderBottom: '1px solid #2e2a2a' }} >

                    <DepositFunds />

                </ListItem> */}
                <ListItem disablePadding sx={{ display: 'block', borderBottom: '1px solid #2e2a2a' }} >

                    <WithdrawReport />

                </ListItem>
                <ListItem disablePadding sx={{ display: 'block', borderBottom: '1px solid #2e2a2a' }} >
                    <ListItemButton

                        onClick={() => navigate("/ContactUs")}  >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                justifyContent: 'center',
                            }}

                        >
                            <ContactMailIcon sx={{ color: "white", marginRight: '10px', fontSize: "30px" }} />
                        </ListItemIcon>
                        <ListItemText primary="Contact Us" />
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ background: '#272727', display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    background: 'black',
                    borderBottom: '1px solid white',
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Dashboard
                    </Typography>

                </Toolbar>
                <Avatar sx={{ background: 'transparent', marginRight: '1rem' }} />
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{

                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />

                <Routes>
                    <Route path='/' element={<DashBoard />} ></Route>
                    <Route exact path='/StackManage' element={<StackManage />} ></Route>
                    <Route exact path='/ProfilePage' element={<ProfilePage />} ></Route>
                    <Route exact path='/AllUsers' element={<AllUsers />} ></Route>
                    <Route exact path='/AllActiveUsers' element={<AllActiveUSers />} ></Route>
                    <Route exact path='/InActiveUSers' element={<InActiveUSers />} ></Route>
                    <Route exact path='/BlockUsers' element={<BlockUsers />} ></Route>
                    {/* <Route exact path='/SigningBonus' element={<SigningBonus />} ></Route>
                    <Route exact path='/RoboTradingBonus' element={<RoboTradingBonus />} ></Route>
                    <Route exact path='/TeamGrowthBonus' element={<TeamGrowthBonus />} ></Route> */}
                    <Route exact path='/myincome' element={<MyIncome />}></Route>
                    <Route exact path='/myteamincome' element={<MyTeamIncome />}></Route>
                    {/* <Route exact path='/PendingDeposite' element={<PendingDeposite />} ></Route>
                    <Route exact path='/CompleteDeposite' element={<CompleteDeposite />} ></Route>
                    <Route exact path='/RejectDeposite' element={<RejectDeposite />} ></Route> */}
                    <Route exact path="/RequestHistory" element={<RequestHistory />} ></Route>
                    <Route exact path="/ContactUs" element={<ContactUs />} ></Route>

                </Routes>

            </Box>
        </Box>
    );
}

Header.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Header;