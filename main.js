let allForms = Array.from(document.querySelectorAll('form'))

let inputs = Array.from(document.querySelectorAll('input'))
allForms.forEach(form => {
    form.addEventListener('submit', function (e) {
        e.preventDefault()
        let formIsValid = validateForm(this)
        if (formIsValid) {
            clearInput()
            console.log('form is valid');
        } else {
            console.log('Go home');
        }
    })
})


function validateForm(form) {

    var isValid = false
    let required = Array.from(form.querySelectorAll('input[required]'))
    let checkbox = Array.from(form.querySelectorAll('input[type="checkbox"'))
    let emailFields = required.filter(input => input.getAttribute('type') === 'email')
    let phoneFields = required.filter(input => input.getAttribute('type') === 'tel')
    var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var phoneFormat = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    let allErrors = [checkEmpty(), checkEmail(), checkPhone(), checkBox(), validateSelect(), checkLength(), isEmptyFile()]
    // console.log(getSelect.selectedIndex);

    function checkEmpty() {
        let errors = []
        required.forEach(input => {
            let errorElm = input.nextElementSibling
            if (input.value.trim() == '') {
                errors.push('error')
                errorElm.classList.add('active')
            } else {
                input.nextElementSibling.classList.remove('active')
            }
        })
        return errors.length <= 0
    }

    function checkEmail() {
        let errors = []
        emailFields.forEach(input => {
            if (!input.value.trim().match(mailFormat)) {
                errors.push('error')
                input.nextElementSibling.classList.add('active')
            } else {
                input.nextElementSibling.classList.remove('active')
            }
        })
        return errors.length <= 0
    }

    function checkPhone() {
        let errors = []
        phoneFields.forEach(input => {
            if (!input.value.trim().match(phoneFormat)) {
                errors.push('error')
                input.nextElementSibling.classList.add('active')
            } else {
                input.nextElementSibling.classList.remove('active')
            }
        })
        return errors.length <= 0
    }

    function checkBox() {
        let errors = []
        var errorSpan = document.querySelector('.cheboxError')
        var newCh = checkbox.filter(elm => elm.checked);
        if (newCh.length < checkbox.length) {
            errors.push('error')
            errorSpan.classList.add('active')
        } else {
            errorSpan.classList.remove('active')
        }
        return errors.length <= 0
    }

    function validateSelect() {
        var errorSpan = document.querySelector('.selectError')
        if (document.submitform.select.selectedIndex == 0) {
            errorSpan.classList.add('active')

        } else {
            errorSpan.classList.remove('active')
        }
    }

    function checkLength() {
        var lessThanThree = document.querySelector('.lessthree')
        var moreThanEight = document.querySelector('.moreeigth')
        if (lessThanThree.value.length < 3) {
            lessThanThree.nextElementSibling.classList.add('active')
        } else {
            lessThanThree.nextElementSibling.classList.remove('active')
        }
        if (moreThanEight.value.length != 8) {
            moreThanEight.value = '';
            moreThanEight.nextElementSibling.classList.add('active')
        } else {
            moreThanEight.nextElementSibling.classList.remove('active')
        }
    }

    function isEmptyFile() {
        if (!document.getElementById('file').value) {
            return
        }
    }
    isValid = allErrors.indexOf(false) == -1
    return isValid
}

function clearInput() {
    inputs.forEach(input => {
        input.value = ''
        input.checked = false;
    })
}