import { HelpCenterSharp, ReportProblemSharp, SendSharp } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BallLoader from '../components/loaders/BallLoader';
import ROUTES from '../Routes';
import { ReportCategory } from '../utils/Common';
import NotificationCard from '../components/cards/NotificationCard';
import { useWindowDimensions } from 'react-native';
import api from '../utils/ApiService';
import GrueneOaseButton from '../components/buttons/GrueneOaseButton';

function CreateReportPage() {
    const [isFullyLoaded, setFullyLoaded] = useState<boolean>(false);
    const [gardenExists, setGardenExists] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<ReportCategory | null>(null);
    const [message, setMessage] = useState<string>('');

    const { lotNr } = useParams();
    const navigate = useNavigate();
    const {height, width} = useWindowDimensions();

    useEffect(() => {
        if(!isFullyLoaded) {
            setGardenExists(true);
            setFullyLoaded(true);
        }
    }, [lotNr]);

    const createReport = async () => {
        const report = {lotNr: lotNr, category: selectedCategory, description: message};
        api.post('report', {
            body: JSON.stringify(report),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        navigate(ROUTES.REPORTCREATED);
    };

    const disabled = selectedCategory === null || (selectedCategory === ReportCategory.MESSAGE && message === '');

    return (
        <>
        {isFullyLoaded? 
        <div className='flex flex-col'>
            <div className='flex flex-row w-full justify-between items-center'>
                <div className='flex flex-col pr-2'>
                    <Typography variant={width >= 640 ? 'h3': 'h4'} color={gardenExists ? '#057038' : '#e55523'}>{gardenExists ? 'Meldung erstellen' : 'Meldung erstellen nicht möglich'}</Typography>
                    <div className='flex flex-row items-center'>
                        {width < 640 ? <div/> : gardenExists ? <HelpCenterSharp sx={{color: '#97d045'}}/> : <ReportProblemSharp sx={{color: '#e55523'}}/>}
                        <Typography variant={width >= 640 ? 'h6': 'body1'} sx={{color: gardenExists ? '#97d045' : '#e55523', paddingLeft:  width >= 640 ? '8px' : null}}>{gardenExists? 'Teilen Sie die Probleme mit diesem Garten mit oder geben Sie Tipps!' : 'Dieser Garten existert nicht.'}</Typography>
                    </div>
                </div>
                <GrueneOaseButton disabled={disabled} onClick={() => {createReport();}} text='Senden' icon={<SendSharp sx={{ color: disabled ? '#c7c7c7' : '#057038' }} />}/>
            </div>
            <div className='mt-8 mb-8'>
                {Object.values(ReportCategory).map(category => {
                    return (
                        <NotificationCard category={category} isSelected={selectedCategory === category} setSelected={setSelectedCategory} message={message} setMessage={setMessage}/>
                    )
                })}
            </div>
        </div> : <BallLoader/>}
        </>
    );
}

export default CreateReportPage;