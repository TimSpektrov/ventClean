function setCookie(name, value) {
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
}
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? +(decodeURIComponent(matches[1])) : undefined;
}
function deleteCookie(name) {
    setCookie(name, "", {
        'max-age': -1
    })
}

let today = new Date()

if(!getCookie('last_session')
    || (((+today - +getCookie('last_session')) / ((1000 * 60 * 60 * 24) - 30))) > 30) {
    setTimeout(() =>{
        ym(94810353,'reachGoal','uni60sec')
        console.log('unic')
    }, 60000)
}
setCookie('last_session', +today)


