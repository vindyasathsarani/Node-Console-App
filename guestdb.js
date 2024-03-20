const fs = require('fs');
const chalk = require('chalk');
const { log } = require('console');

//guest -id,name,address,contact_no,visit_date
//addGuest updateGuest deleteGuest readGuest listGuest

const db_file = "data.json";

const addGuest =(name,address,contact_no,visit_date)=>{
    const guests =loadGuests();
    const length = guests.length;
    let id=1;
    if(length>0){
        id=guests[length-1].id+1;
    }

    guests.push({
        id,
        name,
        address,
        contact_no,
        visit_date
    });
    saveGuest(guests);
    console.log(chalk.green("Data Saved"));
}
const updateGuest =(id,name,address,contact_no,visit_date)=>{
    const guests = loadGuests();
    const guestIndex = guests.findIndex((guest)=>guest.id===id);
   // console.log(guestIndex);
   if(guestIndex!=-1){
    const guest = guests[guestIndex];
    // if(name){
    //     console.log(name);
    // }else{
    //     console.log("No Name");
    // }
    guest.name = name ? name:guest.name;
    guest.address = address ? address:guest.address;
    guest.contact_no = contact_no ? contact_no:guest.contact_no;
    guest.visit_date = visit_date ? visit_date:guest.visit_date;
    console.log(chalk.yellow("Record Update",id));
    saveGuest(guests);
}else{
    console.log(chalk.yellow.inverse("No Record Found!"));
}
}
const deleteGuest =(id)=>{
    const guests = loadGuests();
    const newGuests = guests.filter((guest)=>{
        return guest.id!=id;
    });
    if(guests.length>newGuests.length){
        saveGuest(newGuests);
        console.log(chalk.red("Delete",id));
    }else{
        console.log(chalk.red.inverse("No Record Found!"));
    }

}
const readGuest =(id)=>{
    const guests = loadGuests();
    const guest = guests.find((guest)=>guest.id === id);
    if(guest){
        console.log(chalk.blue("guest ", id));
        console.log(guest);
    }else{
        console.log(chalk.blue.inverse("No Record Found!"));
    }

}
const listGuest =()=>{
    console.log(chalk.magenta("Guests List"));
    const guests = loadGuests();
    guests.forEach((guest)=>{
        console.log(guest);
    });
}

const saveGuest=(guests)=>{
    const dataJSON = JSON.stringify(guests);
    fs.writeFileSync(db_file,dataJSON);
}

const loadGuests=()=>{
    try{
        const dataBuffer = fs.readFileSync(db_file);
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch(e){
        return [];
    }

}  

module.exports ={addGuest, updateGuest, deleteGuest, readGuest, listGuest}