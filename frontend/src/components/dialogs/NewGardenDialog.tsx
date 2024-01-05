import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Divider, Select, MenuItem, FormControl, InputLabel, Typography } from '@mui/material';
import api from '../../utils/ApiService';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import BallLoader from '../loaders/BallLoader';

interface CommunityGarden {
    _id: string,
    name: string
}

interface NewGardenDialogProps {
  open: boolean;
  handleClose: () => void;
  handleConfirm: (name: string, gardenId: string) => void;
}

interface GardensResponse {
    gardens: CommunityGarden[]
  }



const NewGardenDialog: React.FC<NewGardenDialogProps> = ({ open, handleClose, handleConfirm }) => {
  const [gardenName, setGardenName] = useState('');
  const [communityGarden, setCommunityGarden] = useState('');
  const [communityGardens, setCommunityGardens] = useState<CommunityGarden[]>([]);
  const [communityGardensLoaded, setCommunityGardensLoaded] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.user);

  const disabled = gardenName.length > 0 && gardenName.length < 5;

  useEffect(() => {
    api.get('lot/gardens', {
        headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json'
        }
    }).then(response => {
        response.json().then(json => {
            setCommunityGardens((json as GardensResponse).gardens); 
            setCommunityGardensLoaded(true); 
            console.log(json);
        })
    });
  }, []);

  return (
    <Dialog sx={{
        '& .MuiDialog-paper': {
            width: '100%', // Full width on smaller screens
            maxWidth: { 
              xs: '96%', // Nearly full width on extra small screens
              sm: '70%', // 70% width on small screens
              md: '50%', // Half width on medium screens
              lg: '33%', // One third width on larger screens
            },
          },
    }} open={open} onClose={handleClose}>
      <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center' }}>
        <Typography variant='h5' sx={{color: '#057038'}}>Neuen Garten anlegen</Typography>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <TextField
          autoFocus
          FormHelperTextProps={{ sx: { minHeight: '1.5em' } }} // Reserve space for helper text
          margin="dense"
          id="garden-name"
          label="Name des Gartens"
          type="text"
          variant="outlined"
          fullWidth
          value={gardenName}
          onChange={(e) => setGardenName(e.target.value)}
          error={disabled}
          helperText={disabled ? "Name muss mindestens 5 Buchstaben haben" : ""}
          sx= {{
            width: '100%', // Ensuring consistent width
            '& .MuiFormHelperText-root': {
                minHeight: '1.5em', // Reserve space for helper text
            },
            '& label.Mui-focused': {
            color: '#057038', // Change color of the label on focus
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: 'grey', // Default border color
                },
                '&:hover fieldset': {
                    borderColor: 'grey', // Border color on hover
                },
                '&.Mui-focused fieldset': {
                    borderColor: '#057038', // Border color on focus
                },
            },
            backgroundColor: 'white',
            marginBottom: 2
        }}
        />
        {communityGardensLoaded? 
        <FormControl fullWidth margin="dense" variant="outlined">
          <InputLabel
            id="community-garden-label"
            sx={{
            color: 'grey',
            '&.Mui-focused': {
                color: 'green',
            }
            }}
          >
            Gemeinschaftsgarten
          </InputLabel>
          <Select
            labelId="community-garden-label"
            id="community-garden-select"
            value={communityGarden}
            label="Community Garden"
            onChange={(e) => setCommunityGarden(e.target.value as string)}
            sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'grey',
                  },
                  '&:hover fieldset': {
                    borderColor: 'grey',
                  },
                  '& .Mui-focused fieldset': {
                    borderColor: '#057038',
                  },
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#057038', // Maintain focus color on click
                  },
              }}
          >
            <MenuItem value="">-</MenuItem>
            {communityGardens.map((element, index) => {
                return <MenuItem key={index} value={element._id}>{element.name}</MenuItem>;
            })}
          </Select>
        </FormControl> : <BallLoader/>}
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', marginBottom: 2 }}>
        <Button 
            onClick={handleClose} variant="outlined" 
            sx={{ 
                color: '#057038', borderColor: '#057038', borderRadius: '20px', 
                "&:hover": {borderColor: '#057038'} 
            }}>
            Abbrechen
        </Button>
        <Button 
            onClick={() => {handleConfirm(gardenName, communityGarden)}} variant="contained" disabled={disabled}
            sx={{ 
                borderRadius: '20px', ml: 2, bgcolor: 'green',
                backgroundImage: disabled? null : 'linear-gradient(135deg, #97d045, #057038)',
                boxShadow: disabled ? null :  '0px 4px 10px rgba(0, 0, 0, 0.25)',
                backgroundColor: disabled ? '#c7c7c7' : null,
                transition: 'transform 0.5s ease-in-out',  
                cursor: disabled ? 'default' : 'pointer',
                "&:hover": {transform: disabled? 'none' : 'scale(1.05)'} 
            }}>
          Bestätigen
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewGardenDialog;