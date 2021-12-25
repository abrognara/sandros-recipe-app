const express = require('express');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.listen(port, () => console.log('Server lsitening on port ' + port));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/status.html');
});