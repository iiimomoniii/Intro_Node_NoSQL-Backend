//Import model from models
const Shop = require("../models/shop");

//Menu Model
const Menu = require("../models/menu");

//import DOMAIN from.env
const config = require("../config/index");

//Save image to disk (local)
const fs = require("fs"); //fs is file system
const path = require("path"); // path of local system
const uuidv4 = require("uuid"); //npm install -> npm i uuid for uuid of image
const { promisify } = require("util"); //convert writeFile to promisify for using async await
const writeFileAsync = promisify(fs.writeFile); //convert string binary to JPEG or PNG

exports.index = async (req, res, next) => {
  //select some column
  //sort DESC
  const shops = await Shop.find()
    .select("name photo location")
    .sort({ _id: -1 });

  //Shop with Domain
  const shopWithPhotoDomain = await shops.map((shop, index) => {
    return {
      id: shop._id,
      name: shop.name,
      photo: config.DOMAIN + "/images/" + shop.photo,
    };
  });

  res.status(200).json({
    data: shopWithPhotoDomain,
  });
};

//get Menus
exports.menu = async (req, res, next) => {
  const menu = await Menu.find();

  //select name hide price
  //const menu = await Menu.find().select('+name -price -shop');

  //select menu price > 100
  //const menu = await await Menu.find().where('price').gt(100);

  //select menu price >= 200
  //const menu = await await Menu.find().where('price').gte(200);

  //select price menu >= 200 sort price desc
  //const menu = await await Menu.find().where('price').gte(100).sort('-price');

  //find relation menu and shop
  //const menu = await Menu.find().populate('shop', 'name location -_id').sort('_id');

  res.status(200).json({
    data: menu,
  });
};

//get shop with menu by id
exports.getShopWithMenu = async (req, res, next) => {
  const { id } = req.params;

  const shopWithMenu = await Shop.findById(id).populate("menus");

  res.status(200).json({
    data: shopWithMenu,
  });
};

//insert Shop
exports.insert = async (req, res, next) => {
  //add more photo
  const { name, location, photo } = req.body;

  let shop = new Shop({
    name: name,
    location: location,
    photo: await saveImageToDisk(photo), //return name for save at DB
  });
  await shop.save();

  res.status(200).json({
    message: "Shop is inserted",
  });
};

//Save Image
async function saveImageToGoogle(baseImage) {
  //หา path จริงของโปรเจค
  const projectPath = path.resolve("./");

  //หานามสกุลไฟล์
  //Ex. data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAA
  //result => jpeg
  const ext = baseImage.substring(
    baseImage.indexOf("/") + 1,
    baseImage.indexOf(";base64")
  );
  console.log(ext);

  //สุ่มชื่อไฟล์ใหม่ พร้อมนามสกุล
  let filename = "";
  if (ext === "svg+xml") {
    filename = `${uuidv4.v4()}.svg`;
  } else {
    filename = `${uuidv4.v4()}.${ext}`;
  }

  //Extract base64 data ออกมา
  let image = decodeBase64Image(baseImage);

  const bufferStream = new stream.PassThrough();
  bufferStream.end(Buffer.from(image.data, "base64"));

  // Creates a client and upload to storage
  const storage = new Storage({
    projectId: "enhanced-idiom-112215",
    keyFilename: `${projectPath}/key.json`,
  });

  const myBucket = storage.bucket("node_api_file");
  var newFilename = myBucket.file(filename);
  bufferStream.pipe(
    newFilename
      .createWriteStream({
        gzip: true,
        contentType: image.type,
        metadata: {
          // Enable long-lived HTTP caching headers
          // Use only if the contents of the file will never change
          // (If the contents will change, use cacheControl: 'no-cache')
          cacheControl: "public, max-age=31536000",
        },
        public: true,
        validation: "md5",
      })
      .on("error", (err) => {
        console.log("err =>" + err);
      })
      .on("finish", () => {
        console.log("upload successfully...");
      })
  );

  //return ชื่อไฟล์ใหม่ออกไป
  return filename;
}

//Save Image
async function saveImageToDisk(baseImage) {
  //หา path จริงของโปรเจค
  const projectPath = path.resolve("./");
  //โฟลเดอร์และ path ของการอัปโหลด
  const uploadPath = `${projectPath}/public/images/`;

  //หานามสกุลไฟล์
  //Ex. data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAA
  //result => jpeg
  const ext = baseImage.substring(
    baseImage.indexOf("/") + 1,
    baseImage.indexOf(";base64")
  );

  //สุ่มชื่อไฟล์ใหม่ พร้อมนามสกุล
  let filename = "";
  if (ext === "svg+xml") {
    filename = `${uuidv4.v4()}.svg`;
  } else {
    filename = `${uuidv4.v4()}.${ext}`;
  }

  //Extract base64 data ออกมา
  let image = decodeBase64Image(baseImage);

  //เขียนไฟล์ไปไว้ที่ path
  //send file to public => images
  await writeFileAsync(uploadPath + filename, image.data, "base64");
  //return ชื่อไฟล์ใหม่ออกไป
  return filename;
}

function decodeBase64Image(base64Str) {
  var matches = base64Str.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  var image = {};
  if (!matches || matches.length !== 3) {
    throw new Error("Invalid base64 string");
  }

  //Ex. data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAA
  //find content type at index 1
  image.type = matches[1]; //result => image/jpeg
  //find data at index 2
  image.data = matches[2]; // result => 9j/4AAQSkZJRgABAQAA

  return image;
}
