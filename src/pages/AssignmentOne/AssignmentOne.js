import React, {useState, useEffect} from 'react';
import {getLaunch, getLaunchpad} from '../../services/Api/calls'
import './AssignmentOne.css'


const AssignmentOne = () => {
    const [launchpadId, setLaunchpadId] = useState("")
    const [launchPadName, setLaunchPadName] = useState("")

    const [failedLaunches, setFailedLaunches] = useState([])
    const [showError, setShowError] = useState(false)
    const [wrongId, setWrongId] = useState(false)

    let result ={
        launchpad: launchPadName,
        all_failures: failedLaunches
    }
    const GetFailedLaunches = (launches) => {
        launches.map(launch => {
            getLaunch(launch)
            .then(res => {
                if(res.data.success === false){
                    let failurDescriptions = []
                    res.data.failures.map(reason => {
                        failurDescriptions.push(reason.reason)
                    })
                    let failurData = {name: res.data.name, failures: failurDescriptions}
                    setFailedLaunches(oldArrey => [...oldArrey, failurData])
                }
            })
            .catch(err => console.log(err))
        })
    }

     const ClickHandler = () => {
        launchpadId ? 
        getLaunchpad(launchpadId)
        .then(res => {
            setLaunchPadName(res.data.name)
            if(res.data.launch_attempts !== res.data.launch_successes){
                GetFailedLaunches(res.data.launches)
            }
        })
        .catch(err => setWrongId(true)) : setShowError(true)
    }

  return (
    <div>
        <h1>Method 1</h1>
        <p>Please input correct launchpad id like "5e9e4502f5090995de566f86" and press search button to display information about all dailed launches</p>
        <input type="text" name="launchpad" data-testid="search-input" onChange={e => {setWrongId(false);setShowError(false);setLaunchpadId(e.currentTarget.value)}}></input>
        <button data-testid='search' id="search" onClick={ClickHandler}>Search</button>
        {wrongId ? <p>Please input correct ID</p> : ""}
        {showError ? <p>Please input correct value</p> : ""}
        {(launchPadName.length > 0 || failedLaunches.length > 0)? <p>{JSON.stringify(result)}</p> : ""}
    </div>
  );
}

export default AssignmentOne;
