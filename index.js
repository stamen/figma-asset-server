const cors = require('cors');
const express = require('express');
const figmaRoutes = require('./figma/figmaRoutes');

require('dotenv').config();

const app = express();
app.use(cors());
app.use('/figma', figmaRoutes);

const port = process.env.PORT || 8002;
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
