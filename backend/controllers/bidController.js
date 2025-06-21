exports.placeBid = (req, res) => res.status(201).json({ message: 'Bid placed' });
exports.getBidById = (req, res) => res.json({ id: req.params.id, amount: 200, jobId: 1 });