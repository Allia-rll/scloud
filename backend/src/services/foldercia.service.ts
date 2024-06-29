import { CiaSchema } from "../db/models/cia.model";
import { fciaSchema } from "../db/models/foldercia.model";
import { uploadCreds } from "../libs/drive";
import db from "../libs/sequelize";
import drive from "../libs/drive";
import oracledb from "oracledb";

class FCiaService {
  constructor() {}

  async createFolderCia(codcia: string, codcred: string, cred: uploadCreds) {
    const db1 = db.getInstance();
    const res = await db1.execute({
      query: `SELECT descia FROM cia WHERE codcia = :codcia`,
      params: [codcia],
    }) as CiaSchema[];

    if (!res.length) throw new Error("Cia not found");
    const folderName = res[0].DESCIA;
    
    const folder = await drive.createFolder(folderName, cred.credentials, [cred.froot]);
    console.log(folder);

    if(!folder.id) throw new Error("Error creating folder");
    
    const db2 = db.getInstance();
    const newfcia = await db2.executeBinds({
      query: `INSERT INTO foldercia (codcred, idfcia, codciaow) VALUES (:codcred_i, :codfolder_i, :codciaow_i)
              RETURNING codfcia INTO :codfcia_o`,
      params: {
        codcred_i: codcred,
        codfolder_i: folder.id,
        codciaow_i: codcia,
        codfcia_o: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
      },
    }) as Record<string, Array<string | number>>;

    if(!newfcia || !newfcia.codfcia_o) throw new Error("Error creating folder into DB");
    return {
      codfcia: newfcia.codfcia_o[0],
      namefcia: folderName,
    }
  }

  async getByCredentials(codcred: string) {
    const db1 = db.getInstance();
    const result = await db1.execute({
      query: `SELECT foldercia.codfcia, cia.descia
              FROM foldercia, cia
              WHERE foldercia.codcred = :codcred AND foldercia.codciaow = cia.codcia`,
      params: [codcred],
    }) as Record<"CODFCIA" | "DESCIA", number | string>[];

    const fciaFormat = result.map((fcia) => ({	
      codfcia: fcia.CODFCIA,
      namefcia: fcia.DESCIA,
    }));
    return fciaFormat;
  }

  async validateFCiaId(codfcia: string) {
    const db1 = db.getInstance();
    const result = await db1.execute({
      query: `SELECT codfcia FROM foldercia WHERE codfcia = :codfcia`,
      params: [codfcia],
    }) as fciaSchema[];

    return result.length > 0;
  }
}

export default FCiaService;
