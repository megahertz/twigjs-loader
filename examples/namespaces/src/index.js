import * as express from 'express';
import { ExpressView } from '../../../index';
import indexView from './views/index.twig';

const app = express();
app.set('view', ExpressView);

app.get('/', (req, res) => {
  res.render(indexView, {
    url: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
  })
});

const port = process.env.NODE_PORT || 8080;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}.`);
});
