import { Box, Card, CardContent, TextField, Typography } from "@mui/material";
import { descriptionMap, iconMap, textMap } from "../../utils/Common";

interface NotificationCardProps {
    type: string, 
    selected: number, 
    index: number,
    setSelected: (index: number) => void,
    message: string,
    setMessage: (message: string) => void
}

function NotificationCard (props: NotificationCardProps) {
    const isSelected = props.index === props.selected;

    return (
        <Box 
            sx={{
                marginLeft: 3,
                marginRight: 3, 
                marginBottom: 1.5,
            }}
        >
            <Card 
                sx={{
                    paddingY: 0.5,
                    paddingX: 1.5,
                    backgroundImage: isSelected ? 'linear-gradient(135deg, #97d045, #F5F5F5)' : null,
                    transition: 'transform 0.15s ease-in-out',
                    cursor: 'pointer',
                    border: isSelected ? 2 : null,
                    borderColor: '#057038',
                    '&:hover': {
                        transform: 'scale(1.02)'
                    },
                    transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                }}
                onClick={() => {props.setSelected(isSelected ? -1 : props.index);}}
            >
                <CardContent>
                    <div className="flex flex-col">
                        <div className="flex flex-row justify-start items-center">
                            <div>{iconMap.get(props.type)}</div>
                            <div className="flex flex-col px-4">
                                <Typography variant="h6">{textMap.get(props.type)}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {descriptionMap.get(props.type)}
                                </Typography>
                            </div>
                        </div>
                        {props.type === "Custom" ? 
                            <div className="w-full mt-4">
                            <TextField
                                fullWidth
                                sx={{
                                    '& label.Mui-focused': {
                                    color: '#057038', // Change color of the label on focus
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'grey', // Default border color
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'grey', // Border color on hover
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#057038', // Border color on focus
                                        },
                                    },
                                    backgroundColor: 'white',
                                    margin: 1
                                }}
                                label="Schreiben Sie hier Ihre Nachricht"
                                value={props.message}
                                multiline
                                variant="outlined"
                                onClick={(event) => {if(isSelected) { event.stopPropagation();}}}
                                onChange={(event) => {props.setMessage(event.target.value);}}
                            />
                            </div>
                        : <div/>}
                    </div>
                </CardContent>
            </Card>
        </Box>
    )
}

export default NotificationCard;