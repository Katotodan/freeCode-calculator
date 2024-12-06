import './App.css';
import React, {useState} from 'react';



function App() {
  const [result, setResult] = useState(0)
  const [calculatedString, setCalculatedString] = useState("")
  const [isOperatorOff, setIsOperatorOff] = useState(true)
  const [isFirstTime, setIsFirstTime] = useState(true)
  const [lastNumber, setLastNumber] = useState("")
  const [clearNext, setClearNext] = useState(false)

  const [temp, setTemp] = useState("")

  const clear = () =>{
    setResult(0)
    setCalculatedString("")
    setIsOperatorOff(true)
    setIsFirstTime(true)
    setLastNumber("")
  } 
  const add = (e) =>{
    if(isOperatorOff || clearNext){
      if(isFirstTime || clearNext){
        if(e.target.value === "."){
          setResult("0.")
          clearNext ? setCalculatedString("") : setCalculatedString("0.") 
        }else{
          setResult(e.target.value)
          clearNext ? setCalculatedString("") : setCalculatedString(calculatedString + e.target.value) 
        }
        
        setIsFirstTime(false)
        setClearNext(false)
      }else{
        if(e.target.value === "0"){
          if(result !== "0"){
            setResult(result +"" + e.target.value)
            setCalculatedString(calculatedString + e.target.value) 
          }
        }else{
          if(e.target.value !== "."){
            if(result === "0"){
              setResult(e.target.value)
              setCalculatedString(e.target.value) 
            }else{
              setResult(result +"" + e.target.value)
              setCalculatedString(calculatedString + e.target.value) 
            }
          }else{
            // Add decimal if not there
            if(!result.includes(".")){
              setResult(result +"" + e.target.value)
              setCalculatedString(calculatedString + e.target.value) 
            }
          }
        }
        
               
      }
    }else{
      if(e.target.value === "."){
        if(lastNumber === ""){
          setLastNumber("0.")
          setCalculatedString(temp + "0.")
          setResult("0.")
        }else{
          if(!lastNumber.includes(".")){
            setLastNumber(lastNumber + ".")
            setCalculatedString(temp + lastNumber + ".")
            setResult(lastNumber + ".")
          }
        }
      }else{
        
        if(e.target.value === "0"){
          if(lastNumber !== "0"){
            setLastNumber(lastNumber + e.target.value)
            setCalculatedString(temp + lastNumber + e.target.value)
            setResult(lastNumber + e.target.value)
          }
        }else{
          if(lastNumber === "0"){
            setLastNumber(e.target.value)
            setCalculatedString(temp + e.target.value)
            setResult(e.target.value)
          }else{
            setLastNumber(lastNumber + e.target.value)
            setCalculatedString(temp + lastNumber + e.target.value)
            setResult(lastNumber + e.target.value)
          }
          
          
        }
        
      }
      
    }
      
    
    

  }
  const subCalculate = (e) =>{
    
    if(isOperatorOff){
      setCalculatedString(result + e.target.value)
      setIsOperatorOff(false)
      setResult(e.target.value)
    }else{
      setCalculatedString(calculatedString + e.target.value)
      setResult(e.target.value)
    }
    setTemp(calculatedString + e.target.value)
    setLastNumber("")
    

  }
  const calculate = () =>{
    if(isOperatorOff){

    }else{
      if(!clearNext){
        const finalResult = eval(calculatedString)
        const roundedResult = finalResult % 1 !== 0 ? finalResult.toFixed(4) : finalResult
        setCalculatedString(calculatedString + "=" + roundedResult)
        setResult(roundedResult)
        setClearNext(true)
      }
      
    }
    
  }
  

  return (
    <div className='calculator-container'>
      <div className='result-displayer' id="display">
        <div className='operation'>{calculatedString}</div>
        <div className='result'>{result}</div>
      </div>

      <div className='btn-container'>
        <button id='clear' onClick={clear}>AC</button>
        <button id='divide' onClick={subCalculate} value="/">/</button>
        <button id='multiply' onClick={subCalculate} value="*">*</button>
        <button id='seven' onClick={add} value={7}>7</button>
        <button id='eight' onClick={add} value={8}>8</button>
        <button id='nine' onClick={add} value={9}>9</button>
        <button id='subtract' onClick={subCalculate} value="-">-</button>
        <button id='four' onClick={add} value={4}>4</button>
        <button id='five' onClick={add} value={5}>5</button>
        <button id='six' onClick={add} value={6}>6</button>
        <button id='add' onClick={subCalculate} value="+">+</button>
        <button id='one' onClick={add} value={1}>1</button>
        <button id='two' onClick={add} value={2}>2</button>
        <button id='three' onClick={add} value={3}>3</button>
        <button id="equals" onClick={calculate}>=</button>
        <button id='zero' onClick={add} value={0}>0</button>
        <button id='decimal' onClick={add} value={"."}>.</button>
      </div>
    </div>
    
  );
}

export default App;
