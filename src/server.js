const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());

// Separação de usuários com websocket (teste após a conclusão do front)
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
    socket.on('connectRoom', box => {
        socket.join(box);
    });
})

// Conexão com o BD
mongoose.connect('mongodb+srv://omnistack:omnistack@clusteromnistack-bpc3p.mongodb.net/omnistack?retryWrites=true',
    {
        useNewUrlParser: true
    }
);

// Middleware para se conectar a uma room
app.use((req, res, next) => {
    req.io = io;

    return next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(require('./routes'));

app.listen(process.env.PORT || 3001);