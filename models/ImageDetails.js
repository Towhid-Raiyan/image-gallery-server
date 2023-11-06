const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema(
    {
    image: String
},
{
    collection : "ImageDetails",
});

const ImageModel = mongoose.model("ImageDetails", ImageSchema);
// module.exports = ImageModel;