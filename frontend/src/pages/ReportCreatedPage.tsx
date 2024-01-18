import { ThumbUpSharp } from '@mui/icons-material';
import { Typography } from '@mui/material';

function ReportCreatedPage() {
    return (
        <div className='flex flex-col'>
            <div className='flex flex-row w-full justify-between items-center'>
                <div className='flex flex-col'>
                    <Typography variant='h3' color={'#057038'}>Meldung erstellt</Typography>
                    <div className='flex flex-row items-center'>
                        <ThumbUpSharp sx={{color: '#97d045'}}/>
                        <Typography variant='h6' sx={{color:'#97d045', paddingLeft: '8px'}}>Vielen Dank für Ihre Mithilfe!</Typography>
                    </div>
                </div>
                <div/>
            </div>
        </div>
    )
}

export default ReportCreatedPage;