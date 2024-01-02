import { AddSharp, GrassSharp } from "@mui/icons-material";
import { Box, Card, Typography } from "@mui/material";

interface AddGardenButtonProps {
    onClick: () => void,
}

function AddGardenButton(props: AddGardenButtonProps) {
    return (
        <div onClick={() => {props.onClick();}}>
            <Card
                sx={{
                    cursor: 'pointer',
                    borderRadius: '20px', 
                    width: 140, 
                    height: 100, 
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
                    backgroundImage: 'linear-gradient(135deg, #97d045, #057038)',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)', 
                    transition: 'transform 0.5s ease-in-out, background-color 1.5s ease-in-out',  
                    "&:hover": {transform: 'scale(1.1)'}
                }}>
                <Box sx={{padding: '6px', backgroundColor: 'white', borderRadius: '50%', // Gives the button rounded corners
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',}}>
                    <AddSharp sx={{color: '#057038', fontSize: 40}}/>
                </Box>
                <Typography color='white' variant="h6">Hinzufügen</Typography>
            </Card>
        </div>
    )
}

export default AddGardenButton;