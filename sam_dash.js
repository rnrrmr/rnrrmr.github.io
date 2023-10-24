var _chart = document.querySelector('.chart');
var _chartBar = document.querySelectorAll('.chart-bar');
var color = ['#9986dd','#fbb871','#bd72ac','#f599dc']; //색상
var newDeg = []; //차트 deg


// toggle 부분

// JavaScript로 HTML 요소를 가져오기
var toggleButton = document.getElementById("toggleButton");
var myTable = document.getElementById("myTable");
// 버튼 클릭 시 테이블 토글 처리
toggleButton.addEventListener("click", function() {
    if (myTable.style.display === "none" || myTable.style.display === "") {
        myTable.style.display = "table"; // 테이블 표시
    } else {
        myTable.style.display = "none"; // 테이블 숨김
    }
});

function addDataToTable() {
    fetch('real_estate.csv') // CSV 파일 가져오기
        .then(response => response.text())
        .then(data => {
            // CSV 데이터를 파싱
            const rows = data.trim().split('\n').map(row => row.split(','));
            
            // 데이터를 HTML 테이블에 추가
            const tableBody = document.querySelector('#myTable tbody');
            rows.forEach(row => {
                const rowData = row.map(cell => `<td>${cell}</td>`).join('');
                tableBody.innerHTML += `<tr>${rowData}</tr>`;
            });
            
            // 테이블 표시
            document.getElementById('myTable').style.display = 'table';
        })
        .catch(error => console.error(error));
}

// 페이지가 로드된 후 데이터를 추가
window.addEventListener('load', addDataToTable);


// function insertAfter(newNode, referenceNode) {
//     referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
// }

// function chartLabel(){
//   var _div = document.createElement('div');
//   _div.className = 'chart-total';
//   _div.innerHTML = `<span class="chart-total-num">Total:<br> 3,135</span>
//                     <span class="chart-total-text1">Automobile</span>
//                     <span class="chart-total-text2">Disablility</span>
//                     <span class="chart-total-text3">Life</span>
//                     <span class="chart-total-text4">Property</span>`;
//   insertAfter(_div, _chart);
// }

// function chartDraw() {
//     for (var i = 0; i < _chartBar.length; i++) {
//         var _num = _chartBar[i].dataset.deg;
//         newDeg.push(_num);
//     }

//     _chart.style.background = 'conic-gradient(' +
//         color[0] + ' ' + newDeg[0] + 'deg, ' +
//         color[1] + ' ' + newDeg[1] + 'deg, ' +
//         color[2] + ' ' + newDeg[2] + 'deg, ' +
//         color[3] + ' ' + newDeg[3] + 'deg )';

//     chartLabel();
// }

// chartDraw();