const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const { log } = require('console');

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));


app.get("/",(req,res)=>{
    fs.readdir(`./files`,(err,files)=>{
         res.render("index",{files:files});
    })

})

app.post("/edit",(req,res)=>{
    
    fs.rename(`./files/${req.body.oldFileName}`, `./files/${req.body.newFileName}`, (err)=>{
        res.redirect('/');
    })
    

})

app.get("/edit/:filename",(req,res)=>{
    const filepath = path.join(__dirname,"public","Edit.ejs");
    const filename = req.params.filename;
    res.render(filepath,{filename:filename});
})

app.get("/file/:filename",(req,res)=>{
    const filename = req.params.filename;
    const filepath = path.join(__dirname, "files", filename);
    fs.readFile(filepath,"utf-8",(err,data)=>{
        if(err)
        {
            console.log(err);
            return res.status(404).send("File not Found");
        }

        res.render(path.join(__dirname, "public", "show.ejs"),{filename:filename , filedata:data});

    })
   
    
})

app.post("/create",(req,res)=>{
   fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.description , (err)=>{
    res.redirect("/");
   } )
   
})





app.listen(3000);