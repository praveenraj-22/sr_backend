const mysql =require('./modules').mysql2;
const cred=require('./cred')



exports.sr_root = mysql.createPool({
    host: cred.scm_root.host,
    user: cred.scm_root.user,
    password: cred.scm_root.pass,
    database: cred.scm_root.db,
    port: cred.scm_root.port,
    dateStrings: true,
    insecureAuth: true,
    multipleStatements: true,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

exports.sr_public = mysql.createPool({
    host: cred.scm_public.host,
    user: cred.scm_public.user,
    password: cred.scm_public.pass,
    database: cred.scm_public.db,
    port: cred.scm_public.port,
    dateStrings: true,
    multipleStatements: true,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})