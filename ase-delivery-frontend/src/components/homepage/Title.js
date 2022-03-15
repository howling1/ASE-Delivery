import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {Avatar} from "@mui/material";

export default function Title() {
    return (
        <div>
            <Box sx={{ width: 400, height: 200, position: 'absolute',
                top: 140, left: 820,}}>
                <Typography variant="h2" component="div" gutterBottom>
                    ASE Delivery
                </Typography>
            </Box>
            <Box sx={{ width: 400, height: 200, position: 'absolute',
                top: 210, left: 820,}}>
                <Typography variant="h6" component="div" gutterBottom>
                    efficient pick-up station delivery platform
                </Typography>
            </Box>
            <Box sx={{ width: 400, height: 200, position: 'absolute',
                top: 280, left: 820,}}>
                <Typography variant="h5" component="div" gutterBottom>
                    We provide delivery service with:
                </Typography>
            </Box>
            <Avatar
                alt={"time icon"}
                src={"/images/time_icon.svg"}
                variant={"rounded"}
                sx={{top: 275, left: 870}}
            />
            <Box sx={{ width: 400, height: 200, position: 'absolute',
                top: 345, left: 950,}}>
                <Typography variant="h5" component="div" gutterBottom>
                    time-saving
                </Typography>
            </Box>
            <Avatar
                alt={"secure icon"}
                src={"/images/secure_icon.svg"}
                variant={"rounded"}
                sx={{top: 289, left: 870}}
            />
            <Box sx={{ width: 400, height: 200, position: 'absolute',
                top: 395, left: 950,}}>
                <Typography variant="h5" component="div" gutterBottom>
                    secure
                </Typography>
            </Box>
            <Avatar
                alt={"gear icon"}
                src={"/images/gear_icon.svg"}
                variant={"rounded"}
                sx={{top: 301, left: 870}}
            />
            <Box sx={{ width: 400, height: 200, position: 'absolute',
                top: 445, left: 950,}}>
                <Typography variant="h5" component="div" gutterBottom>
                    manage-efficient
                </Typography>
            </Box>
        </div>
    );
}