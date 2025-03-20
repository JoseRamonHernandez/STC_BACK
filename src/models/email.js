const mongoose = require("mongoose");

const emailSchema = mongoose.Schema({

    title: {
        type: String
    },

    text: {
        type: String
    },

    empleado_orig: {
        type: String
    },

    empleado_dest: {
        type: String
    },

    timestamp: {
        type: Date,
        default: Date.now
    },

    status_read: {
        type: String,
        default: 'not_read'
    }

});

module.exports = mongoose.model('Email', emailSchema);