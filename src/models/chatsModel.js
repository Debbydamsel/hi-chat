
const chatSchema = require("mongose").Schema;



const chatModel = new chatSchema({
    sender: {
        type: String,
        required: true
    },
    receipient: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
    
}, {timestamps: true});

module.exports = mongoose.model("chatSchema", chatModel);