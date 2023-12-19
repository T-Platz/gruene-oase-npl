import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import './App.css';
import Backend from './Api';

function App() {
  const [date, setDate] = useState<string>('');
  const [text, setText] = useState<string>('');

  return (
    <div className='App'>
      <Button
        variant='contained'
        className='w-full'
        onClick={() => Backend.getDate().then(date => setDate(date))}
      >Get Date</Button>
      <p>{date}</p>

      <form method='get'>
        <TextField
          label='Some Text'
          onChange={ (e) => setText(e.currentTarget.value) }
        />
        <Button
          variant='contained'
          className='w-full'
          onClick={() => Backend.echo(text)}
        >Submit</Button>
      </form>
    </div>
  );
}

export default App;
