读取Excel表格地址。展示到地图上（或热力地图上）

* 执行 `python index_address.py`
  自动读取address.xlsx数据。保存到docs/js/data/address.js中
* 打开docs/index.html即可看位置分布
* 点击右上角`下载postions`按钮
  自动读取docs/js/data/address.js中的数据。获取经纬度后，浏览器会自动下载positionxx.txt。
* 将positionxx.txt移动到docs/js/data/目录下。并改名postions.js
* 打开docs/index_address即可看到热力图