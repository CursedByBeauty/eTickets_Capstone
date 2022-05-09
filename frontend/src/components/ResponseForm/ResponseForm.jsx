import React, { useState,useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import DisplayWorkorders from "../DisplayWorkorders/DisplayWorkorders";
const ResponseForm = (props) => {
  // Token hook
  const [user, token] = useAuth();
  //   :ticketId param from the route
  const { ticketId } = useParams();
  //   the 4 fields needed to create a new response. Look at the postman create a response body
  const [date, setDate] = useState("");
  const [worker, setWorker] = useState("");
  const [solution, setSolution] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  // VARIABLE WHERE THE CURRENT WORKORDER WILL BE SET 
  const [currentWorkorder, setCurrentWorkorder] = useState([])

useEffect(() => {
  // ON MOUNTING CALLING THE FUNCTION TO GET THE CURRENT WORKORDER SO IT CAN DISPLAY THE MINUTE I OPEN THE RESPONSE PAGE
  getWorkorderById(ticketId)
},[])
// getting the CURRENT WORKORDER BY THE ID WHICH IS THE TICKETID
  async function getWorkorderById(pk) {
    try {
      let response = await axios.get(`http://127.0.0.1:8000/api/workorders/${pk}/`,{
        headers: {
          Authorization: "Bearer " + token
        }
      })
      // Setting the current workorder to equal the current ticket we clicked
      setCurrentWorkorder([response.data])
    }
    catch (error) {
      console.log(error.message)
    }
  }
  async function addResponse(workerResponse) {
    //   Calling the url used to create a new response and adding the new response which is workerResponse
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/responses/",
        workerResponse,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      alert("Response has been submitted successfully");
    } catch (error) {
      console.log(workerResponse);
      alert("Invalid entry try again")
      console.log(error.message);
    }
  }




// Call the PATCH REQUEST to update the status in the workorder table
  async function updateStatus(newStatus, pk) {
    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/workorders/${pk}/status/`,
        newStatus);
      alert("Status has been updated")
      navigate("/maintenance");
    } catch (error) {
      console.log(newStatus);
      alert("Invalid entry try again")
      console.log(error.message);
    }
  }



  function handleClick(event) {
    event.preventDefault();
    // Provided the body for the POST request to create a new Response
    let newResponse = {
      worker: worker,
      date: date,
      comments: solution,
      workorder_id: parseInt(ticketId),
    };
    // Provided the body for the PATCH request to update status
    let currentStatus = {
      status: status
    }
    // Providing the arguments for the Add response function and calling 
    addResponse(newResponse);
    // Providing the arguments for the update Status function and calling
    updateStatus(currentStatus, parseInt(ticketId))
    // Setting values back to their initial state which is empty
    setDate("");
    setWorker("");
    setSolution("");
    setStatus("");
  }


  return (
    <div>
      <form onSubmit={handleClick}>
        <label>Worker</label>
        <input
          value={worker}
          onChange={(event) => setWorker(event.target.value)}
        />
        <label>Date Completed</label>
        <input
          placeholder="yyyy-mm-dd"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
        <label>Comment</label>
        <input
          value={solution}
          onChange={(event) => setSolution(event.target.value)}
        />
        <label>Status</label>
        <input
          placeholder="C: Complete, H: Hold"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <div>
      {/* REDEFINING THE CURRENT VALUE OF TICKETS TO EQUAL THE CURRENT TICKET */}
        <DisplayWorkorders tickets = {currentWorkorder}/>
      </div>
    </div>
  );
};

export default ResponseForm;
