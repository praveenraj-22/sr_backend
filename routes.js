const mods = require("./modules");
const _ = require('./modules')._;

const uuid = mods.uuid;

const connections = mods.connections;
const files = require('./read_query');

var async = require("async");


exports.Login = (req, res) => {
    let user = req.body.user.trim();
    let pass = req.body.pass.trim();

    connections.sr_root.query("select * from users where name=? and password=? and is_active=1", [user, pass], (err, resdata) => {
        if (err) console.error(err);

        if (resdata.length === 0) {
            res.json({
                isAuthenticated: false
            });
        } else {
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

    connections.sr_root.query("update  users set password=?  where name =?", [pass, user], (err1, result) => {
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
        } else {
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
    let cust_siteaddress = req.body.cust_siteaddress;
    let cust_site = req.body.cust_site;
    let cust_mobile = req.body.cust_mobile;
    let cust_sitemobile = req.body.cust_sitemobile;
    let cust_email = req.body.cust_email;

    console.log(cust_name + cust_address + cust_site + cust_mobile + cust_email + cust_site + cust_siteaddress + cust_sitemobile);

    let insertquery = "INSERT INTO customer_master (name,address,mobile,email,site_name,site_address,site_mobile) values (?,?,?,?,?,?,?)"

    connections.sr_root.query(insertquery, [cust_name, cust_address, cust_mobile, cust_email, cust_site, cust_siteaddress, cust_sitemobile], (err, resdata) => {

        console.log(resdata);
        if (err) {
            console.error(err);
            res.json({
                dataupdated: false
            })
        } else {
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
    let prod_widthinterlock=req.body.prod_widthinterlock;
    let prod_heightmullian = req.body.prod_heightmullian;
    let prod_widthmullian=req.body.prod_widthmullian;


    let insertquery = 'INSERT INTO product_master (modal,product_description,product,sash_width,sash_height,bead_width,bead_height,glass_size_width,glass_size_height,inter_lock_width,inter_lock_height,mullian_width,mullian_height) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,?)';

    connections.sr_root.query(insertquery, [prod_name, prod_desc, prod_model, prod_widthsash, prod_heightsash, prod_widthbead, prod_heightbead, prod_widthgs, prod_heightgs,prod_widthinterlock ,prod_heightinterlock, prod_widthmullian,prod_heightmullian], (err, resdata) => {
        if (err) console.error(err);
        console.log(resdata);

        if (err) {
            res.json({
                dataupdated: false
            })
        } else {
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

    connections.sr_public.query("select concat(modal,' || ',product_description,' || ',product) as pmlist,pm.* from product_master as pm where active_status=1", (err, resdata) => {
        if (err) console.error(err);
        res.json(resdata)
    })

}

exports.productionlist = async (req, res) => {
    let prod_cusname = req.body.prod_cusname;
    let prod_prodname = req.body.prod_prodname;
    let prod_width = req.body.prod_width;
    let prod_height = req.body.prod_height;
    let prod_comments = req.body.prod_comments;
    let prod_sno = req.body.prod_sno;
    let w=0,h=0,sw=0,sh=0,bw=0,bh=0,iw=0,ih=0,gw=0,gh=0,mw=0,mh=0;
    let name='';

    // let formulaquery = await productionformula(prod_prodname);
    // let formulasash = await sashformula(formulaquery, prod_width, prod_height)
    // let formulabead = await beadformula(formulaquery, formulasash.width, formulasash.height)
    // let formulaglass = await glassformula(formulaquery, formulabead.width, formulabead.height)
    // let formulalock = await lockformula(formulaquery, formulaglass.width, formulaglass.height)
    // let formulamullian = await mullianformula(formulaquery, formulalock.height)


    connections.sr_public.query("SELECT concat(product_description,' || ',product) as pmlist,pm.* FROM product_master as pm where id=?",[prod_prodname],(err,resdata)=>{
        if (err) {console.error(err)}
        else{
     
            console.log();
            name=resdata[0].pmlist;

             w=prod_width;
             h=prod_height;

                 sw=eval(resdata[0].sash_width.toLocaleLowerCase());
                 sh=eval(resdata[0].sash_height.toLocaleLowerCase());

                bw=eval(resdata[0].bead_width.toLocaleLowerCase());
                bh=eval(resdata[0].bead_height.toLocaleLowerCase());
             
                gw=eval(resdata[0].glass_size_width.toLocaleLowerCase());
                gh=eval(resdata[0].glass_size_height.toLocaleLowerCase());

                iw=eval(resdata[0].inter_lock_width.toLocaleLowerCase());
                ih=eval(resdata[0].inter_lock_height.toLocaleLowerCase());

                mw=eval(resdata[0].mullian_width.toLocaleLowerCase());
                mh=eval(resdata[0].mullian_height.toLocaleLowerCase());


                let insertquery = 'insert into production_list (prd_id,customer_name,product_name,width,height,sash_width,sash_height,bead_width,bead_height,glass_width,glass_height,inter_lock_width,inter_lock_height,mullian_width,mullian_height,comments,prodno)values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';

                connections.sr_root.query(insertquery, [prod_prodname, prod_cusname,name,w,h,sw,sh,bw,bh,gw,gh,iw,ih,mw,mh,prod_comments, prod_sno], (err, resdata) => {
                    if (err) console.error(err);
                    res.json({
                        dataupdated: "updated"
                    })
                })

        }
    })





}

let productionformula = async (a) => {

    return new Promise(resolve => {

        connections.sr_public.query("SELECT concat(product_description,' || ',product) as pmlist,pm.* FROM product_master as pm where id=? ", [a], (err, resdata) => {
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
        let sash_formula_height = a.result[0].sash_height;


        if ((sash_formula_width != null) || (sash_formula_width != '')) {

            let wid = (sash_formula_width.toLocaleLowerCase()).replace('w', w)

            sashwidth = eval(wid)
        }
        if ((sash_formula_height != null) || (sash_formula_height != '')) {
            let hei = (sash_formula_height.toLocaleLowerCase()).replace('h', h)

            sashheight = eval(hei)
        }
        resolve({

            "width": sashwidth,
            "height": sashheight

        })
    })
}

let beadformula = async (a, sw, sh) => {
    let beadwidth = 0;
    let beadheight = 0;

    return new Promise(resolve => {
        let bead_formula_width = a.result[0].bead_width;
        let bead_formula_height = a.result[0].bead_height;

        if ((bead_formula_width != null) || (bead_formula_width != '')) {
            let wid = (bead_formula_width.toLocaleLowerCase()).replace('sw', sw)
            beadwidth = eval(wid)
        }
        if ((bead_formula_height != null) || (bead_formula_height != '')) {
            let hei = (bead_formula_height.toLocaleLowerCase()).replace('sh', sh)
            beadheight = eval(hei)
        }
        resolve({

            "width": beadwidth,
            "height": beadheight

        })

    })
}

let glassformula = async (a, bw, bh) => {
    let glswidth = 0;
    let glsheight = 0;

    return new Promise(resolve => {
        let gls_formula_width = a.result[0].glass_size_width;
        let gls_formula_height = a.result[0].glass_size_height;

        if ((gls_formula_width == null) || (gls_formula_width == '')) {
            console.log("hit in glass width null");
        } else {
            let wid = (gls_formula_width.toLocaleLowerCase()).replace('bw', bw)
            glswidth = eval(wid)
        }
        if ((gls_formula_height == null) || (gls_formula_height == '')) {
            console.log("hit in glass height null");
        } else {
            let hei = (gls_formula_height.toLocaleLowerCase()).replace('bh', bh)
            glsheight = eval(hei)
        }
        resolve({
            "width": glswidth,
            "height": glsheight
        })

    })
}

let lockformula = async (a, gw, gh) => {
    let lockheight = 0;
    return new Promise(resolve => {

        let lock_formula_height = a.result[0].inter_lock_height;

        console.log(a.result[0]);

        console.log(lock_formula_height);
        if ((lock_formula_height == null) || (lock_formula_height == '')) {
            console.log("hit in lock height null");
        } else {
            let hei = (lock_formula_height.toLocaleLowerCase()).replace('gh', gh)
            lockheight = eval(hei)
        }

        resolve({
            "height": lockheight
        })

    })
}


let mullianformula = async (a, lkh) => {
    let mullianheight = 0;
    return new Promise(resolve => {
        let mullian_formula_height = a.result[0].mullian_height;

        if ((mullian_formula_height == null) || (mullian_formula_height == '')) {
            console.log("hit in mullian height null");
        } else {
            let hei = (mullian_formula_height.toLocaleLowerCase()).replace('ih', lkh)
            mullianheight = eval(hei)
        }

        resolve({
            "height": mullianheight
        })

    })
}

exports.getproduct_list = (req, res) => {
    let name = req.params.custname;
    let date = req.params.date;
    let prodno = req.params.id;
    connections.sr_public.query("SELECT @a:=@a+1 serial_number,pml.*,cus.* FROM production_list AS pml INNER JOIN customer_master AS cus ON cus.id=pml.customer_name,(SELECT @a:= 0) AS a  where customer_name=? and date(pml.created_date)=? and pml.prodno=? ", [name, date, prodno], (err, resdata) => {
        if (err) console.error(err);
        res.json(resdata)
    })
}

exports.move_prod = (req, res) => {
    let name = req.body.prod_cusname;
    let date = req.body.prod_date;
    connections.sr_root.query('update production_list set status=1 where customer_name=? and date(created_date)=?', [name, date], (err, resdata) => {
        if (err) { console.error(err); } else {
            connections.sr_root.query("select sum(sno)+1 as sno from productionlist_serialnumber", (err, resdata1) => {
                if (err) { console.error(err); } else {
                    let resdatavalue = resdata1[0].sno
                    connections.sr_root.query("update productionlist_serialnumber set sno=? where id=1", [resdatavalue], (err, resdata2) => {
                        if (err) { console.error(err); } else {
                            res.json({
                                dataupdated: 'updated'
                            })
                        }

                    })
                }
            })
        }

    })

}

exports.getproduction_list = (req, res) => {

    connections.sr_public.query('SELECT pml.*,DATE(pml.created_date) AS createddate,cus.* FROM production_list AS pml INNER JOIN customer_master AS cus ON cus.id=pml.customer_name where pml.status <> -1 GROUP BY pml.customer_name,DATE(pml.created_date),pml.status,prodno order by prodno asc', (err, resdata) => {
        if (err) console.error(err);
        //  console.log(resdata);
        res.json({
            "result": {
                "productiondata": resdata
            }
        })
    })
}
exports.get_serialnnumber = (req, res) => {
    connections.sr_public.query("SELECT CONCAT(CODE,SUM(sno)+1,'_',YEAR(CURDATE())) AS sno FROM productionlist_serialnumber", (err, resdata) => {
        if (err) console.error(err);
        res.json(resdata)
    })
}


exports.formula_id = (req, res) => {
    let id = req.params.id
    connections.sr_public.query('select * from product_master where id=?', [id], (err, resdata) => {
        if (err) console.error(err);

        res.json(resdata);

    })
}
exports.update_formula = (req, res) => {
    let formodal = req.body.for_modal;
    let fordesc = req.body.for_desc;
    let forprod = req.body.for_prod;
    let forsasw = req.body.for_sasw;
    let forsash = req.body.for_sash;
    let forbew = req.body.for_bew;
    let forbeh = req.body.for_beh;
    let forglw = req.body.for_glw;
    let forglh = req.body.for_glh;
    let forih = req.body.for_ih;
    let for_mh = req.body.for_mh;
    let for_id = req.body.for_id;
    let for_interlockwidth=req.body.for_interlockwidth;
    let for_mullianwidth=req.body.for_mullianwidth;


    let updatequery = "UPDATE  product_master SET modal=?,product_description=?,product=?,sash_width=?,`sash_height`=?,`bead_width`=?,`bead_height`=?,`glass_size_width`=?,`glass_size_height`=?,`inter_lock_height`=?,`mullian_height`=?,mullian_width=?,inter_lock_width=? WHERE id=?"

    console.log(updatequery);
    connections.sr_root.query(updatequery, [formodal, fordesc, forprod, forsasw, forsash, forbew, forbeh, forglw, forglh, forih, for_mh,for_mullianwidth,for_interlockwidth, for_id], (err, resdata) => {
        if (err) { console.error(err); } else {
            console.log(resdata);
            res.json({
                dataupdated: "updated"
            })
        }

    })


}

exports.get_prdlist = (req, res) => {
    let prdid = req.params.id;

    connections.sr_public.query("SELECT @a:=@a+1 serial_number, pml.*,DATE(pml.created_date) AS createddate ,cus.* FROM production_list AS pml  INNER JOIN customer_master AS cus ON cus.id=pml.customer_name,(SELECT @a:= 0) AS a  where pml.prodno=?", [prdid], (err, resdata) => {
        if (err) { console.error(err); } else {
            res.json(resdata)
        }
    })
}

exports.cancel_prod = (req, res) => {
    let sno = req.body.prod_no;

    let updatequery = "update production_list set status=-1 where prodno=?"
    connections.sr_root.query(updatequery, [sno], (err, resdata) => {
        if (err) { console.error(err); } else {
            res.json({
                dataupdated: "cancelled"
            })
        }
    })

}

exports.get_quotationserialnumber = (req, res) => {
    connections.sr_public.query("SELECT CONCAT(CODE,SUM(sno)+1,'_',YEAR(CURDATE())) AS sno FROM quotation_sno", (err, resdata) => {
        if (err) console.error(err);
        res.json(resdata)
    })
}


exports.insert_qtr = (req, res) => {
    let qtr_no = req.body.qtr_no;
    let qtr_cusname = req.body.qtr_cusname;
    let qtr_ref = req.body.qtr_ref;
    let qtr_prod = req.body.qtr_prod;
    let qtr_width = req.body.qtr_width;
    let qtr_height = req.body.qtr_height;
    let qtr_qty = req.body.qtr_qty
    let qtr_rate = req.body.qtr_rate;
    let qtr_convvalue = req.body.qtr_convvalue;
    let qtr_totalamount = '';
    let conversion = req.body.qtr_conversion;
    let qtr_stadress = req.body.qtr_stadress;

    if (qtr_convvalue == 0) {
        console.log("lsm");
        console.log(qtr_convvalue);
        console.log(qtr_rate);
        console.log(qtr_qty);
        qtr_totalamount = Math.round(qtr_rate)
        console.log(qtr_totalamount);
    } else {
        console.log(qtr_convvalue);
        console.log(qtr_rate);
        console.log(qtr_qty);
        qtr_totalamount = Math.round(qtr_convvalue * qtr_rate * qtr_qty)
        console.log(qtr_totalamount);
    }
    console.log(conversion);
    if (conversion == 'mm') {
        conversion = 'Sqm'
    } else if (conversion == 'feet') {
        conversion = 'Sqf'
    }

    let insertvalue = "insert into quotation_list(customer_id,reference,prod_id,qot_width,qot_height,qot_qty,qot_rate,qot_convvalue,qot_totalamount,qot_no,conversion) value(?,?,?,?,?,?,?,?,?,?,?)";

    connections.sr_root.query("update customer_master set site_address= ? where id = ? ", [qtr_stadress, qtr_cusname], (err, resupdated) => {
        if (err) { console.error(err); } else {

            connections.sr_root.query(insertvalue, [qtr_cusname, qtr_ref, qtr_prod, qtr_width, qtr_height, qtr_qty, qtr_rate, qtr_convvalue, qtr_totalamount, qtr_no, conversion], (err, resdata) => {
                if (err) { console.error(err); } else {
                    console.log(resdata);
                    res.json({
                        datainserted: "inserted"
                    })
                }
            })

        }

    })



}

exports.getqtr_list = (req, res) => {
    let id = req.params.id;

    connections.sr_public.query(files.qtlist, [id], (err, resdata) => {
        if (err) console.error(err);
        res.json(resdata)
    })

}

exports.createquatation = (req, res) => {
    let cus_name = req.body.cus_name;
    let cus_site = req.body.cus_site;
    let cus_address = req.body.cus_address
    let cus_qto = req.body.cus_qto;
    let cus_conn = req.body.cus_conn;
    let cus_total = req.body.cus_total
    let cus_qtrglschrge = req.body.cus_qtrglschrge;
    let cus_gstvalue = req.body.cus_gstvalue;
    let cus_qtrtrp = req.body.cus_qtrtrp
    let cus_netamount = req.body.cus_netamount;
    let cus_qty = req.body.cus_qty;
    let datta = [];



    let insertquery = 'insert into quotation(cus_name,cus_site,cus_address,cus_qto,cus_conn,cus_total,cus_qtrglschrge,cus_gstvalue,cus_qtrtrp,cus_netamount,cus_qty) values(?,?,?,?,?,?,?,?,?,?,?)'
    let quotupdate = "SELECT SUM(sno) as sno FROM quotation_sno";

    connections.sr_root.query("update quotation_list set active_status=1 where qot_no=? and active_status <>-1", [cus_qto], (err, resupdate) => {
        if (err) {
            console.error(err);
        } else {
            console.log(resupdate);
            connections.sr_root.query(insertquery, [cus_name, cus_site, cus_address, cus_qto, cus_conn, cus_total, cus_qtrglschrge, cus_gstvalue, cus_qtrtrp, cus_netamount, cus_qty], (err, resdata) => {
                if (err) { console.error(err); } else {
                    console.log(resdata);
                    connections.sr_public.query(quotupdate, (err, resdata1) => {
                        if (err) { console.error(err); } else {
                            resdata1.forEach(data => {
                                datta = data.sno;
                            });
                            let updateqto = "update quotation_sno set sno=?+1";

                            connections.sr_root.query(updateqto, [datta], (err, resdata3) => {
                                if (err) {
                                    console.error(err);
                                } else {
                                    res.json({
                                        datainserted: "inserted"
                                    })
                                }
                            })

                        }
                    })
                }
            })

        }
    })



}

exports.cancel_requestqto = (req, res) => {
    let id = req.body.item_id;


    connections.sr_root.query("update quotation_list set active_status=-1 where id=? and active_status =0", [id], (err, resdata) => {
        if (err) {
            console.error(err);
        } else {
            res.json({
                dataupdated: "updated"
            })
        }
    })
}

exports.getquatation_list = (req, res) => {

    connections.sr_public.query(files.qotlist, (err, resdata) => {
        if (err) { console.error(err); } else {
            res.json({
                "result": {
                    "quotationndata": resdata
                }
            })
        }
    })
}

exports.qot_amount = (req, res) => {

    let id = req.body.qto;
    let amt = req.body.qto_amt;
    let datta = [];
    let payamt = [];

    connections.sr_public.query("SELECT SUM(cus_netamount)-IF(SUM(cus_paid) IS NULL,0,SUM(cus_paid))-?  AS due, SUM(cus_paid)+? AS paid FROM quotation WHERE cus_qto=?", [amt, amt, id], (err, resdata) => {
        if (err) { console.error(err); } else {
            console.log(resdata)
            resdata.forEach(data => {
                datta = data.due;
                payamt = data.paid;
            });

            if (datta < 0) {
                console.log(datta);
                res.json({
                    dataupdated: "paidfully"
                })
            } else {
                let updatequery = 'update quotation set cus_paid=? ,cus_due=? where cus_qto=?'
                connections.sr_root.query(updatequery, [payamt, datta, id], (err, resdata1) => {
                    if (err) { console.error(err); } else {
                        console.log(resdata1)
                        res.json({
                            dataupdated: "paid"
                        })
                    }
                })
            }
        }
    })

}

exports.getquto_no = (req, res) => {
    let id = req.params.id;
    console.log(id);
    connections.sr_public.query("select * from quotation where cus_qto=?", [id], (err, resdata) => {
        if (err) { console.error(err); } else {
            console.log(resdata);
            res.json(resdata)
        }
    })
}

exports.cancel_qto = (req, res) => {
    let qto_no = req.body.qto_no;

    connections.sr_root.query("update quotation_list set active_status=-1 where qot_no=?", [qto_no], (err, resdata) => {
        if (err) { console.error(err); } else {
            console.log(resdata);

            res.json({
                dataupdated: "deleted"
            })
        }
    })
}


exports.getqtrlist_print = (req, res) => {
    let id = req.params.id;

    connections.sr_public.query(files.qotprint, [id], (err, resdata) => {
        if (err) { console.error(err); } else {
            res.json(resdata)
        }
    })
}

exports.insetcost_formula = (req, res) => {

    let formodal = req.body.for_modal;
    let fordesc = req.body.for_desc;
    let forprod = req.body.for_prod;

    let for_ofw = req.body.for_ofw;
    let for_ofh = req.body.for_ofh;
    let for_ofsw = req.body.for_ofsw;
    let for_ofrate = req.body.for_ofrate;

    let forsasw = req.body.for_sasw;
    let forsash = req.body.for_sash;
    let forsashsw = req.body.for_sashsw;
    let forsashrate = req.body.for_sashrate;

    let forbew = req.body.for_bew;
    let forbeh = req.body.for_beh;
    let forbesw = req.body.for_besw;
    let forberate = req.body.for_berate;

    let for_interlockwidth = req.body.for_interlockwidth;
    let for_interlockheight = req.body.for_interlockheight;
    let for_interlocksw = req.body.for_interlocksw;
    let for_interlockrate = req.body.for_interlockrate;

    let for_mullianwidth = req.body.for_mullianwidth;
    let for_mullianheight = req.body.for_mullianheight;
    let for_mulliansw = req.body.for_mulliansw;
    let for_mullianrate = req.body.for_mullianrate;

    let for_gasscutw = req.body.for_gasscutw;
    let for_gasscuth = req.body.for_gasscuth;
    let for_gasscutsw = req.body.for_gasscutsw;
    let for_gasscutrate = req.body.for_gasscutrate;

    let for_jdprofilew = req.body.for_jdprofilew;
    let for_jdprofileh = req.body.for_jdprofileh;
    let for_jdprofilerate = req.body.for_jdprofilerate;
    let for_jdprofilesw = req.body.for_jdprofilesw;

    let for_woolpilew = req.body.for_woolpilew;
    let for_woolpileh = req.body.for_woolpileh;
    let for_woolpilesw = req.body.for_woolpilesw;
    let for_woolpilerate = req.body.for_woolpilerate;

    let foracc = req.body.for_acc;
    let foraccrte = req.body.for_accrte;

    let for_steelw=req.body.for_steelw;
    let for_steelh=req.body.for_steelh;
    let for_steelsw=req.body.for_steelsw;
    let for_steelrate = req.body.for_steelrate;

    let for_id = req.body.for_id;


    let insertquery = "INSERT INTO costing_master (cproduct_id,ofw,ofh,ofsw,of_rate,csash_width,csash_height,csashsw,csash_rate,cbead_width,cbead_height,cbeadsw,cbead_rate,cinter_lock_width,cinter_lock_height,cinterlocksw,cinter_lock_rate,cmullian_width,cmullian_height,cmulliansw,cmullian_rate,cjdprofile_width,cjdprofile_height,cjdprofilesw,cjdprofile_rate,caccessories,caccessories_rate,cgasscut_w,cgasscut_h,cgasscut_sw,cgasscut_rate,cwoolpile_w,cwoolpile_h,cwoopile_sw,cwoolpile_rate,csteel_w,csteel_h,csteel_sw,csteel_rate) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"

    connections.sr_root.query(insertquery, [for_id, for_ofw, for_ofh, for_ofsw, for_ofrate, forsasw, forsash, forsashsw, forsashrate, forbew, forbeh, forbesw, forberate, for_interlockwidth, for_interlockheight, for_interlocksw, for_interlockrate, for_mullianwidth, for_mullianheight, for_mulliansw, for_mullianrate, for_jdprofilew, for_jdprofileh, for_jdprofilesw, for_jdprofilerate, foracc, foraccrte, for_gasscutw, for_gasscuth, for_gasscutsw, for_gasscutrate, for_woolpilew, for_woolpileh, for_woolpilesw, for_woolpilerate,for_steelw,for_steelh,for_steelsw ,for_steelrate], (err, resdata) => {
        if (err) {
            console.error(err);
        } else {
            res.json({
                datainserted: "inserted"
            })
        }
    })

}


exports.loadcost_product = (req, res) => {
    connections.sr_public.query("SELECT pm.id AS pmid, pm.*,cm.*,cm.active_status AS stat,cm.id AS cmid  FROM product_master AS pm LEFT JOIN `costing_master` AS cm ON (cm.cproduct_id=pm.id) WHERE pm.active_status=1", (err, resdata) => {
        if (err) console.error(err);
        res.json({
            "result": {
                "productdata": resdata
            }
        })
    })

}


exports.costformula_id = (req, res) => {

    let id = req.params.id
    connections.sr_public.query('SELECT pm.id AS pmid, pm.*,cm.*,cm.active_status AS stat,cm.id AS cmid FROM product_master AS pm LEFT JOIN `costing_master` AS cm ON (cm.cproduct_id=pm.id)  WHERE pm.active_status=1 AND pm.id=?', [id], (err, resdata) => {
        if (err) console.error(err);

        res.json(resdata);

    })

}

exports.updatecost_formula = (req, res) => {

    let formodal = req.body.for_modal;
    let fordesc = req.body.for_desc;
    let forprod = req.body.for_prod;

    let for_ofw = req.body.for_ofw;
    let for_ofh = req.body.for_ofh;
    let for_ofsw = req.body.for_ofsw;
    let for_ofrate = req.body.for_ofrate;

    let forsasw = req.body.for_sasw;
    let forsash = req.body.for_sash;
    let forsashsw = req.body.for_sashsw;
    let forsashrate = req.body.for_sashrate;

    let forbew = req.body.for_bew;
    let forbeh = req.body.for_beh;
    let forbesw = req.body.for_besw;
    let forberate = req.body.for_berate;

    let for_interlockwidth = req.body.for_interlockwidth;
    let for_interlockheight = req.body.for_interlockheight;
    let for_interlocksw = req.body.for_interlocksw;
    let for_interlockrate = req.body.for_interlockrate;

    let for_mullianwidth = req.body.for_mullianwidth;
    let for_mullianheight = req.body.for_mullianheight;
    let for_mulliansw = req.body.for_mulliansw;
    let for_mullianrate = req.body.for_mullianrate;

    let for_gasscutw = req.body.for_gasscutw;
    let for_gasscuth = req.body.for_gasscuth;
    let for_gasscutsw = req.body.for_gasscutsw;
    let for_gasscutrate = req.body.for_gasscutrate;

    let for_jdprofilew = req.body.for_jdprofilew;
    let for_jdprofileh = req.body.for_jdprofileh;
    let for_jdprofilerate = req.body.for_jdprofilerate;
    let for_jdprofilesw = req.body.for_jdprofilesw;

    let for_woolpilew = req.body.for_woolpilew;
    let for_woolpileh = req.body.for_woolpileh;
    let for_woolpilesw = req.body.for_woolpilesw;
    let for_woolpilerate = req.body.for_woolpilerate;

    let foracc = req.body.for_acc;
    let foraccrte = req.body.for_accrte;

    let for_steel_w = req.body.for_steel_w;
    let for_steel_h = req.body.for_steel_h;
    let for_steel_sw = req.body.for_steel_sw;
    let for_steelrate = req.body.for_steelrate;

    let for_id = req.body.for_id;
    let for_csid = req.body.for_csid;



    let updatequery = " UPDATE costing_master SET ofw=?,ofh=?,ofsw=?,of_rate=?,csash_width=?,csash_height=?,csashsw=?,csash_rate=?,cbead_width=?,cbead_height=?,cbeadsw=?,cbead_rate=?,cinter_lock_width=?,cinter_lock_height=?,cinterlocksw=?,cinter_lock_rate=?,cmullian_width=?,cmullian_height=?,cmulliansw=?,cmullian_rate=?,cjdprofile_width=?,cjdprofile_height=?,cjdprofilesw=?,cjdprofile_rate=?,caccessories=?,caccessories_rate=?,cgasscut_w=?,cgasscut_h=?,cgasscut_sw=?,cgasscut_rate=?,cwoolpile_w=?,cwoolpile_h=?,cwoopile_sw=?,cwoolpile_rate=?,csteel_w=?,csteel_h=?,csteel_sw=?,csteel_rate=? WHERE id=?";

console.log(updatequery);

    connections.sr_root.query(updatequery, [for_ofw, for_ofh, for_ofsw, for_ofrate, forsasw, forsash, forsashsw, forsashrate, forbew, forbeh, forbesw, forberate, for_interlockwidth, for_interlockheight, for_interlocksw, for_interlockrate, for_mullianwidth, for_mullianheight, for_mulliansw, for_mullianrate, for_jdprofilew, for_jdprofileh, for_jdprofilesw, for_jdprofilerate, foracc, foraccrte, for_gasscutw, for_gasscuth, for_gasscutsw, for_gasscutrate, for_woolpilew, for_woolpileh, for_woolpilesw, for_woolpilerate, for_steel_w,for_steel_h,for_steel_sw,for_steelrate, for_csid], (err, resdata) => {
        if (err) {
            console.error(err);
        } else {
            res.json({
                dataupdated: "updated"
            })
        }
    })


}


exports.getcosting_prdlist = (req, res) => {
    let prdno = req.params.prdid;

    let selectquery = '  SELECT ql.id AS "qlid",ql.*,cm.*,pm.*,cusm.name,cusm.address,cusm.email,cusm.site_name,cusm.site_address,cusm.site_mobile FROM `quotation_list` AS ql  JOIN costing_master AS cm ON ql.prod_id =cm.cproduct_id JOIN product_master AS pm ON pm.id=cm.cproduct_id  JOIN customer_master AS cusm ON cusm.id=ql.customer_id  WHERE ql.qot_no=?   AND ql.active_status=1';

    connections.sr_public.query(selectquery, [prdno], (err, resd) => {
        if (err) {
            res.json({ "ResponseCode": 204, "ResponseMsg": "No data found" });
        } else {
            mods.functions.costlst(resd).then(final => res.send(final));
        }
    })

}