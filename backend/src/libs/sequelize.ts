import config from "../config/config";
import { Cia, DFile } from "../db/models";
import oracledb from "oracledb";

type DBconfig = {
  user: string;
  password: string;
  connectString: string;
};

type Query = {
  query: string;
  params: unknown[];
};

type QueryBinds = {
  query: string;
  params: Record<string, string | number | Record<string, unknown>>;
};

class ORcle {
  private static instance: ORcle;

  models: Record<string, Cia | DFile>;
  private dbConfig: DBconfig;

  private constructor(models: Record<string, Cia | DFile>, config: DBconfig) {
    this.models = models;
    this.dbConfig = config;
  }

  public static init(models: Record<string, Cia | DFile>, config: DBconfig) {
    if (!ORcle.instance) {
      ORcle.instance = new ORcle(models, config);
    }
    return ORcle.instance;
  }

  public static getInstance() {
    if (!ORcle.instance) {
      throw new Error("ORcle instance not initialized");
    }
    return ORcle.instance;
  }

  public async execute(q: Query) {
    let connection;
    try {
      connection = await oracledb.getConnection(this.dbConfig);

      const result = await connection.execute(q.query, q.params, {
        autoCommit: true,
        outFormat: oracledb.OUT_FORMAT_OBJECT,
      });

      try {
        return result.rows;
      } catch (err) {
        return result.rowsAffected;
      }
    } catch (err) {
      console.error(err);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }

  public async executeBinds(q: QueryBinds) {
    let connection;
    try {
      connection = await oracledb.getConnection(this.dbConfig);

      const result = await connection.execute(q.query, q.params, {
        autoCommit: true,
      });

      try {
        return result.outBinds;
      } catch (err) {
        return result.rowsAffected;
      }
    } catch (err) {
      console.error(err);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
}

const dbConfig: DBconfig = {
  user: config.dbUser as string,
  password: config.dbPassword as string,
  connectString: `${config.dbHost}:${config.dbPort}/${config.dbServiceName}`,
};

ORcle.init({ Cia, DFile }, dbConfig);

export default ORcle;
