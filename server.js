// Ruta de archivo proto
const PROTO_PATH = __dirname + "/proto/employee.proto";

//Importar librerias
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const _ = require("lodash");
let { employees } = require("./data.js");
//Cargar archivo .proto
let packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

// Obtener paquete
let employee_proto = grpc.loadPackageDefinition(packageDefinition).employee;

// Funcion para obtener detalles
function getDetails(call, callback) {
  callback(null, {
    message: _.find(employees, { id: call.request.id }),
  });
}

//Iniciar servidor GRPC
function main() {
  let server = new grpc.Server();
  server.addService(employee_proto.Employee.service, {
    getDetails: getDetails,
  });
  server.bind("0.0.0.0:4500", grpc.ServerCredentials.createInsecure());
  server.start();
}

main();
