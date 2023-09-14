import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import PeopleIcon from '@mui/icons-material/People';
import { useNavigate } from 'react-router-dom';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';



// profile, activate idea, profie area, change apssword and AllActiveUSers, transactions, contact us 
export default function WithdrawReport() {

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
                <CurrencyRupeeIcon sx={{ color: "white", fontSize: "30px", marginRight: '10px' }} />

                <ListItemText primary="Withdraw Request" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton onClick={() => navigate('RequestHistory')} sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <PeopleIcon sx={{ marginLeft: '-11px', color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText sx={{ marginLeft: '-30px' }} primary="Request History" />
                    </ListItemButton>
                </List>
            </Collapse>

            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton onClick={() => navigate('/PendingDeposite')} sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <PeopleIcon sx={{ marginLeft: '-11px', color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText sx={{ marginLeft: '-30px' }} primary="Withdraw Requests" />
                    </ListItemButton>
                </List>
            </Collapse>

        </List>
    );
}