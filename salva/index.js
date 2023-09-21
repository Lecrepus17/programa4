const express = require("express")
const mysql = require("mysql2")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'aula'
})

const server = express();
server.use(express.json())

server.post('/usuarios', (req, res) => {
    con.connect((err) => {
        if (err) throw err;
        const {email, senha} = req.body
        const unico = crypto.randomBytes(8).toString('hex')
        const sql = `INSERT INTO usuarios(
            email, senha, unico) VALUES (
                '${email}', '${senha}', '${unico}'
            )`
        con.query(sql, (err) => {
            if (err) throw err;
            return res.json({message: 'ok'})
        })
    })  
})

server.post('/recuperar-senha', (req, res) => {
    con.connect((err) => {
        if (err) throw err
        const {email} = req.body
        const sql = `SELECT id, unico FROM
        usuarios WHERE email = '${email}'`
        con.query(sql, (err,result) => {
            if (err) throw err
            const [usuario] = result
            const token = jwt.sign(usuario,
                'SECRETO', {expiresIn: 20 * 60})
            return res.json({token})
        })

    })
})

server.post('/trocar-senha', (req, res) => {
    con.connect(err => {
        if (err) throw err
        const {token, senha} = req.body
        const {id, unico}= jwt.verify(token, 'SECRETO')
        const sql = `SELECT unico FROM usuarios WHERE id = ${id}`
        con.query(sql, (err, result) => {
            if (err) throw err
            const [usuario] = result
            if (usuario.unico !== unico)
                return res.status(400).json({
                    error: 'Senha já alterada!'
                })

            const novoUnico = crypto.randomBytes(8).toString('hex')
            const sql = `update usuarios 
                set senha = '${senha}', unico = '${novoUnico}'
                WHERE id = ${id}`
            con.query(sql, err => {
                if (err) throw err
                return res.json({message: 'Senha alterada com sucesso!'})
            })

        })
    })
})





server.listen(4000, () => {
    console.log('server running...')
})