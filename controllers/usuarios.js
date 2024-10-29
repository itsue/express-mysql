const connection = require('../models/database');

const usuariosGet = (req, res) => {
    const query = 'SELECT * FROM usuarios';
    connection.query(query, (error, results) => {
        if (error) throw error;
        res.json(results);
    });
};

const usuarioPost = (req, res) => {
    const { nombre, email, pass } = req.body;
    const query = 'INSERT INTO usuarios (nombre, email, pass) VALUES (?, ?, ?)';
    connection.query(query, [nombre, email, pass], (error, result) => {
        if (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ message: 'El nombre o email ya están en uso' });
            }
            throw error;
        }
        res.json({ id: result.insertId, nombre, email });
    });
};

const usuarioPut = (req, res) => {
    const { id } = req.params;
    const { nombre, email, pass } = req.body;
    const query = 'UPDATE usuarios SET nombre = ?, email = ?, pass = ? WHERE id = ?';
    connection.query(query, [nombre, email, pass, id], (error) => {
        if (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ message: 'El nombre o email ya están en uso' });
            }
            throw error;
        }
        res.json({ message: 'Usuario actualizado correctamente' });
    });
};

const usuarioDelete = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM usuarios WHERE id = ?';
    connection.query(query, [id], (error) => {
        if (error) throw error;
        res.json({ message: 'Usuario eliminado correctamente' });
    });
};

module.exports = { 
    usuariosGet, 
    usuarioPost, 
    usuarioPut, 
    usuarioDelete 
};