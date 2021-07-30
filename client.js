const PROTO_PATH = __dirname + "/proto/employee.proto";

//Librerias
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

// Cargar proto
let packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

// Cargar paquete
let employee_proto = grpc.loadPackageDefinition(packageDefinition).employee;

function main() {
  // Creacion de cliente
  let client = new employee_proto.Employee(
    "localhost:4500",
    grpc.credentials.createInsecure()
  );
  //Peticion
  let employeeId;
  if (process.argv.length >= 3) {
    employeeId = process.argv[2];
  } else {
    employeeId = 1;
  }
  client.getDetails({ id: employeeId }, function (err, response) {
    console.log(
      "Detalles para empleado con ID:",
      employeeId,
      "\n",
      response.message
    );
  });
}

main();
