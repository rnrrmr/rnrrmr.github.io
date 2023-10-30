var map = new naver.maps.Map("map", {
    center: new naver.maps.LatLng(37.52914341133875, 126.99554368848251),
    zoom: 15,
    minZoom: 8,
    zoomControl: true,
    zoomControlOptions: {
        style: naver.maps.ZoomControlStyle.SMALL,
        position: naver.maps.Position.TOP_RIGHT
    }
});

var infoWindow = new naver.maps.InfoWindow({
    anchorSkew: true
});



map.setCursor('pointer');
function searchCoordinateToAddress(latlng) {
    infoWindow.close();
    naver.maps.Service.reverseGeocode({
        coords: latlng,
        orders: [
            naver.maps.Service.OrderType.ADDR,
            naver.maps.Service.OrderType.ROAD_ADDR
        ].join(',')
    }, function(status, response) {
        if (status === naver.maps.Service.Status.ERROR) {
            return alert('Something Wrong!');
        }

        var items = response.v2.results,
            address = '',
            htmlAddresses = [];

        for (var i=0, ii=items.length, item, addrType; i<ii; i++) {
            item = items[i];
            address = makeAddress(item) || '';
            addrType = item.name === 'roadaddr' ? '[도로명 주소]' : '[지번 주소]';

            htmlAddresses.push((i+1) +'. '+ addrType +' '+ address);
        }

        infoWindow.setContent([
            '<div style="padding:10px;min-width:200px;line-height:150%;">',
            '<h5 style="margin-top:5px;">검색 지역</h5><br />',
            htmlAddresses.join('<br />'),
            '</div>'
        ].join('\n'));

        infoWindow.open(map, latlng);
    });
}

function searchAddressToCoordinate(address) {
    naver.maps.Service.geocode({
        query: address
    }, function(status, response) {
        if (status === naver.maps.Service.Status.ERROR) {
            return alert('Something Wrong!');
        }

        if (response.v2.meta.totalCount === 0) {
            return alert('totalCount' + response.v2.meta.totalCount);
        }

        var htmlAddresses = [],
            item = response.v2.addresses[0],
            point = new naver.maps.Point(item.x, item.y);

        if (item.roadAddress) {
            htmlAddresses.push('[도로명 주소] ' + item.roadAddress);
        }

        if (item.jibunAddress) {
            htmlAddresses.push('[지번 주소] ' + item.jibunAddress);
        }

        if (item.englishAddress) {
            htmlAddresses.push('[영문명 주소] ' + item.englishAddress);
        }

        infoWindow.setContent([
            '<div style="padding:10px;min-width:200px;line-height:150%;">',
            '<h5 style="margin-top:5px;">검색 주소 : '+ address +'</h5><br />',
            htmlAddresses.join('<br />'),
            '</div>'
        ].join('\n'));

        map.setCenter(point);
        infoWindow.open(map, point);
    });
}

function initGeocoder() {
    map.addListener('click', function(e) {
        searchCoordinateToAddress(e.coord);
    });

    $('#address').on('keydown', function(e) {
        var keyCode = e.which;

        if (keyCode === 13) { // Enter Key
            searchAddressToCoordinate($('#address').val());
        }
    });

    $('#submit').on('click', function(e) {
        e.preventDefault();

        searchAddressToCoordinate($('#address').val());
    });

    searchAddressToCoordinate('정자동 178-1');
}

function makeAddress(item) {
    if (!item) {
        return;
    }

    var name = item.name,
        region = item.region,
        land = item.land,
        isRoadAddress = name === 'roadaddr';

    var sido = '', sigugun = '', dongmyun = '', ri = '', rest = '';

    if (hasArea(region.area1)) {
        sido = region.area1.name;
    }

    if (hasArea(region.area2)) {
        sigugun = region.area2.name;
    }

    if (hasArea(region.area3)) {
        dongmyun = region.area3.name;
    }

    if (hasArea(region.area4)) {
        ri = region.area4.name;
    }

    if (land) {
        if (hasData(land.number1)) {
            if (hasData(land.type) && land.type === '2') {
                rest += '산';
            }

            rest += land.number1;

            if (hasData(land.number2)) {
                rest += ('-' + land.number2);
            }
        }

        if (isRoadAddress === true) {
            if (checkLastString(dongmyun, '면')) {
                ri = land.name;
            } else {
                dongmyun = land.name;
                ri = '';
            }

            if (hasAddition(land.addition0)) {
                rest += ' ' + land.addition0.value;
            }
        }
    }

    return [sido, sigugun, dongmyun, ri, rest].join(' ');
}

function hasArea(area) {
    return !!(area && area.name && area.name !== '');
}

function hasData(data) {
    return !!(data && data !== '');
}

function checkLastString (word, lastString) {
    return new RegExp(lastString + '$').test(word);
}

function hasAddition (addition) {
    return !!(addition && addition.value);
}

naver.maps.onJSContentLoaded = initGeocoder;

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
