var assert = require('assert');
var mysql = require('mysql');
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

  describe("Prueba Test",function(){
    it("Insertar un alumno",function(){
      var bd=BD();
      bd.query("INSERT INTO  USUARIOS (DNI,nombre,apellidos,email,clave) values (222,'Javier','Castillo','ja@ja','222')",function (error){
        assert.ok(!error,"Hubo un error al registar al usuario");


      });
    });
    it("Iniciar sesion con un usuario ya registrado",function(){

      var bd=BD();

      bd.query("SELECT DNI,nombre FROM USUARIOS WHERE DNI=222 AND clave=222",function(error,resultado,fila){

        assert.ok(!error,"Error en el select de usuarios");
        assert.notEqual(resultado.length,0,"El usuario introducido no es correcto");

      });

    });
  });
