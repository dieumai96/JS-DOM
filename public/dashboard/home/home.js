const onLogout = document.getElementById('onLogout');
onLogout.addEventListener('click', function (e) {
    e.preventDefault();
    actionLogout();
})
function goToMenu(action) {
    switch (action) {
        case 'Flat': {
            window.location.href = '/list-flat'
            break
        }
        case 'Notification': {
            console.log("Notification");
            break
        }
        case 'Reflect': {
            window.location.href = "/reflect";
            break
        }
        default: {
            break
        }
    }
}

function actionLogout() {
    localStorage.clear();
    window.location = "login.html";
}