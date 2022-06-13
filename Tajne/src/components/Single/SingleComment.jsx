import React, { useEffect, useState } from "react";

function SingleComment(props){

    const {data} = props

    const user = props.user;

    const  [likeState, setLikeState] = useState({
        like: false,
        disLike: false
    })


    function chackLikeState(){
        if(props.activity){
            setLikeState(props.activity)
        }
    }

    useEffect(() => {
        chackLikeState();
    }, [])

    // function dateFormmating(date){
    //     if (typeof date === "string") return date.slice(2,9);
    //     return date.toLocaleDateString("de-DE", { year: '2-digit', month: 'numeric', day: 'numeric' });
    // }

    function handleLikeClick(event){
        const type = event.target.id;
        if (type === "like"){
            if(!likeState.disLike){
                if(!likeState.like){
                    setLikeState({
                        like: true,
                        disLike:false
                    })
                    props.onLikeClick(props.id, type, likeState.like, user, data.commentId);
                } else {
                    setLikeState({
                        like: false,
                        disLike: false
                    })
                    props.onLikeClick(props.id, type, likeState.like, user, data.commentId);
                }
            }
        } 
        if (type === "disLike"){
            if(!likeState.like){
                if(!likeState.disLike){
                    setLikeState({
                        like: false,
                        disLike: true
                    })
                    props.onLikeClick(props.id, type, likeState.disLike, user, data.commentId);
                } else {
                    setLikeState({
                        like: false,
                        disLike:false
                    })
                    props.onLikeClick(props.id, type, likeState.disLike, user, data.commentId);
                }
            }
        }
    }

    return(
        <div className="card text-white bg-dark comment-custom">
            <div className="card-header d-flex justify-content-between align-items-center">
                <p>
                    #{data.commentId}
                </p>
                <p>
                    {/* {dateFormmating(data.dateOfCreation)} */}
                </p>
            </div>
            <div className="card-body">
                <p>
                    {data.content}
                </p>
            </div>
            <div className="card-footer container align-items-center">
                <div className="row">
                    <div className="col align-items-center">
                        <div className="row align-items-center justify-content-around d-flex">
                           <p className="d-flex justify-content-around">
                           {likeState.like ? data.likes + 1 : data.likes}
                           </p>
                        </div>
                        <div id="like" className={"row align-items-center justify-content-around d-flex btn btn-outline-secondary " + (likeState.like ? "active" : null)} onClick={handleLikeClick}>
                            odobravam
                        </div>
                    </div> 
                    <div className="col align-items-center">
                        <div className="row align-items-center justify-content-around d-flex">
                           <p className="d-flex justify-content-around">
                           {likeState.disLike ? data.disLikes + 1 : data.disLikes}
                           </p>
                        </div>
                        <div id="disLike" className={"row align-items-center justify-content-around d-flex btn btn-outline-secondary " + (likeState.disLike ? "active" : null)} onClick={handleLikeClick}>
                            osudijujem
                        </div>
                    </div>
                    {/* Future Update */}
                    {/* <div className="col align-items-center">
                        <div className="row align-items-center justify-content-around d-flex">
                           <p className="d-flex justify-content-around">
                           {props.comments}
                           </p>
                        </div>
                        <div className="row align-items-center justify-content-around d-flex btn btn-outline-secondary">
                            💬
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default SingleComment;