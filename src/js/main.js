
document.addEventListener('DOMContentLoaded', () => {
    let formPhone = document.querySelectorAll('input[name="phone"]');
    let formName = document.querySelectorAll('input[name="name"]');
    let formSubmit = document.querySelectorAll('button[type="submit"]');
    let forms = document.querySelectorAll('form');
    let scrollButton = document.querySelectorAll('.application');
    let popup = document.querySelector('.popup-bg')
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
            phone.classList.remove('touch')
            if(phone.value.length < 18) {
                phone.classList.add('error')

            } else {
                phone.classList.remove('error')
            }
        })
    })

    formName.forEach(name => {
        name.addEventListener('keypress', (e) => {
            const REG_EXP  = /[а-яёa-z\s-]/i;
            if (!e.key.match(REG_EXP)) e.preventDefault()
        })
        name.addEventListener('blur', () => {
            name.classList.remove('touch')
            const value = name.value
                .replace(/\s+/g, ' ')
                .replace(/-+/g, '-')
                .trim();
            name.value = getTrimName(value)
                .split(' ')
                .map((el) => el.slice(0, 1).toUpperCase() + el.slice(1).toLowerCase())
                .join(' ');
            if(name.value.length < 2) {
                name.classList.add('error')
            } else {
                name.classList.remove('error')
            }
        })
    })

    forms.forEach((form, i) => {
        form.addEventListener('submit', (e) => {
            e.preventDefault()
            ym(94810353,'reachGoal',`form-click-${i + 1}`)
            // console.log(`form-click-${i + 1}`)
            const inputsError = form.querySelectorAll('input.error');
            const inputsTouch = form.querySelectorAll('input.touch');
            const inputs = form.querySelectorAll('input');
            const phone = form.querySelector('input[name="phone"]')
            const name = form.querySelector('input[name="name"]')

            if(inputsError.length === 0 && inputsTouch.length === 0) {
                ym(94810353,'reachGoal',`form-send-${i + 1}`)
                // console.log(`form-send-${i + 1}`)
                Comagic.sitePhoneCall( {  phone: (phone.value).match(/\d/g).join('') });
                phone.value = ''
                name.value = ''
                phone.classList.add('touch')
                name.classList.add('touch')
                popup.classList.add('active');
                setTimeout(() =>(popup.classList.remove('active')), 3000)
            }

            if (inputsTouch.length > 0) {
                inputsTouch.forEach(input => {
                    input.classList.remove('touch')
                    input.classList.add('error')
                })
            }
        })
    })

    setTimeout(() =>{
        ym(94810353,'reachGoal','60sec')
        // console.log('60sec')
    }, 60000)
    setTimeout(() =>{
        ym(94810353,'reachGoal','120sec')
        // console.log('120sec')
    }, 60000)

    scrollButton.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            let min = Infinity;
            let index = 0;

            forms.forEach((formTarget, i) => {
                if (Math.abs(formTarget.getBoundingClientRect().y - e.pageY) < Math.abs(min)) {
                    min = Math.abs(formTarget.getBoundingClientRect().y - e.pageY);
                    index = i;
                }
            })

            window.scrollTo({
                top: e.pageY + forms[index].getBoundingClientRect().y - e.clientY  - (window.innerHeight / 2),
                behavior: "smooth",
            })
        })
    })

    console.log(new Date())
})

