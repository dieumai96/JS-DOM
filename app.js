let API_ENDPOINT = 'http://localhost:9000'
var attempt = 3;
const onLogin = document.getElementById('onLogin');

onLogin.addEventListener('click', function (e) {
    e.preventDefault()
    var phone = document.getElementById("phone").value;
    var password = document.getElementById("password").value;
    if (phone != "" && password != "") {
        let body = {
            phone,
            password
        }
        $.ajax({
            url: `${API_ENDPOINT}/api/employee/login`,
            data: body,
            method: 'POST',
            success: function (result) {
                if (result.status == 0) {
                    localStorage.setItem('token',result.token)
                    window.location = "home.html";
                } else {
                    attempt--;
                    alert("You have left " + attempt + " attempt;");
                    if (attempt == 0) {
                        document.getElementById("phone").disabled = true;
                        document.getElementById("password").disabled = true;
                        document.getElementById("onLogin").disabled = true;
                        return false;
                    }
                }
            }
        })
    } else {
        alert("Chưa nhập đủ thông tin");
    }
})

function validate(e) {

}