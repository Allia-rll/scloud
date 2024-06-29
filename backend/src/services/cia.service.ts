import db from "../libs/sequelize";
import Cia, { CiaSchema } from "../db/models/cia.model";

class UserService {
  constructor() {}

  async getAllCias() {
    const db1 = db.getInstance();
    const result = (await db1.execute({
      query: `SELECT * FROM CIA`,
      params: [],
    })) as CiaSchema[];

    const formatCia = result.map((cia) => {
      return {
        codcia: cia.CODCIA,
        descia: cia.DESCIA,
        descorta: cia.DESCORTA,
        vigente: cia.VIGENTE,
      };
    });

    return formatCia;
  }

  async getCiaById(id: number) {
    const db1 = db.getInstance();
    const result = (await db1.execute({
      query: `SELECT * FROM cia WHERE codcia = :id`,
      params: [id],
    })) as CiaSchema[];
    if(!result.length) throw new Error("Cia not found");
    return {
      codcia: result[0].CODCIA,
      descia: result[0].DESCIA,
      descorta: result[0].DESCORTA,
      vigente: result[0].VIGENTE,
    };
  }

  async getCiasWhitoutFolder(codcred: string) {
    const db1 = db.getInstance();
    const result = await db1.execute({
      query: `SELECT * FROM CIA WHERE CODCIA NOT IN (SELECT CODCIAOW FROM FOLDERCIA WHERE CODCRED = :cod)`,
      params: [codcred],
    }) as CiaSchema[];

    const ciasFormat = result.map((cia) => {
      return {
        codcia: cia.CODCIA,
        descia: cia.DESCIA,
        descorta: cia.DESCORTA,
        vigente: cia.VIGENTE,
      }
    });
    return ciasFormat;
  }

  async getByFolder(codfcia: string) {
    const db1 = db.getInstance();
    const result = await db1.execute({
      query: `SELECT * FROM CIA WHERE CODCIA IN (SELECT CODCIAOW FROM FOLDERCIA WHERE CODFCIA = :cod)`,
      params: [codfcia],
    }) as CiaSchema[];

    const ciasFormat = result.map((cia) => {
      return {
        codcia: cia.CODCIA,
        descia: cia.DESCIA,
        descorta: cia.DESCORTA,
        vigente: cia.VIGENTE,
      }
    });
    return ciasFormat[0];
  }
}

export default UserService;
