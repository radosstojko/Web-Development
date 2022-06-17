const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const _ = require("lodash");
const multer = require('multer');

const fs = require('fs');
const path = require('path');
require('dotenv/config');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }, err => {
        console.log('connected')
    });


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
    
const upload = multer({ storage: storage });

const itemSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    desc: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
});

const Item = new mongoose.model('Item', itemSchema);

const categorySchema = new mongoose.Schema({
    name: String,
    url: String,
    items: [itemSchema]
});

const Category = new mongoose.model("Category", categorySchema);

const categoryData = []

async function getAllCategories(activUrl) {
    const nameArry = []
    const data = await Category.find({});
    data.forEach(element => {
        nameArry.push({name: element.name, url: element.url, activ: ""});
        if(element.url === activUrl) {
            nameArry.pop();
            nameArry.push({name: element.name, url: element.url, activ: "activ"});
        }
    });
    return nameArry;
}

async function insertManyCategories(data){
    await Category.insertMany(data);
}

app.get('/', async (req, res) => {
    const catArry = await getAllCategories();
    Category.find({name: "Negazirana pića"}, (err, data) => {
        if(err) {
            console.log(err);
            res.status(500).send("An error occurred", err);
        } else {
            res.render("container", {data: data[0], catArry: catArry});
        }
    })
});

app.get('/category/:categoryUrl', async (req, res) => {
    const url = "/category/" + req.params.categoryUrl;
    const catArry = await getAllCategories(url);
    Category.find({url: url}, (err, data) => {
        if(err) {
            console.log(err);
            res.status(500).send("An error occurred", err);
        } else {
            res.render("container", {data: data[0], catArry: catArry});
        }
    })
});

//Path for uploading new Item

app.get('/images', (req, res) => {
    Item.find({}, (err, items) => {
        if(err) {
            console.log(err);
            res.status(500).send("An error occurred", err);
        } else {
            res.render("imagesPage", {items: items});
        }
    });
});

//Path for crating new Category and adding proper Items to it

app.get('/category', async (req, res) => {
    const catName = "Čajevi"
    const data = await Item.find({category: catName});
    const obj = {
        name: catName,
        url: "/category/" + _.kebabCase(catName),
        items: data
    }
    Category.create(obj, (err, item) => {
        if(err) {
            console.log(err);
        } else {
            res.send("Success");
        }
    })
});

//Path toinsert data to mongoDB

app.get('/database', async (req, res) => {
    fs.readFile("categoryData.json", (err, data) => {
        if (err) throw err;
        const newData = JSON.parse(data);
        await insertManyCategories(newData);
        console.log("Success");
    })
});

//Path write data from mongoDB to file

app.get('/getdatabase', async (req, res) => {
    const data = await Category.find({})
    data.forEach(e => {
        categoryData.push({
            name: e.name,
            url: e.url,
            items: e.items
        })
    });

    fs.writeFile("categoryData.json", JSON.stringify(categoryData), err => {
        if (err) throw err;
        console.log("Success");
    });
    res.send("Success");

});

app.post('/', upload.single('image'), (req, res, next) => {
  
    const obj = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        ddesc: req.body.desc,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    Item.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            // item.save();
            res.redirect('/images');
        }
    });
});

const port = process.env.PORT || '3000'
app.listen(port, err => {
    if (err)
        throw err
    console.log('Server listening on port', port)
})