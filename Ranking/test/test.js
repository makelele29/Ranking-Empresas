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
  var bd=BD();
  // Función para añadir un nuevo alumno
  it("Insertar un alumno",function(done){

    bd.connect(done);
    bd.query("INSERT INTO  USUARIOS (DNI,nombre,apellidos,email,clave) values (222,'Javier','Castillo','ja@ja','222')",function (error){
      assert.ok(!error,"Hubo un error al registar al usuario");
      done();
    });
  });
  // Función para comprobar que el usuario esta loqueado o no
  describe("Iniciar sesion con un usuario",function(){
    it("Usuario registrado",function (done) {
      bd.query("SELECT DNI,nombre FROM USUARIOS WHERE DNI=222 AND clave=222",function(error,resultado,fila){
        assert.ok(!error,"Error en el select de usuarios");
        assert.notEqual(resultado.length,0,"El usuario introducido no es correcto");
        done();
      });
    });
    it("Usuario no registrado",function (done) {

      bd.query("SELECT DNI,nombre FROM USUARIOS WHERE DNI=22 AND clave=222",function(error,resultado,fila){
        assert.ok(!error,"Error en el select de usuarios");
        assert.equal(resultado.length,0,"El usuario introducido no es correcto");
        done();
      });
    });
  });
  it("Insertar Empresa",function(done){
    bd.query("INSERT INTO  EMPRESAS (nombre) values ('Prodware')",function (error){
      assert.ok(!error,"Hubo un error al registar A la empresa");
      done();
    });

  });
  it("Insertar Empresas",function(done){
    bd.query("INSERT INTO  MANA (nombre) values ('Prodware')",function (error){
      assert.ok(!error,"Hubo un error ");
      done();
    });

  });
});
