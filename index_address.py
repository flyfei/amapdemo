# _*_ coding: utf-8 _*_

import xlrd
import os

data = xlrd.open_workbook('address.xlsx')

table = data.sheets()[0]

nrows = table.nrows #行数

ccols = table.col_values(0)

address = []

for rownum in range(1,nrows):
    adr = table.cell(rownum,0).value
    address.append({'name':adr,'address':adr})



print (len(address))

# 保存到文件
address = str(address).decode("unicode_escape").encode("utf8")
address = address.replace("u", "")
address = '// 自动生成\n' + 'var address = ' + address
with open('./docs/js/data/address.js','a') as jsname:
    jsname.write(address)
