import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from "@mui/material"
import { formatDate } from "../../utils/Common"
import ROUTES from "../../Routes"
import { useNavigate } from "react-router-dom";
import goSign from "../assets/images/GoSign.png";
import ReportsList from "../lists/ReportsList";
import { Report } from "../../utils/Types";

const GreenOasisSign = () => {
    return (
        <img className="object-cover h-20" src={goSign}>
        </img>
    )
}

interface GardenCardProps {
    lotNr: number,
    name: string,
    reports?: Report[],
    gardenName?: string,
    date: Date,
    issues: number,
    getReports: (lotNr: number) => Promise<void>,
    viewReports: (lotNr: number) => void,
    openMessage: (garden: string, message: string) => void
}

function GardenCard(props: GardenCardProps) {
    const navigate = useNavigate();

    return (
        <Box>
            <Card sx={{display: "flex", justifyContent: "space-between", flexDirection: "column",}} raised={true}>
                <CardContent>
                    <Typography sx={{display: '-webkit-box', overflow: 'hidden', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2}} variant="h5" component="div">
                        {props.name}
                    </Typography>
                    <Typography sx={{display: '-webkit-box', overflow: 'hidden', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2}} variant="h6" component="div" color="text.secondary">
                        {`#${props.lotNr.toString().padStart(4, '0')}`}
                    </Typography>
                    <Typography sx={{ mb: 1.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} color="text.secondary">
                        {props.gardenName || '\u00A0'}
                    </Typography>
                    <Divider sx={{marginBottom: 1.5}}/>
                    <Typography sx={{ mb: 1.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} color="text.secondary">
                        {`Hinzugefügt am: ${formatDate(props.date)}`}
                    </Typography>
                    <Divider sx={{marginBottom: 1.5}}/>
                    <ReportsList garden={props.name} issues={props.issues} lotNr={props.lotNr} reports={props.reports} openMessage={props.openMessage} getReports={props.getReports} viewReports={props.viewReports}/>
                </CardContent>
                <CardActions sx={{width: 'full', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <div onClick={() => { navigate(`${ROUTES.GARDEN}${props.lotNr}`); }} className="flex flex-col items-center cursor-pointer">
                        <GreenOasisSign/>
                        <Button size="small">Schild anzeigen</Button>
                    </div>
                </CardActions>
            </Card>
        </Box>
    )
}

export default GardenCard;