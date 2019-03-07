document.getElementById('parking-form').addEventListener('submit', function (event) {
    event.preventDefault()
// clean error message

    for (var errorMessage of document.querySelectorAll(".input-hint")) {
        errorMessage.remove();
        var invalidInputs = [];
    }
// review inputs
    var inputDivs = document.getElementsByClassName("input-field");
        for (var inputDiv of inputDivs) {
            inputDiv.classList.remove("input-invalid");
            inputDiv.classList.remove("input-valid");

            // validate input if "! false" move to invalidInputs
            for (var input of inputDiv.getElementsByTagName("input")) {
                if (!validateInput(input)) {
                    invalidInputs.push(input);
                }
            }
// if errors send message to screen
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
            return validatecar(inputValue);
        case "car-make":
            return true;
        case "car-model":
            return true;
        case "start-date":
            return validadate();
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

    



//valida CVV must be a three-digit number
function validcvv(field, divname, cvv2) {
    var Max_Length = 3;
    var length = document.getElementById("cvv").value.length;
    var error = false;
    if (isNaN(cvv2)) {
        error = true
    } else {
        if (length == Max_Length) {
            document.getElementById(divname).classList.add("input-valid");
        } else {
            error = true
        }
    }
    if (error) {
        var errorDiv = document.createElement('div')
    errorDiv.classList.add('error-msg')
    var message = 'CVV MUST TO BE 3 NUMBERS'
    errorDiv.innerText = message
    var field = document.getElementById('cvv')
    field.parentElement.appendChild(errorDiv)
    field.classList.add('&.alert-lg')
    document.getElementById(divname).classList.add("input-invalid");
    return fall = false;
    }
};
//validate number of days number and between 1-30
function validnumber(field, days2, divname) {
    error = false;
    if (isNaN(days2)) {error = true;

    } else {
        if (days2 >= 1 && days2 <= 30) {
            document.getElementById(divname).classList.add("input-valid");
        } else {error = true}

    }
    if (error) {
        var errorDiv = document.createElement('div')
    errorDiv.classList.add('error-msg')
    var message = 'NUMBER OF DAYS MUST BE BETWEEN 1-30'
    errorDiv.innerText = message
    var field = document.getElementById('cvv')
    field.parentElement.appendChild(errorDiv)
    field.classList.add('&.alert-lg')
    document.getElementById(divname).classList.add("input-invalid");
    return fall = false;
    }
};

// validate DateParking 
function validadate(field, startdate2, divname) {
    ///today

    var cdate = new Date();
    var cday = cdate.getDate();
    var cmonth = cdate.getMonth();
    var cyear = cdate.getFullYear();
    ///screen
    var ddate = new Date(startdate2);
    var dday = ddate.getDate();
    dday = dday + 1;
    var dmonth = ddate.getMonth();
    var dyear = ddate.getFullYear();
    var validad = true;
    // if today is <= screen input ask for the month 
    if (dyear >= cyear) {
        validad = false;
        if (cmonth <= dmonth) {
            validad = false;
            if (cday < dday) {
                validad = false;
            } else {
                validad = true
            }
        } else {
            validad = true
        }
    }
    if (validad) {
        var errorDiv = document.createElement('div')
    errorDiv.classList.add('error-msg')
    var message = 'DATE NEEDS TO BE IN FUTURE'
    errorDiv.innerText = message
    var field = document.getElementById('start-date')
    field.parentElement.appendChild(errorDiv)
    field.classList.add('&.alert-lg')
    document.getElementById(divname).classList.add("input-invalid");
    return fall = false;} else {
        document.getElementById(divname).classList.add("input-valid");
    }
};
// validate car-year field
function validacar(divname, caryear2) {
    var error = false
    // Returns true."ABC" if not number send error
    if (isNaN(caryear2)) {error = true}
    // 
    else {
        var fix = 1900;
        var cdate = new Date();
        var cyear = cdate.getFullYear();
        // valida year >1990 and future if not send send error
        if ((caryear2 > fix) && (caryear2 <= cyear)) {
            document.getElementById(divname).classList.add("input-valid");
        }
        //if no valid send message
        else { error = true}
    }
    if (error) {
        var errorDiv = document.createElement('div')
    errorDiv.classList.add('error-msg')
    var message = 'CAR YEAR NEEDS TO BE AFTER 1990'
    errorDiv.innerText = message
    var field = document.getElementById('car-year')
    field.parentElement.appendChild(errorDiv)
    field.classList.add('&.alert-lg')
    document.getElementById(divname).classList.add("input-invalid");
    return fall = false;} else {
        document.getElementById(divname).classList.add("input-valid");
    }
};
// expiration validation
function validaexpiration(divname, expiration2) {
    var validexpiration = false;
    var cdate = new Date();
    var cyear = cdate.getFullYear();
    cyear = cyear - 2000

    expiration2 = expiration2.split('/');
    if (expiration2.length != 2) {
        validexpiration = true
    } else {

        //Día especificado en la fecha recibida.
        var mes = expiration2[0];
        //Módulo acumulado del mes especificado en la fecha recibida.
        var anno = expiration2[1];

        if ((mes > 1) && (mes <= 12)) {
            validexpiration = false
            document.getElementById(divname).classList.add("input-valid")

            if ((anno >= cyear)) {
                validexpiration = false
                document.getElementById(divname).classList.add("input-valid");
            } else {

            };
        } else {validexpiration = true};

    }
    if (validexpiration) {
        var errorDiv = document.createElement('div')
    errorDiv.classList.add('error-msg')
    var message = 'EXPIRATION DATE INCORRECT'
    errorDiv.innerText = message
    var field = document.getElementById('expiration')
    field.parentElement.appendChild(errorDiv)
    field.classList.add('&.alert-lg')
    document.getElementById(divname).classList.add("input-invalid");
    return fall = false;} else {
        document.getElementById(divname).classList.add("input-valid");
    }
};

// ////credit card validation
function validateCardNumber(number) {
    var regex = new RegExp("^[0-9]{16}$");
    if (!regex.test(number))
        return false;

    return luhnCheck(number);
}

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
///clean total
var divname = document.getElementById('total')
field.classList.remove('total')
var message = ""
divname.innerText = message
}
return fall = true;
}

// total calculation and message
function ftotal(startdate2, days2) {


    var total = "";
    var i = days2;
    var ddate = new Date(startdate2);
    ddate.setDate(ddate.getDate() + 1);
    var total1 = 0
    var total2 = 0

    do {

        var dyear = ddate.getFullYear();
        var dmonth = (1 + ddate.getMonth()).toString();
        dmonth = dmonth.length > 1 ? dmonth : '0' + dmonth;
        var dday = ddate.getDate().toString();
        var dow = ddate.getDay()

        if (dow == 0 || dow == 6) {
            total1 = 7 + total1
        } else if (dow !== '') {
            total2 = 5 + total2
        };


        ddate.setDate(ddate.getDate() + 1);
        i = i - 1;

    } while (i >= 0);
    var dow = 0
    dow = total1 + total2;
    ///////////message to screen
    var divname = document.getElementById('total')
    divname.classList.add('total')
    var message = "Total:" + ' ' + dow
    divname.innerText = message

};