import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import { useNavigate  } from "react-router-dom";
import axios from "axios";

function CreatePost(){

  const navigate = useNavigate();
  const [note, setNote] = useState("");
  
  function handleChange(event) {
    const { value } = event.target;
    setNote(value);
  }

  async function submitNote(event) {
    if(note === ""){
        alert("Please write Your sercret");
      } else {
        const content = note;
        const response = await axios.post(`/backend/submit`, {
          content: content,
          dateOfCreation: new Date()
        });
        alert(`Successfully submitted, Your Story Id: ${response.data.express.id}`);
        navigate(`/`);
    }
    event.preventDefault();
  }

  return(
      <div className="main container create-post ">
            <form className="create-note align-items-center justify-content-around d-flex">
              <textarea
                  className="d-flex"
                  name="content"
                  onChange={handleChange}
                  value={note}
                  placeholder="Tell a secret..."
                  rows={8}
              />
                  <Fab onClick={submitNote}>
                      <AddIcon />
                  </Fab>
      </form>
      </div>
  )
}

export default CreatePost;