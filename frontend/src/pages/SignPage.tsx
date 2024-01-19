import React, { useRef } from 'react';
import { jsPDF } from 'jspdf';
import QRCode from 'qrcode.react';
import { Typography } from '@mui/material';
import grueneOaseLogoText from '../components/assets/images/GrüneOaseLogoText.webp';
import ROUTES from '../Routes';
import { Navigate, useParams } from 'react-router-dom';
import DownloadPDFButton from '../components/buttons/DownloadPDFButton';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const SignPage: React.FC = () => {
  const componentRef = useRef<HTMLDivElement>(null);
  const { lotNr } = useParams();
  const user = useSelector((state: RootState) => state.user);

  const GrueneOaseLogo = () => {
    return (
        <img className='object-cover h-20' src={ grueneOaseLogoText } style={{ padding: '5px' }}></img>
    )
  }

  const downloadPdf = () => {
    const pdf = new jsPDF({
      unit: 'px',
      format: [200, 142]
    });

    if (componentRef.current) {
      pdf.html(componentRef.current, {
        callback: (doc) => {
          doc.save(`Schild Garten Nr ${lotNr?.toString().padStart(4, '0')}.pdf`);
        },
        x: 0,
        y: 0,
        html2canvas: { scale: 1 }
      });
    }
  };

  return (
    <>
    {user.token === '' ? <Navigate to={ROUTES.LANDING}/> :
    <div className='flex flex-col justify-between items-center w-full mb-8'>
      <div ref={componentRef} className='flex flex-col justify-start items-center bg-white shadow-lg mx-auto' style={{ width: '600px', height: '423px', position: 'relative' }}>
        <div className='flex justify-center w-full bg-goDark items-center'><GrueneOaseLogo/></div>
        <div className='w-full' style={{ paddingTop: '30px' }}>
          <div style={{ float: 'left', width: '50%' }}>
            <Typography variant='h5' color='#057038' align='center' sx={{ paddingTop: 8 }}>Ihre Meldung für einen blühenden Garten!</Typography>
          </div>
          <div className='justify-center' style={{ float: 'left', width: '50%' }}>
            <QRCode size={250} value={`http://gruene-oase-npl.de${ROUTES.REPORT}${lotNr}`} />
          </div>
        </div>
        <Typography variant='h4' style={{ position: 'absolute', bottom: '0' }}><strong>{`Garten: ${lotNr?.toString().padStart(4, '0')}`}</strong></Typography>
      </div>
      <div className='flex justify-center w-full items-center mb-4' style={{ paddingTop: '30px' }}>
        <DownloadPDFButton onClick={downloadPdf}/>
      </div>
    </div>}
    </>
  );
};

export default SignPage;