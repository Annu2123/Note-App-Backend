

const noteValidation={
    title:{
        notEmpty:{
            errorMessage:"title is require"
        },
        isLength:{
            isLength:{
                options:{min:1,max:20},
                errorMessage:"title should be between 1 to 20 length"
            }
        }
    },
    note:{
        notEmpty:{
            errorMessage:"note is require"
        },
        isLength:{
            isLength:{
                options:{min:1,max:100},
                errorMessage:"note should be between 1 to 100 length"
            }
        }
    },
}
const noteUpdateValidation={
    title:{
        notEmpty:{
            errorMessage:"title is require"
        },
        isLength:{
            isLength:{
                options:{min:1,max:20},
                errorMessage:"title should be between 1 to 20 length"
            }
        }
    },
    note:{
        notEmpty:{
            errorMessage:"note is require"
        },
        isLength:{
            isLength:{
                options:{min:1,max:100},
                errorMessage:"note should be between 1 to 100 length"
            }
        }
    },
}

module.exports={noteValidation,noteUpdateValidation}