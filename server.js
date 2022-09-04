require('dotenv').config()
require('./api/database/dbconfig/DB_mongodb_connection');
const bodyParser 	= require('body-parser')
const express 		= require('express')
const cors 		    = require('cors')
const next          = require("next");
const path          = require('path')
const dev           = process.env.NODE_ENV !== "production";
const nextApp       = next({ dev });
const handle        = nextApp.getRequestHandler();


nextApp.prepare().then(() => {
        
    const app 	= express();

    app.use(cors())
    // app.use(bodyParser.json({
    //     verify: (req, res, buf) => {
    //       req.rawBody = buf
    //     }
    // }))
    // app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))
    app.use((req, res, next) => {
        if (req.originalUrl === '/webhook') {
          next();
        } else {
          express.json()(req, res, next);
        }
    });
      
    app.use(express.static(path.join(__dirname, './public')));

    app.use(require(`./api/App`));

    app.get("*", (req, res) => {
        return handle(req, res);
    })

    let server = app.listen(process.env.PORT || process.env.APP_PORT, () => {
        console.log(`********** Server is running on  http://localhost:${server.address().port}  **********`)
    }).on('error', (error) => {
        console.log('********** \x1b[31mPort '+error.port+' is already in use\x1b[0m **********')
    })
    
}).catch(ex => {
    console.error(ex.stack);
    process.exit(1);
})