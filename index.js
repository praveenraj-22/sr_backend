const modules = require('./modules')
const app = modules.express()

app.use(modules.cookie_parser())
app.use(modules.morgan('dev'))
app.use(modules.body_parser.urlencoded({ extended: false }))
app.use(modules.body_parser.json())
app.use(modules.cors())
app.use(modules.compression())
app.use(modules.helmet())
app.use(modules.session({ name: 'session_ID', secret: 'Pr@veenR@j@@@)$(&)', resave: false, saveUninitialized: true, cookie: { maxAge: 60000 } }))


app.use(modules.upload())

app.post('/login', modules.routes.Login)
app.post('/api-changepassword', modules.routes.changePassword)
app.get('/logout', modules.routes.logout)
app.get('/api-loadgst',modules.routes.getgst)
app.post('/api-gstinsert',modules.routes.gstinsert)

app.get('/api-loadcustomer',modules.routes.getcustomer)
app.post('/api-custinsert',modules.routes.customerinsert)

app.listen(7777, () => console.log(`App listening on port 7777`))
