//make a function that takes in an error from userController
//
//in usersL only used in the create & update

// console.log("This is our errorHandler file, line 6", err);

// console.log("errorHandler File, line 8", err.code)
// console.log("errorHandler File, line 9", err.keyPattern)
// console.log("errorHandler File, line 10", err.keyValue)

const parseedError = (err) => {
    let objKeys = Object.keys(err.keyValue);
    let objValues = Object.values(err.keyValue);
    console.log("key", objKeys[0])
    console.log("value", objValues[0]);
    return `${objKeys[0]} ${objValues[0]} is already in use.`
}

const errorHandler = (err) => {
  let message = "";

  if(err.code){
    switch (err.code){
        case 11000:
        message = parseedError(err)
        break;
        default:
            message = "Something is wrong, contact tech support."
    }
  }
    return message;
  
};

module.exports = {
  errorHandler,
};
