const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const cors = require('cors');
const adminRoutes = require('./routes/admin');
const Blog=require('./models/blog');
const Comment=require('./models/comment')
const app = express();
app.use(cors());

app.use(bodyParser.json({ extended: false }));

app.use(adminRoutes);

Comment.belongsTo(Blog,{constraints:true, onDelete:'CASCADE'});
Blog.hasMany(Comment);


//sequelize.sync({force:true})
sequelize.sync()
.then(result=>{
    //console.log(result);
    app.listen(5000);
})
.catch(err=>console.log(err));