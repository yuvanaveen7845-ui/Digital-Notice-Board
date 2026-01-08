const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');
require('dotenv').config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // Check if admin exists
        let admin = await Admin.findOne({ username: 'admin' });
        if (admin) {
            console.log('Admin user already exists');
            process.exit();
        }

        // Create new admin
        admin = new Admin({
            username: 'admin',
            password: 'password123'
        });

        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(admin.password, salt);

        await admin.save();
        console.log('Admin user created successfully');
        console.log('Username: admin');
        console.log('Password: password123');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedAdmin();
