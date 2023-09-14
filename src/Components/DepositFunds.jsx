import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import PeopleIcon from '@mui/icons-material/People';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

export default function DepositFunds() {

    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {

        setOpen(!open);
    };
    return (
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'black' }}
            component="nav"
            aria-labelledby="nested-list-subheader"

        >




            <ListItemButton onClick={handleClick}>
                < ArrowBackIcon sx={{ color: "white", fontSize: "30px", marginRight: '10px' }} />

                <ListItemText primary="Deposite Sections" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            {/* <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton onClick={() => navigate('/PendingDeposite')} sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <PeopleIcon sx={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText primary="Withdraw Money Requests" />
                    </ListItemButton>
                </List>
            </Collapse> */}
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton onClick={() => navigate('/CompleteDeposite')} sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <PeopleIcon sx={{ marginLeft: '-11px', color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText sx={{ marginLeft: '-30px', fontSize: '10px' }} primary="Add Money requests" />
                    </ListItemButton>
                </List>
            </Collapse>
            {/* <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton onClick={() => navigate('/RejectDeposite')} sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <PeopleIcon sx={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText primary="Reject Deposite" />
                    </ListItemButton>
                </List>
            </Collapse> */}

        </List>
    );
}