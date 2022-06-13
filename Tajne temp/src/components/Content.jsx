import React, { useState } from "react";
import { useNavigate  } from "react-router-dom";
import Card from "./Card";
import { v4 as uuidv4 } from 'uuid';
import useFetch from "../useFetch"
import axios from "axios";

function Content (props) {

   const {data, loading, error} = useFetch(`${props.path}/${props.user}`);


    const navigate = useNavigate();

    function handleClick(id){
        navigate(`/posts/${id}`);
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
            <ul>
                {data?.express.map(item => {
                        return (
                            <Card
                                key={uuidv4()}
                                id={item.storyId}
                                content={item.content}
                                dateOfCreation={item.dateOfCreation}
                                likes={item.likes}
                                disLikes={item.disLikes}
                                comments={item.comments}
                                onClick={handleClick}
                                onLikeClick={handleLikeClick}
                                user={props.user}
                                activity={item?.activity}
                                allowCommenting={false}
                            /> 
                        )
                    }
                )}
            </ul>

        </div>
    );
}

export default Content;