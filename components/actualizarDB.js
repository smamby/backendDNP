// Conectar a la base de datos (si no estás conectado)
use tu_base_de_datos

// Ver estadísticas antes
print("=== ANTES DE LA MIGRACIÓN ===");
print("Total documentos: " + db.services.countDocuments());
print("Sin mesAlquiler: " + db.services.countDocuments({ mesAlquiler: { $exists: false } }));
print("Con mesAlquiler: " + db.services.countDocuments({ mesAlquiler: { $exists: true } }));

// Ejecutar migración
const result = db.services.updateMany(
  { mesAlquiler: { $exists: false } },
  { $set: { mesAlquiler: null } }
);

// Ver resultados
print("\n=== RESULTADOS ===");
print("Matched: " + result.matchedCount);
print("Modified: " + result.modifiedCount);

// Verificar después
print("\n=== DESPUÉS DE LA MIGRACIÓN ===");
print("Sin mesAlquiler: " + db.services.countDocuments({ mesAlquiler: { $exists: false } }));
print("Con mesAlquiler: " + db.services.countDocuments({ mesAlquiler: { $exists: true } }));

// Ver un ejemplo
print("\n=== EJEMPLO DE DOCUMENTO ACTUALIZADO ===");
const sample = db.services.findOne({ mesAlquiler: null });
printjson(sample);