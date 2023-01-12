const { format, createLogger, transports } = require("winston");
const { combine, timestamp, label, printf, prettyPrint } = format;
const CATEGORY = "c-kart";

const logger = createLogger({
  format: combine(
    label({ label: CATEGORY }),
    timestamp({
      format: "MMM-DD-YYYY HH:mm:ss",
    }),
    prettyPrint()
  ),
  transports: [
    new transports.File({
      level: "error",
      filename: "logs/error.log",
    }),
    new transports.File({
      level: "info",
      filename: "logs/info.log",
    }),
    //new transports.Console(),
  ],
});

module.exports = logger;
