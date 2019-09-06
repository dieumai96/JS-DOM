
const { fromEvent, pipe, of, forkJoin } = rxjs;
const { tap, map, skipWhile, exhaustMap, catchError, concatMap, } = rxjs.operators;
const { ajax } = rxjs.ajax;
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
let data = {}
let listFile = {};
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
                data = result.data;
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
    document.getElementById("reflect-title").innerHTML = data.title;
    document.getElementById("reflect-content").innerHTML = data.content;

    // list-comment reflect
    let hashTypeComment = ['Comment', 'ReflectAssign', 'ReflectProcess'];
    let { listComment } = data;
    let allCommentDisplay = '';
    let commentCompleteReflect = '';
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
                        if (element.status != 6) {
                            item += '<li>' +
                                '<span>' + '<span style = "font-weight : 600">' + element.createdByName + '</span>' + ' đã chuyển sang ' + `<span style = "font-weight : 600" id = '${setIdStatus(element.status)}'>` + customStatus(element.status) + '</span>' + '<span>' + " (" + transformDate(element.meta.timeCreated, 'hour') + ")" +
                                '</li >'
                        }
                    }
                    case 'Comment': {
                        if (element.msgType == 'Text') {
                            item += `<img class="user-avatar" src="${element.avatar ? element.avatar : 'https://i.imgur.com/sR0YxV7.png'}">` +
                                `<div style="padding-top : 5px;float : left">` + `<span class="name" style = 'font-weight : 600'>${element.fullName}</span>` + '<br>' + `<span class="name">${element.content[0]}</span>` + '<br>' + " (" + transformDate(element.meta.timeCreated, 'hour') + ")" +
                                '</div>' + '<div style = "clear : both"></div>'
                        }
                        break;
                    }
                }
                if (element.type == 'ReflectProcess' && element.status == 6) {
                    commentCompleteReflect += '<li>' +
                        '<span>' + '<span style = "font-weight : 600">' + element.createdByName + '</span>' + ' đã xác nhận hoàn thành ' + '<span>' + " (" + transformDate(element.meta.timeCreated, 'hour') + ")" +
                        '</li >'
                }
                allCommentDisplay += item;
            }
        });
    }
    document.getElementById("list-comment").innerHTML = allCommentDisplay + commentCompleteReflect;
}

function onChangeImage(event, type) {
    let target = event.target || event.srcElement;
    var files = document.getElementById("file-input").files;
    let lists = [];
    for (var i = 0; i < files.length; i++) {
        lists.push(files[i]);
    }
    listFile = Object.assign({}, { type, files: [...lists] })
    if (listFile.type == 'Image') {
        let listFileResponse = [];
        let files$ = of(listFile.files);
        files$.pipe(
            map(files => {
                files.map(value => {
                    let form = new FormData();
                    form.append('files', value);
                    return ajax({
                        method: "POST",
                        url: `${API_ENDPOINT}/api/files/upload`,
                        body: form
                    }).pipe(
                        catchError(error => of(null)),
                        tap(res => {
                            if (res.response.success) {
                                listFileResponse.push(res.response.file);
                            }
                        })
                    );
                })
            }),
            concatMap(values => forkJoin(...values))
        ).subscribe(async res => {
            console.log(res);
        })
    }
}
// comment area
let buttonComment = document.querySelector('#conment-button');
let valueText
fromEvent(buttonComment, 'click').pipe(
    map(() => {
        valueText = document.getElementById('content-comment').value
        let body;
        if (typeof data.lastProcess != 'undefined') {
            body = {
                reflectID: data.id,
                reflectProcessID: data.lastProcess.id,
                content: new Array(valueText),
                msgType: 'Text',
            }
        } else {
            body = {
                reflectID: data.id,
                content: new Array(valueText),
                msgType: 'Text',
            }
        }
        return body;
    }),
    exhaustMap(body => {
        return ajax({
            url: `${API_ENDPOINT}/api/comments/create`,
            method: 'POST',
            headers: {
                'Authorization': fakeToken,
                'Content-Type': 'application/json',
            },
            body,
        })
    })
).subscribe(res => {
    if (res.status == 200) {
        if (res.response.status == 0) {
            document.getElementById('content-comment').value = '';
            init();
        }
    }
});

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
