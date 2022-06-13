import React, { useEffect, useState } from "react";
import SingleComment from "./SingleComment";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";

function Comments(props){
    const {data} = props;

    const [listItems, setListItems] = useState([]);

    useEffect(()=>{
        if (data) setListItems(data);
    }, [data])


    async function handleLikeClick(id, type, btnActive, user, commentId){
        const { data } = await axios.patch(`/backend/posts/${props.id}/comment`,{
            id: id,
            type: type,
            commentId: commentId,
            btnActive: btnActive,
            user: user
        })
        return data;
    }

    return(
        <div className="comments-container">
            <ul>
                {listItems.map(item => <SingleComment key={uuidv4()} activity={item.activity} onLikeClick={handleLikeClick} user={props.user} data={item} id={props.id}/>)}
            </ul>
        </div>
    );
}
export default Comments;