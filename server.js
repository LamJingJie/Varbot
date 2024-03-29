// Use Express
var express = require("express");
// Use body-parser
var bodyParser = require("body-parser");

// Create new instance of the express server
var app = express();
var bot  = require('./bot.js');

// Define the JSON parser as a default way 
// to consume and produce data through the 
// exposed APIs
app.use(bodyParser.json());

// Create link to Angular build directory
// The `ng build` command will save the result
// under the `dist` folder.
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Init the server
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

/*  "/api/status"
 *   GET: Get server status
 */
app.get("/api/status", function (req, res) {
    res.status(200).json({ status: "UP" });
});

/*  "/api/bots"

*/
app.post("/api/bots", async function(req, res){
    //console.log("Reached to /api/bots");
    
    const fb_container = await bot(req.body).then((res2=>{
        res.status(200).json({ status: res2 });
    })).catch((err=>{
        res.status(100).json({status: "FAILED"});
    }));
    //console.log(req.body[0]);
    
    
});

