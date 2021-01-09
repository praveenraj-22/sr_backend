const mysql =require('./modules').mysql2;
const cred=require('./cred')



exports.sr_root = mysql.createPool({
    host: cred.sr_root.host,
    user: cred.sr_root.user,
    password: cred.sr_root.pass,
    database: cred.sr_root.db,
    port: cred.sr_root.port,
    dateStrings: true,
    insecureAuth: true,
    multipleStatements: true,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

exports.sr_public = mysql.createPool({
    host: cred.sr_public.host,
    user: cred.sr_public.user,
    password: cred.sr_public.pass,
    database: cred.sr_public.db,
    port: cred.sr_public.port,
    dateStrings: true,
    multipleStatements: true,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})