const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
mongoose.set('strictQuery', true)

const app=express();

app.use(express.json({extended:true}))

app.use('/api/auth',require('./routes/auth.routes.js'))
app.use('/api/link',require('./routes/link.routes.js'))
app.use('/t',require('./routes/redirect.routes.js'))

const PORT = config.get('port') || 7070
async function start(){
    try{
        await mongoose.connect(config.get('mongoUri'),{
            useUnifiedTopology:true,
        })
        app.listen(PORT,()=>console.log(`App has been started on port ${PORT}`));
    } catch(e){
        console.log('Server error',e.message);
        process.exit(1);
    }
}
start();

