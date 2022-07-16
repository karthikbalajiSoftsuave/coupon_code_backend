import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();


var connection = mysql.createPool({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: 3306,
    database: "coupon_code",
    multipleStatements: true
})

export const dbexecuteQuery = async (sqlQuery: string, params?: any) => {
    try {
        
        const [result] = await connection.query(sqlQuery, params);    
        
        console.log("result",result);
        
        return result as any
    } catch (err) {
        throw err
    }
}