// const GeoTIFF = require('geotiff')

const GeoTIFF = require('../lib/geotiff')
const fetch = require('node-fetch')
const fs = require('fs')
// const gdal = require("gdal")
const turf = require('@turf/turf')
// getTiffFromFile()
//sre/sresa1b_ncar_ccsm3-example_area      tos/tos_O1_2001-2002-tos--time_15.tif temp/Temperature_20201208-T--depth_-5
function getTiffFromFile() {
    GeoTIFF.fromFile("D:/wxy/Node/nc-tiff-tool/public/tiff/test/variable-pratesfc_time-1609113600.tif")
        .then(async (tiff) => {
            const image = await tiff.getImage();
            //console.log(`image+${image}`)
            // const width = image.getWidth();
            // const height = image.getHeight();
            // const tileWidth = image.getTileWidth();
            // const tileHeight = image.getTileHeight();
            // const samplesPerPixel = image.getSamplesPerPixel();
            // const origin = image.getOrigin();
            // const resolution = image.getResolution();
             const bbox = image.getBoundingBox();
            //const imageData = await tiff.readRasters();
            const data = await image.readRasters();
            console.log(data)
            const getFileDirectory = image.getFileDirectory()
            const noData = image.getGDALNoData()
            console.log(Number(noData))
            console.log(getFileDirectory)
        })
}
module.exports = getTiffFromFile;



//getTiff()
async function getTiffFromUrl() {
    const response = await fetch("https://docs.mapbox.com/help/data/landsat.tif");
    const arrayBuffer = await response.arrayBuffer();
    const tiff = await GeoTIFF.fromArrayBuffer(arrayBuffer)
    const image = await tiff.getImage()
    const data = await image.readRasters();
    console.log(data)
}
//writeArrayBubuffer();
async function writeArrayBubuffer() {
    const origin = await GeoTIFF.fromFile("../../static/tiff/landsat.tif");
    const originImage = await origin.getImage();
    const originWidth = originImage.getWidth();
    const originHeight = originImage.getHeight();
    const originData = await origin.readRasters(1);
    const originImageData = await originImage.readRGB()
    const originMetaData = originImage.getGDALMetadata();
    const bbox = originImage.getBoundingBox();
    const originO = originImage.getOrigin();
    const reso = originImage.getResolution();
    const count = await origin.getImageCount()
    console.log(count)
    console.log(originImage.getGDALMetadata())
    console.log(originImage.getGeoKeys())
    console.log(bbox)
    console.log(originO)
    console.log(reso)
    // ['Compression', 1], // no compression
    // ['PlanarConfiguration', 1],
    // ['XPosition', 0],
    // ['YPosition', 0],
    // ['ResolutionUnit', 1], // Code 1 for actual pixel count or 2 for pixels per inch.
    // ['ExtraSamples', 0], // should this be an array??
    // ['GeoAsciiParams', 'WGS 84\u0000'],
    // ['ModelTiepoint', [0, 0, 0, -180, 90, 0]], // raster fits whole globe
    // ['GTModelTypeGeoKey', 2],
    // ['GTRasterTypeGeoKey', 1],
    // ['GeographicTypeGeoKey', 4326],
    // ['GeogCitationGeoKey', 'WGS 84'],
    const metadata = {
        height: originHeight,
        ModelPixelScale: [0.031355, 0.031355, 0],
        ModelTiepoint: [0, 0, 0, 11.331755000000001, 46.268645, 0],
        width: originWidth,
        // GeogCitationGeoKey:"WGS 84",
        // GeographicTypeGeoKey:4326,
    };
    //  Object.assign(metadata, originImage.getGeoKeys())
    const arrayBuffer = await GeoTIFF.writeArrayBuffer(originImageData, metadata);
    const value = new DataView(arrayBuffer)
    fs.writeFileSync("../../static/tiff/value.tif", value)
    //  console.log(arrayBuffer)
    console.log("tiff write over")
}
function gdalReadTiff() {
    var dataset = gdal.open("../../static/tiff/GeogToWGS84GeoKey5.tif");
    console.log("number of bands: " + dataset.bands.count());
    console.log("width: " + dataset.rasterSize.x);
    console.log("height: " + dataset.rasterSize.y);
    console.log("geotransform: " + dataset.geoTransform);
    console.log("srs: " + (dataset.srs ? dataset.srs.toWKT() : 'null'));
}
//gdalCreate()
function gdalCreate() {
    let odataset = gdal.open("../../static/tiff/GeogToWGS84GeoKey5.tif");
    let obandData = odataset.bands.get(1);
    let orasterSize = odataset.rasterSize;
    let ogeoTransform = odataset.geoTransform;
    let osrs = odataset.srs;
    let typearray = obandData.pixels.read(0, 0, orasterSize.x, orasterSize.y,);
    // save the same spatial reference to a new file
    let driver = gdal.drivers.get('GTiff');
    let dataset = driver.create("../../static/tiff/create.tif", orasterSize.x, orasterSize.y, 1, gdal.GDT_Byte);

    let bandData = dataset.bands.get(1);
    bandData.pixels.write(0, 0, orasterSize.x, orasterSize.y, typearray);
    dataset.srs = osrs;
    dataset.geoTransform = ogeoTransform;
    dataset.flush();
}