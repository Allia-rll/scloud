import db from "../libs/sequelize";
import Credentials, {
  PrivCredsSchema,
  PubCredsSchema,
  AuthCredsSchema,
} from "../db/models/credentials.model";
import { AuthCredentials, uploadCreds } from "../libs/drive";
import oracledb from "oracledb";

class CredsService {
  constructor() {}

  async getPrivCredsById(id: string) {
    const db1 = db.getInstance();
    const result = (await db1.execute({
      query: `SELECT type, project_id, private_key_id, private_key, client_email, client_id, universe_domain, froot 
              FROM CREDENTIALS
              WHERE CODCRED = :id`,
      params: [id],
    })) as PrivCredsSchema[];

    const formatPrivCreds = result.map((creds) => {
      return {
        credentials: {
          type: creds.TYPE,
          project_id: creds.PROJECT_ID,
          private_key_id: creds.PRIVATE_KEY_ID,
          private_key: creds.PRIVATE_KEY,
          client_email: creds.CLIENT_EMAIL,
          client_id: creds.CLIENT_ID,
          universe_domain: creds.UNIVERSE_DOMAIN,
        },
        froot: creds.FROOT,
      } as uploadCreds;
    });

    return formatPrivCreds;
  }

  async getAuthCredsById(id: string) {
    const db1 = db.getInstance();
    const result = (await db1.execute({
      query: `SELECT type, project_id, private_key_id, private_key, client_email, client_id, universe_domain 
              FROM CREDENTIALS
              WHERE CODCRED = :id`,
      params: [id],
    })) as AuthCredsSchema[];

    const formatAuthCreds = result.map((creds) => {
      return {
        type: creds.TYPE,
        project_id: creds.PROJECT_ID,
        private_key_id: creds.PRIVATE_KEY_ID,
        private_key: creds.PRIVATE_KEY,
        client_email: creds.CLIENT_EMAIL,
        client_id: creds.CLIENT_ID,
        universe_domain: creds.UNIVERSE_DOMAIN,
      } as AuthCredentials;
    });

    return formatAuthCreds;
  }

  async getAllPubCreds() {
    const db1 = db.getInstance();
    const result = (await db1.execute({
      query: `SELECT codcred, namecreds
              FROM CREDENTIALS`,
      params: [],
    })) as PubCredsSchema[];

    const formatPubCreds = result.map((creds) => {
      return {
        codcred: creds.CODCRED,
        namecreds: creds.NAMECREDS,
      };
    });
    return formatPubCreds;
  }

  async createCreds(body: any) {
    const db1 = db.getInstance();
    const res = (await db1.executeBinds({
      query: `INSERT INTO CREDENTIALS (type, project_id, private_key_id, private_key, client_email, client_id, universe_domain, froot, namecreds) 
              VALUES (:type_i, :project_id_i, :private_key_id_i, :private_key_i, :client_email_i, :client_id_i, :universe_domain_i, :froot_i, :namecreds_i)
              RETURNING codcred, namecreds INTO :codcred_o, :namecreds_o`,
      params: {
        type_i: body.type,
        project_id_i: body.project_id,
        private_key_id_i: body.private_key_id,
        private_key_i: body.private_key,
        client_email_i: body.client_email,
        client_id_i: body.client_id,
        universe_domain_i: body.universe_domain,
        froot_i: body.froot,
        namecreds_i: body.namecreds,
        codcred_o: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
        namecreds_o: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
      },
    })) as Record<string, Array<string | number>>;

    return {
      codcred: res.codcred_o[0],
      namecreds: res.namecreds_o[0],
    };
  }

  async validateCredId(id: string) {
    const db1 = db.getInstance();
    const result = (await db1.execute({
      query: `SELECT codcred
              FROM CREDENTIALS
              WHERE CODCRED = :id`,
      params: [id],
    })) as Credentials[];

    return result.length > 0;
  }
}

export default CredsService;
