// JavaScript로 HTML 요소를 가져오기
var toggleButton = document.getElementById("toggleButton");
var myTable = document.getElementById("myTable");
var slider = document.getElementById("slider")
var clickbutton = document.getElementById("clickbutton")
// 버튼 클릭 시 테이블 토글 처리
toggleButton.addEventListener("click", function() {
    if (myTable.style.display === "none" || myTable.style.display === "") {
        myTable.style.display = "table"; // 테이블 표시
    } else {
        myTable.style.display = "none"; // 테이블 숨김
    }

    if (slider.style.display === "none" || slider.style.display === "") {
        slider.style.display = "block"; // 테이블 표시
    } else {
        slider.style.display = "none"; // 테이블 숨김
    }

    if (clickbutton.style.display === "none" || clickbutton.style.display === ""){
        clickbutton.style.display = "block";
    } else {
        clickbutton.style.display = "none";
    }
});

// 양방향 슬라이더
document.addEventListener('DOMContentLoaded', function () {
    var rangeOne = document.querySelector('input[name="rangeOne"]'),
        rangeTwo = document.querySelector('input[name="rangeTwo"]'),
        outputOne = document.querySelector('.outputOne'),
        outputTwo = document.querySelector('.outputTwo'),
        inclRange = document.querySelector('.incl-range');

    var updateView = function () {
        if (this.getAttribute('name') === 'rangeOne') {
            outputOne.innerHTML = this.value;
            outputOne.style.left = this.value / this.getAttribute('max') * 100 + '%';
        } else {
            outputTwo.style.left = this.value / this.getAttribute('max') * 100 + '%';
            outputTwo.innerHTML = this.value;
        }
        if (parseInt(rangeOne.value) > parseInt(rangeTwo.value)) {
            inclRange.style.width = (rangeOne.value - rangeTwo.value) / this.getAttribute('max') * 100 + '%';
            inclRange.style.left = rangeTwo.value / this.getAttribute('max') * 100 + '%';
        } else {
            inclRange.style.width = (rangeTwo.value - rangeOne.value) / this.getAttribute('max') * 100 + '%';
            inclRange.style.left = rangeOne.value / this.getAttribute('max') * 100 + '%';
        }
    };

    updateView.call(rangeOne);
    updateView.call(rangeTwo);

    document.querySelectorAll('input[type="range"]').forEach(function (input) {
        input.addEventListener('input', updateView);
    });
});
