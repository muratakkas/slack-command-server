const axios = require('axios');
const PARAMETER_TYPE_SEPERATOR = '|'
const PARAMETER_VALUE_SEPERATOR = ':'


 
const PARAM_TYPE_BRANCH ='branch'
const PARAM_TYPE_PARTNER ='ENV[PARTNER]'
const PARAM_TYPE_TARGET='ENV[TARGET]' 

 
var parameterParser ={
      parse: (text)=> {  
         if(!text) throw "Invalid parameters" 
  

         console.log("Parameters:"+text)
         const result  = {
          branch : 'master',
          partner:'digibank',
          environment:'development'
        }
        var parameterArray = text.split(PARAMETER_TYPE_SEPERATOR);

        for (let index = 0; index < parameterArray.length; index++) {
          const parameter = parameterArray[index];
          
          const parameterValueArray = parameter.split(PARAMETER_VALUE_SEPERATOR);
          if(!parameterValueArray ||
             parameterValueArray.length <= 1 ||
             !parameterValueArray[0] || 
             parameterValueArray[0].length <= 0 || 
             !parameterValueArray[1] || 
             parameterValueArray[1].length <= 0) continue;

          const paramType = parameterValueArray[0].trim();
          const paramValue = parameterValueArray[1].trim();
 
            if(paramType  == PARAM_TYPE_BRANCH)  result.branch= paramValue;
          else if(paramType  == PARAM_TYPE_PARTNER)  result.partner = paramValue;
          else if(paramType  == PARAM_TYPE_TARGET)  result.environment = paramValue;
        }

        console.log("Parsed Parameters :"+JSON.stringify(result))
 
        return result;
     
    }
}


module.exports = parameterParser;