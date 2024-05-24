const User = require("../models/users-model")

const usersValidation={
    userName:{
        notEmpty:{
            errorMessage:"userName is require"
        },
        isLength:{
            isLength:{
                options:{min:1,max:20},
                errorMessage:"name should be between 1 to 20 length"
            }
        }
    },
   email:{
    notEmpty:{
        errorMessage:"email is require"
    },
    trim:true,
    normalizeEmail:true,
    isEmail:{
        errorMessage:"require valide email formate"
    },
    custom:{
        options:async function (value){
           const user=await User.findOne({email:value})
           if(!user){
            return true
           }else{
            throw new Error('email already exist')
           }
        }
    }
   },
    password:{
        notEmpty:{
            errorMessage:"password is require"
        },
        isStrongPassword:{
            options:[{ minLowercase: 1,
              minUppercase: 1,minNumbers:2,minSymbols:1}],
              errorMessage:"password must contain 2 uppercase 2 lower case 2 min numbersand atleast one symbol"
          },
          isLength:{
              options:[{min:5,max:128}],
              errorMessage:"password length must be in between 5 to 128 long "
          }
    }
}
const loginValidation={
    email:{
        notEmpty:{
            errorMessage:"email require"
        },
        trim:true,
        normalizeEmail:true,
        isEmail:{
            errorMessage:"should be valide email"
        }
    },
    password:{
        notEmpty:{
            errorMessage:"paasowrd is require"
        },
    }
}
module.exports={usersValidation,loginValidation}