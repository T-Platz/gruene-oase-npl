import { DownloadSharp } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";

interface DownloadPDFButtonProps {
    onClick: () => void
}

function DownloadPDFButton (props: DownloadPDFButtonProps) {
    return (
        <div onClick={() => {props.onClick();}}>
            <Button
                sx={{
                    borderRadius: '20px',
                    paddingY: 1,
                    paddingX: 4,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
                    backgroundImage: 'linear-gradient(135deg, #97d045, #057038)',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
                    transition: 'transform 0.5s ease-in-out',  
                    "&:hover": {transform: 'scale(1.05)'}
                }}>
                     <Box sx={{padding: '6px', backgroundColor: 'white', borderRadius: '50%', // Gives the button rounded corners
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',}}>
                        <DownloadSharp sx={{ color: '#057038' }} />
                    </Box>
                    <Typography color={'white'} variant="h6" sx={{textTransform: 'none'}}>PDF herunterladen</Typography>
            </Button>
        </div>
    )
}

export default DownloadPDFButton;