const express = require("express")
const cors = require("cors");
require('dotenv').config()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { default: mongoose } = require("mongoose");

const user = require("./models/User");
const Place = require('./models/Place.js')
const Booking = require('./models/booking')
const multer = require('multer')
const fs = require('fs')
const cookieParser = require('cookie-parser')
const imageDownloader = require('image-downloader');
const { log } = require("console");
const app = express();



const bcryptPass = bcrypt.genSaltSync(10);
const jwtSecreatCode = 'dguavi5ygf5efjsbng98642bkbafg8';

app.use(express.json())
app.use(cookieParser())
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}))



mongoose.connect(process.env.MONGO_URL).then(res => {
    console.log("MongoDb Connected");
}).catch((err)=>{throw err})
app.get("/test", (req, res) => {
    res.json('Mongo connected')
})

function getUserDataFromReq(req) {
    return new Promise((resolve, reject)=> {
        jwt.verify(req.cookies.token, jwtSecreatCode, {}, async (err, userData) => {
            if (err) throw err;
            resolve(userData);
        });
    }) 
}


app.post('/register', async (req, res) => {
    const { name, email, password } = req.body
    try {
        const newUser = await user.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptPass),
        })
        res.json(newUser)
    } catch (e) {
        res.status(422).json(e)
    }

});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const logUserDetail = await user.findOne({ email })

    if (logUserDetail) {
        const passCorect = bcrypt.compareSync(password, logUserDetail.password)
        if (passCorect) {
            jwt.sign({ email: logUserDetail.email, id: logUserDetail._id }, jwtSecreatCode, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(logUserDetail)
            })

        } else {
            alert("Password Incorrect")
            res.status(422).json('Pass incorrect')
        }
    } else {
        res.json('Not Found')
    }
})

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecreatCode, {}, async (err, userData) => {
            if (err) throw err;
            const { name, email, _id } = await user.findById(userData.id)

            res.json({ name, email, _id })
        })
    } else {
        res.json(null)
    }

})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true)
})
app.post('/upload-by-link', async (req, res) => {
    const { link } = req.body;
    let newName = 'photo' + Date.now() + '.jpg'
    await imageDownloader.image({
        url: link,
        dest: __dirname + '/uploads/' + newName
    })
    res.json(newName)
})


const photosMiddleWare = multer({ dest: 'uploads/' })
app.post('/upload', photosMiddleWare.array('photos', 100), (req, res) => {
    const uploadedFiles = []
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i]
        const parts = originalname.split(".");
        const ext = parts[parts.length - 1];

        const newPath = path + "." + ext
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace('uploads\\', ''))

    }
    res.json(uploadedFiles)
});

app.post('/places', (req, res) => {
    const { token } = req.cookies;
    const { title, address, addedPhotos,
        description, perks, extraInfo,
        checkIn, checkOut, maxGuests,price,
    } = req.body
    jwt.verify(token, jwtSecreatCode, {}, async (err, userData) => {
        if (err) throw err;

        const placeDoc = await Place.create({
            owner: userData.id,
            title,
            address,
            photos:addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price,
        })
        res.json(placeDoc)
    });
});

app.get('/user-places', async (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecreatCode, {}, async (err, userData) => {
        const { id } = userData;
        res.json(await Place.find({ owner: id }));
    });
});

app.get('/places/:id',async (req,res) => {
    const {id} = req.params;
    res.json(await Place.findById(id))
})

app.put('/places', async (req,res) => {
    
    const {token} = req.cookies;
    const {
      id, title,address,addedPhotos,description,
      perks,extraInfo,checkIn,checkOut,maxGuests,price,
    } = req.body;
    jwt.verify(token, jwtSecreatCode, {}, async (err, userData) => {
      if (err) throw err;
      const placeDoc = await Place.findById(id);
      if (userData.id === placeDoc.owner.toString()) {
        console.log({checkIn,checkOut,maxGuests, price})
        placeDoc.set({
          title,address,photos:addedPhotos,description,
          perks,extraInfo,checkIn,checkOut,maxGuests,price,
        });
        await placeDoc.save();
        res.json('ok');
      }
    });
  });

app.get('/places', async (req,res) => {
    res.json(await Place.find() )
});

app.post('/bookings', async (req,res) => {
    const userData = await getUserDataFromReq(req)
    const{
        place, checkIn, checkOut, numberOfGuests, name, mobileNum, price
    } = req.body
    Booking.create({
        place, checkIn, checkOut, numberOfGuests, name, mobileNum, price,user:userData.id,
    }).then((doc) => {
        
        res.json(doc)
    }).catch((err) => {throw err})
})


app.get('/bookings', async (req, res) => {
   const userData = await getUserDataFromReq(req);
   res.json(await Booking.find({user:userData.id}).populate('place'))
   
})

app.listen(4000, () => console.log("backend connected"))