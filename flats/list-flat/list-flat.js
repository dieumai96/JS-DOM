
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
    const view = document.querySelectorAll('.action .fa-eye');
    const edit = document.querySelectorAll('.action .fa-edit');
    const trash = document.querySelectorAll('.action .fa-trash');
    let listItem = [{ item: [...view], type: 'view' }, { item: [...edit], type: 'edit' }, { item: [...trash], type: 'trash' }]
    let listChoice = [];
    listItem.forEach(e => {
        console.log(e)

        e.item.forEach(el => {
            el.addEventListener('click', function () {

                switch (e.type) {

                    case 'view': {
                        listChoice = [];
                        listChoice.push({
                            type: 'view',
                            id: el.getAttribute('id')
                        })
                        break;
                    }
                    case 'edit': {
                        listChoice = [];
                        listChoice.push({
                            type: 'edit',
                            id: el.getAttribute('id')
                        })
                        break;
                    }
                    case 'trash': {
                        listChoice = [];
                        listChoice.push({
                            type: 'trash',
                            id: el.getAttribute('id')
                        })
                        break;
                    }
                }
                console.log(listChoice)
            })
        })
    })
}

init();


function setContentTable(content) {
    const tableContent = document.getElementById('body-table');
    let allRow = '';
    content.forEach(e => {
        var row = '<tr>' +
            '<td class="action">' + `<i class='fa fa-eye' id = ${e._id} ` + '</i>' + `<i class='fa fa-edit' id = ${e._id} ` + '</i>' + `<i class='fa fa-trash' id = ${e._id} ` + '</i>' + '</td > ' +
            '<td>' + e.block + '</td>' +
            '<td>' + e.soPhong + '</td>' +
            '<td>' + e.owerName + '</td>' +
            '<td>' + e.code + '</td>' +
            '<td>' + e.flatType + '</td>'
        allRow += row;
    })

    $('#body-table').html(allRow);
}
// open popup

$(document).ready(function () {
    $("#myBtn").click(function () {
        getBuildingInfo();
        $("#myModal").modal({ backdrop: 'static', keyboard: false });
    });
});

async function getBuildingInfo() {
    const loadingView = document.getElementById('loading');
    loadingView.style.display = "block";
    await $.ajax({
        method: 'POST',
        url: `${API_ENDPOINT}/api/building/getBuildingInfomation`,
        headers: {
            'Authorization': localStorage.getItem('token'),
        },
        data: {
            buildingID: "5d5cb5b94c3b5b2a0c6ca11a"
        },
        success: async function (result) {
            loadingView.style.display = "none";
            if (result.status == 0) {
                var select = document.getElementById("slect-block");
                result.data.blocks.forEach((e, index) => {
                    select.options[select.options.length] = new Option(e, e);
                })
            } else {
                console.log("Khong tim thay danh sach");
            }
        },
    });
}

function validateForm() {
    let selectBlock = document.getElementById('slect-block');
    let inputNumber = document.getElementById('input-number');
    let inputPhone = document.getElementById('input-phone');
    let errorAlert = [];
    if (!inputNumber.value) {
        errorAlert.push("Input number is required")
    }
    if (!selectBlock.value) {
        errorAlert.push("Block is required")
    }
    let isVNPhoneMobile = /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;
    if (inputPhone.value && !isVNPhoneMobile.test(inputPhone.value)) {
        errorAlert.push('Phone is invalid');
    }
    let randomError = 0;
    if (errorAlert.length) {
        randomError = randomNumber(errorAlert.length);
        alert(errorAlert[randomError])
    } else {
        alert("Success, you can submit");
    }
}

function randomNumber(to) {
    return Math.floor(Math.random() * to)
}

function actionLogout() {
    localStorage.clear();
    window.location = "./../../login.html";
}