const onLogout = document.getElementById('onLogout');
let totalItem;
let pageNow;
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
async function init(page) {
    const loadingView = document.getElementById('loading');
    loadingView.style.display = "block";
    pageNow = page;
    await $.ajax({
        method: 'POST',
        url: `${API_ENDPOINT}/api/reflects/reflects4Employee`,
        headers: {
            'Authorization': fakeToken,
        },
        data: {
            isConcludeCount: true,
            limit: 20,
            page
        },
        success: async function (result) {
            loadingView.style.display = "none";
            if (result.status == 0) {
                if (result.data) {
                    await setContentTable(result.data);
                    totalItem = result.totalCount;
                    await renderPagination(totalItem);
                }
            } else {
                console.log("Khong tim thay danh sach");
            }
        },
    });

    let pageLink = document.querySelectorAll('.page-have-number');
    pageLink.forEach((e, index) => {
        let id = e.getAttribute('id');
        let item = document.getElementById(`${id}`);
        item.addEventListener('click', function () {
            selectPage(id, index, getTotalPage())
        })
    })
    let prev0 = document.getElementById("prev-to-0");
    let prevOne = document.getElementById("prev-one");
    if (pageNow == 1) {
        prev0.style.pointerEvents = 'none';
        prev0.style.opacity = .5;
        prevOne.style.pointerEvents = 'none';
        prevOne.style.opacity = .5;
    } else {
        prev0.style.pointerEvents = 'unset';
        prev0.style.opacity = 'initial';
        prevOne.style.pointerEvents = 'unset';
        prevOne.style.opacity = 'initial';
    }
    let nextMax = document.getElementById("next-to-max");
    let nextOne = document.getElementById("next-one");
    if (pageNow == getTotalPage()) {
        nextMax.style.pointerEvents = 'none';
        nextMax.style.opacity = .5;
        nextOne.style.pointerEvents = 'none';
        nextOne.style.opacity = .5;
    } else {
        nextMax.style.pointerEvents = 'unset';
        nextMax.style.opacity = 'initial';
        nextOne.style.pointerEvents = 'unset';
        nextOne.style.opacity = 'initial';
    }
}

init(1);

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
{/* <li class="page-item page-item-number">
<a class="page-link dpl-block active" style="border-left: 0px;border-right: 0px;">1</a>
</li> */}
function renderPagination(totalCount) {
    let contentPagination = document.getElementById('content-page');
    let totalPage = getTotalPage();
    let allPage = '';
    for (let i = 0; i < totalPage; i++) {
        let page = "<li class = 'page-item page-item-number'>" +
            `<a class = 'page-have-number page-link dpl-block-${i}'  id = 'dpl-block-${i}'> ` + (i + 1) + "</a>"
        allPage += page;
    }
    $('#content-page').html(allPage);
    toggleClassActivePaginationFirstTime();
}



function toggleClassActivePaginationFirstTime() {
    let item = document.getElementById('dpl-block-0');
    item.classList.add('active');
}

async function selectPage(id, page, totalItem) {
    await init(page + 1);
    for (let i = 0; i <= totalItem; i++) {
        $(`.dpl-block-${i}`).removeClass('active');
    }
    $(`.dpl-block-${page}`).addClass('active');
}

async function selectPageMax() {
    let totalPage = getTotalPage();
    await init(totalPage);
    for (let i = 0; i <= totalPage - 1; i++) {
        $(`.dpl-block-${i}`).removeClass('active');
    }
    $(`.dpl-block-${totalPage - 1}`).addClass('active');
}

async function selectMinPage() {
    await init(1);
    let totalPage = getTotalPage();
    for (let i = 0; i <= totalPage; i++) {
        $(`.dpl-block-${i}`).removeClass('active');
    }
    $(`.dpl-block-0`).addClass('active');
}

async function prevPage() {
    let totalPage = getTotalPage();
    await init(pageNow - 1);
    for (let i = 0; i <= totalPage; i++) {
        $(`.dpl-block-${i}`).removeClass('active');
    }
    $(`.dpl-block-${pageNow - 1}`).addClass('active');
}

async function nextPage() {
    await init(pageNow + 1);
    let totalPage = getTotalPage();
    for (let i = 0; i <= totalPage; i++) {
        $(`.dpl-block-${i}`).removeClass('active');
    }
    $(`.dpl-block-${pageNow - 1}`).addClass('active');
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

function getTotalPage() {
    return Math.ceil(totalItem / 20);
}