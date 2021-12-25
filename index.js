const express = require('express');

const app = express();
const PORT = process.env.PORT || 80;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/status.html');
});

app.listen(PORT, () => console.log('Server lsitening on port ' + PORT));