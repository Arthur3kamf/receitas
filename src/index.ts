import express from 'express';
import { userRoutes } from './route/user_routes';
import { admRoutes } from './route/adm_routes';
import session from 'express-session';

const app = express();

app.set('view engine', 'ejs');

app.set('views', './src/views');

app.use(express.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    res.redirect('/user/login')
});


app.use(session({
    secret: 'aula-pw2',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1 * 1000 * 60 * 60 }
}));
app.use(userRoutes)
app.use(admRoutes)

app.listen(3333, () => {
    console.log('Servidor rodando no endereço http://localhost:3333');
});