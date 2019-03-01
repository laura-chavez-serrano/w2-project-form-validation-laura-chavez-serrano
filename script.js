document.getElementById('parking-form').addEventListener('submit', function (event) {
    event.preventDefault()

    clearError()
    


    // check and make sure name is not empty and validate
    
        var field_value = document.getElementById('name').value;
        var field = 'name';
        var id = 'Name';
        var divname = "name-field";
        field_value == '' ? showEmptyNameErrorname(field, id, divname) : validatext(divname)
    
    
        field_value = document.getElementById('car-year').value;
        field = 'car-year';
        id = 'Car Year';
        divname = "car-field";
        field_value == '' ? showEmptyNameErrorname(field, id, divname) : validacar(divname, field_value);
    
        field_value = document.getElementById('car-make').value;
        field = 'car-make';
        id = 'Car Make';
        divname = "car-field";
        field_value == '' ? showEmptyNameErrorname(field, id, divname);
    

        field_value = document.getElementById('car-model').value;
        field = 'car-model';
        id = 'Car Model';
        divname = "car-field";
        field_value == '' ? showEmptyNameErrorname(field, id, divname);


        field_value = document.getElementById('start-date').value;
        field = 'start-date';
        id = 'Date';
        divname = "start-date-field"
        field_value == '' ? showEmptyNameErrorname(field, id, divname) : validadate(field, field_value, divname);
    
        field_value = document.getElementById('days').value;
        field = 'days';
        id = 'Days';
        divname = "days-field";
        field_value == '' ? showEmptyNameErrorname(field, id, divname) : validnumber(field, field_value, divname)

        
         field_value = document.getElementById('credit-card').value;
         field = 'credit-card';
         id = 'Credit Card';
         divname = "credit-card-field"
         field_value == '' ? showEmptyNameErrorname(field, id, divname) : validateCardNumber(creditcard2)

         field_value = document.getElementById('cvv').value;
         field = 'cvv';
         id = 'CVV';
         divname = "cvv-field";
         field_value == '' ? showEmptyNameErrorname(field, id, divname) : validcvv(field, divname, cvv2)
    
    
        field_value = document.getElementById('expiration').value;
         field = 'expiration';
         id = 'Expiration';
         divname = "expiration-field"
         field_value == '' ? showEmptyNameErrorname(field, id, divname) : validaexpiration(divname, expiration2)
    

    if (fall) {
        ftotal(startdate2, days2)
    }

})

/////functions

////clears 
function clearError() {
    var all = ['name', 'car-year', 'car-make', 'car-model', 'start-date', 'days', 'credit-card', 'cvv', 'expiration']
    for (var i = 0; i < all.length; i++) {
        var borra = all[i]
        var field = document.getElementById(borra)
        field.classList.remove('error')
        // same as: field.parentElement.getElementsByClassName('.error-msg')[0]
        var errorMsg = field.parentElement.querySelector('.error-msg')
        if (errorMsg) {
            errorMsg.remove()

        }
        ///clean total
        var divname = document.getElementById('total')
        field.classList.remove('total')
        var message = ""
        divname.innerText = message
    }
    return fall = true;
}
///messages
function showEmptyNameErrorname(field, id, divname) {
    var errorDiv = document.createElement('div')
    errorDiv.classList.add('error-msg')
    var message = id + ' ' + "cannot be blank"
    errorDiv.innerText = message
    var field = document.getElementById(field)
    field.parentElement.appendChild(errorDiv)
    field.classList.add('&.alert-lg')
    document.getElementById(divname).classList.add("input-invalid");
    return fall = false;
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


///validate fields when is not empty for all except car-year/date/days
function validatext(divname) {
    document.getElementById(divname).classList.add("input-valid");
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