import { Check, ReportProblemSharp } from "@mui/icons-material";
import { Typography } from "@mui/material";

interface AllNotificationsProps{
    number: number
}

function AllNotifications(props: AllNotificationsProps) {
    return(
        <div className="flex flex-row items-center">
            {props.number === 0 ? <Check sx={{color: '#97d045'}}/> : <ReportProblemSharp sx={{color: '#e55523'}}/>}
            <Typography variant="h6" sx={{paddingLeft: '8px', color: props.number === 0 ? '#97d045' :  '#e55523'}}>
                {
                    props.number <= 0 ? 'Mit deinen Gärten ist alles in Ordnung!' :
                    props.number === 1 ? '1 neue Meldung!' :
                    `${props.number} neue Meldungen`
                }
            </Typography>
        </div>
    );
}

export default AllNotifications;