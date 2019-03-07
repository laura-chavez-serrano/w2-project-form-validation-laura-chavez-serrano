document.getElementById('parking-form').addEventListener('submit', function (event) {
    event.preventDefault()
// clean error message

    for (var errorMessage of document.querySelectorAll(".input-hint")) {
        errorMessage.remove();
        
    }
// review inputs and clean messages
    var inputDivs = document.getElementsByClassName("input-field");
        for (var inputDiv of inputDivs) {
            inputDiv.classList.remove("input-invalid");
            inputDiv.classList.remove("input-valid");

            // validate input if "! false" move to invalidInputs
            var invalidInputs = [];
            for (var input of inputDiv.getElementsByTagName("input")) {
                
                if (!validateInput(input)) {
                    invalidInputs.push(input);  
                }
            }
            
            
// if errors send message to screen assign classlist valid-invalid
            if (invalidInputs.length > 0) {
                showEmptyNameErrorname(inputDiv, invalidInputs);
            } else {
                inputDiv.classList.add("input-valid");
            }
        }
    });
        
///messages errors
function showEmptyNameErrorname(inputDiv, invalidInputs) {
    inputDiv.classList.add("input-invalid");
    var errorMsgs = [];
    for (var input of invalidInputs) {
        if (input.value.trim() === "") {
            errorMsgs.push(getInputName(input) + " is required");
        } else {
            errorMsgs.push("Invalid " + getInputName(input));
        }
    }

    var errorMsg = document.createElement("div");
    errorMsg.classList.add("input-hint");
    errorMsg.innerText = errorMsgs.join("; ");
    inputDiv.appendChild(errorMsg);
}

// validate input
function validateInput(input) {
    var inputValue = input.value.trim();
    if (inputValue === "") {
        return false;
    }
    switch (input.id) {
        case "name":
            return true;
        case "car-year":
            return validacar(inputValue);
        case "car-make":
            return true;
        case "car-model":
            return true;
        case "start-date":
            return validadate(inputValue);
        case "days":
            return validnumber(inputValue);
        case "credit-card":
            return validateCardNumber(inputValue);
        case "cvv":
            return validcvv(inputValue);
        case "expiration":
            return validaexpiration(inputValue);
        default:
            return true;
    }
}
//  get name of input for message
function getInputName(input) {
    switch (input.id) {
        case "name":
            return "Name";
        case "car-year":
            return "Year";
        case "car-make":
            return "Make";
        case "car-model":
            return "Model";
        case "start-date":
            return "Parking Date";
        case "days":
            return "Number of Days";
        case "credit-card":
            return "Credit Card Number";
        case "cvv":
            return "CVV";
        case "expiration":
            return "Expiration Date";
        default:
            return "";
    }
}

    
// validate car-year field
function validacar(inputValue) {
    
    // Returns true."ABC" if not number send error
    if (isNaN(inputValue)) {return false}
    // 
    else {
        var fix = 1900;
        var cdate = new Date();
        var cyear = cdate.getFullYear();
        // valida year >1990 and future if not send send error
        if ((inputValue > fix) && (inputValue <= cyear)) {
            return true;
        }
        //if no valid send message
        else { return false}
    }
};

// validate DateParking 
function validadate(inputValue) {
    ///today
    var cdate = new Date();

    ///screen
    var sdate = new Date(inputValue);
    
   
    // if today is <= screen input ask for the month 
    return sdate > cdate;
};

//validate number of days number and between 1-30
function validnumber(inputValue) {
    
    if (isNaN(inputValue)) {return false;} 
    else {
        if (inputValue >= 1 && inputValue <= 30) {
            return true
        };

    }
};
// ////credit card validation
function validateCardNumber(inputValue) {
    var regex = new RegExp("^[0-9]{16}$");
    if (!regex.test(inputValue)) return false;

    return luhnCheck(number);
};

function luhnCheck(val) {
    var sum = 0;
    for (var i = 0; i < val.length; i++) {
        var intVal = parseInt(val.substr(i, 1));
        if (i % 2 == 0) {
            intVal *= 2;
            if (intVal > 9) {
                intVal = 1 + (intVal % 10);
            }
        }
        sum += intVal;
    }
    return (sum % 10) == 0;
};

//valida CVV must be a three-digit number
function validcvv(inputValue) {
    var Max_Length = 3;
    var length = document.getElementById("cvv").value.length;
    
    if (isNaN(inputValue)) {return false;} 
     else {
        if (length == Max_Length) {
            return true}
    }
};

// expiration validation
function validaexpiration(inputValue) {
    var year = parseInt("20" + inputValue.split("/")[1]);
    var month = parseInt(inputValue.split("/")[0]);
    debugger
    if (isNaN(year) || isNaN(month)) {
        return false;
    }

    var cardDate = new Date(year, month - 1);
    var currentDate = new Date();
    if (cardDate.getFullYear() < currentDate.getFullYear()) {
        return false;
    } else if (cardDate.getFullYear() > currentDate.getFullYear()) {
        return true;
    } else if (cardDate.getMonth() >= currentDate.getMonth() ){
        return true;
    } else {
        return false;
    }
};