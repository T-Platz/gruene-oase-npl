import { SendSharp } from "@mui/icons-material";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";

interface SendNotificationButtonProps {
    smallScreen: boolean
    disabled: boolean,
    onClick: () => void
}

function SendNotificationButton (props: SendNotificationButtonProps) {
    return (
        <div onClick={() => {props.onClick();}}>
            <Button
                disabled={props.disabled}
                sx={{
                    cursor: props.disabled ? 'default' : 'pointer',
                    borderRadius: '20px',
                    paddingY: props.smallScreen ? 1 : 2,
                    paddingX: props.smallScreen ? 2 : 4,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
                    backgroundImage: props.disabled? null : 'linear-gradient(135deg, #97d045, #057038)',
                    boxShadow: props.disabled ? null :  '0px 4px 10px rgba(0, 0, 0, 0.25)',
                    backgroundColor: props.disabled ? '#c7c7c7' : null,
                    transition: 'transform 0.5s ease-in-out',  
                    "&:hover": {transform: props.disabled? 'none' : 'scale(1.1)'}
                }}>
                     <Box sx={{padding: '6px', backgroundColor: 'white', borderRadius: '50%', // Gives the button rounded corners
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',}}>
                        <SendSharp sx={{ color: props.disabled ? '#c7c7c7' : '#057038' }} />
                    </Box>
                    <Typography color={props.disabled ? "text.secondary" : 'white'} variant="h6" sx={{textTransform: 'none'}}>Senden</Typography>
            </Button>
        </div>
    )
}

export default SendNotificationButton;