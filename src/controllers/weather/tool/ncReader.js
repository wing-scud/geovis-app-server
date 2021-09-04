const fs = require('fs');
const GeoTIFF = require('geotiff');
const NetCDFReader = require('netcdfjs');
const baseUrl = "D:/wxy/Node/nc-tiff-tool/public/nc/new/ncep_month/"
const file = "ncep_global_0";
//tos_O1_2001-2002 海面温度
// http://www.unidata.ucar.edu/software/netcdf/examples/files.html
const data = fs.readFileSync(baseUrl + file + ".nc");
var reader = new NetCDFReader(data); // read the header
const dimensions = reader.dimensions;
const variables = reader.variables;
//  console.log(reader.getDataVariable("lon"))
// console.log(getVariableAttribute(reader, "lon"))
 console.log(variables);
 console.log(dimensions);
// const T = reader.getDataVariable('T')
// let total = 0;
// T.forEach((number, index) => {
//     if (!isNaN(number)) {
//         total++;
//         //console.log(number,index);
//     }
// })
// console.log(`${total} -- ${T.length}---${T.length - total}`);
// toCanvas(reader, "area")
//splitNcFile(reader)
function splitNcFile(reader) {
    const variables = reader.variables;
    const dimensions = reader.dimensions;
    const splitVariables = [];//  对应实际变量
    const splitDimensions = [];//对应实际自变量
    const baseOffset = reader.buffer.offset; //起始偏移
    variables.map((variable) => {
        if (objContainObjName(variable, dimensions)) {
            //维度 
            splitDimensions.push(variable)
        } else {
            splitVariables.push(variable)
        }
    })
    splitVariables.map((variable) => {
        let result = {
            dimensions: [],
            variables: []
        };
        variable.dimensions.map((index) => {
            result.dimensions.push(dimensions[index])
            //放入维度
            if (objContainObjName(dimensions[index], splitDimensions)) {
                result.variables.push(objContainObjName(dimensions[index], splitDimensions))
            }
        })
        //计算offset
        let offset = baseOffset;
        const originBuffer = reader.buffer;
        const buf = new ArrayBuffer(originBuffer.byteLength);
        let totalArray = new Uint8ClampedArray(buf)
        // let temp = Buffer.from(originBuffer.buffer,0, offset)
        // let newArray = new Uint8ClampedArray(temp)
        // totalArray.set(newArray)
        result.variables.map((obj) => {
            let temp = Buffer.from(originBuffer.buffer, obj.offset, obj.size)
            let newArray = new Uint8ClampedArray(temp)
            totalArray.set(newArray)
            obj.offset = offset;
            offset += obj.size;
        })
        const should = offset + variable.size;
        const shouldArray = totalArray.slice(0, should)
        const resultBuffer = shouldArray.buffer;
        const tiff = GeoTIFF.fromArrayBuffer(resultBuffer);
        console.log(tiff)
        variable.offset = offset;
        //放入自变量
        result.variables.push(variable);
        filename = "./generate/" + variable.name + ".nc"
        fs.writeFileSync(baseUrl + filename, shouldArray)
        console.log("over")
    })
}
function getVariableAttribute(reader, name) {
    const variables = reader.variables;
    let variable;
    variables.forEach((obj) => {
        if (obj.name === name) {
            variable = obj;
        }
    })
    return variable
}