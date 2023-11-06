const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use(cors());
app.use(express.json({ limit: '50MB' }));
app.use(express.urlencoded({ limit: '50MB', extended: true }));



//database connection
const mongoUrl = "mongodb+srv://image-gallery:XLfVXEBbnwdHW9b1@cluster0.cq8nopc.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoUrl,{useNewUrlParser: true})
.then(()=>{
    console.log("connected to database");
})
.catch((e)=>console.log(e));

require("./models/ImageDetails");

const Images = mongoose.model("ImageDetails");

// upload image route
app.post("/upload-image",async(req,res)=>{
    const {base64} = req.body;
    console.log(req.body);
    try{
        await Images.create({image:base64});
        res.send({Status: "ok"})
    }
    catch (error) {
        res.send({Status:"error",data:error});
    }
})

// get image route
app.get("/get-image", async(req,res)=> {
    try{
        await Images.find({}).then(data => {
            res.send({Status:"ok", data:data})
            // console.log(data);
        })
    }
    catch(error){

    }
})

//delete image route
app.post("/delete-images", async (req, res) => {
    console.log(req.body);
    const { imageIds } = req.body;
    
  
    try {
      // Convert the string IDs to ObjectId instances
      const imageObjectIds = imageIds.map((id) => mongoose.Types.ObjectId(id));
  
      await Images.deleteMany({ _id: { $in: imageObjectIds } });
  
      res.json({ status: "ok", message: "Images deleted successfully" });
    } catch (error) {
      console.error("Error deleting images:", error);
      res.status(500).json({ status: "error", message: "Image deletion failed" });
    }
  });

app.listen(port, () => {
  console.log(`Gallery is running on port ${port}`);
});