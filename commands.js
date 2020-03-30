const axios = require('axios');

var commandManager ={
      startAction:  async (action,parameters)=> { 
 
        try { 
            const response = await axios.post(`https://api.github.com/repos/${process.env.GITHUB_USERNAME}/${process.env.GITHUB_REPO}/dispatches`,{
                "event_type": action,
                "client_payload": {
                    branch : parameters.branch,
                    partner: parameters.partner,
                    environment: parameters.environment,
                    track: parameters.environment == 'development' ? 'internal' :  parameters.environment
                  }
              },{
                auth: {
                    username: process.env.GITHUB_USERNAME,
                    password: process.env.GITHUB_TOKEN
                    },
                headers: { Accept: "application/vnd.github.everest-preview+json" , 'Content-Type': "application/json"}
            }) 
            
            return  action +' action start request has been sent to server'
          } catch(error) {
              //throw error againg to avoid share all details with slack
            console.log(error)
            throw error.response.data.message
          } 
    }
}


module.exports = commandManager;