

// connecting to mongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/tajneDB');

const StorySchema = new mongoose.Schema({
    random: Number,
    storyId: Number,
    dateOfCreation: Date,
    content: String,
    likes: Number,
    disLikes:Number,
    comments: [{
        content: String,
        comentator: String,
        likes: Number,
        disLikes: Number,
        commentId: Number
    }]

});

const Story = mongoose.model("story", StorySchema);


const UserSchema = new mongoose.Schema({
    ip: String
});

const User = mongoose.model("user", UserSchema);

const UserStorySchenma = new mongoose.Schema({
    user: String,
    story: Number,
    hasActivity: Boolean,
    activity: {
        like: Boolean,
        disLike: Boolean,
    }      
})

const UserStory = mongoose.model("userStory", UserStorySchenma);

const UserCommentSchenma = new mongoose.Schema({
    user: String,
    story: Number,
    comment: Number,
    hasActivity: Boolean,
    activity: {
        like: Boolean,
        disLike: Boolean,
    }       
})

const UserComment = mongoose.model("userComment", UserCommentSchenma);


const path = require("path");
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const publicPath = path.join(__dirname, "..", "public");

const newSecrets = [];

const findeAll = async () => {
    const data = await Story.find();
    return data;
}

const findeOne = async (id) => {
    const data = await Story.findOne({storyId: id});
    return data;
}

const findeActivitis = async (currentUser) => {
    const activitis = await UserStory.find({user: currentUser});
    return activitis;
}

const findeActivComment = async (currentUser) => {
    const activitis = await UserComment.find({user: currentUser});
    return activitis;
}

function findeActivInData(activ, data){
    const newData = []
    for(const element of data) {
        newData.push(element._doc);
        for(const item of activ) {
            if(element.storyId === item.story){
                newData.pop();
                newData.push({...element._doc, activity: item.activity});
            }
        }
    }

    return newData
}

function findeActivInComments (activ, arry){
    console.log("inFinde");
    const data = arry[0];
    const newData = []
    for(const element of data.comments) {
        newData.push(element);
        for(const item of activ) {
            if(data.storyId === item.story && element.commentId === item.comment){
                newData.pop();
                newData.push({...element._doc, activity: item.activity});
            }
        }
    }
    console.log(newData);
    return newData
}

function switchComments (data, newArry){
    const newData = {...data._doc, comments: newArry};
    return newData;
}

async function findeOneComments (id){
    const data = await Story.findOne({storyId: id});
    return data.comments;
}

async function updateComments(id, arry, newComment){
    console.log(arry);
    const data = await Story.findOneAndUpdate({storyId: id},{$set: {"comments": arry}});
    return data;
}


function addDataToNewSecretsArray(){
    for(let i = 0; i < 100; i++) {
        newSecrets.push({
            random: Math.random(),
            storyId: 0 + i,
            dateOfCreation: new Date(),
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            likes: Math.floor(Math.random() * 1000),
            disLikes: Math.floor(Math.random() * 400),
            comments: [{
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                comentator: Math.floor(Math.random() * 10000000),
                likes: Math.floor(Math.random() * 100),
                disLikes: Math.floor(Math.random() * 10),
                commentsId: 0
            },
            {
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                comentator: Math.floor(Math.random() * 10000000),
                likes: Math.floor(Math.random() * 100),
                disLikes: Math.floor(Math.random() * 10),
                commentsId: 1
            },
            {
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                comentator: Math.floor(Math.random() * 10000000),
                likes: Math.floor(Math.random() * 100),
                disLikes: Math.floor(Math.random() * 10),
                commentsId: 2
            }]
        })
    }
}

addDataToNewSecretsArray();


async function changeNumOfLikes (id, type, isIncrementing) {
    const num = isIncrementing ? 1 : -1;
    if(type === "like"){
        await Story.findOneAndUpdate({storyId: id}, {$inc: {"likes" : num}});
    } else {
        await Story.findOneAndUpdate({storyId: id}, {$inc: {"disLikes" : num}});
    }
}

