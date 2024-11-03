import express from 'express';
import MailRoute from "./MailRoute";
import HuggingFaceRoute from "./HuggingFaceRoute";
import ProdiaRoute from "./ProdiaRoute";

const app = express();

app.use('/mail', MailRoute);
app.use('/hugging-face', HuggingFaceRoute);
app.use('/prodia', ProdiaRoute);

export default app;
