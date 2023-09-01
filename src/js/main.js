document.addEventListener('DOMContentLoaded', () => {
    let formPhone = document.querySelectorAll('input[name="phone"]')
    let formName = document.querySelectorAll('input[name="name"]')
    let formSubmit = document.querySelectorAll('button[type="submit"]')
    let forms = document.querySelectorAll('form')
    function getTrimName(value) {
        if (value[0] === '-') {
            return getTrimName(value.slice(1).trim());
        }
        if (value[value.length - 1] === '-') {
            return getTrimName(value.slice(0, -1).trim());
        }
        return value;
    }

    formPhone.forEach(phone => {
        phone.addEventListener('keypress', (e) => {
            const REG_EXP  = /[0-9]/
            if (!e.key.match(REG_EXP)) e.preventDefault()
            if(phone.value.length < 2) {
                phone.value = `+7 (`
                if (e.key.match(/[+78]/)) e.preventDefault()
            }
            if(phone.value.length === 7) phone.value = phone.value + ') '
            if(phone.value.length === 12) phone.value = phone.value + '-'
            if(phone.value.length === 15) phone.value = phone.value + '-'
            if(phone.value.length > 17) e.preventDefault()

        })
        phone.addEventListener('blur', (e) => {
            phone.classList.add('touch')
            if(phone.value.length < 18) {
                phone.classList.add('error')
                console.log('phone error')
            } else {
                phone.classList.remove('error')
                console.log('phone remove error')
            }
        })
    })

    formName.forEach(name => {
        name.addEventListener('keypress', (e) => {
            const REG_EXP  = /[а-яё\s-]/i;
            if (!e.key.match(REG_EXP)) e.preventDefault()
        })
        name.addEventListener('blur', () => {
            const value = name.value
                .replace(/\s+/g, ' ')
                .replace(/-+/g, '-')
                .trim();
            name.value = getTrimName(value)
                .split(' ')
                .map((el) => el.slice(0, 1).toUpperCase() + el.slice(1).toLowerCase())
                .join(' ');

            name.classList.add('touch')
            if(name.value.length < 2) {
                name.classList.add('error')
            } else {
                name.classList.remove('error')
                // name.value = name.value[0].toUpperCase() + name.value.slice(1).toLowerCase()
            }
        })
    })

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault()
            const inputsError = form.querySelectorAll('input.error');
            const inputsTouch = form.querySelectorAll('input.touch');
            const inputs = form.querySelectorAll('input');

            if(inputsError.length === 0 && inputsTouch.length === inputs.length  ) {
                console.log('OK!')
            }
        })
    })
})

