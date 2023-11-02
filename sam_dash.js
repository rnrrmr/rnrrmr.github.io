
// JavaScript로 HTML 요소를 가져오기
var toggleButton = document.getElementById("toggleButton");
var myTable = document.getElementById("myTable");
var slider = document.getElementById("slider")
var clickbutton = document.getElementById("clickbutton")

// 페이지가 로드되면 초기에 테이블, 클릭 버튼 숨김
window.addEventListener('load', function() {
    myTable.style.display = "none";
    clickbutton.style.display = "none";
});

// 버튼 클릭 시 테이블, 클릭 버튼 토글 처리
toggleButton.addEventListener("click", function() {
    if (myTable.style.display === "none" || myTable.style.display === "") {
        myTable.style.display = "table"; // 테이블 표시
        clickbutton.style.display = "block"; // 클릭 버튼 표시
    } else {
        myTable.style.display = "none"; // 테이블 숨김
        clickbutton.style.display = "none"; // 클릭 버튼 숨김
    }
});


// 체크 박스 상태를 확인하고 필터링 된 데이터를 업데이트하는 함수
function filterData() {
    var checkBoxLease = document.getElementById('checklease');
    var checkBoxMonthly = document.getElementById('checkmonth');
    var table = document.getElementById('myTable');
    var rows = table.getElementsByTagName('tr');
    
    for (var i = 1; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName('td');
        var leaseValue = cells[2].textContent; // 전세 또는 월세 값이 있는 열 (예: 2은 데이터에서 3번째 열을 나타냄)
        var monthlyValue = cells[1].textContent; // 월세 값이 있는 열 (예: 1은 데이터에서 2번째 열을 나타냄)

        // 체크 박스 상태에 따라 필터링
        if (checkBoxMonthly.checked && monthlyValue === 'O') {
            rows[i].style.display = '';
        } else if (checkBoxLease.checked && leaseValue === 'O') {
            rows[i].style.display = '';
        } else if (checkBoxLease.checked && checkBoxMonthly.checked) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
}



// 체크 박스의 변경 이벤트에 filterData 함수를 연결
var checkBoxLease = document.getElementById('checklease');
var checkBoxMonthly = document.getElementById('checkmonth');
checkBoxLease.addEventListener('change', filterData);
checkBoxMonthly.addEventListener('change', filterData);

//---------------------------
function extractNumber(str) {
    const regex = /(\d+(\.\d+)?)㎡/; // 정규식을 사용하여 숫자(소수점 포함) 뒤에 '㎡'를 찾음
    const match = str.match(regex);
    
    if (match) {
        return parseFloat(match[1]); // 숫자 부분을 추출하고 숫자로 변환
    } else {
        return NaN; // 일치하는 패턴이 없으면 NaN 반환
    }
}

function compareArea(a, b) {
    const numA = extractNumber(a);
    const numB = extractNumber(b);

    if (!isNaN(numA) && !isNaN(numB)) {
        return numA - numB;
    }

    return 0; // 숫자가 아닌 경우에는 정렬하지 않음
}

// 페이지가 로드된 후 데이터를 추가
window.addEventListener('load', addDataToTable);

// 정렬을 위한 셀렉트 박스 선택 이벤트
var sortSelect = document.getElementById('sort-select');
sortSelect.addEventListener('change', function () {
    var tableBody = document.querySelector('#myTable tbody');
    var rows = Array.from(tableBody.rows);

    // 데이터를 추출하여 순서대로 정렬
    rows.sort(function (a, b) {
        var cellA = a.cells[a.cells.length - 1].textContent; // 마지막 열의 데이터 추출
        var cellB = b.cells[b.cells.length - 1].textContent;

        if (sortSelect.value === 'asc') {
            return compareArea(cellA, cellB);
        } else if (sortSelect.value === 'desc') {
            return compareArea(cellB, cellA);
        }

        return 0;
    });

    // 정렬된 데이터로 테이블 업데이트
    tableBody.innerHTML = '';
    rows.forEach(function (row) {
        tableBody.appendChild(row);
    });
});






