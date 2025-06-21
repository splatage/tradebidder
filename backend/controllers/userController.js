exports.registerUser = (req, res) => res.status(201).json({ message: 'User registered' });
exports.loginUser = (req, res) => res.json({ message: 'Login successful' });
exports.getUserById = (req, res) => res.json({ id: req.params.id, name: 'John Doe', email: 'john@example.com' });
exports.suspendUser = (req, res) => res.json({ message: 'User suspended' });