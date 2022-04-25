import React, {useState, useEffect, useContext} from 'react'
import { ContractContext } from '../../App';
import "./DisplayVoters.css";
export default function DisplayVoter(props) {
  console.log(props)
  const [voters, setVoters] = useState([]);
  const context = useContext(ContractContext);
  useEffect(() => {
/*======     let tmp = [];
    props.value.forEach((element, key) => {
      const bool = votedBackground(element.returnValues.voterAddress);
      console.log(bool);
      tmp.push(<div style={{backgroundColor: bool === true ? 'rgba(40, 167, 69, 0.5)' : 'rgba(220, 53, 69, 0.5)'}} key={key} className='voter'>{element.returnValues.voterAddress.slice(0,20)}...</div>)
    });
    setVoters(tmp); =======*/
  }, [])
  
  const votedBackground = async (address) => {
    const voter = await context.ContractVar.contract.methods.getVoter(address).call({from:context.ContractVar.accounts[0]});
    const status = context.status;
    console.log(status);
    console.log(voter);
    if(status == 3 || status ==4){
      if(voter.hasVoted){
        console.log('green')
       return true
      }
      else{
        console.log('red');
        return false
      }
    }
  }

  return (
    <div id="displayVoters">
      <p>Registered voters : </p>
      {  props.value.map((element, key) => (
        <div style={{backgroundColor: bool === true ? 'rgba(40, 167, 69, 0.5)' : 'rgba(220, 53, 69, 0.5)'}} key={key} className='voter'>{element.returnValues.voterAddress.slice(0,20)}...</div>
      ))}
    </div>
  )
}