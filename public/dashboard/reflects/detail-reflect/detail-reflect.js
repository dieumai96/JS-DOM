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
let fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZUlEIjoiRW1wbG95ZWVfU1NCXzExIiwidGltZUNyZWF0ZWQiOjE1NTM3NjcyNzg0NDEsImZ1bGxOYW1lIjoiVnUgVmFuIFRodXkiLCJiaXJ0aERhdGUiOjE1NTIzMjM2MDAwMDAsImVtYWlsIjoiYWRAZ21haWwuY29tIiwibm90ZSI6IjIyMmpqamoiLCJyb2xlcyI6WyJBRE1JTiIsIlJDTiIsIkNTUiJdLCJhY2NvdW50VHlwZSI6IkVtcGxveWVlIiwiYnVpbGRpbmdJRCI6IkJ1aWxkaW5nXzMiLCJpYXQiOjE1Njc1NzA2MjcsImV4cCI6MTU2OTc0Mjk5NzYyN30.bI8EZI2Mdw6KEO5aIR7rW867oJMEauFUKO6gj4805qY';
let data = {
    "assignTo": "Employee_SSB_11",
    "assignToName": "Vu Van Thuy",
    "buildingID": "Building_3",
    "content": "2",
    "createdBy": "User_SSB_25",
    "deadline": 1557478980000,
    "flatID": "Flat_SSB_50",
    "id": "Reflect_SSB_124",
    "image": [],
    "jobScope": "ADMIN",
    "meta": {
        "timeCreated": 1557289249866,
        "timeModified": 1557400897197
    },
    "scores": 4,
    "soPhong": "108",
    "status": 6,
    "title": "phản ánh 2",
    "type": "Reflect",
    "userCreated": {
        "code": "SSBA2YWF",
        "flatID": "Flat_SSB_50",
        "fullName": "hue",
        "loNha": "A2",
        "phone": "0375555555",
        "soPhong": "108"
    },
    "buildingCode": "SSB",
    "buildingName": "Sun Square 1",
    "countComment": 7,
    "lastProcess": {
        "buildingID": "Building_3",
        "commentType": 1,
        "createByPhone": "0375555555",
        "createdBy": "User_SSB_25",
        "createdByName": "hue",
        "id": "ReflectProcess_SSB_251",
        "meta": {
            "timeCreated": 1557400897196
        },
        "reflectID": "Reflect_SSB_124",
        "status": 6,
        "type": "ReflectProcess"
    },
    "listComment": [
        {
            "assignTo": "Employee_SSB_5",
            "buildingID": "Building_3",
            "commentType": 2,
            "createdBy": "Employee_SSB_5",
            "fromName": "Nguyễn Đình Thạo : ThaoJ",
            "fromPhone": "0868767158",
            "id": "ReflectAssign_SSB_277",
            "meta": {
                "timeCreated": 1557290106548
            },
            "reflectID": "Reflect_SSB_124",
            "toName": "Nguyễn Đình Thạo : ThaoJ",
            "toPhone": "0868767158",
            "type": "ReflectAssign"
        },
        {
            "assignTo": "Employee_SSB_11",
            "buildingID": "Building_3",
            "commentType": 2,
            "createdBy": "Employee_SSB_43",
            "fromName": "uuu",
            "fromPhone": "0888888889",
            "id": "ReflectAssign_SSB_283",
            "meta": {
                "timeCreated": 1557306201477
            },
            "reflectID": "Reflect_SSB_124",
            "toName": "Vu Van Thuy",
            "toPhone": "0352161854",
            "type": "ReflectAssign"
        },
        {
            "accountCreate": {
                "id": "Employee_SSB_11",
                "type": "Employee"
            },
            "buildingID": "Building_3",
            "commentType": 3,
            "content": [
                "kkkkk"
            ],
            "email": "ad@gmail.com",
            "fullName": "Vu Van Thuy",
            "id": "Comment_SSB_335",
            "meta": {
                "timeCreated": 1557308030606
            },
            "msgType": "Text",
            "phone": "0352161854",
            "read": false,
            "reflectID": "Reflect_SSB_124",
            "roles": [
                "ADMIN",
                "RCN",
                "CSR"
            ],
            "type": "Comment"
        },
        {
            "buildingID": "Building_3",
            "commentType": 1,
            "createByPhone": "0352161854",
            "createdBy": "Employee_SSB_11",
            "createdByName": "Vu Van Thuy",
            "id": "ReflectProcess_SSB_233",
            "meta": {
                "timeCreated": 1557308034882
            },
            "reflectID": "Reflect_SSB_124",
            "status": 2,
            "type": "ReflectProcess"
        },
        {
            "buildingID": "Building_3",
            "commentType": 1,
            "createByPhone": "0352161854",
            "createdBy": "Employee_SSB_11",
            "createdByName": "Vu Van Thuy",
            "id": "ReflectProcess_SSB_234",
            "meta": {
                "timeCreated": 1557308040071
            },
            "reflectID": "Reflect_SSB_124",
            "status": 5,
            "type": "ReflectProcess"
        },
        {
            "accountCreate": {
                "id": "Employee_SSB_11",
                "type": "Employee"
            },
            "buildingID": "Building_3",
            "commentType": 3,
            "content": [
                "Phản ánh của bạn đã được xử lý, xin vui lòng vào đánh giá và xác nhận hoàn thành."
            ],
            "email": "ad@gmail.com",
            "fullName": "Vu Van Thuy",
            "id": "Comment_SSB_336",
            "meta": {
                "timeCreated": 1557308040594
            },
            "msgType": "Text",
            "phone": "0352161854",
            "read": false,
            "reflectID": "Reflect_SSB_124",
            "reflectProcessID": "ReflectProcess_SSB_233",
            "roles": [
                "ADMIN",
                "RCN",
                "CSR"
            ],
            "type": "Comment"
        },
        {
            "buildingID": "Building_3",
            "commentType": 1,
            "createByPhone": "0375555555",
            "createdBy": "User_SSB_25",
            "createdByName": "hue",
            "id": "ReflectProcess_SSB_251",
            "meta": {
                "timeCreated": 1557400897196
            },
            "reflectID": "Reflect_SSB_124",
            "status": 6,
            "type": "ReflectProcess"
        }
    ],
    "emplAssignedInfo": {
        "name": "Vu Van Thuy",
        "phone": "0352161854"
    }
}
async function init() {
    const loadingView = document.getElementById('loading');
    loadingView.style.display = "block";
    loadingView.style.display = "none";
    transformData(data);
    // await $.ajax({
    //     method: 'POST',
    //     url: `${API_ENDPOINT}/api/reflects/reflectsByID`,
    //     headers: {
    //         'Authorization': fakeToken,
    //     },
    //     data: {
    //         reflectID: getId()
    //     },
    //     success: async function (result) {
    //         loadingView.style.display = "none";
    //         if (result.status == 0) {
    //         }
    //     },
    // });
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
    document.getElementById("reflect-title").innerHTML = data.title;
    document.getElementById("reflect-content").innerHTML = data.content;

    // list-comment reflect
    let hashTypeComment = ['Comment', 'ReflectAssign', 'ReflectProcess'];
    console.log(data);
    let { listComment } = data;
    let allCommentDisplay = '';
    if (listComment) {
        listComment.forEach(element => {
            if (hashTypeComment.includes(element.type)) {
                let item = '';
                switch (element.type) {
                    case 'ReflectAssign': {
                        item += '<li>' +
                            '<span>' + '<span style = "font-weight : 600">' + element.fromName + '</span>' + ' đã giao cho ' + '<span style = "font-weight : 600">' + element.toName + '</span>' + '<span>' + " (" + transformDate(element.meta.timeCreated, 'hour') + ")" +
                            '</li >'
                        break;
                    }
                    case 'ReflectProcess': {
                        if (element.status == 6) {
                            item += '<li>' +
                                '<span>' + '<span style = "font-weight : 600">' + element.createdByName + '</span>' + ' đã xác nhận hoàn thành ' + '<span>' + " (" + transformDate(element.meta.timeCreated, 'hour') + ")" +
                                '</li >'
                        } else {
                            item += '<li>' +
                                '<span>' + '<span style = "font-weight : 600">' + element.createdByName + '</span>' + ' đã chuyển sang ' + `<span style = "font-weight : 600" id = '${setIdStatus(element.status)}'>` + customStatus(element.status) + '</span>' + '<span>' + " (" + transformDate(element.meta.timeCreated, 'hour') + ")" +
                                '</li >'
                        }
                    }
                    case 'Comment': {
                        if (element.msgType == 'Text') {
                            item += `<img class="user-avatar" src="${element.avatar ? element.avatar : 'https://i.imgur.com/sR0YxV7.png'}">` +
                                `<div style="padding-top : 5px;float : left">` + `<span class="name">${element.fullName}</span>` + '<br>' + " (" + transformDate(element.meta.timeCreated, 'hour') + ")" +
                                '</div>' + '<div style = "clear : both"></div>'
                        }
                        break;
                    }
                }
                allCommentDisplay += item;
            }
        });
    }
    document.getElementById("list-comment").innerHTML = allCommentDisplay;

}

function toggleContent() {
    $('#colspan-expland').toggleClass('active');
    if ($('#colspan-expland').hasClass('active')) {
        $('#reflect-content').slideUp();
        $('#colspan-expland > i').removeClass('fa-chevron-up');
        $('#colspan-expland > i').addClass('fa-chevron-down');
    } else {
        $('#reflect-content').slideDown();
        $('#colspan-expland > i').removeClass('fa-chevron-down');
        $('#colspan-expland > i').addClass('fa-chevron-up');
    }
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
function setIdStatus(status) {
    let id = ''
    switch (status) {
        case 1: {
            id = 'status-1'
            break;
        }
        case 2: {
            id = 'status-2'
            break;
        }
        case 3: {
            id = 'status-3'
            break;
        }
        case 4: {
            id = 'status-4'
            break;
        }
        case 5: {
            id = 'status-5'
            break;
        }
        case 6: {
            id = 'status-6'
            break;
        }
        case 7: {
            id = 'status-7'
            break;
        }
    }
    return id;
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
