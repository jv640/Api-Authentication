const app = require('./app');

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT);
console.log(`Server is running at ${PORT}`);