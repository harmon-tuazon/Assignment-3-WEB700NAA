/********************************************************************************
* WEB700 – Assignment 03
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Harmon Tuazon Student ID: 165229220 Date: 06-02-2025
*
* Published URL: ___________________________________________________________
*
********************************************************************************/

const LegoData = require("./modules/legoSets")
const legoData = new LegoData()
const express = require('express')
const app = express()
const path = require('path');
const HTTP_PORT = process.env.PORT || 8080;


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
