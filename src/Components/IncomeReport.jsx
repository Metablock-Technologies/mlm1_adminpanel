


// admin panel sara complete haina

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
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useNavigate } from 'react-router-dom';

export default function IncomeReport() {
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

                <ListItemText primary="Income Report" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            {/* <Collapse  in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton onClick={() => navigate('/SigningBonus')} sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <PeopleIcon sx={{ marginLeft: '-11px', color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText sx={{ marginLeft: '-30px' }} primary="Signing Bonus" />
                    </ListItemButton>
                </List>
            </Collapse>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton onClick={() => navigate('/RoboTradingBonus')} sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <PeopleIcon sx={{ marginLeft: '-11px', color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText sx={{ marginLeft: '-35px' }} primary="Robo trading Income" />
                    </ListItemButton>
                </List>
            </Collapse>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton onClick={() => navigate('/TeamGrowthBonus')} sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <PeopleIcon sx={{ marginLeft: '-11px', color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText sx={{ marginLeft: '-30px'}} primary="Team Growth Bonus" />
                    </ListItemButton>
                </List>
            </Collapse> */}
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton onClick={() => navigate('/myincome')} sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <PeopleIcon sx={{ marginLeft: '-11px', color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText sx={{ marginLeft: '-30px' }} primary="My Income" />
                    </ListItemButton>
                </List>
            </Collapse>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton onClick={() => navigate('/myteamincome')} sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <PeopleIcon sx={{ marginLeft: '-11px', color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText sx={{ marginLeft: '-35px' }} primary="My Team Income" />
                    </ListItemButton>
                </List>
            </Collapse>

        </List>
    );
}