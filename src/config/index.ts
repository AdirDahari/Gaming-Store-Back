import { config } from "dotenv";
import { Logger } from "../logs/logger";

const configEnv = () => {
  config({ path: "src/config/.env" });

  const mode = process.env.NODE_ENV;
  Logger.connect(`App is running in ${mode} Mode`);
  Logger.info(`Config file: src/config/${mode}.env`);

  config({ path: `src/config/${mode}.env` });
};

export { configEnv };
