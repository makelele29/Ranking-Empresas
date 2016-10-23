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
//-----------------------------------------------------------------------------------------------------------------------
// Función para las pruebas con la base de datos
describe("Prueba Test",function(){
  // Función para añadir un nuevo alumno
  it("Insertar un alumno",function(done){
    var bd=BD();
    bd.connect(done);
    bd.query("INSERT INTO  USUARIOS (DNI,nombre,apellidos,email,clave) values (222,'Javier','Castillo','ja@ja','222')",function (error){
      assert.ok(!error,"Hubo un error al registar al usuario");
      bd.end(done);
    });
  });
  // Función para comprobar que el usuario esta loqueado
  describe("Iniciar sesion con un usuario",function(){
    it("Usuario registrado",function (done) {
      var bd=BD();
      bd.connect(done);
      bd.query("SELECT DNI,nombre FROM USUARIOS WHERE DNI=222 AND clave=222",function(error,resultado,fila){
        assert.ok(!error,"Error en el select de usuarios");
        assert.notEqual(resultado.length,0,"El usuario introducido no es correcto");
        bd.end(done);
      });
    });
    it("Usuario no registrado",function (done) {
      var bd=BD();
      bd.connect(done);
      bd.query("SELECT DNI,nombre FROM USUARIOS WHERE DNI=22 AND clave=222",function(error,resultado,fila){
        assert.ok(!error,"Error en el select de usuarios");
        assert.Equal(resultado.length,0,"El usuario introducido no es correcto");
        bd.end(done);
      });
    });
  });
});
