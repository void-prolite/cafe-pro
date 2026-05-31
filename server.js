const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4321;

// Serve all static files from the current directory (including Images and css/js if they existed separately)
app.use(express.static(__dirname));

// Serve a 404 page for all unknown routes
app.get('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
