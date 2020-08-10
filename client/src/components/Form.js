import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '45ch',
    },
  },
}));

export default function Form(props) {
  const classes = useStyles();
  const [value, setValue] = useState('Controlled');
  const [ state, setState ] = useState({
      method: '', 
      name: '',
      email: '',
      body: ''
  })

  useEffect(() => {
      props.setEmailData(state)
  }, [state])

  const handleChange = (event) => {
 setState({...state, [event.target.id]: event.target.value})

  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="method-native-simple">Delivery?</InputLabel>
        <Select
          native
          value={state.method}
          onChange={handleChange}
          inputProps={{
            name: 'method',
            id: 'method',
          }}
        >
          <option aria-label="None" value="" />
          <option value={'Delivery'}>Delivery</option>
          <option value={'Pick-up'}>Pick-up</option>
        </Select>
      </FormControl>
      <TextField required id="name" label="Required" defaultValue="Name" onChange={handleChange} />
      <TextField required id="email" label="Required" defaultValue="Email" onChange={handleChange}/>
        <TextField
          id="body"
          label="Multiline"
          multiline
          rows={4}
          defaultValue="Description"
          variant="outlined"
          onChange={handleChange}
        />
      </div>
    </form>
  );
}