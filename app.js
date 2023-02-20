const express = require('express')
const app = express()
const port = 8000
const path = require('path');
var bodyParser = require('body-parser');
const cors = require('cors');






app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

app.use('/static', express.static(path.join(__dirname, './server/public/stock')))

// db connection
const connectDB = require('./server/config/db');
connectDB();

//routes
const dealerRoutes = require('./server/routes/web/dealer-route/dealer-route');
const stockRoutes = require('./server/routes/web/stock-route/stock-route');
const billRoutes = require('./server/routes/web/bill-route/bill-route');
const partnerRoutes = require('./server/routes/web/partners-route/partner-route');
const agentRoutes = require('./server/routes/web/agent-route/agent-routes');
const supplierRoute = require('./server/routes/web/supplier-route/supplier-route')
const purchaseRoute = require('./server/routes/web/purchase-route/purchase-route')

app.use('/dealer', dealerRoutes)
app.use('/stock', stockRoutes)
app.use('/bill', billRoutes)
app.use('/partner', partnerRoutes)
app.use('/agent', agentRoutes)
app.use('/supplier', supplierRoute)
app.use('/purchase', purchaseRoute)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})