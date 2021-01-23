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

  console.log(gst_name + gst_value + cgst_value + sgst_value + igst_value);
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

exports.getcustomer = (req, res) => {
  connections.sr_public.query("SELECT * FROM `customer_master`", (err, rescus) => {
    if (err) console.error(err);
    res.json({
      "result": {
        "customerdata": rescus
      }
    })

  })

}

exports.customerinsert = (req, res) => {
  let cust_name = req.body.cust_name;
  let cust_address = req.body.cust_address;
  let cust_age = req.body.cust_age;
  let cust_mobile = req.body.cust_mobile;
  let cust_email = req.body.cust_email;
  console.log(cust_name + cust_address + cust_age + cust_mobile + cust_email);

  let insertquery = "INSERT INTO customer_master (name,address,mobile,email,age) values (?,?,?,?,?)"

  connections.sr_root.query(insertquery, [cust_name, cust_address, cust_mobile, cust_email, cust_age], (err, resdata) => {
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

exports.productinsert = (req, res) => {

  let prod_name = req.body.prod_name;
  let prod_desc = req.body.prod_desc;
  let prod_model = req.body.prod_model;

  let prod_widthsash = req.body.prod_widthsash;
  let prod_heightsash = req.body.prod_heightsash;
  let prod_widthbead = req.body.prod_widthbead;
  let prod_heightbead = req.body.prod_heightbead;
  let prod_widthgs = req.body.prod_widthgs;
  let prod_heightgs = req.body.prod_heightgs;
  let prod_heightinterlock = req.body.prod_heightinterlock;
  let prod_heightmullian = req.body.prod_heightmullian;

  let insertquery = 'INSERT INTO product_master (modal,product_description,product,sash_width,sash_height,bead_width,bead_height,glass_size_width,glass_size_height,inter_lock_height,mullian_height) VALUE (?,?,?,?,?,?,?,?,?,?,?)';

  connections.sr_root.query(insertquery, [prod_name, prod_desc, prod_model, prod_widthsash, prod_heightsash, prod_widthbead, prod_heightbead, prod_widthgs, prod_heightgs, prod_heightinterlock, prod_heightmullian], (err, resdata) => {
    if (err) console.error(err);
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


exports.getproduct = (req, res) => {

  connections.sr_public.query("select * from product_master where active_status=1", (err, resdata) => {
    if (err) console.error(err);
    res.json({
      "result": {
        "productdata": resdata
      }
    })
  })

}

exports.loadcustomerlist = (req, res) => {

  connections.sr_public.query("SELECT cm.*,CONCAT(NAME,' || ',mobile) AS cus FROM `customer_master` AS cm", (err, resdata) => {
    res.json(resdata)
  })
}

exports.getproductlist = (req, res) => {

  connections.sr_public.query("select concat(modal,' || ',product) as pmlist,pm.* from product_master as pm where active_status=1", (err, resdata) => {
    if (err) console.error(err);
    res.json(resdata)
  })

}

exports.productionlist = async (req, res) => {
  let prod_cusname = req.body.prod_cusname;
  let prod_prodname = req.body.prod_prodname;
  let prod_width = req.body.prod_width;
  let prod_height = req.body.prod_height;

  let formulaquery = await productionformula(prod_prodname);
  let formulasash = await sashformula(formulaquery, prod_width, prod_height)
  let formulabead=await beadformula(formulaquery,formulasash.width,formulasash.height)
  let formulaglass=await glassformula(formulaquery,formulabead.width,formulabead.height)
  let formulalock=await lockformula(formulaquery,formulaglass.width,formulaglass.height) 
  let formulamullian=await mullianformula(formulaquery,formulalock.height) 

  
  
  let insertquery='insert into production_list (customer_name,product_name,width,height,sash_width,sash_height,bead_width,bead_height,glass_width,glass_height,inter_lock_height,mullian_height)values(?,?,?,?,?,?,?,?,?,?,?,?)';

  connections.sr_root.query(insertquery,[prod_cusname,formulaquery.result[0].pmlist,prod_width,prod_height,formulasash.width,formulasash.height,formulabead.width,formulabead.height,formulaglass.width,formulaglass.height,formulalock.height,formulamullian.height],(err,resdata)=>{
    if(err) console.error(err);
    res.json({
      dataupdated:"updated"
    })
  })

  
}

let productionformula = async (a) => {

  return new Promise(resolve => {

    connections.sr_public.query("SELECT concat(modal,' || ',product) as pmlist,pm.* FROM product_master as pm where id=? ", [a], (err, resdata) => {
      if (err) console.error(err);
      resolve({
        "result": resdata
      })

    })

  })
}
let sashformula = async (a, w, h) => {
  let sashwidth = 0
  let sashheight = 0
  return new Promise(resolve => {

    let sash_formula_width = a.result[0].sash_width;
    let sash_formula_height = a.result[0].sash_width;
    if ((sash_formula_width != null) || (sash_formula_width != '')) {
      let wid = sash_formula_width.replace('w', w)

      sashwidth = eval(wid)
    }
    if ((sash_formula_height != null) || (sash_formula_height != '')) {
      let hei = sash_formula_width.replace('h', h)

      sashheight = eval(hei)
    }

    resolve({

      "width": sashwidth,
      "height": sashheight

    })
  })
}

let beadformula=async(a,sw,sh)=>{
  let beadwidth=0;
  let beadheight=0;

  return new Promise(resolve=>{
    let bead_formula_width = a.result[0].bead_width;
    let bead_formula_height = a.result[0].bead_height;

    if ((bead_formula_width != null) || (bead_formula_width != '')) {
      let wid = bead_formula_width.replace('sw', sw)
      beadwidth = eval(wid)
    }
    if ((bead_formula_height != null) || (bead_formula_height != '')) {
      let hei = bead_formula_height.replace('sh', sh)
      beadheight = eval(hei)
    }
    resolve({

      "width": beadwidth,
      "height": beadheight

    })

  })
}

let glassformula=async(a,bw,bh)=>{
  let glswidth=0;
  let glsheight=0;

  return new Promise(resolve=>{
    let gls_formula_width = a.result[0].glass_size_width;
    let gls_formula_height = a.result[0].glass_size_height;

    if ((gls_formula_width == null) || (gls_formula_width == '')) {
      console.log("hit in glass width null");
    }
    else{
      let wid = gls_formula_width.replace('gw',bw)
      glswidth = eval(wid)
    }
    if ((gls_formula_height == null) || (gls_formula_height == '')) {
      console.log("hit in glass height null");
    }
    else {
      let hei = gls_formula_height.replace('gh', bh)
      glsheight = eval(hei)
    }
    resolve({
      "width": glswidth,
      "height": glsheight
    })

  })
}

let lockformula= async(a,gw,gh)=>{
  
  let lockheight=0;
  return new Promise(resolve=>{

    let lock_formula_height = a.result[0].glass_size_height;

    if ((lock_formula_height != null) || (lock_formula_height != '')) {
      console.log("hit in lock height null");
    }
    else{
      let hei = lock_formula_height.replace('gh', gh)
      lockheight = eval(hei)
    }

    resolve({
      "height": lockheight
    })

  })
}


let mullianformula=async(a,lkh)=>{
  let mullianheight=0;

  return new Promise (resolve=>{
    let mullian_formula_height = a.result[0].mullian_height;

    if ((mullian_formula_height != null) || (mullian_formula_height != '')) {
      console.log("hit in mullian height null");
    }
    else{
      let hei = mullian_formula_height.replace('lkh', lkh)
      lockheight = eval(hei)
    }
    resolve({
      "height": mullianheight
    })

  })
}

exports.getproduct_list=(req,res)=>{
  let name=req.params.custname;

  connections.sr_public.query("SELECT @a:=@a+1 serial_number,pml.*,cus.* FROM production_list AS pml INNER JOIN customer_master AS cus ON cus.id=pml.customer_name,(SELECT @a:= 0) AS a  where customer_name=?",[name],(err,resdata)=>{
    if(err) console.error(err);
    res.json(resdata)
  })
}

exports.move_prod=(req,res)=>{
let name =req.body.prod_cusname;

  connections.sr_root.query('update production_list set status=1 where customer_name=?',[name],(err,resdata)=>{
    if(err) console.error(err);
    res.json({
      dataupdated:'updated'
    })
  })

}