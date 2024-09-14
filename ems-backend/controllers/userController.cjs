const User = require('../models/User.cjs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const saveUser = async (req, res) => {

    try {
        const user = new User(req.body);
        await user.save();

        res.status(201).json(user);
    } 
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}


const loginUser = async (req, res) => {
    try {
      const { email, password, role } = req.body;
      const user = await User.findOne({ email });
  
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: 'Invalid Credentials' });
      }
  
      if (user.role !== role) {
        return res.status(403).json({ message: 'Unauthorized role' });
      }
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.status(200).json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

module.exports = { saveUser, loginUser};