import { Box, Button, Typography } from '@mui/material';
import { ReactElement } from 'react';

interface GrueneOaseButtonProps {
    text: string,
    icon: ReactElement,
    disabled: boolean,
    onClick: () => void
}

function GrueneOaseButton (props: GrueneOaseButtonProps) {
    return (
        <Button
            disabled={props.disabled}
            onClick={props.onClick}
            sx={{
                cursor: props.disabled ? 'default' : 'pointer',
                borderRadius: '20px',
                paddingY: 1,
                paddingX: 3,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
                backgroundImage: props.disabled? null : 'linear-gradient(135deg, #97d045, #057038)',
                boxShadow: props.disabled ? null :  '0px 4px 10px rgba(0, 0, 0, 0.25)',
                backgroundColor: props.disabled ? '#c7c7c7' : null,
                transition: 'transform 0.5s ease-in-out',  
                '&:hover': {transform: props.disabled? 'none' : 'scale(1.1)'}
            }}>
            <Box sx={{padding: '6px', backgroundColor: 'white', borderRadius: '50%', // Gives the button rounded corners
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',}}>
            {props.icon}
            </Box>
            <Typography color={props.disabled ? 'text.secondary' : 'white'} variant='h6' sx={{textTransform: 'none'}}>{props.text}</Typography>
        </Button>
    );
}

export default GrueneOaseButton;