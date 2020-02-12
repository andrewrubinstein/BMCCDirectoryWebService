//Parse .env file
    const dotenv = require('dotenv');
    dotenv.config();
//Include Koa classes
    const Koa = require('koa');
    const KoaBodyParser = require('koa-body-parser');
    const KoaRouterGen = require('./router');
//Koa app instantiation
    const app = new Koa();
    const router = KoaRouterGen.gen(app);
    const bodyParser = KoaBodyParser({json:true,jsonStrict:true});

//Middleware Definition 
    app.use(bodyParser);
    app.use(router.routes()).use(router.allowedMethods());
//End Middleware definition

//Start Server
    console.log("Starting up server");
    app.listen(process.env.PORT,() => console.log('Server started listening on port: '+process.env.PORT));