async function changeNumOfCommentLikes (id, commentId, type, isIncrementing) {
    const selectedArry = [];
    const num = isIncrementing ? 1 : -1;

    const story = await Story.find({storyId: id});
    if(story[0] === undefined) return null;
    const arryOfComms = story[0].comments;
    for(const item of arryOfComms){
        selectedArry.push(item);
        if(item.commentId === commentId){
            selectedArry.pop();
            const updateItem = item;
            if(type === "like"){
                updateItem.likes += num;
            } else {
                updateItem.disLikes += num;
            }
            selectedArry.push(updateItem)
        }
    }
    await Story.findOneAndUpdate({storyId: id}, {$set: {"comments" : selectedArry}});
}

async function insertStory (item) {
    const data = await Story.insertMany([item]);
    return data;
}

async function getMaxStoryId (){
    const data = await Story.find().sort({"storyId": -1}).limit(1);
    return data[0].storyId;
}

async function getMaxComments (id){
    const data = await Story.find({storyId: id});
    if (data[0].comments === undefined) return 0;
    return data[0].comments.length;
}

async function insertNewUser (ip) {
    const data = await User.insertMany([
        {
            ip: ip
        }    
    ])
    return data;
}

async function insertLoremData(){
    const data = await Story.insertMany(newSecrets);
    return data;
}

console.log("----------------------------------------------------");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/backend', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});


app.get('/backend/random/:user', async (req, res) => {
    const currentUser = req.params.user
    const data = await findeAll();
    const activ = await findeActivitis(currentUser, data);
    const activityArry = findeActivInData(activ, data);
    const sortedData = activityArry.sort((a,b) => {
        return b.random - a.random;
    });
    res.send({express: sortedData});
});

app.get('/backend/novo/:user', async (req, res) => {
    const currentUser = req.params.user
    await insertLoremData();
    const data = await findeAll();
    const activ = await findeActivitis(currentUser, data);
    const activityArry = findeActivInData(activ, data);
    const sortedData = activityArry.sort((a,b) => {
        return b.storyId - a.storyId;
    });
    res.send({express: sortedData});
});

app.get('/backend/odobravanja/:user', async (req, res) => {
    const currentUser = req.params.user
    const data = await findeAll();
    const activ = await findeActivitis(currentUser, data);
    const activityArry = findeActivInData(activ, data);
    const sortedData = activityArry.sort((a,b) => {
        return b.likes - a.likes;
    });
    res.send({express: sortedData});
});

app.get('/backend/osude/:user', async (req, res) => {
    const currentUser = req.params.user
    const data = await findeAll();
    const activ = await findeActivitis(currentUser);
    const activityArry = findeActivInData(activ, data);
    const sortedData = activityArry.sort((a,b) => {
        return b.disLikes - a.disLikes;
    });
    res.send({express: sortedData});
})

app.get('/backend/posts/:id/test/123', (req, res) => {
    Story.findOne({storyId: req.params.id}, (err, result) => {
        if(!err){
            if(result){
                res.send({express: result});
            } else {
                res.send(null);
            }
        } else {
            res.send({express: err});
        }
    })
});

app.get('/backend/posts/:id/:user', async (req, res) => {
    const currentUser = req.params.user
    const storyId = req.params.id;
    const data = await findeOne(storyId);
    const activ = await findeActivitis(currentUser);
    const activityArry = findeActivInData(activ, [data]);
    const actiComm = await findeActivComment(currentUser);
    const ActivityComments = findeActivInComments(actiComm, activityArry);
    const updateComments = switchComments(data, ActivityComments);
    res.send({express: updateComments});
});

app.post('/backend/submit', async (req, res) => {
    const item = req.body;
    const maxStoryId = await getMaxStoryId();
    const newStory = {
        random: Math.random(),
        storyId: maxStoryId + 1,
        dateOfCreation: item.dateOfCreation,
        content: item.content,
        likes: 0,
        disLikes: 0,
        comments: []
    }
    const data = await insertStory(newStory);
    res.send({express: {
        status: "ok",
        id: maxStoryId + 1
    }})
});

