const validate = (value, validation) => {
    let errorMessage = [];
    validation.forEach((func) => {
        const error = func(value)
        if (error) { errorMessage.push(func(value)) }
    })
    if (errorMessage[0]) return errorMessage[0]
    else return ""
}
const isEmail = (value) => {
    var re = /\S+@\S+\.\S+/;
    if (!re.test(value)) return "The email is not a valid email address";
}

const isRequired = (value) => {
    if (value.trim() === "") return "This feild cannot be empty";
}


export {
    validate, isEmail, isRequired
}
