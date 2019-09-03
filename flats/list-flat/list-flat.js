// const url = require('./../../utils/url')
// const api = require('./../../utils/api')
const onLogout = document.getElementById('onLogout');
onLogout.addEventListener('click', function (e) {
    e.preventDefault();
    actionLogout();
})
let API_ENDPOINT = 'http://localhost:9000'
async function init() {
    const loadingView = document.getElementById('loading');
    loadingView.style.display = "block";
    await $.ajax({
        method: 'POST',
        url: `${API_ENDPOINT}/api/flat/getAll`,
        headers: {
            'Authorization': localStorage.getItem('token'),
        },
        success: async function (result) {
            loadingView.style.display = "none";
            if (result.status == 0) {
                if (result.data) {
                    await setContentTable(result.data);

                }
            } else {
                console.log("Khong tim thay danh sach");
            }
        },
    });
    const eyes = document.querySelectorAll('.action i');
    console.log(eyes);
    eyes.forEach((item, id) => {
        item.addEventListener('click', () => {
            console.log(item.getAttribute('id'));
        });
    })
   
}

init();


function setContentTable(content) {
    const tableContent = document.getElementById('body-table');
    let allRow = '';
    content.forEach(e => {
        var row = '<tr>' +
            '<td class="action">' + `<i class='fa fa-eye' id = ${e._id} ` + '</i>' + '</td > ' +
            '<td>' + e.block + '</td>' +
            '<td>' + e.soPhong + '</td>' +
            '<td>' + e.owerName + '</td>' +
            '<td>' + e.code + '</td>' +
            '<td>' + e.flatType + '</td>'
        allRow += row;
    })

    $('#body-table').html(allRow);
}




function actionLogout() {
    localStorage.clear();
    window.location = "./../../login.html";
}