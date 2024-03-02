import app from './app.js';
import connection from './config/db.js';

const port = process.env.PORT || 3000;
connection.once('open', () => {
  app.listen(port, () => console.log(`app started: http://localhost:${port}`));
});
