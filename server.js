/********************************************************************************
* WEB700 – Assignment 04
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Harmon Tuazon Student ID: 165229220 Date: 06-29-2025
*
* Published URL: https://assignment-3-web-700-naa.vercel.app/
*
********************************************************************************/

const LegoData = require("./modules/legoSets")
const legoData = new LegoData()
const express = require('express')
const app = express()
const path = require('path');
const HTTP_PORT = process.env.PORT || 8080;

app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));


//http://localhost:8080/
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '/views/home.html'))

})

//http://localhost:8080/about
app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, '/views/about.html'))
})

//http://localhost:8080/lego/sets
app.get("/lego/sets", async (req, res) => {
    try {
        let sets;
        if (req.query.theme) {
            sets = await legoData.getSetsByTheme(req.query.theme);
        } else {
            sets = await legoData.getAllSets();
        }
        res.json(sets); // send response to client
    } catch (error) {
        res.status(404).send(`Error: ${error.message}`).sendFile((path.join(__dirname, '/views/about.html')));
    }
});

//http://localhost:8080/lego/sets/:set_num
app.get("/lego/sets/:set_num", async (req, res) => {
    try {
        let sets;
        if (req.params.set_num) {
            sets = await legoData.getSetByNum(req.params.set_num);
        }

        res.json(sets); // send response to client
    } catch (error) {
        res.status(404).sendFile(`Error: ${error.message}`).sendFile((path.join(__dirname, '/views/about.html')));
    }
});

//http://localhost:8080/lego/add-test
app.get('/lego/add-test', (req, res) => {
  let testSet = {
    set_num: "123",
    name: "testSet name",
    year: "2024",
    theme_id: "366",
    num_parts: "123",
    img_url: "https://fakeimg.pl/375x375?text=[+Lego+]"
  };

  try {
    legoData.addSet(testSet);
    res.redirect('/lego/sets');
  } catch (error) {
    res.status(400).send(error.message);
  }
});




//makes an the application listen for requests
async function listenChecker() {
    try{
        await legoData.initialize();
        app.listen(HTTP_PORT, () => {
            console.log('Server started....')
        })
    } 
    
    catch(error){
    console.log(error.message)
    }
}
listenChecker()
