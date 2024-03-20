const yargs = require("yargs");
const db = require("./guestdb.js");

//guest -id,name,address,contact_no,visit_date

//console.log(process.argv);

yargs.version("1.1.2");

//add
yargs.command({
    command: 'add',
    describe: 'To add a guest',
    builder: {
        name:{
            describe: "Name",
            demandOption: true,
            type: "string"
        },
        address:{
            describe: "Address",
            demandOption: true,
            type: "string"
        },
        contact_no:{
            describe: "Contact No",
            demandOption: true,
            type: "number"
        },
        visit_date:{
            describe: "Visit Date",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv){
        db.addGuest(argv.name,argv.address,argv.contact_no,argv.visit_date);
}})

//update
yargs.command({
    command: 'update',
    describe: 'To update a guest',
    builder:{
        id:{
            describe: "ID",
            demandOption: true,
            type: "number"
        },
        name:{
            describe: "Name",
            type: "string"
        },
        address:{
            describe: "Address",
            type: "string"
        },
        contact_no:{
            describe: "Contact No",
            type: "number"
        },
        visit_date:{
            describe: "Visit Date",
            type: "string"
        }
    },
    handler(argv){
        db.updateGuest(argv.id,argv.name,argv.address,argv.contact_no,argv.visit_date);
    }
});

//delete
yargs.command({
    command: 'delete',
    describe: 'To delete a guest',
    builder:{
        id:{
            describe: "ID",
            demandOption: true,
            type: "number"
        }
    },
    handler(argv){
        db.deleteGuest(argv.id);
    }
});

//read
yargs.command({
    command: 'read',
    describe: 'To read a guest',
    builder:{
        id:{
            describe: "ID",
            demandOption: true,
            type: "number"
        }
    },
    handler(argv){
        db.readGuest(argv.id);
    }
});

//list
yargs.command({
    command: 'list',
    describe: 'List all guest',
    handler(){
        db.listGuest();
    }
});


yargs.parse();
//console.log(yargs.argv);
