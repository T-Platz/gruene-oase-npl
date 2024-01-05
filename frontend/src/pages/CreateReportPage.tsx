import { HelpCenterSharp, ReportProblemSharp, ThumbUpSharp } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BallLoader from "../components/loaders/BallLoader";
import ROUTES from "../Routes";
import { notificationTypes } from "../utils/Common";
import NotificationCard from "../components/cards/NotificationCard";
import { useWindowDimensions } from "react-native";
import SendNotificationButton from "../components/buttons/SendNotificationButton";
import api from "../utils/ApiService";

function CreateReportPage() {
    const [isFullyLoaded, setFullyLoaded] = useState<boolean>(false);
    const [gardenExists, setGardenExists] = useState<boolean>(false);
    const [reportCreated, setReportCreated] = useState<boolean>(false);
    const [selectedNotification, setSelectedNotification] = useState<number>(-1);
    const [message, setMessage] = useState<string>("");

    const { lotNr } = useParams();
    const navigate = useNavigate();
    const {height, width} = useWindowDimensions();

    useEffect(() => {
        if(!isFullyLoaded) {
            setGardenExists(true);
            setFullyLoaded(true);
        }
    }, [lotNr])

    const createReport = async () => {
        const report = {lotNr: lotNr, category: notificationTypes[selectedNotification], description: message};
        api.post('report', {
            body: JSON.stringify(report),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        navigate(ROUTES.REPORTCREATED);
    }

    return (
        <>
        {isFullyLoaded? 
        <div className="flex flex-col">
            <div className="flex flex-row w-full justify-between items-center">
                <div className="flex flex-col pr-2">
                    <Typography variant={width >= 640 ? "h3": "h4"} color={gardenExists ? '#057038' : '#e55523'}>{gardenExists ? "Meldung erstellen" : "Meldung erstellen nicht möglich"}</Typography>
                    <div className="flex flex-row items-center">
                        {width < 640 ? <div/> : gardenExists ? <HelpCenterSharp sx={{color: '#97d045'}}/> : <ReportProblemSharp sx={{color: '#e55523'}}/>}
                        <Typography variant={width >= 640 ? "h6": "body1"} sx={{color: gardenExists ? '#97d045' : '#e55523', paddingLeft:  width >= 640 ? '8px' : null}}>{gardenExists? 'Teilen Sie die Probleme mit diesem Garten mit oder geben Sie Tipps!' : 'Dieser Garten existert nicht.'}</Typography>
                    </div>
                </div>
                <SendNotificationButton smallScreen={width < 640} disabled={selectedNotification === -1} onClick={() => {createReport();}}/>
            </div>
            <div className="mt-8 mb-8">
                {notificationTypes.map((element, index) => {
                    return (
                        <NotificationCard key={index} type={element} index={index} selected={selectedNotification} setSelected={setSelectedNotification} message={message} setMessage={setMessage}/>
                    )
                })}
            </div>
        </div> : <BallLoader/>}
        </>
    );
}

export default CreateReportPage;