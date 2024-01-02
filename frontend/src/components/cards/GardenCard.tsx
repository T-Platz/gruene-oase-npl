import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from "@mui/material"
import { formatDate } from "../../utils/Common"
import ROUTES from "../../Routes"
import { Link, useNavigate } from "react-router-dom";
import { renderToString } from "react-dom/server";
import goSign from "../assets/images/GoSign.png";
import ReportsList from "../lists/ReportsList";
import jsPDF from "jspdf";
import QRCode from "qrcode.react";


const GreenOasisSign = () => {
    return (
        <img className="object-cover h-20" src={goSign}>
        </img>
    )
}

interface GardenCardProps {
    id: number,
    name: string,
    reports: any,
    gardenName: string,
    date: string,
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
                        {`#${props.id}`}
                    </Typography>
                    <Typography sx={{ mb: 1.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} color="text.secondary">
                        {props.gardenName}
                    </Typography>
                    <Divider sx={{marginBottom: 1.5}}/>
                    <Typography sx={{ mb: 1.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} color="text.secondary">
                        {`Hinzugefügt am: ${formatDate(props.date)}`}
                    </Typography>
                    <Divider sx={{marginBottom: 1.5}}/>
                    <ReportsList garden={props.name} reports={props.reports} openMessage={props.openMessage} />
                </CardContent>
                <CardActions sx={{width: 'full', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <div onClick={() => { navigate(`${ROUTES.GARDEN}${props.id}`); }} className="flex flex-col items-center cursor-pointer">
                        <GreenOasisSign/>
                        <Button size="small">Schild anzeigen</Button>
                    </div>
                </CardActions>
            </Card>
        </Box>
    )
}

export default GardenCard;