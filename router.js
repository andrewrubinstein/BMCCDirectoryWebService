
//Include Mongoose data models, and helper functions
const Models = require("./Models");
//End Mongoose data models

const KoaRouter = require('koa-router');

function generateRouter(app)
{

    let router = new KoaRouter(app);
    //Routes Definition
    //Users Routes Definition
    router.post('/users',async ctx =>{
        user = new Models.User();
        Models.buildUser(user,ctx.request.body);
        ctx.body = await user.save();
    });
    router.put('/users:id',async ctx =>{
        const parameter = ctx.params.id.substring(1,ctx.params.id.length);
        user = await Models.User.findById(parameter);
        Models.buildUser(user,ctx.request.body);
        let rtndoc = await user.save();
        if(!rtndoc)
        {
           console.log(rtndoc);
       }          
       else
       {
           ctx.body = doc;
       }
     }
    );
    router.get('/users',async (ctx) => {
        ctx.body = await Models.User.find();
        }   
    );
    router.delete('/users:id',async ctx => {
        const p = ctx.params.id.substring(1,ctx.params.id.length);
        ctx.body = await Models.User.deleteOne({_id:p});
        }
    );
    router.delete('/users',async ctx => {
        ctx.body = await Models.User.deleteOne(ctx.request.body);
        }
    );
    //End Users Routes Definition

    //Locations Routes Definition
    router.get('/locations',async ctx => {
        ctx.body = await Models.Location.find();
        }
    );
    router.get('/locations:id',async ctx => {
        let p = ctx.params.id.substring(1,ctx.params.id.length);
        ctx.body = "";
        ctx.body = await Models.Location.findById(p);
        }
    );
    router.delete('/locations:id',async ctx => {
        let p = ctx.params.id.substring(1,ctx.params.id.length);
        ctx.body = await Models.Location.deleteOne({_id:p});
        }
    );
    router.post('/locations',async ctx =>{
        const body = ctx.request.body;
        let doc = new Models.Location();
        Models.buildLocation(doc,body);
        console.log(doc);
        doc.save(); 
        ctx.body = doc;
        }
    );
    router.put('/locations:id',async ctx =>{
            //Setup Data to be used in function
            const parameter = ctx.params.id.substring(1,ctx.params.id.length);
            const body = ctx.request.body;
            ctx.body = {msg:"Error Creating/Updating Record"};

           let doc = new Models.Location();
           doc._id = parameter;
           await doc.delete();
           
           Models.buildLocation(doc,body);
           
           ctx.body._id = parameter;

           const rtndoc = await doc.save();
           if(!rtndoc)
           {
               console.log(rtndoc);
           }
           else
           {
               ctx.body = doc;
           }
        }
    );
    //End of Locations Routes Definition
//End of Routes Definition
return router;
}
exports.gen = generateRouter;