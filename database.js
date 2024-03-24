import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config();
const pool =mysql.createPool({
host:process.env.MYSQL_HOST,
user: process.env.MYSQL_USER,
password: process.env.MYSQL_PASSWORD,
database: process.env.MYSQL_DATABASE,
}).promise();

export async function getjokes(){
    const [rows] = await pool.query("SELECT * FROM jokes");
    return rows;
}

export async function getjoke(id){
    const [rows] = await pool.query(`SELECT * FROM jokes WHERE id= ?`,[id]);
    return rows[0];
}

export async function createJoke (title,contents){
    const[result] = await pool.query(`
    INSERT INTO jokes(title,contents)
    VALUES(?,?)`,[title,contents])
    const id = result.insertId;
    return getjokes(id);
}


