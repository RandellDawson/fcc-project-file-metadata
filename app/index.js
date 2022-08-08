import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';

dotenv.config();
const upload = multer({ dest: 'uploads/' })
const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/app/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/app/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res, next) => {
  const {
    originalname: name,
    mimetype: type,
    size
  } = req.file;
  res.json({ name, type, size });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('App is listening on port ' + port)
});
