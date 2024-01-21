import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import { formatDate, CommunityGarden } from '../../utils/Common';
import ReportsList from '../lists/ReportsList';
import { Report } from '../../utils/Types';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useState } from 'react';
import api from '../../utils/ApiService';
import BallLoader from '../loaders/BallLoader';

const GrueneOaseSign = () => {
    return (
        <img className='object-cover h-20' src='/images/Sign.png'></img>
    );
}

interface GardenCardProps {
    lotNr: number,
    name: string,
    reports?: Report[],
    garden?: CommunityGarden,
    date: Date,
    issues: number,
    getReports: (lotNr: number) => Promise<void>,
    viewReports: (lotNr: number) => void,
    openMessage: (garden: string, message: string) => void
}

function GardenCard(props: GardenCardProps) {
    const user = useSelector((state: RootState) => state.user);
    const [fetchingSign, setFetchingSign] = useState<boolean>(false);

    const fetchSign = async (lotNr: number) => {
        setFetchingSign(true);
        let response;
        try {
            response = await api.get(`lot/sign?lotNr=${lotNr}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json'
                },
            });
        } catch (e) {
            alert('Das hat leider nicht geklappt.');
            return;
        } finally {
            setFetchingSign(false);
        }
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
    };

    return (
        <Box>
            <Card sx={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column',}} raised={true}>
                <CardContent>
                    <Typography sx={{display: '-webkit-box', overflow: 'hidden', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2}} variant='h5' component='div'>
                        {props.name}
                    </Typography>
                    <Typography sx={{display: '-webkit-box', overflow: 'hidden', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2}} variant='h6' component='div' color='text.secondary'>
                        {`#${props.lotNr.toString().padStart(4, '0')}`}
                    </Typography>
                    <Typography sx={{ mb: 1.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} color='text.secondary'>
                        {props.garden || '\u00A0'}
                    </Typography>
                    <Divider sx={{marginBottom: 1.5}}/>
                    <Typography sx={{ mb: 1.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} color='text.secondary'>
                        {`Hinzugefügt am: ${formatDate(props.date)}`}
                    </Typography>
                    <Divider sx={{marginBottom: 1.5}}/>
                    <ReportsList garden={props.name} issues={props.issues} lotNr={props.lotNr} reports={props.reports} openMessage={props.openMessage} getReports={props.getReports} viewReports={props.viewReports}/>
                </CardContent>
                <CardActions sx={{width: 'full', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Button onClick={() => { fetchSign(props.lotNr) }} disabled={fetchingSign} className='flex flex-col items-center cursor-pointer'>
                        { fetchingSign ? <BallLoader/> : <GrueneOaseSign/> }
                        <Typography color='#057038' style={{ marginTop: '10px' }}>Schild Herunterladen</Typography>
                    </Button>
                </CardActions>
            </Card>
        </Box>
    )
}

export default GardenCard;