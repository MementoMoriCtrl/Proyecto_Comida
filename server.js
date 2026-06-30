const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();

app.use(cors());
app.use(express.json());

// REGISTRAR USUARIO


app.post("/registrar", (req, res) => {

    const { nombre, correo, password } = req.body;

    db.run(
        `INSERT INTO usuarios (nombre, correo, password)
         VALUES (?, ?, ?)`,
        [nombre, correo, password],

        function(err) {

            if(err){

                console.log(err.message);

                return res.status(400).json({
                    mensaje: "El correo ya existe"
                });

            }

            res.json({
                mensaje: "Usuario registrado correctamente"
            });

        }
    );

});

/*LOGIN*/

app.post("/login", (req, res) => {

    const { correo, password } = req.body;

    db.get(

        `SELECT * FROM usuarios
         WHERE correo = ? AND password = ?`,

        [correo, password],

        (err, usuario) => {

            if(err){

                return res.status(500).json({
                    mensaje: "Error del servidor"
                });

            }

            if(!usuario){

                return res.status(401).json({
                    mensaje: "Correo o contraseña incorrectos"
                });

            }

            res.json({
                mensaje: "Login correcto",
                usuario: usuario
            });

        }

    );

});


// GUARDAR PEDIDO

app.post("/pedido", (req, res) => {
    console.log("========== PEDIDO RECIBIDO ==========");
    console.log(req.body);

    const {
        fecha,
        producto,
        cantidad,
        total,
        estado
    } = req.body;

    db.run(

        `INSERT INTO pedidos
        (fecha, producto, cantidad, total, estado)
        VALUES (?, ?, ?, ?, ?)`,

        [
            fecha,
            producto,
            cantidad,
            total,
            estado
        ],

        function(err){

            if(err){

                console.log(err.message);

                return res.status(500).json({
                    mensaje: "Error al guardar pedido"
                });

            }

            res.json({
                mensaje: "Pedido guardado correctamente",
                idSQLite: this.lastID
            });

        }

    );

});
console.log("SERVER VERSION NUEVA");


// ACTUALIZAR ESTADO DEL PEDIDO

app.put("/pedido/:id", (req, res) => {

    const { id } = req.params;
    const { estado } = req.body;

    console.log("ACTUALIZANDO ID:", id);
    console.log("NUEVO ESTADO:", estado);

    db.run(

        `UPDATE pedidos
         SET estado = ?
         WHERE id = ?`,

        [estado, id],

        function(err){

            if(err){

                console.log(err);

                return res.status(500).json({
                    mensaje: "Error al actualizar estado"
                });

            }

            console.log(
                "FILAS ACTUALIZADAS:",
                this.changes
            );

            res.json({
                mensaje: "Estado actualizado"
            });

        }

    );

});


app.listen(3000, () => {

    console.log(
        "Servidor iniciado en http://localhost:3000"
    );

});