import React, { useRef } from 'react';
import { jsPDF } from "jspdf";
import QRCode from 'qrcode.react';
import { Typography } from '@mui/material';
import greenOasisLogoText from '../components/assets/images/GrüneOaseLogoText.png';
import ROUTES from '../Routes';
import { Navigate, useParams } from 'react-router-dom';
import DownloadPDFButton from '../components/buttons/DownloadPDFButton';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const SignPage: React.FC = () => {
  const componentRef = useRef<HTMLDivElement>(null);
  const { id } = useParams();
  const user = useSelector((state: RootState) => state.user);

  const GreenOasisLogo = () => {
    return (
        <img className="object-cover h-20" src={greenOasisLogoText}>
        </img>
    )
}

  const downloadPdf = () => {
    const pdf = new jsPDF({
      unit: "px",
      format: [595, 842]
    });

    if (componentRef.current) {
      pdf.html(componentRef.current, {
        callback: (doc) => {
          doc.save('myComponent.pdf');
        },
        x: 0,
        y: 0,
        html2canvas: { scale: 1 }
      });
    }
  };

  // TODO: check if user of garden is same as state

  return (
    <>
    {user.email === "" ? <Navigate to={ROUTES.LANDING}/> :
    <div className="flex flex-col justify-between items-center w-full mb-8">
      <div className="flex justify-center w-full items-center mb-4">
        <DownloadPDFButton onClick={downloadPdf}/>
      </div>
      <div ref={componentRef} className='flex flex-col justify-start items-center bg-white shadow-lg mx-auto' style={{ width: '595px', height: '840px' }}>
        <div className='flex justify-center w-full h-28 bg-goDark items-center'><GreenOasisLogo/></div>
        <Typography variant='h4' color='#057038' align='center' sx={{padding: 2}}>Ihre Meldung für einen blühenden Garten!</Typography>
        <Typography variant='body2' align='center' sx={{padding: 2, paddingTop: 0, paddingBottom: 4}}>Nutzen Sie den <strong>QR-Code</strong> oder wählen Sie die angezeigte <strong>Nummer</strong>, um <strong>Probleme</strong> zu melden, hilfreiche <strong>Tipps</strong> zu teilen oder dem Gärtner eine <strong>Nachricht</strong> zu senden.<br />Ihr Beitrag macht den Unterschied und hilft, unseren Garten gemeinsam zu verschönern!</Typography>
        <QRCode size={200} value={`http://localhost:3000${ROUTES.REPORT}${id}`} />
        <Typography variant='h5'  color='#057038' align='center' sx={{padding: 4}}>oder</Typography>
        <Typography variant='h4'><strong>089/8282189</strong></Typography>
        <Typography variant='h5' color='#424242'>{`(Garten:  ${id})`}</Typography>
        <div className="flex flex-1 bg-goDark w-full mt-12"/>
      </div>
    </div>}
    </>
  );
};

export default SignPage;