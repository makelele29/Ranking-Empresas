var assert = require('assert');
var mysql = require('mysql');
//Funcion para conectar a la base de datos
function BD(){
  var conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1',
    port: 3306,
    database: 'ranking'
  });
  return conexion;
}
describe("Prueba de test",function(){
  it("Insertar",function(done){
    var bd=BD();
    bd.query("INSERT INTO  USUARIOS (DNI,nombre,apellidos,email,clave) values (111,'Javier','Castillo','ja@ja','111')",function (error){
      assert.ok(!error,"Hubo un error al registar al usuario");
      bd.end(done);
    });
  });
  it("Login",function(done){

    var bd=BD();

    bd.query("SELECT DNI,nombre FROM USUARIOS WHERE DNI=111 AND clave=111",function(error,resultado,fila){

      assert.ok(!error,"Error en el select de usuarios");
      assert.notEqual(resultado.length,0,"El usuario introducido no es correcto");
      bd.end(done);
    });

  });


});
