import mongoose from 'mongoose';
const schema = mongoose.Schema;

const categorySchema = new schema({
    title: {
        type: String,
        required: true
    },
    news: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'News'
    }]
}, {timestamps: true}); // Options object

const Category = mongoose.model('Category', categorySchema);
export {Category as default};