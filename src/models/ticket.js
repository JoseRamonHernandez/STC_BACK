const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema({

    ticket: {
        type: String
    },

    resumen: {
        type: String
    },

    description: {
        type: String
    },

    area: {
        type: String
    },

    user: {
        type: String
    },

    status: {
        type: String
    },

    comentario: {
        type: String,
    },

    date_application: {
        type: String,
        default: '----/--/--'
    }

});

module.exports = mongoose.model('Ticket', ticketSchema);