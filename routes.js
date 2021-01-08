const mods = require("./modules");
const _ = require('./modules')._;
const uuid = mods.uuid;

const connections = mods.connections;
const files = mods.sqls;
var async = require("async");
let sess = null;


exports.Login =(req,res) =>{
    let user =req.body.user.trim();
    let pass =req.body.pass.trim();
    
    connections.sr_root.query("select * from users where name=? and password=? and is_active=1",[user,pass],(err,resdata)=>{
        if(err) console.error(err);

            if(resdata.length === 0){
                res.json({
                    isAuthenticated: false
                  });
            }
            else {
                console.log(resdata);
                connections.sr_root.query("update users set last_login=now() where name=?",[user],(err,res_data)=>{
                    if(err) {console.error(err);}
                 })
                 
                 res.json({
                    isAuthenticated: true,
                    role: resdata[0].role,
                    userName: resdata[0].name
                  });
            }

    })
}

exports.changePassword=(req,res)=>{
    let user = req.body.user.trim();
    let pass = req.body.confirmpassword.trim();
  
    connections.scm_public.query("update  users set password=? where emp_id =?",[pass,user], (err1, result) => {
      if (err1) {
        res.json({
          isAuthenticated: false
        });
      } else {
        res.json({
          isAuthenticated: true
        });
      }
  
    });

}

exports.logout = (req, res) => {
    // mods.sessionStore.close()
    this.sess = null;
    res.json({
      isAuthenticated: false
    });
  };
  
  exports.getgst=(req,res)=>{
    connections.sr_public.query("select * from tax where status=1",(err,restax)=>{
      if(err) console.error(err);
      res.json(restax);
    })
  }