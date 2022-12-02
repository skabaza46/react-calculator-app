import { Fragment, useState, useRef } from 'react';

import './App.css';
import { Button, Input, InputLabel } from '@mui/material';
import { Card, CardContent, CardActions, CardHeader, Grid, Box} from '@mui/material';
import { Stack } from '@mui/system';
import Error from './Error';

const operationFormatter  = (operationType) =>{

  if ( operationType === 'add'){
    return ' + '
  }else if (operationType === 'multiply'){
    return ' x '
  }else if (operationType === 'subtract'){
    return ' - '
  }else if (operationType === 'divide'){
    return ' / '
  }
};

const isEmpty = (enteredNumber) => {

  if (enteredNumber === ' ' || enteredNumber === null){
    return true;
  };

  return false;

};


function App() {

  const inputNumberRef = useRef();

  const [ inputNumber, setInputNumber ] = useState(null);
  const [ error, setError ] = useState(null);

  const [ firstValueTemp, setFirstValueTemp ] = useState(null);
  const [ secondValueTemp, setSecondValueTemp ] = useState(null);

  const [ result, setResult ] = useState(null);

  const [ operation, setOperation ] = useState(null);


  const onInputHandler = (event) => {

    const enteredValue = event.target.value;

    if (enteredValue === ""){
      return;
    };

    setError(null);

    if (!firstValueTemp){
      setInputNumber(enteredValue);
    }else{
      setSecondValueTemp(enteredValue);
    }


  };

  const Add = () => {

    if ( isEmpty(inputNumber)){
      setError("Cannot add empty value")
      return;
    };

    setOperation('add')
    setFirstValueTemp(inputNumber);
    setSecondValueTemp(null);
    setInputNumber(null);
    inputNumberRef.current.value = null;

  };

  const Subtract = () => {
    if ( isEmpty(inputNumber)){
      setError("Cannot subtract empty value")
      return;
    };

    setOperation('subtract');
    setFirstValueTemp(inputNumber);
    setSecondValueTemp(null);
    setInputNumber(null);
    inputNumberRef.current.value = null;

  };

  const Multiply = () => {
    setOperation('multiply');
    if ( isEmpty(inputNumber)){
      setError("Cannot multiply empty value")
      return;
    };

    setFirstValueTemp(inputNumber);
    setSecondValueTemp(null);
    setInputNumber(null);
    inputNumberRef.current.value = null;

  };

  const Divide = () => {
    
    if (isEmpty(inputNumber)){
      setError("Cannot divide empty value")
      return;
    };

    setOperation('divide');
    setFirstValueTemp(inputNumber);
    setSecondValueTemp(null);
    setInputNumber(null);
    inputNumberRef.current.value = null;
    

  };


  const CalculateValues = () => {

    if (!firstValueTemp && !secondValueTemp){
      setError("Please enter numbers to run calculation!");
    };

    if (operation == 'add'){
      let result = (parseInt(firstValueTemp) + parseInt(secondValueTemp));
      setResult(result);

    } else if (operation === 'multiply'){
      let result = (parseInt(firstValueTemp) * parseInt(secondValueTemp));
      setResult(result);
      
    }else if (operation === 'divide'){
      let result = (parseInt(firstValueTemp) / parseInt(secondValueTemp));
      setResult(result);
      
    }else if (operation === 'subtract'){
      let result = (parseInt(firstValueTemp) - parseInt(secondValueTemp));
      setResult(result);
    }


    setInputNumber(null);
    inputNumberRef.current.value = null;
  };


  const ResetInput= () => {
    setInputNumber(null);
    setFirstValueTemp(null);
    setSecondValueTemp(null);
    setResult(null);
    setOperation(null);
    setError(null);
   
    
  };

  const ResetResult = () => {
    setResult(null);

  };

  const showCalculationButton = firstValueTemp && secondValueTemp;
  const showResetButton = firstValueTemp && secondValueTemp && result;

  const buttonMargin = {margin: 2 };

  const resetButton = (
    <Fragment>
      <Button variant="contained" sx={buttonMargin} onClick={ResetInput} color="error">Reset Input</Button>
    </Fragment>
  );

  const inputBox = (
    <Fragment>
      <InputLabel htmlFor="calculation">Enter Number </InputLabel> 
      <Input inputRef={inputNumberRef} id="calculation" type="number" onChange={onInputHandler}/>
    </Fragment>
  );

  
  const resultResetButton = (
    <Fragment>
      <Button variant="contained" sx={buttonMargin} onClick={ResetResult} color="error">Reset Result</Button>
    </Fragment>
  );


  return (<Fragment>
      
      <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '100vh' }}
    >
        <Card sx={{textAlign:'center',width: 1000 }}>
        {error && <Error messageType="error" message={error}/>}

          <CardHeader sx={{textAlign: "center"}} title="Simplest Working Calculator"/>
          <CardContent sx={{ minWidth: 50 }}>

          <strong>
            <p> {firstValueTemp? firstValueTemp : ''} {operation? operationFormatter(operation): ''} {secondValueTemp? secondValueTemp: ''} {result? ` = ${result}` : ''} </p>
          </strong>
        
          
          {showResetButton?  resetButton : inputBox}
          </CardContent>

          <CardActions sx={{textAlign:'center'}}>
          <Stack direction="row" spacing={3} >
          <Grid sx={{textAlign:'center', width: 1000 }} >
              <Button variant="outlined" sx={buttonMargin} onClick={Add}>Add</Button>
              <Button variant="outlined" sx={buttonMargin} onClick={Subtract}>Subtract</Button>
              <Button variant="outlined" sx={buttonMargin} onClick={Multiply}>Multiply</Button>
              <Button variant="outlined" sx={buttonMargin} onClick={Divide}>Divide</Button>
              {showCalculationButton? <Button variant="outlined" sx={buttonMargin} onClick={CalculateValues}>=</Button> : ''}
              {result && resultResetButton}
              </Grid>
          </Stack>
        </CardActions>
        </Card>
      </Grid>
    </Fragment>
  );
}

export default App;
