const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    port:"3307",
    user: "root",
    password: "",
    database: "empleados_crud"
});

app.post("/create",(req,res)=>{
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const puesto = req.body.puesto;
    const anos = req.body.anos;

    db.query('INSERT INTO empleados(nombre,edad,pais,puesto,anos) VALUES(?,?,?,?,?)',[nombre,edad,pais,puesto,anos],
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    }
    );
});


app.get("/empleados",(req,res)=>{

    db.query('SELECT * FROM empleados',
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    }
    );
});


app.put("/update",(req,res)=>{
    const id = req.body.id;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const puesto = req.body.puesto;
    const anos = req.body.anos;

    db.query('UPDATE empleados SET nombre=?,edad=?,pais=?,puesto=?,anos=? WHERE id=?',[nombre,edad,pais,puesto,anos,id],
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    }
    );
});



app.delete("/delete/:id",(req,res)=>{
    
    const id = req.params.id;


    db.query('DELETE FROM empleados WHERE id=?',id,
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    }
    );
});




app.listen(3001,()=>{
    console.log("corriendo en el puerto 3001")

})