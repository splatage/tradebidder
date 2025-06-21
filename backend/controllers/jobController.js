exports.getJobs = (req, res) => res.json([{ id: 1, title: 'Fix sink', description: 'Kitchen leak', budget: 150, location: 'Wellington' }]);
exports.getJobById = (req, res) => res.json({ id: req.params.id, title: 'Fix sink', description: 'Kitchen leak', budget: 150, location: 'Wellington' });
exports.postJob = (req, res) => res.status(201).json({ message: 'Job created' });
exports.completeJob = (req, res) => res.json({ message: 'Job marked as complete' });