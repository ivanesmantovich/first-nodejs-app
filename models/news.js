import mongoose from 'mongoose';
const schema = mongoose.Schema;

const newsSchema = new schema({ // Fields object
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }]
}, {timestamps: true}); // Options object

const News = mongoose.model('News', newsSchema);
export {News as default};