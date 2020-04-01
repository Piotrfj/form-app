In order to run the server use:
### `npm start`

Server by default is running on `127.0.0.1:8001`.

By default db address is `mongodb://localhost:27017/rek-db`.

By default frontend address is `http://localhost:3000` - required for cors.

All of the values listed above can be changed in `config.js` file. 

### Endpoints

Post `/sign-event` - Create new participant

Get `/participants` - Get list of participants