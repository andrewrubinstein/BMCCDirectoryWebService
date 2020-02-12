
//DB Connection
const wsUser = { id:process.env.MONGOUSER,password:process.env.MONGOPASS };
const mongoURL = "mongodb+srv://"+wsUser.id+":"+wsUser.password+"@cluster0-uro9k.mongodb.net/BMCCDirectoryDB?retryWrites=true&w=majority";
//Mongoose instantiation
const mongoose = require('mongoose');
mongoose.connect(mongoURL,{ useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', ()=> {
    console.error.bind(console, 'connection error:');
    }
);
db.once('open', function() {
console.log('Succesfully connected to database server');
});

//Models, and schemas for Mongoose
    //User Model and schema
    const userSchema = new mongoose.Schema(
        {
            userName: String,
            password: String,
            isAdmin: Boolean
        }
    );
    const User = mongoose.model('User',userSchema);
    //Time Schema 
    const timeSchema = new mongoose.Schema({
        startHour: String,
        startMinute: String,
        isStartAm: Boolean,
        endHour: String,
        endMinute: String,
        isEndAm: Boolean
    });
    const Time = mongoose.model('Time',timeSchema);
    //Location Model and schema
    const locationSchema = new mongoose.Schema(
        {
            operations:
            {
                monday:[timeSchema],
                tuesday:[timeSchema],
                wednesday:[timeSchema],
                thursday:[timeSchema],
                friday:[timeSchema],
                saturday:[timeSchema],
                sunday:[timeSchema]
            },
            name: String,
            room: String,
            address: String,
            telephone: String,
            contactEmail: String,
            __v: Number
        }
    );
    const Location = mongoose.model('Location',locationSchema);
    //End of Mongoose Model and Schema Definitions
//End of Mongoose Instantiation

//Helper function to copy user data from regular JS object to Mongoose user model
function buildUser(doc,data)
{
    doc.userName = data.userName;
    doc.password = data.password;
    doc.isAdmin = data.isAdmin;
}
//End Helper function to copy user data from regular JS object to Mongoose user model

//Helper functions to copy location data from regular JS object to Mongoose location model
function buildLocation(location,data)
{
    buildDay(location.operations.monday,data.operations.monday);
    location.markModified('operations.monday');
    buildDay(location.operations.tuesday,data.operations.tuesday);
    location.markModified('operations.tuesday');
    buildDay(location.operations.wednesday,data.operations.wednesday);
    location.markModified('operations.wednesday');
    buildDay(location.operations.thursday,data.operations.thursday);
    location.markModified('operations.thursday');
    buildDay(location.operations.friday,data.operations.friday);
    location.markModified('operations.friday');
    buildDay(location.operations.saturday,data.operations.saturday);
    location.markModified('operations.saturday');
    buildDay(location.operations.sunday,data.operations.sunday);
    location.markModified('operations.sunday');
    location.name = data.name;
    location.room = data.room;
    location.address = data.address;
    location.telephone = data.telephone;
    location.contactEmail = data.contactEmail;
}

//Helper function to copy location's operational day data from regular JS object to Mongoose location model
function buildDay(day,data)
{
    day.length = 0;
    data.forEach(
        xtime => {
            const time = new Time();
            time._id = xtime._id;
            time.startHour = xtime.startHour;
            time.startMinute = xtime.startMinute;
            time.isStartAm = xtime.isStartAm;
            time.endHour = xtime.endHour;
            time.endMinute = xtime.endMinute;
            time.isEndAm = xtime.isEndAm;
            day.push(time);
        }
    );
}
//End Helper function to copy location data from regular JS object to Mongoose location model
//
//Exports
exports.Location = Location;
exports.Time = Time;
exports.User = User;
exports.buildUser = buildUser;
exports.buildLocation = buildLocation;
//End of Exports