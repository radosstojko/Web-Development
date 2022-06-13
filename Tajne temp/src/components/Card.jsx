import React, { useEffect, useState } from "react"

function Card(props){

    const user = props.user;

    const  [likeState, setLikeState] = useState({
        like: false,
        disLike: false
    });
    
    function chackLikeState(){
        if(props.activity){
            setLikeState(props.activity)
        }
    }

    useEffect(() => {
        chackLikeState();
    }, [])


    function handleClick(){
        props.onClick(props.id);
    }

    function handleLikeClick(event){
        const type = event.target.id;
        if (type === "like"){
            if(!likeState.disLike){
                if(!likeState.like){
                    setLikeState({
                        like: true,
                        disLike:false
                    })
                    props.onLikeClick(props.id, type, likeState.like, user);
                } else {
                    setLikeState({
                        like: false,
                        disLike: false
                    })
                    props.onLikeClick(props.id, type, likeState.like, user);
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
                    props.onLikeClick(props.id, type, likeState.disLike, user);
                } else {
                    setLikeState({
                        like: false,
                        disLike:false
                    })
                    props.onLikeClick(props.id, type, likeState.disLike, user);
                }
            }
        }
    }

    function handleCommentClick (){
        if(props.allowCommenting){
            props.onCommentClick();
        }
    }

    function dateFormmating(date){
        if (typeof date === "string") return date.slice(2,9);
        return date.toLocaleDateString("de-DE", { year: '2-digit', month: 'numeric', day: 'numeric' });
    }

    return(
        <div className="card text-white bg-dark card-custom">
            <div className="card-header d-flex justify-content-between align-items-center" onClick={()=>{handleClick()}}>
                <p>
                    #{props.id}
                </p>
                <p>
                    {dateFormmating(props.dateOfCreation)}
                </p>
            </div>
            <div className="card-body" onClick={()=>{handleClick()}}>
                <p>
                    {props.content}
                </p>
            </div>
            <div className="card-footer container align-items-center">
                <div className="row">
                    <div className="col align-items-center">
                        <div name="likes" className="row align-items-center justify-content-around d-flex" onClick={()=>{handleClick()}}>
                           <p className="d-flex justify-content-around">
                           {likeState.like ? props.likes + 1 : props.likes}
                           </p>
                        </div>
                        <div id="like" className={"row align-items-center justify-content-around d-flex btn btn-outline-secondary " + (likeState.like ? "active" : null)} onClick={handleLikeClick}>
                            odobravam
                        </div>
                    </div> 
                    <div className="col align-items-center">
                        <div name="disLikes" className="row align-items-center justify-content-around d-flex">
                           <p className="d-flex justify-content-around">
                           {likeState.disLike ? props.disLikes + 1 : props.disLikes}
                           </p>
                        </div>
                        <div id="disLike" className={"row align-items-center justify-content-around d-flex btn btn-outline-secondary " + (likeState.disLike ? "active" : null)} onClick={handleLikeClick}>
                            osudijujem
                        </div>
                    </div>
                    <div className="col align-items-center" onClick={()=>{handleClick()}}>
                        <div className="row align-items-center justify-content-around d-flex">
                           <p className="d-flex justify-content-around">
                           {props.comments.length}
                           </p>
                        </div>
                        <div className="row align-items-center justify-content-around d-flex btn btn-outline-secondary" onClick={()=>{handleCommentClick()}}>
                            💬
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;