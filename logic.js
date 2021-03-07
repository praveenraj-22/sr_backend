const _ = require('./modules')._
const connections = require('./modules').connections
const files = require('./modules').sqls
const session = require('./modules').cookieSession




exports.costlst = async (cstlist) => {

    let costlist = await costinglist(cstlist)

    return costlist;

}


let costinglist = async (cstlist) => {

    let brandtmpObj = {};
    let model = '';
    let pd = '';
    let product = '';
    let width = '';
    let height = '';
    let outerframew = 0;
    let outerframeh = 0;
    let outerframesw = 0;
    let outerframerate = 0;
    let allouterframerate = 0;
    let sashw = 0, sashh = 0, sashsw = 0, sashrate = 0, allsashrate = 0;
    let beadw = 0, beadh = 0, beadsw = 0, beadrate = 0, allbeadrate = 0;
    let interlckh = 0, interlckw = 0, interlcksw = 0, interlckrate = 0, allinterlckrate = 0;
    let mullianh = 0, mullianw = 0, mullianrate = 0, mulliansw = 0, allmullianrate = 0;
    let jdh = 0, jdw = 0, jdrate = 0, jdsw = 0, alljdrate = 0;
    let gassh = 0, gassw = 0, gassrate = 0, gasscutsw = 0, allgasscutrate = 0;
    let woolph = 0, woolpw = 0, woolprate = 0, woolpsw = 0, allwoolprate = 0;
    let accessories = '', accessoriesvalue = 0, allaccessoriesvalue = 0;
    let steelw = 0,steelh = 0,steelsw = 0,steelrate = 0 ,allsteel = 0;
    let w = '', h = '', ow = '', oh = '', sw = '', sh = '', bw = '', bh = '', iw = '', ih = '', mw = '', mh = '', jw = '', jh = '', gw = '', gh = '', ww = '', wh = '',stw='',sth='';
    let all_outerframerate = [], all_sashrate = [], all_beadrate = [], all_interlckrate = [], all_mullianrate = [], all_jdpfrate = [], all_gassrate = [], all_woolpilerate = [], all_acc = [], all_steelrate = [],all_fabrate=[],all_labrate=[];
    let sumofr = 0, sumsash = 0, sumbead = 0, suminterlock = 0, summullian = 0, sumjdpf = 0, sumgass = 0, sumwoolpile = 0, sumacc = 0, sumsteel = 0,sumfab=0,sumlab=0;
    let sno=0;
    cstlist.forEach(lst => {
        brandtmpObj[lst.qlid] = {};
        formula = [];
        formulaid = {};
     console.log(lst);

        (model = ''), (pd = ''), (product = ''), (width = ''), (height = ''),
            (outerframew = 0), (outerframeh = 0), (outerframesw = 0), (outerframerate = 0),
            (sashw = 0), (sashh = 0), (sashsw = 0), (sashrate = 0), (beadw = 0), (beadh = 0), (beadsw = 0), (beadrate = 0),
            (interlckh = 0), (interlckw = 0), (interlckrate = 0), (interlcksw = 0), (mullianh = 0), (mullianw = 0), (mullianrate = 0), (mulliansw = 0),
            (jdh = 0), (jdw = 0), (jdrate = 0), (jdsw = 0),
            (accessories = ''), (accessoriesvalue = 0);

        
        (brandtmpObj[lst.qlid].model = lst.modal);
        (brandtmpObj[lst.qlid].pd = lst.product_description);
        (brandtmpObj[lst.qlid].product = lst.product);


        (brandtmpObj[lst.qlid].qot_no = lst.qot_no);
        (brandtmpObj[lst.qlid].ref = lst.reference);
        (brandtmpObj[lst.qlid].name = lst.name);
        (brandtmpObj[lst.qlid].address = lst.address);
        (brandtmpObj[lst.qlid].site_name = lst.site_name);
        (brandtmpObj[lst.qlid].site_address = lst.site_address);
        (brandtmpObj[lst.qlid].site_mobile = lst.site_mobile);

        (brandtmpObj[lst.qlid].pd = lst.product_description);
        (brandtmpObj[lst.qlid].product = lst.product);
        if (lst.conversion == 'Sqf') {
            (brandtmpObj[lst.qlid].width = eval((lst.qot_width) * 304.8));

        }
        else {
            (brandtmpObj[lst.qlid].width = lst.qot_width);
        }

        if (lst.conversion == 'Sqf') {
            (brandtmpObj[lst.qlid].height = eval((lst.qot_height) * 304.8));
        }
        else {
            (brandtmpObj[lst.qlid].height = lst.qot_height);
        }
        w = brandtmpObj[lst.qlid].width;
        h = brandtmpObj[lst.qlid].height;


        //outer frame
        if ((lst.ofw == '') || (lst.ofw == null)) {
            (brandtmpObj[lst.qlid].outerframew = 0)

        } else {
            (brandtmpObj[lst.qlid].outerframew = eval(lst.ofw.toLocaleLowerCase()));

        }
        ow = brandtmpObj[lst.qlid].outerframew;

        if ((lst.ofh == '') || (lst.ofh == null)) {
            (brandtmpObj[lst.qlid].outerframeh = 0)
        } else {
            (brandtmpObj[lst.qlid].outerframeh = eval(lst.ofh.toLocaleLowerCase()));

        }
        oh = brandtmpObj[lst.qlid].outerframeh;


        if ((lst.ofsw == '') || (lst.ofsw == null)) {
            (brandtmpObj[lst.qlid].outerframesw = 0);
            (brandtmpObj[lst.qlid].outerframerate = eval((brandtmpObj[lst.qlid].outerframesw) * parseInt(lst.of_rate)).toFixed(2));
            if (brandtmpObj[lst.qlid].outerframerate == 'NaN') {
                brandtmpObj[lst.qlid].outerframerate = 0;
            }
            all_outerframerate.push(brandtmpObj[lst.qlid].outerframerate)


        } else {
            (brandtmpObj[lst.qlid].outerframesw = eval(((parseInt(brandtmpObj[lst.qlid].width) + parseInt(brandtmpObj[lst.qlid].height)) / 1000) * parseInt(lst.ofsw)).toFixed(2));
            (brandtmpObj[lst.qlid].outerframerate = eval((brandtmpObj[lst.qlid].outerframesw) * parseInt(lst.of_rate)).toFixed(2));
            if (brandtmpObj[lst.qlid].outerframerate == 'NaN') {
                brandtmpObj[lst.qlid].outerframerate = 0;
            }

            all_outerframerate.push(brandtmpObj[lst.qlid].outerframerate)

        }

        //sash


        if ((lst.csash_width == '') || (lst.csash_width == null)) {
            (brandtmpObj[lst.qlid].sashw = 0)
        } else {
            (brandtmpObj[lst.qlid].sashw = eval(lst.csash_width.toLocaleLowerCase()));
        }
        sw = brandtmpObj[lst.qlid].sashw


        if ((lst.csash_height == '') || (lst.csash_height == null)) {
            (brandtmpObj[lst.qlid].sashh = 0)
        } else {
            (brandtmpObj[lst.qlid].sashh = eval(lst.csash_height.toLocaleLowerCase()));
        }
        sh = brandtmpObj[lst.qlid].sashh;


        if ((lst.csashsw == '') || (lst.csashsw == null)) {
            (brandtmpObj[lst.qlid].sashsw = 0);
            (brandtmpObj[lst.qlid].sashrate = eval((brandtmpObj[lst.qlid].sashsw) * parseInt(lst.csash_rate)).toFixed(2));
            if (brandtmpObj[lst.qlid].sashrate == 'NaN') {
                brandtmpObj[lst.qlid].sashrate = 0;
            }
            all_sashrate.push(brandtmpObj[lst.qlid].sashrate)

        } else {
console.log(brandtmpObj[lst.qlid].sashw);
console.log(brandtmpObj[lst.qlid].sashw);

console.log(lst.csash_rate);

            (brandtmpObj[lst.qlid].sashsw = eval(((parseInt(brandtmpObj[lst.qlid].sashw) + parseInt(brandtmpObj[lst.qlid].sashh)) / 1000) * parseInt(lst.csashsw)).toFixed(2));
           
            console.log(" sw "+brandtmpObj[lst.qlid].sashsw);

            (brandtmpObj[lst.qlid].sashrate = eval((brandtmpObj[lst.qlid].sashsw) * parseInt(lst.csash_rate)).toFixed(2));
            all_sashrate.push(brandtmpObj[lst.qlid].sashrate)
        }

        //BEAD

        if ((lst.cbead_width == '') || (lst.cbead_width == null)) {
            (brandtmpObj[lst.qlid].beadw = 0)
        } else {
            (brandtmpObj[lst.qlid].beadw = eval(lst.cbead_width.toLocaleLowerCase()));
        }
        bw = brandtmpObj[lst.qlid].beadw;

        if ((lst.cbead_height == '') || (lst.cbead_height == null)) {
            (brandtmpObj[lst.qlid].beadh = 0)
        } else {
            (brandtmpObj[lst.qlid].beadh = eval(lst.cbead_height.toLocaleLowerCase()));
        }
        bh = brandtmpObj[lst.qlid].beadh;


        if ((lst.cbeadsw == '') || (lst.cbeadsw == null)) {
            (brandtmpObj[lst.qlid].cbeadsw = 0);
            (brandtmpObj[lst.qlid].beadrate = eval((brandtmpObj[lst.qlid].cbeadsw) * parseInt(lst.cbead_rate)).toFixed(2));
            if (brandtmpObj[lst.qlid].beadrate == 'NaN') {
                brandtmpObj[lst.qlid].beadrate = 0;
            }
            all_beadrate.push(brandtmpObj[lst.qlid].beadrate)
        } else {
            (brandtmpObj[lst.qlid].cbeadsw = eval(((parseInt(brandtmpObj[lst.qlid].beadw) + parseInt(brandtmpObj[lst.qlid].beadh)) / 1000) * parseInt(lst.cbeadsw)).toFixed(2));
            (brandtmpObj[lst.qlid].beadrate = eval((brandtmpObj[lst.qlid].cbeadsw) * parseInt(lst.cbead_rate)).toFixed(2));

            all_beadrate.push(brandtmpObj[lst.qlid].beadrate)

        }


        // interlock


        if ((lst.cinter_lock_height == '') || (lst.cinter_lock_height == null)) {
            (brandtmpObj[lst.qlid].interlckh = 0)
        } else {
            (brandtmpObj[lst.qlid].interlckh = eval(lst.cinter_lock_height.toLocaleLowerCase()));
        }
        ih = brandtmpObj[lst.qlid].interlckh;

        if ((lst.cinter_lock_width == '') || (lst.cinter_lock_width == null)) {
            (brandtmpObj[lst.qlid].interlckw = 0);
        } else {
            (brandtmpObj[lst.qlid].interlckw = eval(lst.cinter_lock_width.toLocaleLowerCase()));
        }
        iw = brandtmpObj[lst.qlid].interlckw;

        if ((lst.cinterlocksw == '') || (lst.cinterlocksw == null)) {
            (brandtmpObj[lst.qlid].interlcksw = 0);
            (brandtmpObj[lst.qlid].interlckrate = eval((brandtmpObj[lst.qlid].interlcksw) * parseInt(lst.cinter_lock_rate)).toFixed(2));
            if (brandtmpObj[lst.qlid].interlckrate == 'NaN') {
                brandtmpObj[lst.qlid].interlckrate = 0;
            }
            all_interlckrate.push(brandtmpObj[lst.qlid].interlckrate)
        } else {
            (brandtmpObj[lst.qlid].interlcksw = eval(((parseInt(brandtmpObj[lst.qlid].interlckh) + parseInt(brandtmpObj[lst.qlid].interlckw)) / 1000) * parseInt(lst.cinterlocksw)).toFixed(2));

            (brandtmpObj[lst.qlid].interlckrate = eval((brandtmpObj[lst.qlid].interlcksw) * parseInt(lst.cinter_lock_rate)).toFixed(2));
            all_interlckrate.push(brandtmpObj[lst.qlid].interlckrate)

        }


        // muulian


        if ((lst.cmullian_height == '') || (lst.cmullian_height == null)) {
            (brandtmpObj[lst.qlid].mullianh = 0)
        } else {
            (brandtmpObj[lst.qlid].mullianh = eval(lst.cmullian_height.toLocaleLowerCase()));
        }
        mh = brandtmpObj[lst.qlid].mullianh;

        if ((lst.cmullian_width == '') || (lst.cmullian_width == null)) {
            (brandtmpObj[lst.qlid].mullianw = 0);
        } else {
            (brandtmpObj[lst.qlid].mullianw = eval(lst.cmullian_width.toLocaleLowerCase()));
        }
        mw = brandtmpObj[lst.qlid].mullianw;

        if ((lst.cmulliansw == '') || (lst.cmulliansw == null)) {
            (brandtmpObj[lst.qlid].mulliansw = 0);

            (brandtmpObj[lst.qlid].mullianrate = eval((brandtmpObj[lst.qlid].mulliansw) * parseInt(lst.cmullian_rate)).toFixed(2));
            if (brandtmpObj[lst.qlid].mullianrate == 'NaN') {
                brandtmpObj[lst.qlid].mullianrate = 0;
            }
            all_mullianrate.push(brandtmpObj[lst.qlid].mullianrate)
        } else {
            (brandtmpObj[lst.qlid].mulliansw = eval(((parseInt(brandtmpObj[lst.qlid].mullianh) + parseInt(brandtmpObj[lst.qlid].mullianw)) / 1000) * parseInt(lst.cmulliansw)).toFixed(2));

            (brandtmpObj[lst.qlid].mullianrate = eval((brandtmpObj[lst.qlid].mulliansw) * parseInt(lst.cmullian_rate)).toFixed(2));
            all_mullianrate.push(brandtmpObj[lst.qlid].mullianrate)
        }



        // jd

        if ((lst.cjdprofile_height == '') || (lst.cjdprofile_height == null)) {
            (brandtmpObj[lst.qlid].jdh = 0)
        } else {
            (brandtmpObj[lst.qlid].jdh = eval(lst.cjdprofile_height.toLocaleLowerCase()));
        }
        jh = brandtmpObj[lst.qlid].jdh;

        if ((lst.cjdprofile_width == '') || (lst.cjdprofile_width == null)) {
            (brandtmpObj[lst.qlid].jdw = 0);
        } else {
            (brandtmpObj[lst.qlid].jdw = eval(lst.cjdprofile_width.toLocaleLowerCase()));
        }
        jw = brandtmpObj[lst.qlid].jdw;

        if ((lst.cjdprofilesw == '') || (lst.cjdprofilesw == null)) {
            (brandtmpObj[lst.qlid].jdsw = 0);
            (brandtmpObj[lst.qlid].jdrate = eval((brandtmpObj[lst.qlid].jdsw) * parseInt(lst.cjdprofile_rate)).toFixed(2));

            if (brandtmpObj[lst.qlid].jdrate == 'NaN') {
                brandtmpObj[lst.qlid].jdrate = 0;
            }
            all_jdpfrate.push(brandtmpObj[lst.qlid].jdrate)
        } else {
            (brandtmpObj[lst.qlid].jdsw = eval(((parseInt(brandtmpObj[lst.qlid].jdh) + parseInt(brandtmpObj[lst.qlid].jdw)) / 1000) * parseInt(lst.cjdprofilesw)).toFixed(2));

            (brandtmpObj[lst.qlid].jdrate = eval((brandtmpObj[lst.qlid].jdsw) * parseInt(lst.cjdprofile_rate)).toFixed(2));
            all_jdpfrate.push(brandtmpObj[lst.qlid].jdrate)
        }

        //access


        if ((lst.caccessories == '') || (lst.caccessories == null)) {
            (brandtmpObj[lst.qlid].accessories = '')
        } else {

            (brandtmpObj[lst.qlid].accessories = lst.caccessories);
        }

        if ((lst.caccessories_rate == '') || (lst.caccessories_rate == null)) {
            (brandtmpObj[lst.qlid].accessoriesvalue = 0);
        } else {
            (brandtmpObj[lst.qlid].accessoriesvalue = eval(lst.caccessories_rate).toFixed(2));
            all_acc.push(brandtmpObj[lst.qlid].accessoriesvalue)
        }


        //gasscut

        if ((lst.cgasscut_w == '') || (lst.cgasscut_w == null)) {
            (brandtmpObj[lst.qlid].gassw = 0)
        } else {
            (brandtmpObj[lst.qlid].gassw = eval(lst.cgasscut_w.toLocaleLowerCase()));
        }
        gw = brandtmpObj[lst.qlid].gassw;

        if ((lst.cgasscut_h == '') || (lst.cgasscut_h == null)) {
            (brandtmpObj[lst.qlid].gassh = 0);
        } else {
            (brandtmpObj[lst.qlid].gassh = eval(lst.cgasscut_h.toLocaleLowerCase()));
        }
        gh = brandtmpObj[lst.qlid].gassh;

        if ((lst.cgasscut_sw == '') || (lst.cgasscut_sw == null)) {
            (brandtmpObj[lst.qlid].gasssw = 0);
            (brandtmpObj[lst.qlid].gassrate = eval((brandtmpObj[lst.qlid].gasssw) * parseInt(lst.cgasscut_rate)).toFixed(2));

            if (brandtmpObj[lst.qlid].gassrate == 'NaN') {
                brandtmpObj[lst.qlid].gassrate = 0;
            }
            all_gassrate.push(brandtmpObj[lst.qlid].gassrate)
        } else {
            (brandtmpObj[lst.qlid].gasssw = eval(((parseInt(brandtmpObj[lst.qlid].gassw) + parseInt(brandtmpObj[lst.qlid].gassh)) / 1000) * parseInt(lst.cgasscut_sw)).toFixed(2));

            (brandtmpObj[lst.qlid].gassrate = eval((brandtmpObj[lst.qlid].gasssw) * parseInt(lst.cgasscut_rate)).toFixed(2));
            all_gassrate.push(brandtmpObj[lst.qlid].gassrate)
        }


        //woolpilr

        if ((lst.cwoolpile_w == '') || (lst.cwoolpile_w == null)) {
            (brandtmpObj[lst.qlid].woolpw = 0)
        } else {

            (brandtmpObj[lst.qlid].woolpw = eval(lst.cwoolpile_w.toLocaleLowerCase()));
        }
        ww = brandtmpObj[lst.qlid].woolpw;

        if ((lst.cwoolpile_h == '') || (lst.cwoolpile_h == null)) {
            (brandtmpObj[lst.qlid].woolph = 0);
        } else {

            (brandtmpObj[lst.qlid].woolph = eval(lst.cwoolpile_h.toLocaleLowerCase()));
        }
        wh = brandtmpObj[lst.qlid].woolph;

        if ((lst.cwoopile_sw == '') || (lst.cwoopile_sw == null)) {
            (brandtmpObj[lst.qlid].woolpsw = 0);
            (brandtmpObj[lst.qlid].woolprate = eval((brandtmpObj[lst.qlid].woolpsw) * parseInt(lst.cwoolpile_rate)).toFixed(2));

            if (brandtmpObj[lst.qlid].woolprate == 'NaN') {
                brandtmpObj[lst.qlid].woolprate = 0;
            }

            all_woolpilerate.push(brandtmpObj[lst.qlid].woolprate)
        } else {
            (brandtmpObj[lst.qlid].woolpsw = eval(((parseInt(brandtmpObj[lst.qlid].woolpw) + parseInt(brandtmpObj[lst.qlid].woolph)) / 1000) * parseInt(lst.cwoopile_sw)).toFixed(2));

            (brandtmpObj[lst.qlid].woolprate = eval((brandtmpObj[lst.qlid].woolpsw) * parseInt(lst.cwoolpile_rate)).toFixed(2));
            all_woolpilerate.push(brandtmpObj[lst.qlid].woolprate)
        }

        //steel


        
        if ((lst.csteel_w == '') || (lst.csteel_w == null)) {
            (brandtmpObj[lst.qlid].steelw = 0)
        } else {

            (brandtmpObj[lst.qlid].steelw = eval(lst.csteel_w.toLocaleLowerCase()));
        }
        stw = brandtmpObj[lst.qlid].steelw;

        if ((lst.csteel_h == '') || (lst.csteel_h == null)) {
            (brandtmpObj[lst.qlid].steelh = 0);
        } else {

            (brandtmpObj[lst.qlid].steelh = eval(lst.csteel_h.toLocaleLowerCase()));
        }
        sth = brandtmpObj[lst.qlid].steelh;

        if ((lst.csteel_sw == '') || (lst.csteel_sw == null)) {
            (brandtmpObj[lst.qlid].steelsw = 0);
            (brandtmpObj[lst.qlid].steelrate = eval((brandtmpObj[lst.qlid].steelsw) * parseInt(lst.cwoolpile_rate)).toFixed(2));

            if (brandtmpObj[lst.qlid].steelrate == 'NaN') {
                brandtmpObj[lst.qlid].steelrate = 0;
            }

            all_steelrate.push(brandtmpObj[lst.qlid].steelrate)
        } else {
            (brandtmpObj[lst.qlid].steelsw = eval(((parseInt(brandtmpObj[lst.qlid].steelw) + parseInt(brandtmpObj[lst.qlid].steelh)) / 1000) * parseInt(lst.csteel_sw)).toFixed(2));

            (brandtmpObj[lst.qlid].steelrate = eval((brandtmpObj[lst.qlid].steelsw) * parseInt(lst.csteel_rate)).toFixed(2));
            if (brandtmpObj[lst.qlid].steelrate == 'NaN') {
                brandtmpObj[lst.qlid].steelrate = 0;
            }


            all_steelrate.push(brandtmpObj[lst.qlid].steelrate)
        }





        
        let resultall_outerframerate = all_outerframerate.map(i=>Number(i));

        sumofr = resultall_outerframerate.reduce(function (a, b) {
            return a + b;
        }, 0);

        let resultall_sashrate = all_sashrate.map(i=>Number(i));

        
        sumsash = resultall_sashrate.reduce(function (a, b) {
            return a + b;
        }, 0);


        let resultall_beadrate = all_beadrate.map(i=>Number(i));

        sumbead = resultall_beadrate.reduce(function (a, b) {
            return a + b;
        }, 0);

        let resultall_interlckrate = all_interlckrate.map(i=>Number(i));

        suminterlock = resultall_interlckrate.reduce(function (a, b) {
            return a + b;
        }, 0);

        let resultall_mullianrate = all_mullianrate.map(i=>Number(i));

        summullian = resultall_mullianrate.reduce(function (a, b) {
            return a + b;
        }, 0);

        let resultall_jdpfrate = all_jdpfrate.map(i=>Number(i));

        sumjdpf = resultall_jdpfrate.reduce(function (a, b) {
            return a + b;
        }, 0);

        let resultall_gassrate = all_gassrate.map(i=>Number(i));

        sumgass = resultall_gassrate.reduce(function (a, b) {
            return a + b;
        }, 0);

        let resultall_woolpilerate = all_woolpilerate.map(i=>Number(i));

        sumwoolpile = resultall_woolpilerate.reduce(function (a, b) {
            return a + b;
        }, 0);

        let resultall_steel = all_steelrate.map(i=>Number(i));

        sumsteel = resultall_steel.reduce(function (a, b) {
            return a + b;
        }, 0);

        // console.log(sumacc);

   
    (brandtmpObj[lst.qlid].sno = lst.serial_number);
    // (brandtmpObj[lst.qlid].fabcost = lst.product);
    // (brandtmpObj[lst.qlid].product = lst.product);

    // fabrication
    if((lst.cfabrication_w=='')||(lst.cfabrication_w==null)){
        brandtmpObj[lst.qlid].fabw=0
    }
    else {
        brandtmpObj[lst.qlid].fabw=lst.cfabrication_w
    }

    if((lst.cfabrication_h=='')||(lst.cfabrication_h==null)){
        brandtmpObj[lst.qlid].fabh=0
    }
    else {
        brandtmpObj[lst.qlid].fabh=lst.cfabrication_h
    }
    if ((lst.cfabrication_rate=='')||(lst.cfabrication_rate==null)){
        brandtmpObj[lst.qlid].fabcost=0 
        all_fabrate.push(brandtmpObj[lst.qlid].fabcost)
    }
    else {
        (brandtmpObj[lst.qlid].fabcost= eval(parseInt(brandtmpObj[lst.qlid].fabw)+parseInt(brandtmpObj[lst.qlid].fabh))*parseInt(lst.cfabrication_rate).toFixed(2))
        all_fabrate.push(brandtmpObj[lst.qlid].fabcost)
    }
   
    let resultall_fab = all_fabrate.map(i=>Number(i));

    sumfab = resultall_fab.reduce(function (a, b) {
        return a + b;
    }, 0);



// labour
if((lst.clabour_w=='')||(lst.clabour_w==null)){
    brandtmpObj[lst.qlid].labw=0
}
else {
    brandtmpObj[lst.qlid].labw=lst.clabour_w
}

if((lst.clabour_h=='')||(lst.clabour_h==null)){
    brandtmpObj[lst.qlid].labh=0
}
else {
    brandtmpObj[lst.qlid].labh=lst.clabour_h
}
if ((lst.clabour_rate=='')||(lst.clabour_rate==null)){
    brandtmpObj[lst.qlid].labcost=0 
    all_labrate.push(brandtmpObj[lst.qlid].labcost)
}
else {
    (brandtmpObj[lst.qlid].labcost= eval(parseInt(brandtmpObj[lst.qlid].labw)+parseInt(brandtmpObj[lst.qlid].labh))*parseInt(lst.clabour_rate).toFixed(2))
    all_labrate.push(brandtmpObj[lst.qlid].labcost)
}

//(brandtmpObj[lst.qlid].labcost= eval(parseInt(brandtmpObj[lst.qlid].labw)+parseInt(brandtmpObj[lst.qlid].labh))*parseInt(lst.clabour_rate).toFixed(2))

let resultall_lab = all_labrate.map(i=>Number(i));

sumlab = resultall_lab.reduce(function (a, b) {
    return a + b;
}, 0);


    })
 // console.log(brandtmpObj);
    return {
        costing: brandtmpObj,
        allouterframerate: sumofr,
        allsashrate: sumsash,
        allbeadrate: sumbead,
        allinterlckrate: suminterlock,
        allmullianrate: summullian,
        alljdrate: sumjdpf,
        allgasscutrate: sumgass,
        allwoolprate: sumwoolpile,
        allsteel: sumsteel,
        allfab:sumfab,
        alllab:sumlab
    }

}