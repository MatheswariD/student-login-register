const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const isMatch=await bcrypt.compare(inputPassword,user.password);

const session = require('express-session');

const app = express();
const PORT = 3000;

// connect to MongoDB (local)
// if you use MongoDB Atlas, replace with your connection string
mongoose.connect('mongodb://127.0.0.1:27017/login-demo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connect☑️ '))
  .catch(err => console.error('❌ Mongo error:', err));

const userSchema = new mongoose.Schema({
  email: String,
  password: String_123
});
const User = mongoose.model('User', userSchema);

app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true
}));

// serve static HTML files
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.get('/', (req, res) => res.redirect('/login.html'));

app.post("/register", async (req, res) => {
  try {
    const { regno, name, institute, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.send("Email already exists. <a href='/register.html'>Try again</a>");

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ regno, name, institute, email, password: hashed });
    await user.save();

    res.send("✅ Registered successfully! <a href='/login.html'>Login now</a>");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.send('❌ Invalid email or password');

  req.session.userId = user._id;
  res.send('✅ Login success! <a href="/dashboard.html">Go to Dashboard</a>');
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));