SELECT IF(qt.cus_due=0 AND qt.cus_netamount != qt.cus_paid,cus_netamount,cus_netamount-cus_paid) AS due,ql.*,qt.* FROM quotation_list AS ql 
JOIN quotation AS qt ON ql.qot_no=qt.cus_qto
WHERE ql.active_status not in (0,-1)
GROUP BY
qt.cus_qto,
qt.created_date																