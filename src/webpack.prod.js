require("dotenv").config();

plugins: [
  new webpack.DefinePlugin({
    "process.env": {
      MONGO_URL: JSON.stringify(process.env.MONGO_URL),
      MONGO_URL_PROD: JSON.stringify(process.env.MONGO_URL_PROD),
      GOOGLE_ID: JSON.stringify(process.env.GOOGLE_ID),
      IPINFO_TOKEN: JSON.stringify(process.env.IPINFO_TOKEN),
    },
  }),
];
