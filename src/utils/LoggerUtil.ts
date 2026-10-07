import fs from "fs";
import path from "path";

const currentDir = __dirname;
const srcDir = path.resolve(currentDir, "..");
const loggingDir = path.resolve(srcDir, "logging");
const timeZone = "Asia/Kolkata"; // For India
const timestampFormatter = new Intl.DateTimeFormat("sv-SE", {
  timeZone,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

type LogLevel = "debug" | "info" | "warn" | "error";

const formatMessage = (level: LogLevel, message: unknown): string =>
  `${timestampFormatter.format(new Date())} [${level}]: ${String(message)}`;

const writeFileLog = (filename: string, maxSize: number, message: string): void => {
  fs.mkdirSync(loggingDir, { recursive: true });
  const filePath = path.join(loggingDir, filename);

  if (fs.existsSync(filePath) && fs.statSync(filePath).size >= maxSize) {
    for (let index = 4; index >= 1; index -= 1) {
      const oldPath = `${filePath}.${index}`;
      const newPath = `${filePath}.${index + 1}`;
      if (fs.existsSync(oldPath)) {
        if (index === 4) fs.unlinkSync(oldPath);
        else fs.renameSync(oldPath, newPath);
      }
    }
    fs.renameSync(filePath, `${filePath}.1`);
  }

  fs.appendFileSync(filePath, `${message}\n`);
};

const log = (level: LogLevel, message: unknown): void => {
  const formatted = formatMessage(level, message);
  console[level](formatted);

  if (level === "info" || level === "warn" || level === "error") {
    writeFileLog("test_run.log", 300 * 1024, formatted);
  }
  if (level === "error") {
    writeFileLog("test_error.log", 10 * 1024, formatted);
  }
};

const logger = {
  debug: (message: unknown) => log("debug", message),
  info: (message: unknown) => log("info", message),
  warn: (message: unknown) => log("warn", message),
  error: (message: unknown) => log("error", message),
  log: (level: LogLevel, message: unknown) => log(level, message),
};

export default logger;