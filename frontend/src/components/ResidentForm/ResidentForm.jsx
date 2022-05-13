import axios from "axios";
import React, { useState } from "react";
import "./ResidentForm.css";

const ResidentForm = (props) => {
  const [unit, setUnit] = useState("");
  const [subject, setSubject] = useState("");
  const [comment, setComment] = useState("");
  const [entry, setEntry] = useState("");
  const [priority, setPriority] = useState("");

  function handleClick(event) {
    event.preventDefault();
    let newTicket = {
      resident: props.user.username,
      unit: parseInt(unit),
      subject: subject,
      comments: comment,
      entry: entry,
      priority: priority,
    };
    console.log(newTicket);
    addTicket(newTicket);
    setUnit("");
    setSubject("");
    setComment("");
    setEntry("");
    setPriority("");
  }

  async function addTicket(workorder) {
    try {
      await axios.post("http://127.0.0.1:8000/api/workorders/", workorder, {
        headers: {
          Authorization: "Bearer " + props.token,
        },
      });

      alert(
        "Thank you for filling out your request! You should get an email with any updates."
      );
      props.getAllTickets();
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div>
      <div className="col-lg-12 text-center">
        <form onSubmit={handleClick}>
          <div className="input-group input-group-sm mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                Unit
              </span>
              <input
                style={{ width: "17rem" }}
                value={unit}
                onChange={(event) => setUnit(event.target.value)}
              />
            </div>
          </div>
          <div className="input-group input-group-sm mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                Subject
              </span>
              <input
                style={{ width: "17rem" }}
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
              />
            </div>
          </div>
          <div className="input-group input-group-sm mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                Comment
              </span>
              <input
                style={{ width: "17rem" }}
                value={comment}
                onChange={(event) => setComment(event.target.value)}
              />
            </div>
          </div>
          <div className="input-group input-group-sm mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                Permission to Enter
              </span>
              <div className="input-group">
                <select
                  style={{ width: "17rem" }}
                  className="custom-select"
                  id="inputGroupSelect04"
                  onChange={(event) => setEntry(event.target.value)}
                >
                  <option value="default">Choose Here</option>
                  <option value="Call">Call</option>
                  <option value="Enter">Enter</option>
                </select>
              </div>
            </div>
          </div>
          <div className="input-group input-group-sm mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                Priority
              </span>
              <div className="input-group">
                <select
                  style={{ width: "17rem" }}
                  className="custom-select"
                  id="inputGroupSelect04"
                  onChange={(event) => setPriority(event.target.value)}
                >
                  <option value="default">Choose Here</option>
                  <option value="H">High</option>
                  <option value="M">Medium</option>
                  <option value="L">Low</option>
                </select>
              </div>
            </div>
          </div>
          <button>Submit Ticket</button>
        </form>
      </div>
    </div>
  );
};

export default ResidentForm;
