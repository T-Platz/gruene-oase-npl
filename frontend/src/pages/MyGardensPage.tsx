import { Typography } from "@mui/material";
import GardenCard from "../components/cards/GardenCard";
import AddGardenButton from "../components/buttons/AddGardenButton";
import AllNotifications from "../components/other/AllNotifications";
import { useEffect, useState } from "react";
import MessageDialog from "../components/dialogs/MessageDialog";
import { communityGardens, parcels } from "../utils/ExampleData";
import { useWindowDimensions } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Navigate } from "react-router-dom";
import ROUTES from "../Routes";
import NewGardenDialog from "../components/dialogs/NewGardenDialog";
import api from "../utils/ApiService";
import BallLoader from "../components/loaders/BallLoader";
import { IssuesResponse, Lot, ReportsResponse, User, UserResponse } from "../utils/Types";

function MyGardensPage() {
    // TODO: Check if user is authenticated
    const [messageDialogOpen, setMessageDialogOpen] = useState<boolean>(false);
    const [gardenDialogOpen, setGardenDialogOpen] = useState<boolean>(false);

    const [messageLot, setMessageLot] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [lotsLoaded, setLotsLoaded] = useState<boolean>(false);
    const [lots, setLots] = useState<Lot[]>([]);
    const [totalIssues, setTotalIssues] = useState<number>(0);

    const user = useSelector((state: RootState) => state.user);
    const { height, width } = useWindowDimensions();

    useEffect(() => {
        loadLots();
    }, []);

    const loadLots = async () => {
        const userResponse = await api.get('user', {
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json'
            },
        }).json() as UserResponse;
        const lots: Lot[] = userResponse.user.lots;
        let totalIssues = 0;
        for(const lot of lots) {
            const issuesResponse: IssuesResponse = await api.get(`lot/issues?lotNr=${lot.nr}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json'
                },
            }).json() as IssuesResponse;
            lot.issues = issuesResponse.issues;
            totalIssues += issuesResponse.issues;
        }
        setTotalIssues(totalIssues);
        setLots(lots.sort((a, b) =>  b.timestamp - a.timestamp ));
        setLotsLoaded(true);
    }

    const getReports = async (lotNr: number) => {
        const response = await api.get(`lot/reports?lotNr=${lotNr}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json'
            }
        }).json() as ReportsResponse;
        for(const lot of lots) {
            if(lot.nr === lotNr) {
                setTotalIssues(totalIssues - (lot.issues || 0));
            }
        }
        setLots(lots => lots.map(lot => lot.nr === lotNr ? { 
            ...lot, 
            reports: response.reports.sort((a, b) => b.timestamp - a.timestamp), 
            issues: 0
        } : lot)); 

        // Set viewed property of all reports to false
        api.post(`lot/view?lotNr=${lotNr}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json'
            }
        });
    }

    const viewReports = (lotNr: number) => {
        for(const lot of lots) {
            if(lot.nr === lotNr) {
                for(const report of lot.reports || []) {
                    if(! report.viewed) {
                        report.viewed = true;
                    }
                }
                setLots(lots => lots.map(l => l.nr === lotNr ? { 
                    ...l, 
                    reports: lot.reports, 
                } : l)); 
            }
        }
    }

    const openMessageDialog = (garden: string, message: string) => {
        setMessageDialogOpen(true);
        setMessage(message);
        setMessageLot(garden);
    }

    const closeMessageDialog = () => {
        setMessageDialogOpen(false);
        setMessage("");
        setMessageLot("");
    }

    const handleGardenConfirm = async (lotName: string, communityGardenId: string) => {

        const lot = { name: lotName, garden: communityGardenId === "" ? undefined : communityGardenId };
        const response = await api.post('lot', {
            body: JSON.stringify(lot),
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json'
            }
        });
        setGardenDialogOpen(false);
        setLotsLoaded(false);
        loadLots();
    }

    const closeGardenDialog = () => {
        setGardenDialogOpen(false);
    }

    // TODO: Function to get parcels, set notifications to seen...

    return (
        <>
        {user.token === "" ? <Navigate to={ROUTES.LANDING}/> :
        <>
        {lotsLoaded?
        <div className="flex flex-col">
            <div className="flex flex-row w-full justify-between items-center">
                <div className="flex flex-col">
                    <Typography variant={width >= 640 ? "h3": "h4"} color='#057038'>Meine Gärten</Typography>
                    <AllNotifications number={totalIssues}/>
                </div>
                <AddGardenButton onClick={() => {setGardenDialogOpen(true);}}/>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 sm:grid-cols-2 mt-8 mb-8">
                {lots.map((element, index) => {
                    return <GardenCard 
                        key={index} 
                        lotNr={element.nr} 
                        name={element.name} 
                        reports={element.reports} 
                        issues={element.issues || 0} 
                        date={new Date(element.timestamp)} 
                        gardenName={element.garden?.name} 
                        openMessage={openMessageDialog} 
                        getReports={getReports} 
                        viewReports={viewReports}
                    />
                })}
            </div>
        </div> : <BallLoader/>}
        <MessageDialog open={messageDialogOpen} lot={messageLot} message={message} onClose={closeMessageDialog}/>
        <NewGardenDialog open={gardenDialogOpen} handleClose={closeGardenDialog} handleConfirm={handleGardenConfirm}/>
        </>
        }
        </>
    );
}

export default MyGardensPage;