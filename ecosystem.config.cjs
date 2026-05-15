module.export = {
  apps : [{
    name: "quiz-app",
    script: "server.js",
    cwd: "./server",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
      NODE_OPTIONS: "--use-openssl-ca",
      MONGO_URI: "mongodb+srv://an225ee_db_user:XK8acYHYW5ifblMV@cluster1.o1dz1am.mongodb.net/"
    }
  }]
}