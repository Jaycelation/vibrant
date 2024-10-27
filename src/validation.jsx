const validate = (value, validation, check) => {
    let errorMessage = [];
    validation.forEach((func) => {
        if (func === isConfirmed) {
            const { valueConfirm } = check;
            const error = func(value, valueConfirm)
            if (error) { errorMessage.push(error) }
        }
        else if (func === minChar) {
            const { min } = check;
            const error = func(value, min)
            if (error) { errorMessage.push(error) }
        }
        else {
            const error = func(value)
            if (error) { errorMessage.push(error) }
        }
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
const isConfirmed = (value, valueConfirm) => {
    if (value !== valueConfirm) return "Confirm incorrect information"
}

const minChar = (value, min) => {
    if (value.length < min) return `At least ${min} char`
}
export {
    validate, isEmail, isRequired, isConfirmed, minChar
}
