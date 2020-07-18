const upload = require("../middleware/upload");

const uploadFile = async (req, res) => {
  try {
    await upload(req, resp);

    console.log(req.file);
    if (req.file == undefined) {
      return resp.send(`You must select a zip file.`);
    }

    return resp.send(`Your file has been uploaded.`);
  } catch (error) {
    console.log(error);
    return resp.send(`Error when trying upload image: ${error}`);
  }
};

module.exports = {
  uploadFile: uploadFile
};