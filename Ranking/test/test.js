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
  it("Login",function(done){

    var bd=BD();

    bd.query("SELECT DNI,nombre FROM USUARIOS WHERE DNI=111 AND clave=11",function(error,resultado,fila){
      console.log(resultado.length);
      assert.ok(!error,"Error en el select de usuarios");
      assert.notEqual(resultado.length,0,"El usuario introducido no es correcto");
      bd.end(done);
    });

  });


});
