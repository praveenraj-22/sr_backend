const mods = require("./modules");
const _ = require('./modules')._;
const uuid = mods.uuid;

const connections = mods.connections;
const files = mods.sqls;
var async = require("async");
let sess = null;


exports.Login = (req, res) => {
  let user = req.body.user.trim();
  let pass = req.body.pass.trim();

  connections.sr_root.query("select * from users where name=? and password=? and is_active=1", [user, pass], (err, resdata) => {
    if (err) console.error(err);

    if (resdata.length === 0) {
      res.json({
        isAuthenticated: false
      });
    }
    else {
      console.log(resdata);
      connections.sr_root.query("update users set last_login=now() where name=?", [user], (err, res_data) => {
        if (err) { console.error(err); }
      })

      res.json({
        isAuthenticated: true,
        role: resdata[0].role,
        userName: resdata[0].name
      });
    }

  })
}

exports.changePassword = (req, res) => {
  let user = req.body.user.trim();
  let pass = req.body.confirmpassword.trim();

  connections.scm_public.query("update  users set password=? where emp_id =?", [pass, user], (err1, result) => {
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

exports.getgst = (req, res) => {
  connections.sr_public.query("SELECT VALUE,TAXID,CGSTVALUE,SGSTVALUE,UGSTVALUE,IGSTVALUE,CONCAT(VALUE,TAXID,CGSTVALUE,SGSTVALUE,UGSTVALUE,IGSTVALUE) AS CON FROM tax WHERE TAXSTATUS=1", (err, restax) => {
    if (err) console.error(err);
    res.json({
      "result": {
        "gstdata": restax
      }
    })

  })
}


exports.gstinsert = (req, res) => {
  let gst_name = req.body.gst_name;
  let gst_value = req.body.gst_value;
  let cgst_value = req.body.gst_cgst;
  let sgst_value = req.body.gst_sgst;
  let igst_value = req.body.gst_igst;

  console.log(gst_name+gst_value+cgst_value+sgst_value+ igst_value);
  let insertquery = ' INSERT INTO tax (TAXID,VALUE,CGSTVALUE,SGSTVALUE,IGSTVALUE) VALUE(?,?,?,?,?)'
  connections.sr_root.query(insertquery, [gst_name, gst_value, cgst_value, sgst_value, igst_value], (err, resdata) => {
    console.log(resdata);
    if (err) {
      res.json({
        dataupdated: false
      })
    }
    else {
      res.json({
        dataupdated: true
      })
    }
  })
}

exports.getcustomer=(req,res)=>{
  connections.sr_public.query("SELECT * FROM `customer_master`", (err, rescus) => {
    if (err) console.error(err);
    res.json({
      "result": {
        "customerdata": rescus
      }
    })

  })

}

exports.customerinsert=(req,res)=>{
  let cust_name=req.body.cust_name;
  let cust_address=req.body.cust_address;
  let cust_age=req.body.cust_age;
  let cust_mobile=req.body.cust_mobile;
  let cust_email=req.body.cust_email;
  console.log(cust_name+cust_address+cust_age+cust_mobile+cust_email);

  let insertquery="INSERT INTO customer_master (name,address,mobile,email,age) values (?,?,?,?,?)"
  
  connections.sr_root.query(insertquery,[cust_name,cust_address,cust_mobile,cust_email,cust_age],(err,resdata)=>{
    console.log(resdata);
    if (err) {
      res.json({
        dataupdated: false
      })
    }
    else {
      res.json({
        dataupdated: true
      })
    }

  })
}