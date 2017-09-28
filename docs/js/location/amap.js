var map = new AMap.Map('container',{
    resizeEnable: true,
    zoom: 13
});
map.setCity('北京市');

var geocoder
AMap.plugin(['AMap.ToolBar', 'AMap.Geocoder'],function(){
    geocoder = new AMap.Geocoder({
        city: "010"//城市，默认：“全国”
    });
    map.addControl(new AMap.ToolBar());
    map.addControl(geocoder);
});

function getMarker (map, model, markers) {
    var address = model.address;
    geocoder.getLocation(address, function(status,result){
        queryNum++
        var marker
        if(status=='complete'&&result.geocodes.length){
            marker = new AMap.Marker({
                map: map,
                position: result.geocodes[0].location
            });
            marker.model = model
            marker.setLabel({//label默认蓝框白底左上角显示，样式className为：amap-marker-label
                offset: new AMap.Pixel(20, 20),//修改label相对于maker的位置
                content: model.name
            });
            markers.push(marker);

            position.push({
                lng: result.geocodes[0].location.lng,
                lat: result.geocodes[0].location.lat,
                count: position.length + 1,
                ...model
            })
        }else{
            console.log('获取位置失败', address);
        }
        return marker
    })
}
var markers = []
var position = []
var locationCount = 0
var queryNum = 0
function modelsToMap (map, models) {
    markers = []
    locationCount= models ? models.length : 0
    queryNum = 0
    var model
    for (model of models) {
        getMarker(map, model, markers)
    }
}

function load () {
    // address 从 address.js中获取
    // address 数据格式
    // var address = [{'name': '天安门','address':'xxx号'},{'name': '水立方','address':'yyy号'}]
    modelsToMap(map, address)
}
function downloadPostions() {
    if (queryNum == locationCount) {
        // 调用download.js中的方法
        download('position' + position.length, '// amsp.js生成\n' + 'var postions = ' +JSON.stringify(position))
    }else{
        alert('还没处理完.请稍后.....')
    }
}