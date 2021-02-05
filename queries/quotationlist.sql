SELECT @a:=@a+1 serial_number,ql.id AS qlid,ql.*,cm.*,pm.*,tot.total,tot.conn,tot.qty
 FROM quotation_list AS ql JOIN `customer_master` AS cm ON cm.id=ql.customer_id 
 JOIN `product_master` AS pm ON ql.prod_id=pm.id
  LEFT JOIN (SELECT SUM(qot_totalamount)AS total,ROUND(SUM(qot_convvalue),2) AS conn,
  SUM(qot_qty) AS qty,qot_no,customer_id,SUM(qot_totalamount) 
  FROM quotation_list WHERE active_status <>-1 
  GROUP BY qot_no,customer_id) AS tot ON tot.qot_no=ql.qot_no AND tot.customer_id=ql.customer_id,
 (SELECT @a:= 0) AS a 
 WHERE 
   ql.active_status <> -1
 and ql.qot_no=?
