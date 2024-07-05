const
    DB_NAME = "sysdev_recruitment",    
    TABLE_NAME = "programming_languages"
    FAVORITE_PROGRAMMING_LANGUAGE = "TypeScript"
;

// database/schema creation

// query:
// CREATE DATABASE IF NOT EXISTS sysdev_recruitment;

const
    mysql = require( "mysql" ),
    credentials = {
        host: "localhost",
        user: "root",
        password: "specquil"
    }
;
let connection = mysql.createConnection( credentials );

connection.connect( ( error ) => {

    if( error ) throw error;
    const sql = `CREATE DATABASE IF NOT EXISTS ${ DB_NAME }`;
    connection.query( sql, ( error ) => {

        if( error ) throw error;

    } );

} );

// table creation

// query:
// CREATE TABLE IF NOT EXISTS programming_languages (
//     id NOT NULL AUTO_INCREMENT,
//     favorites VARCHAR( 255 ),
//     PRIMARY KEY ( id )
// );

// data addition

// query:
// 

connection = mysql.createConnection( {
    ...credentials,
    database: DB_NAME
} );

let languagesData;

connection.connect( ( error ) => {

    if( error ) throw error;
    let sql = `
        CREATE TABLE IF NOT EXISTS ${ TABLE_NAME } (
            id int NOT NULL AUTO_INCREMENT,
            favorites VARCHAR( 255 ),
            PRIMARY KEY ( id )
        )
    `;
    connection.query( sql, ( error ) => {

        if( error ) throw error;

    } );
    
    sql = `
        INSERT INTO ${ TABLE_NAME } ( favorites )
        VALUES ( "${ FAVORITE_PROGRAMMING_LANGUAGE }" )
    `;
    connection.query( sql, ( error ) => {

        if( error ) throw error;

    } );

    sql = `SELECT * FROM ${ TABLE_NAME }`;
    connection.query( sql, ( error, results ) => {

        if( error ) throw error;
        languagesData = results;

        // displaying results

        const http = require( "http" );
        http.createServer( ( req, res ) => {

            res.writeHead( 200, { "Content-Type": "text/html" } );
            res.end( `
                <table>
                    <thead><tr>
                        <th>id</th>
                        <th>favorites</th>
                    </tr></thead>
                    <tbody>${
                        languagesData.map( ( { id, favorites } ) => `
                            <tr>
                                <td>${ id }</td>
                                <td>${ favorites }</td>
                            </tr>
                        ` ).join( "" )
                    }</tbody>
                </table>
            ` );

        } ).listen( 3000 );

    } );
    

} );

// Running:
// npm start
