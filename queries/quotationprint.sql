

SELECT @a:=@a+1 serial_number,IF(qot.cus_due=0 AND qot.cus_netamount != qot.cus_paid,cus_netamount,cus_netamount-cus_paid) AS due,ql.id AS qlid,ql.*,cm.*,pm.*,qot.*
 FROM quotation_list AS ql JOIN `customer_master` AS cm ON cm.id=ql.customer_id 
 JOIN `product_master` AS pm ON ql.prod_id=pm.id
  LEFT JOIN `quotation` AS qot ON qot.cus_qto=ql.qot_no AND qot.cus_name=cm.name,
 (SELECT @a:= 0) AS a 
 WHERE 
   ql.active_status <> -1
  AND ql.qot_no=?