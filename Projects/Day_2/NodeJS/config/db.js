import mongoose from "mongoose";
import config from "./env";

const connect = await mongoose.connect(config.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

.then(
  console.log('MongoDB is connected')
)
.catch(
  console.log('Error occured ehile connecting')
);

export default connect;