/* eslint-disable import/first */
/* eslint-disable no-console */
/* In case something goes wrong before application start */
process.on('uncaughtException', (err) => { console.log(err); });
process.on('unhandledRejection', (err) => { console.log(err); });
process.on('exit', (err) => { console.log(err); });
import App from './app';

const app = App;
app.listen(app.get('port'), () => {
  console.log(`🚀 App listening on the port ${app.get('port')}`);
});
