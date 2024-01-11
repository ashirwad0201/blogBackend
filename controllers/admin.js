const Blog = require('../models/blog');
const Comment=require('../models/comment')
exports.insertBlog = (req, res, next) => {
    const title = req.body.title;
    const author = req.body.author;
    const content = req.body.content;
    Blog.create({
      title: title,
      author: author,
      content: content
    })
    .then(result=>{
      //console.log(result);
      console.log('Created blog');
      res.redirect('/get-blog')
    })
    .catch(err => {
      console.log(err)
    })
  };

exports.deleteBlog = (req,res,next)=>{
    const title=req.params.title;
    console.log(title)
     Blog.destroy({
        where: {
            title: title
        },
      })
    .then((result)=>{
        console.log(result);
        res.redirect('/get-blog')
    })
    .catch(err=>console.log(err));
}

exports.getBlog =(req,res,next)=>{
    Blog.findAll()
    .then((result)=>{
        res.json(result)
    })
    .catch(err=>console.log(err));
};

exports.postComment=(req,res,next)=>{
    const content=req.body.content;
    Blog.findAll({
        where:{
            title : req.body.title
        }
    })
    .then(blogs=>{
        blogs[0].createComment({
            content : content
        })
        .then(result=>{
            console.log('Created Comment');
            res.redirect('/get-blog');
        })
        .catch(err=>console.log(err));
    })
    .catch(err=>console.log(err))

}

exports.getComments=(req,res,next)=>{
    const title=req.params.title;
    console.log(title)
    Blog.findAll({
        where:{
            title : title
        }
    })
    .then(blogs=>{
        blogs[0].getComments()
        .then(result=>{
            console.log('Got Comments');
            console.log(result)
            res.json(result)
        })
        .catch(err=>console.log(err));
    })
    .catch(err=>console.log(err))
}

exports.deleteComment=(req,res,next)=>{
    const title=req.body.title;
    const comment=req.body.comment;
    console.log(title)
    Blog.findAll({
        where:{
            title : title
        },
        include: Comment
    })
    .then(blogs=>{
        console.log(blogs[0].comments)
        blogs[0].comments.find(c => c.content === comment).destroy()
        .then(result=>{
            console.log('Deleted comment');
            res.redirect('/get-blog')
        })
        .catch(err=>console.log(err));
    })
    .catch(err=>console.log(err))
}