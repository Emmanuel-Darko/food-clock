const {dbClose,connection, dbOpen} = require("../db/dbConnect")
const weekDay = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"]
const todayDate=new Date()
    const day= todayDate.getDay()
    let today =weekDay[day]

dbOpen()

const getTodayMenu =(req,res)=>{

    connection.query(`SELECT details_id,item_name,menu_details.category_id,menu_day_id,menu_day,category_name 
    FROM menu_details 
    INNER JOIN menu ON menu_id=menu_day_id
    INNER JOIN menu_categories ON menu_details.category_id=menu_categories.category_id 
    WHERE menu_day= "${today}"
    ORDER BY category_id`, (err,result)=>{
if(err){
    res.status(408).json({error:err})
    return
}
    res.status(200).json(result)
})
    
}

const updateWeekMenu =(req,res)=>{

    const weekMenu = req.body
    if(!weekMenu){
        res.status(400).json({message:"menu fields can not be empty"})
        return;
    }
    connection.query(`START TRANSACTION;
    UPDATE menu_details SET item_name= "${weekMenu[0].bf}" WHERE category_id = "MC01" AND menu_day_id = "MD01";
    UPDATE menu_details SET item_name="${weekMenu[0].lun}" WHERE category_id = "MC02" AND menu_day_id = "MD01";
    UPDATE menu_details SET item_name="${weekMenu[0].din}" WHERE category_id = "MC03" AND menu_day_id = "MD01";
    UPDATE menu_details SET item_name="${weekMenu[1].bf} " WHERE category_id = "MC01" AND menu_day_id = "MD02";
    UPDATE menu_details SET item_name="${weekMenu[1].lun}" WHERE category_id = "MC02" AND menu_day_id = "MD02";
    UPDATE menu_details SET item_name="${weekMenu[1].din}" WHERE category_id = "MC03" AND menu_day_id = "MD02";
    UPDATE menu_details SET item_name="${weekMenu[2].bf} " WHERE category_id = "MC01" AND menu_day_id = "MD03";
    UPDATE menu_details SET item_name="${weekMenu[2].lun}" WHERE category_id = "MC02" AND menu_day_id = "MD03";
    UPDATE menu_details SET item_name="${weekMenu[2].din}" WHERE category_id = "MC03" AND menu_day_id = "MD03";
    UPDATE menu_details SET item_name="${weekMenu[3].bf} " WHERE category_id = "MC01" AND menu_day_id = "MD04";
    UPDATE menu_details SET item_name="${weekMenu[3].lun}" WHERE category_id = "MC02" AND menu_day_id = "MD04";
    UPDATE menu_details SET item_name="${weekMenu[3].din}" WHERE category_id = "MC03" AND menu_day_id = "MD04";
    UPDATE menu_details SET item_name="${weekMenu[4].bf} " WHERE category_id = "MC01" AND menu_day_id = "MD05";
    UPDATE menu_details SET item_name="${weekMenu[4].lun}" WHERE category_id = "MC02" AND menu_day_id = "MD05";
    UPDATE menu_details SET item_name="${weekMenu[4].din}" WHERE category_id = "MC03" AND menu_day_id = "MD05";
    UPDATE menu_details SET item_name="${weekMenu[5].bf} " WHERE category_id = "MC01" AND menu_day_id = "MD06";
    UPDATE menu_details SET item_name="${weekMenu[5].lun}" WHERE category_id = "MC02" AND menu_day_id = "MD06";
    UPDATE menu_details SET item_name="${weekMenu[5].din}" WHERE category_id = "MC03" AND menu_day_id = "MD06";
    UPDATE menu_details SET item_name="${weekMenu[6].bf} " WHERE category_id = "MC01" AND menu_day_id = "MD07";
    UPDATE menu_details SET item_name="${weekMenu[6].lun}" WHERE category_id = "MC02" AND menu_day_id = "MD07";
    UPDATE menu_details SET item_name="${weekMenu[6].din}" WHERE category_id = "MC03" AND menu_day_id = "MD07";
    COMMIT;`,
(err,result)=>{
    if(err){
        res.status(408).json({error:err})
        return
    }
        res.status(201).json({message:"weeks menu updated successfully"})
})
    
}

const updateMenuItem =(req,res)=>{

    const data=req.body
    const {menu_day_id,category_id,item_name}=data
    connection.query(`UPDATE menu_details SET item_name= "${item_name}" WHERE menu_day_id="${menu_day_id}" AND category_id="${category_id}"`,
    (err,result)=>{
        if(err){
            console.log(err) 
            return}
            res.status(201).json({message:"menu item updated successfully"})
    })

    
}

const deleteMenuItem =(req,res)=>{

    const {id}=req.params
    connection.query(`DELETE FROM menu_details WHERE details_id="${id}"`,
    (err,result)=>{
        if(err){
            console.log(err) 
            return}
            res.status(200).json(result)
    })
 
    
}

module.exports={
getTodayMenu,
updateMenuItem,
updateWeekMenu,
deleteMenuItem
}