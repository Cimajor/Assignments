import React, {useState} from 'react';
import {getAllSatellites} from '../../services/Api/calls'
import './AssignmentTwo.css'


const AssignmentTwo = () => {
    const [satellitesData, setSatellitesData] = useState("")
    const [startDateToFilter, setStartDateToFilter] = useState("")
    const [endDateToFilter, setEndDateToFilter] = useState("")
    
    const ClickHandler = () => {
        setSatellitesData("")
        getAllSatellites()
        .then(res => setSatellitesData(SatellitesFiltering(SatellitesDataTransformer(res.data))))
        .catch(err => console.log(err))
    }

    const SatellitesFiltering = (formatedSatellitesData) => {
        let filteredArray = formatedSatellitesData.filter( satellit => {
            return (satellit.spaceTrack.LAUNCH_DATE >= (new Date(startDateToFilter.toString()).getTime()) && satellit.spaceTrack.LAUNCH_DATE <= (new Date(endDateToFilter.toString()).getTime()))
        })
        return filteredArray
    }


    const SatellitesDataTransformer = (date) => {
        date.map(date => {
            date.spaceTrack.LAUNCH_DATE = new Date(date.spaceTrack.LAUNCH_DATE.toString()).getTime()
        })
        return date
    }
    
  return (
    <div>
        <h1>Method 2</h1>
        <p>Please input start and end date in the following format 'mm-dd-yyyy'</p>
        <p>Start Date To filter</p>
        <input type="text" data-testid='start-date' name="start-date" onChange={e => {setStartDateToFilter(e.currentTarget.value)}}/>
        <p>End Date To filter</p>
        <input type="text" data-testid='end-date' name="year" onChange={e => {setEndDateToFilter(e.currentTarget.value)}}/>
        <div>
            <button id="filter" onClick={ClickHandler}>satellites</button>
        </div>
            {satellitesData ? satellitesData.map(satellit => (<p key={satellit.id}>{satellit.spaceTrack.OBJECT_NAME}</p>)) : ""}
    </div>
  );
}

export default AssignmentTwo;