app.post('/user', async (req, res) => {
    const ip = req.body.ip;
    User.findOne({ip: ip}, (err, result) => {
        if (err){
            console.log(err);
        } else {
            if(result){
                //User already exists
                res.send({express: result});
            } else {
                User.count(async function (err, count) {
                    if (!err && count > 0) {
                        await insertNewUser(ip);
                        res.send({express: {
                            ip: ip
                        }});
                    } else{
                        const newUser = new User({
                            ip: ip
                        })
                        newUser.save().then(() => {
                        })
                    }
                });
            }
        }
    });
});

app.patch('/backend/posts/:id', (req, res) => {
    const item = req.body;
    if(!item.btnActive){
        UserStory.findOne({user: item.user, story: item.id}, (err, result) => {
            if(!err) {
                if(result){
                    UserStory.deleteOne({user: item.user, story: item.id});
                    res.send({express: {
                        status: "ok"
                    }})
                } else {
                    const currentActivity = {
                        like: false,
                        disLike: false
                    }
                    if(item.type === "like") {
                        currentActivity.like = true;
                    } else {
                        currentActivity.disLike = true;
                    }
                    const newUserStory = new UserStory({
                        user: item.user,
                        story: item.id,
                        hasActivity: true,
                        activity: currentActivity
                    })
                    newUserStory.save(err => {
                        if(!err){
                            changeNumOfLikes(item.id, item.type, true);
                            res.send({express: {
                                status: "ok"
                            }})
                        }
                    })  
                }
            } else {
                res.send({express: {
                    status: err
                }}) 
            }
        })
    } else {
        UserStory.findOneAndDelete({user: item.user, story: item.id}, (error, resu) => {
            if(!error) {
                if(resu){
                    changeNumOfLikes(item.id, item.type, false);
                    res.send({express: {
                        status: "ok"
                    }})
                } else {
                    res.send({express: {
                        status: "Item not found"
                    }}) 
                }
            } else {
                res.send({express: {
                    status: error
                }}) 
            }
        })
    }
});

app.post('/backend/posts/:id/comment', async (req, res) => {
    const id = req.params.id;
    const commentMax = await getMaxComments(id);
    const item = {
        content: req.body.content,
        comentator: "53253425",
        commentId: commentMax + 1,
        likes: 0,
        disLikes: 0
    }
    const commArray = await findeOneComments(id);
    const update = await updateComments(id, [...commArray, item]);
    res.send({express: update});
});

app.patch('/backend/posts/:id/comment', (req, res) => {
    const item = req.body;
    if(!item.btnActive){
        UserComment.findOne({user: item.user, story: item.id, comment: item.commentId}, (err, result) => {
            if(!err) {
                if(result){
                    UserComment.deleteOne({user: item.user, story: item.id});
                    res.send({express: {
                        status: "ok"
                    }})
                } else {
                    const currentActivity = {
                        like: false,
                        disLike: false
                    }
                    if(item.type === "like") {
                        currentActivity.like = true;
                    } else {
                        currentActivity.disLike = true;
                    }
                    const newUserComment = new UserComment({
                        user: item.user,
                        story: item.id,
                        comment: item.commentId,
                        hasActivity: true,
                        activity: currentActivity
                    })
                    newUserComment.save(err => {
                        if(!err){
                            changeNumOfCommentLikes(item.id, item.commentId, item.type, true);
                            res.send({express: {
                                status: "ok"
                            }})
                        }
                    })  
                }
            } else {
                res.send({express: {
                    status: err
                }}) 
            }
        })
    } else {
        UserComment.findOneAndDelete({user: item.user, story: item.id}, (error, resu) => {
            if(!error) {
                if(resu){
                    changeNumOfLikes(item.id, item.type, false);
                    res.send({express: {
                        status: "ok"
                    }})
                } else {
                    res.send({express: {
                        status: "Item not found"
                    }}) 
                }
            } else {
                res.send({express: {
                    status: error
                }}) 
            }
        })
    }
});



app.listen(5000, () => {
    console.log(`Server started on port ${5000}`);
});