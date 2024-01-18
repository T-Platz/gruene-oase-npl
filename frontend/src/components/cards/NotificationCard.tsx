import { Box, Card, CardContent, TextField, Typography } from "@mui/material";
import { ReportCategory, descriptionMap, iconMap, textMap } from "../../utils/Common";

interface NotificationCardProps {
    category: ReportCategory, 
    isSelected: boolean,
    setSelected: (index: ReportCategory | null) => void,
    message: string,
    setMessage: (message: string) => void
}

function NotificationCard (props: NotificationCardProps) {
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
                    backgroundImage: props.isSelected ? 'linear-gradient(135deg, #97d045, #F5F5F5)' : null,
                    transition: 'transform 0.15s ease-in-out',
                    cursor: 'pointer',
                    border: props.isSelected ? 2 : null,
                    borderColor: '#057038',
                    '&:hover': {
                        transform: 'scale(1.02)'
                    },
                    transform: props.isSelected ? 'scale(1.02)' : 'scale(1)',
                }}
                onClick={() => {props.setSelected(props.isSelected ? null : props.category);}}
            >
                <CardContent>
                    <div className="flex flex-col">
                        <div className="flex flex-row justify-start items-center">
                            <div>{iconMap[props.category]}</div>
                            <div className="flex flex-col px-4">
                                <Typography variant="h6">{
                                    textMap[props.category]}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {descriptionMap[props.category]}
                                </Typography>
                            </div>
                        </div>
                        {props.category === ReportCategory.MESSAGE ? 
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
                                onClick={(event) => {if(props.isSelected) { event.stopPropagation();}}}
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