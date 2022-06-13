import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import { useNavigate  } from "react-router-dom";
import axios from "axios";

function CreateComment(props){

    const navigate = useNavigate();
    const [note, setNote] = useState("");

    function handleChange(event) {
        const { value } = event.target;
        setNote(value);
    }

    async function submitComment(event) {
        if(note === ""){
            alert("Please write Your commment");
        } else {
            const content = note;
            await axios.post(`/backend/posts/${props.id}/comment`, {
                id: props.id,
                content: content
            });
            props.handleAfterSub();
            navigate(`/posts/${props.id}`);
        }
        event.preventDefault();
    }

    return(
        <div className="create-comment-main">
           <form className="create-comment align-items-center justify-content-around d-flex">
              <textarea
                  className="d-flex"
                  name="content"
                  onChange={handleChange}
                  value={note}
                  placeholder="Writte a comment..."
                  rows={4}
              />
                  <Fab onClick={submitComment}>
                      <AddIcon />
                  </Fab>
      </form> 
        </div>
    )
}

export default CreateComment;