const formEl = document.querySelector('form')

const firstNameEl = document.querySelector('#firstName')
const lastNameEl = document.querySelector('#lastName')
const emailEl = document.querySelector('#email')
const birthDateEl = document.querySelector('#birthDate')
const quantityEl = document.querySelector('#quantity')
const firstLocationRadioEl = document.querySelector('#location1')
const termsOfUsesEl = document.querySelector('#checkbox1')

const emailRegex = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/

const validatorHandlers = {
    notBlank: (input) => input.value !== '',
    atLeast: (input, min) => input.value.trim().length >= min,
    isMail: (input) => emailRegex.test(input.value.trim()),
    isNumber: (input) => isNaN(input),
    checkboxChecked: ({name}) => formEl.querySelector(`[name="${name}"]:checked`) !== null,
    radioChecked: ({name}) => formEl.querySelector(`[name="${name}"]:checked`),
}

function createValidator(handler, params, error, stopOnFailure = false) {
    return { handler, params, error, stopOnFailure }
}

const validators = {
    required: createValidator(
        validatorHandlers.notBlank,
        [],
        'Le champs {name} est requis !',
        true,
    ),
    needTwoChars: createValidator(
        validatorHandlers.atLeast,
        [2],
        'Le champs {name} doit contenir 2 caractères minimum !',
    ),
    email: createValidator(
        validatorHandlers.isMail,
        [],
        'Le champs email doit être un email valide !',
    ),
    isNum: createValidator(
        validatorHandlers.isNumber,
        [],
        'Le champs nombre doit être un nombre !'
    ),
    termOfuses: createValidator(
        validatorHandlers.checkboxChecked,
        [],
        'Vous devez accepter les conditions d\'utilisations !',
    ),
    location: createValidator(
        validatorHandlers.radioChecked,
        [],
        'Vous devez choisir une {name} !'
    )
}

function createInputValidator(name, input, validators) {
    return {name, input, validators }
}

const inputs = [
    createInputValidator('prénom', firstNameEl, [validators.required, validators.needTwoChars]),
    createInputValidator('nom', lastNameEl, [validators.required, validators.needTwoChars]),
    createInputValidator('tournois', quantityEl, [validators.required, validators.isNum]),
    createInputValidator('email', emailEl, [validators.required, validators.email]),
    createInputValidator('ville', firstLocationRadioEl, [validators.location]),
    createInputValidator('checkbox1', termsOfUsesEl, [validators.termOfuses]),
]

function validate(previousErrors, validator, input) {
    if(previousErrors.find((error) => error.stopOnFailure)) {
        return previousErrors
    }

    const isValid = validator.handler(input, ...validator.params)
    if (!isValid) {
        previousErrors.push(validator)
    }

    return previousErrors
}

function onSubmit(event) {
    event.preventDefault()
    let canSubmit = true

    inputs.forEach((inputValidator) => {
        const errors = inputValidator.validators.reduce((prev, curr) => validate(prev, curr, inputValidator.input), [])
        console.log('errors', errors)
        if (errors.length > 0) {
            canSubmit = false
        }
    })
    if (canSubmit) {
        formEl.reset()
        closeModal()
    }
}



function closeModal() {
    const modalbg = document.querySelector(".bground");
    return modalbg.style.display = "none";
}

formEl.addEventListener('submit', onSubmit)