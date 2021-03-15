import React,{useState} from 'react'
import { TextField,Grid,Button,Menu,MenuItem } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles'
import {clientId,clientSecret} from '../keys/keys'
const Code = () => {
    
    const[code,setcode]=useState('')
    const[input,setinput]=useState('')
    const[output,setoutput]=useState('')
    const[language,setlanguage]=useState('cpp')
    const handleClick=()=>{
        
        var program = {
            script : code,
            stdin:input,
            language: language,
            versionIndex: "3",
            clientId: clientId,
            clientSecret:clientSecret
        };
        const requestOptions={
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(program)

        }
        


       
        fetch('https://api.jdoodle.com/v1/execute',requestOptions)
        .then((response)=>response.json())
        .then((data)=>{
        setoutput('\n'+ data.output)})
        .catch((err)=>console.log(err))
        
        
      
    }

    

    return (<div>

        <Grid container xs={12} sm={8}>
        <Grid>
        <Button variant="contained" onClick={handleClick}>Submit</Button>
        </Grid>
        <Grid>
        <Button variant="contained" onClick={(e)=>setlanguage('cpp14')}>C++ 14</Button>
        </Grid>
        <Grid>
        <Button variant="contained" onClick={(e)=>setlanguage('java')}>Java</Button>
        </Grid>
        <Grid spacing={2}>
        <Button variant="contained" onClick={(e)=>setlanguage('python3')}>Python 3</Button>
        </Grid>
        </Grid>
    
        
         <Grid container>
         
      <Grid conatiner xs={12}  sm={8}>
        <TextField
          fullWidth="true"
          multiline="true"
          rows="37"
          color="secondary"
          variant="outlined"
          label={language}
          onChange={(e)=>setcode(e.target.value)}
        />
       
      </Grid>
      <Grid conatiner xs={12} sm={4}>
       <Grid>
       <TextField
          fullWidth="true"
          multiline="true"
          rows="17"
          variant="filled"
          label="input"
          onChange={(e)=>setinput(e.target.value)}
        />
       
       </Grid>
       <Grid>
       <TextField
          fullWidth="true"
          multiline="true"
          rows="18"
          label="output"
          variant="filled"
          defaultValue={output}
          
        />
       
       </Grid>
      </Grid>
      </Grid>
      </div>
            
            
       
    )
}
export default Code