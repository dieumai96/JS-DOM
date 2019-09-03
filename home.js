const onLogout = document.getElementById('onLogout');
onLogout.addEventListener('click', function (e) {
    e.preventDefault();
    actionLogout();
})
function goToMenu(action) {
    switch (action) {
        case 'Flat': {
            window.location = "./flats/list-flat/list-flat.html";
            break
        }
        case 'Notification': {
            console.log("Notification");
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