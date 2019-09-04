const onLogout = document.getElementById('onLogout');
onLogout.addEventListener('click', function (e) {
    e.preventDefault();
    actionLogout();
})

function goToMenu(action) {
    switch (action) {
        case 'Flat': {
            window.location = "./../../flats/list-flat/list-flat.html";
            break
        }
        case 'Notification': {
            console.log("Notification");
            break
        }
        case 'Reflect': {
            window.location = "./list-reflect.html";
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
        url: `${API_ENDPOINT}/api/reflects/reflects4Employee`,
        headers: {
            'Authorization': fakeToken,
        },
        data: {
            isConcludeCount: true,
            limit: 20,
            page: 1
        },
        success: function (result) {
            loadingView.style.display = "none";
            let totalItem;
            if (result.status == 0) {
                if (result.data) {
                    setContentTable(result.data);
                }
                totalItem = result.totalCount;
                console.log(totalItem);
            } else {
                console.log("Khong tim thay danh sach");
            }
        },
    });
}

init();

function setContentTable(content) {
    const tableContent = document.getElementById('body-table');
    let allRow = '';
    content.forEach((e, index) => {
        e.titleTransform = transformText(e.title, 25);
        e.job = e.jobScope ? e.jobScope : 'ALL';
        e.assign = e.assignTo ? e.assignToFullName : '';
        e.deadline = e.deadline ? e.deadline : '';
        e.scoreCustom = e.scores ? e.scores + '&nbsp;' + "<i class = 'fa fa-star' style = 'color : #ffcc00'></i>" : '';
        switch (e.status) {
            case 1: {
                e.statusCustom = 'Chờ tiếp nhận'
                break;
            }
            case 2: {
                e.statusCustom = 'Đã tiếp nhận'
                break;
            }
            case 3: {
                e.statusCustom = 'Đang xử lý'
                break;
            }
            case 4: {
                e.statusCustom = 'Ngừng xử lý'
                break;
            }
            case 5: {
                e.statusCustom = 'Hoàn thành'
                break;
            }
            case 6: {
                e.statusCustom = 'Xác nhận hoàn thành'
                break;
            }
            case 7: {
                e.statusCustom = 'Đã thu hồi'
                break;
            }
        }
        var row = '<tr>' +
            '<td class="action">' + `<i class='fa fa-bell'` + '</i>' + '</td > ' +
            '<td>' + e.titleTransform + '</td>' +
            '<td>' + e.soPhong + '</td>' +
            '<td>' + e.job + '</td>' +
            '<td>' + e.meta.timeCreated + '</td>' +
            "<td>" + e.assign + '</td>' +
            `<td class = "status-${e.status}" id = 'custom-status'>` + e.statusCustom + '</td>' +
            `<td class = 'miss-dealine' id = ${e.id} deadline = ${e.deadline}>` + e.deadline + '</td>' +
            '<td>' + e.scoreCustom + '</td>' +
            '<td>' + "<button class ='btn btn-primary' style='background: #73a1ff;border : none;font-size : 12px;text-transform : uppercase;font-family : 'Exo',sans-serif'>Reslove</button>" + '</td>'
        allRow += row;
    })

    $('#body-table').html(allRow);
    removeMissDeadlineClass();
}

function removeMissDeadlineClass() {
    let listClass = document.querySelectorAll('td.miss-dealine')
    listClass.forEach(e => {
        let getId = e.getAttribute('id');
        let item = document.getElementById(`${getId}`);
        let deadline = item.getAttribute('deadline');
        let dateNow = Date.now();
        if (deadline && (dateNow < Number(deadline))) {
            $(`#${getId}`).removeClass('miss-dealine')
        }
    })
}



function transformText(text, length) {
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