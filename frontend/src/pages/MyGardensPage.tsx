import { Typography } from "@mui/material";
import GardenCard from "../components/cards/GardenCard";
import AddGardenButton from "../components/buttons/AddGardenButton";
import AllNotifications from "../components/other/AllNotifications";
import { useState } from "react";
import MessageDialog from "../components/dialogs/MessageDialog";
import { communityGardens, parcels } from "../utils/ExampleData";
import { useWindowDimensions } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Navigate } from "react-router-dom";
import ROUTES from "../Routes";
import NewGardenDialog from "../components/dialogs/NewGardenDialog";


function MyGardensPage() {
    // TODO: Check if user is authenticated
    const [messageDialogOpen, setMessageDialogOpen] = useState<boolean>(false);
    const [gardenDialogOpen, setGardenDialogOpen] = useState<boolean>(false);

    const [garden, setGarden] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const user = useSelector((state: RootState) => state.user);
    const { height, width } = useWindowDimensions();

    const testGardens = parcels;
    const testCommunityGardens = communityGardens;


    const getAllNotifications = () => {
        let numberOfNotifications = 0;
        for(const garden of testGardens) {
            for(const report of garden.reports) {
                if(! report.seen) {
                    numberOfNotifications++;
                }
            }
        }
        return numberOfNotifications;
    };

    const openMessageDialog = (garden: string, message: string) => {
        setMessageDialogOpen(true);
        setMessage(message);
        setGarden(garden);
    }

    const closeMessageDialog = () => {
        setMessageDialogOpen(false);
        setMessage("");
        setGarden("");
    }

    const handleGardenConfirm = (gardenName: string, communityGardenId: string) => {
        if(communityGardenId === "") {
            //...
        }
        setGardenDialogOpen(false);
    }

    const closeGardenDialog = () => {
        setGardenDialogOpen(false);
    }

    // TODO: Function to get parcels, set notifications to seen...

    return (
        <>
        {user.email === "" ? <Navigate to={ROUTES.LANDING}/> :
        <>
        <div className="flex flex-col">
            <div className="flex flex-row w-full justify-between items-center">
                <div className="flex flex-col">
                    <Typography variant={width >= 640 ? "h3": "h4"} color='#057038'>Meine Gärten</Typography>
                    <AllNotifications number={getAllNotifications()}/>
                </div>
                <AddGardenButton onClick={() => {setGardenDialogOpen(true);}}/>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 sm:grid-cols-2 mt-8 mb-8">
                {testGardens.map((element, index) => {
                    return <GardenCard key={index} id={element.id} name={element.name} reports={element.reports.sort((a, b) => {return new Date(a.date) < new Date(b.date) ? 1 : 0})} date={element.date} gardenName={element.garden.name} openMessage={openMessageDialog}/>
                })}
            </div>
        </div>
        <MessageDialog open={messageDialogOpen} garden={garden} message={message} onClose={closeMessageDialog}/>
        <NewGardenDialog open={gardenDialogOpen} handleClose={closeGardenDialog} handleConfirm={handleGardenConfirm} communityGardens={testCommunityGardens}/>
        </>
        }
        </>
    );
}

export default MyGardensPage;