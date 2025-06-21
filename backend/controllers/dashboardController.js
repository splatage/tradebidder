// tradebidder-api-backend/controllers/dashboardController.js
exports.getDashboard = (req, res) => {
  // Simulate authenticated user (replace with session logic later)
  const user = { id: 1, name: "Alex Builder", email: "alex@example.com" };

  const data = {
    user,
    stats: {
      jobsPosted: 4,
      jobsWon: 2,
      messages: 5,
      reviews: 3
    },
    jobs: [
      {
        id: 101,
        title: "Install shelves",
        description: "Wall mount 2 shelves",
        budget: 80,
        location: "Wellington"
      },
      {
        id: 102,
        title: "Paint door",
        description: "Repaint wooden door",
        budget: 100,
        location: "Christchurch"
      }
    ]
  };

  res.json(data);
};
