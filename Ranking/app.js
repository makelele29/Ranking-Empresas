var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var routes = require('./routes/index');
var users = require('./routes/users');
var session = require('express-session');
var assert = require('assert');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

//-----------------------------------------------------------------------------------------------------------------------------------------
// Función get para ver el jade inscribirAlumno.jade
app.get('/inscribirAlumno', function(req, res){
  res.render('inscribirAlumno', { title:'Registrar Alumno' });
});
//-----------------------------------------------------------------------------------------------------------------------------------------
// Función get para ver el jade clasificacion.jade
app.get('/clasificacion', function(req, res){
  var bd=BD();
  bd.query("SELECT nombre,puntuacion FROM vista_Calificaciones",function(error,resultado,fila){
		assert.ok(error,"Error en el select de vista_calificaciones");
    assert.notEqual(resultado.length,0,"No hay ningun resultado");
    res.render('clasificacion', { title:'Ranking de empresas' ,empresas:resultado});


  });

});
//-----------------------------------------------------------------------------------------------------------------------------------------
// Función get para ver el jade inscribirEmpresa.jade
app.get('/inscribirEmpresa', function(req, res){
  res.render('inscribirEmpresa', { title:'Añade tu empresa' });
});
//-----------------------------------------------------------------------------------------------------------------------------------------
// Función get para ver el jade votar.jade o desvotar.jade si ha iniciado login previamente
app.get('/votos',function(req,res){

  if(req.param('id')==0){
    session.pagina="/votar";
    res.redirect("/votar");
  }else{
    session.pagina="/desvotar";
    res.redirect("/desvotar");
  }

});
//-----------------------------------------------------------------------------------------------------------------------------------------
// Función get para ver el jade votar.jade
app.get('/votar', login,function(req, res){
    var bd=BD();
    bd.query("SELECT id_empresa,nombre FROM EMPRESAS",function(error,resultado,fila){
      assert.ok(error,"Error en el select de empresas");
      assert.notEqual(resultado.length,0,"No hay ningun resultado");
      res.render('votar', { title:'Vota a tu empresa',nombre:session.nombre,empresas:resultado});
    });

});
//-----------------------------------------------------------------------------------------------------------------------------------------
// Función get para ver el jade desvotar.jade
app.get('/desvotar', login,function(req, res){
    var bd=BD();
    bd.query("SELECT * FROM vista_votoEmpresas WHERE DNI="+session.dni,function(error,resultado,fila){
      assert.ok(error,"Error en el select de vista_votoEmpresas");
      assert.notEqual(resultado.length,0,"No hay ningun resultado");
      res.render('desvotar', { title:'Eliminar puntuación de las empresas',nombre:session.nombre,empresas:resultado});
    });

});
//-----------------------------------------------------------------------------------------------------------------------------------------
// Función post para iniciar sesión, si estas registrado
app.post('/iniciar',function(req, res){
    var bd=BD();
    bd.query("SELECT DNI,nombre FROM USUARIOS WHERE DNI="+req.body.dni+" AND clave="+req.body.clave,function(error,resultado,fila){
      assert.ok(!error,"Error en el select de usuarios");
      console.log(resultado.length);
      assert.notEqual(resultado.length,0,"No hay ningun resultado");
      session.dni=resultado[0].DNI;
      session.nombre=resultado[0].nombre;
      res.redirect(session.pagina);
    });

});
//-----------------------------------------------------------------------------------------------------------------------------------------
// Función get para ver el jade login.jade
app.get('/login', function(req, res){
  res.render('login', { title:'Iniciar sesión'});
});
//-----------------------------------------------------------------------------------------------------------------------------------------
// Función get para ver el jade logout.jade
app.get('/logout',function(req, res){
    delete session.nombre;
    delete session.dni;
    res.redirect('/');
});
//-----------------------------------------------------------------------------------------------------------------------------------------
// Función post para registar el voto en la BD
app.post('/registrarVoto', function(req, res){
  var bd=BD();
  bd.query("INSERT INTO CALIFICACIONES (id_empresa, DNI, puntuacion) VALUES ("+req.body.id+","+session.dni+","+req.body.txtNota+")",function (error) {
      if(!error){
        res.redirect("/");

      }else{
        res.send("Ya vostastes en estra empresa");

      }
  });
});
//-----------------------------------------------------------------------------------------------------------------------------------------
// Función para saber si ya has iniciado sesión o no
function login(req,res,next){
  if( typeof session.nombre!='undefined'){
    next();
  }else{
    res.redirect('/login');
  }

}
//-----------------------------------------------------------------------------------------------------------------------------------------
//Funcion para conectar a la base de datos
function BD(){
  var conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    database: 'ranking'
  });
  return conexion;
}
//-----------------------------------------------------------------------------------------------------------------------------------------
// Función post para añadir una empresa a la BD
app.post('/addEmpresa', function(req, res){
  var objBD = BD();
  var nombre=req.body.nombre;
  objBD.query("INSERT INTO  EMPRESAS (nombre) values ('"+nombre+"')",function (error){
    if(error){
      console.log(error.message);
      res.send('Inscripción de la empresa inválida o la empresa ya está registrada');
    }else{
      console.log('Insertado');
      res.redirect('/');
    }
  });
});
//-----------------------------------------------------------------------------------------------------------------------------------------
// Función post para añadir un alumno a la BD
app.post('/addAlumno', function(req, res){
  var objBD = BD();
  var dni=req.body.dni;
  var nombre=req.body.nombre;
  var apellidos=req.body.apellidos;
  var email=req.body.email;
  var clave=req.body.clave;

  objBD.query("INSERT INTO  USUARIOS (DNI,nombre,apellidos,email,clave) values ("+dni+",'"+nombre+"'"+",'"+apellidos+"'"+",'"+email+"','"+clave+"')",function (error){
    if(error){
      console.log(error.message);
      res.send('Inscripción de la empresa inválida o la empresa ya está registrada');
    }else{
      console.log('Insertado');
      session.nombre=nombre;
      session.dni=dni;
      res.redirect('/');
    }
  });
});



/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
