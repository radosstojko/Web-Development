import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import  useFetch from "../../useFetch";
import Card from "../Card";
import Comments from "./Comments";
import CreateComment from "./CreateComment";

function SingleCard(props){

    const { id } = useParams();


    const {data, loading, error} = useFetch(`/backend/posts/${id}/${props.user}`);

    const [commentsHidding, setCommentsHidding] = useState(true);
    const [showCommentingArea, setShowCommentingArea] = useState();

    function handleClick(){

    }

    async function handleLikeClick(id, type, btnActive, user){
        const { data } = await axios.patch(`/backend/posts/${id}`,{
            id: id,
            type: type,
            btnActive: btnActive,
            user: user
        })
        return data;
    }

    function handleCommentClick(){
        setCommentsHidding(prev=>!prev);
        setShowCommentingArea(
            <CreateComment id={id} user={props.user} handleAfterSub={handleAfterSub}/>
        )
    }

    function handleAfterSub(){
        setCommentsHidding(prev=>!prev);
    }

    if(loading) return (
        <div className="main container">
            <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )

    if(error) console.log(error);


    return(
        <div className="main container">
                {data && <>
                    <Card
                        id={data?.express.storyId}
                        content={data?.express.content}
                        dateOfCreation={data?.express.dateOfCreation}
                        likes={data?.express.likes}
                        disLikes={data?.express.disLikes}
                        comments={data?.express.comments}
                        onClick={handleClick}
                        onLikeClick={handleLikeClick}
                        user={props.user}
                        activity={data?.express.activity}
                        allowCommenting={true}
                        onCommentClick={handleCommentClick}
                    />
                    {(!commentsHidding) && showCommentingArea}
                    <Comments id={id} user={props.user} data={data?.express.comments}/>
                </>}
        </div>
    )
}

export default SingleCard;