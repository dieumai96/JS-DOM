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
let API_ENDPOINT = 'http://172.104.167.189:5000';
let fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZUlEIjoiRW1wbG95ZWVfU1NCXzExIiwidGltZUNyZWF0ZWQiOjE1NTM3NjcyNzg0NDEsImZ1bGxOYW1lIjoiVnUgVmFuIFRodXkiLCJiaXJ0aERhdGUiOjE1NTIzMjM2MDAwMDAsImVtYWlsIjoiYWRAZ21haWwuY29tIiwibm90ZSI6IjIyMmpqamoiLCJyb2xlcyI6WyJBRE1JTiIsIlJDTiIsIkNTUiJdLCJhY2NvdW50VHlwZSI6IkVtcGxveWVlIiwiYnVpbGRpbmdJRCI6IkJ1aWxkaW5nXzMiLCJpYXQiOjE1Njc1NzA2MjcsImV4cCI6MTU2OTc0Mjk5NzYyN30.bI8EZI2Mdw6KEO5aIR7rW867oJMEauFUKO6gj4805qY'
async function init() {
    const loadingView = document.getElementById('loading');
    loadingView.style.display = "block";
    await $.ajax({
        method: 'POST',
        url: `${API_ENDPOINT}/api/reflects/reflectsByID`,
        headers: {
            'Authorization': fakeToken,
        },
        data: {
            reflectID: getId()
        },
        success: async function (result) {
            loadingView.style.display = "none";
            if (result.status == 0) {
                transformData(result.data);
            }
        },
    });
}

init();

function getId() {
    let url = window.location.href;
    let lengthUrl = url.length;
    let stringMatch = 'reflect/detail';
    let indexMatch = url.search(stringMatch);
    return url.substring(indexMatch + stringMatch.length + 1 + 24, lengthUrl - 24);
}

function goToListReflect() {
    window.location.href = "/reflect";
}

function transformData(data) {
    // set title reflect
    document.getElementById("title-reflect").innerHTML = textPipeTrunce(data.title, 20);
    let tranformUserInfomation = `<img class = "user-avatar" src = "${data.userCreated.avatar ? data.userCreated.avatar : 'https://i.imgur.com/sR0YxV7.png'}">` +
        `<div style = "padding-top : 5px;float : left">` + `<span class = "name">${data.userCreated.fullName}</span>` + '<br>' + `<span class = "phone">${data.userCreated.phone}</span>` +
        '</div>' +
        '<div style = "padding-top : 5px;float : left;margin-left : 25px">'
        + '<span>Mã căn hộ</span>' + '<span style = "margin-left : 25px">' + data.userCreated.code + '</span>' +
        '</div>' +
        '<div style = "padding-top : 5px;float : left;margin-left : 25px">'
        + '<span>Số căn hộ</span>' + '<span style = "margin-left : 25px">' + data.userCreated.soPhong + '</span>' +
        '</div>' +
        '<div style = "padding-top : 5px;float : left;margin-left : 25px">'
        + '<span>Ngày tạo</span>' + '<span style = "margin-left : 25px">' + transformDate(data.meta.timeCreated, 'hour') + '</span>' +
        '</div>'
    document.getElementById("user-infomation").innerHTML = tranformUserInfomation;
    let userHandler = '<div style = "margin-top : 20px">' + '<span>Người phụ trách: ' + '<span style = "font-size : 16px;color : #5d66dd;font-weight : 600">' + `${typeof data.assignTo != 'undefined' ? data.assignToName : 'Chưa có người phụ trách'}` + '</span>' + '</span>' + '<div>'
    document.getElementById('handler').innerHTML = userHandler;
    let statusReflect = '<div style = "margin-top : 10px">' + '<span>Trạng thái cuối cùng: ' + '<span style = "font-size : 16px;color : #5d66dd;font-weight : 600">' + `${customStatus(data.status)}` + '</span>' + '</span>' + '<div>'
    document.getElementById('status-reflect').innerHTML = statusReflect;
}


function transformDate(value, type) {
    if (!value) {
        return "";
    } else {
        let stringDate = new Date(value);
        return type == 'hour' ? moment(String(stringDate)).format("h:mm A | DD/MM/YYYY") : moment(String(stringDate)).format("DD/MM/YYYY");
    }
}

function textPipeTrunce(text, length) {
    let transform = '';
    if (!text.length) {
        return '';
    } else {
        if (text.length < length) {
            transform = text;
        } else {
            let spliceText = text.substring(0, length);
            spliceText += '...';
            transform = spliceText;
        }
    }
    return transform
}
function customStatus(status) {
    let statusName = ''
    switch (status) {
        case 1: {
            statusName = 'Chờ tiếp nhận'
            break;
        }
        case 2: {
            statusName = 'Đã tiếp nhận'
            break;
        }
        case 3: {
            statusName = 'Đang xử lý'
            break;
        }
        case 4: {
            statusName = 'Ngừng xử lý'
            break;
        }
        case 5: {
            statusName = 'Hoàn thành'
            break;
        }
        case 6: {
            statusName = 'Xác nhận hoàn thành'
            break;
        }
        case 7: {
            statusName = 'Đã thu hồi'
            break;
        }
    }
    return statusName;
}
function actionLogout() {
    localStorage.clear();
    window.location = "login.html";
}
