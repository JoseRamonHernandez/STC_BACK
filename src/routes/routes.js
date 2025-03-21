const express = require("express");
const userSchema = require("../models/user");
const emailSchema = require("../models/email");
const ticketSchema = require("../models/ticket");

const router = express.Router();


/**************************Routes USER *************************************/

// Create User
router.post('/userCreate', async (req, res) =>{
    const user = userSchema(req.body);

    try{

           const userCreate = user.save(); 

        if(!userCreate) {
            return res.status(400).json({ message: "Usuario no creado"})
        }

        res.status(201).json({ message: "Usuario creado exitosamente"});
    } catch (error){
        console.error(error);
        res.status(500).json({ message: "Error al crear usuario", error: error.message });
    }
    
});

// Get All Users
router.get('/users', (req, res) =>{
    userSchema.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});

// Get A User by N_Empleado
router.get('/user/:id', (req, res) =>{
    const { id } = req.params;
    userSchema.find({ n_empleado: id})
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});

// Update A User 
router.put('/user/:id', async (req, res) =>{
    const { id } = req.params;
    const { status } = req.body;

    try{
        const userUpdate =  await userSchema.updateOne({ n_empleado: id}, { $set: {status} });

        if(userUpdate.nModified === 0){
            return res.status(404).json({ message: "Usuario no actualizado"});
        }

        res.status(200).json({ message: "Usuario actualizado existosamente"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error durante la actualizacion", error: error.message});
    }
    
});

// Delete a User
router.delete('/user/:n_empleado', async (req, res) => {
    const { n_empleado } = req.params;

    try {
        
        const user = await userSchema.findOneAndDelete({ n_empleado });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el usuario', error: error.message });
    }
});



/**************************Routes EMAIL *************************************/


// Create email
router.post('/emailCreate', async (req, res) =>{
    const email = emailSchema(req.body);

    try{

           const emailCreate = email.save(); 

        if(!emailCreate) {
            return res.status(400).json({ message: "email no creado"})
        }

        res.status(201).json({ message: "email creado exitosamente"});
    } catch (error){
        console.error(error);
        res.status(500).json({ message: "Error al crear email", error: error.message });
    }
    
});


// Get All email
router.get('/emails', (req, res) =>{
    emailSchema.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});

// Get ALL email by EMPLEADO_DEST
router.get('/email_dest/:id', (req, res) =>{
    const { id } = req.params;
    emailSchema.find({ empleado_dest: id})
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});

// Update A email on EMPLEADO_DEST
router.put('/email/:id', async (req, res) =>{
    const { id } = req.params;
    const { status_read } = req.body;

    try{
        const emailUpdate =  await emailSchema.updateOne({ empleado_dest: id}, { $set: {status_read} });

        if(emailUpdate.nModified === 0){
            return res.status(404).json({ message: "email no actualizado"});
        }

        res.status(200).json({ message: "email actualizado existosamente"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error durante la actualizacion", error: error.message});
    }
    
});

// Delete a Email
router.delete('/email/:empleado_dest', async (req, res) => {
    const { empleado_dest } = req.params;

    try {
        
        const email = await emailSchema.findOneAndDelete({ empleado_dest });

        if (!email) {
            return res.status(404).json({ message: 'email no encontrado' });
        }

        res.status(200).json({ message: 'email eliminado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el email', error: error.message });
    }
});



/**************************Routes TICKETS *************************************/


// Create Ticket
router.post('/ticketCreate', async (req, res) =>{
    const ticket = ticketSchema(req.body);

    try{

           const ticketCreate = ticket.save(); 

        if(!ticketCreate) {
            return res.status(400).json({ message: "ticket no creado"})
        }

        res.status(201).json({ message: "ticket creado exitosamente"});
    } catch (error){
        console.error(error);
        res.status(500).json({ message: "Error al crear ticket", error: error.message });
    }
    
});


// Get All Tickets
router.get('/tickets', (req, res) =>{
    ticketSchema.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});


// Get the last ticket
router.get('/ticket/last', (req, res) => {
    ticketSchema.findOne()  // Encuentra un solo documento
    .sort({ _id: -1 })     // Ordena por _id en orden descendente (último primero)
    .then((data) => {
        if (data) {
            res.json(data);  // Devuelve el último ticket encontrado
        } else {
            res.status(404).json({ message: "No tickets found" }); // En caso de no encontrar tickets
        }
    })
    .catch((error) => res.json({ message: error }));
});

// Get ALL ticket by USUARIO
router.get('/ticket/user/:id', (req, res) =>{
    const { id } = req.params;
    ticketSchema.find({ user: id})
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});


// Get ALL ticket by AREA
router.get('/ticket/area/:id', (req, res) =>{
    const { id } = req.params;
    ticketSchema.find({ area: id})
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});


// Get ALL ticket by ticket
router.get('/ticket/:id', (req, res) =>{
    const { id } = req.params;
    ticketSchema.find({ ticket: id})
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error}));
});



// Update A email on TICKET- ID
router.put('/ticket/:id', async (req, res) =>{
    const { id } = req.params;
    const { resumen, description, area, status } = req.body;

    try{
        const ticketUpdate =  await ticketSchema.updateOne({ ticket: id}, { $set: {resumen, description, area, status } });

        if(ticketUpdate.nModified === 0){
            return res.status(404).json({ message: "ticket no actualizado"});
        }

        res.status(200).json({ message: "ticket actualizado existosamente"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error durante la actualizacion", error: error.message});
    }
    
});


router.put('/ticket/put/:id', async (req, res) =>{
    const { id } = req.params;
    const { status, date_application } = req.body;

    try{
        const ticketUpdate =  await ticketSchema.updateOne({ ticket: id}, { $set: {status, date_application} });

        if(ticketUpdate.nModified === 0){
            return res.status(404).json({ message: "ticket no actualizado"});
        }

        res.status(200).json({ message: "ticket actualizado existosamente"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error durante la actualizacion", error: error.message});
    }
    
});


router.put('/ticket/put/decline/:id', async (req, res) =>{
    const { id } = req.params;
    const { status, comentario } = req.body;

    try{
        const ticketUpdate =  await ticketSchema.updateOne({ ticket: id}, { $set: {status, comentario} });

        if(ticketUpdate.nModified === 0){
            return res.status(404).json({ message: "ticket no actualizado"});
        }

        res.status(200).json({ message: "ticket actualizado existosamente"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error durante la actualizacion", error: error.message});
    }
    
});


// Delete a User
router.delete('/ticket/:ticket', async (req, res) => {
    const { ticket } = req.params;

    try {
        
        const ticket_f = await ticketSchema.findOneAndDelete({ ticket });

        if (!ticket_f) {
            return res.status(404).json({ message: 'ticket no encontrado' });
        }

        res.status(200).json({ message: 'ticket eliminado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el ticket', error: error.message });
    }
});

module.exports = router;