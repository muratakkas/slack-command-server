const commandManager =require('./commands')
const parameterParser =require('./parameterParser')

const express = require('express')
const app = express()
const port = 80  
const dotenv = require('dotenv');
dotenv.config();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

 app.get('/', (req, res) => res.send('Welcome to DigiBank Slack Command Server'))
 
app.post('/actions/:action/start',  async(req, res, next)=>{
 try {
         
    if(!req.query.token || req.query.token !== process.env.TOKEN)  
    throw 'Unauthorized Token' 

    if(!req.params.action || req.params.action.length <= 0 || !req.body.text || req.body.text.length <= 0)   
      throw 'Invalid Parameters' 
          
        let parameters = parameterParser.parse(req.body.text)
 
      const result  = await commandManager.startAction(req.params.action,parameters)
      res.end(result); 

    } catch (error) {
        res.end(error); 
    } 

  
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))




