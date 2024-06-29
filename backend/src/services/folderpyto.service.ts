import { ProjectSchema } from "../db/models/project.model";
import { AuthCredentials } from "../libs/drive";
import db from "../libs/sequelize";
import drive from "../libs/drive";
import OracleDB from "oracledb";
import oracledb from "oracledb";

class FPytoService {
  constructor() {}

  async createFolderPyto(
    codfcia: string,
    codpyto: string,
    codcred: string,
    cred: AuthCredentials
  ) {
    const db1 = db.getInstance();
    const res = (await db1.execute({
      query: `SELECT PROYECTO.NOMBPYTO, FOLDERCIA.IDFCIA, FOLDERCIA.CODCIAOW FROM PROYECTO, FOLDERCIA 
              WHERE PROYECTO.CODPYTO = :pryto AND FOLDERCIA.CODFCIA = :codfcia AND FOLDERCIA.CODCRED = :cred
              AND ROWNUM = 1`,
      params: [codpyto, codfcia, codcred],
    })) as Record<"NOMBPYTO" | "IDFCIA" | "CODCIAOW", string | number>[];

    if (!res.length) throw new Error("Cia not found");
    const folderName = res[0].NOMBPYTO as string;
    const folderParent = res[0].IDFCIA as string;
    const codcia = res[0].CODCIAOW as string;

    const folder = await drive.createFolder(folderName, cred, [folderParent]);
    console.log(folder);

    if(!folder.id) throw new Error("Error creating folder");

    const db2 = db.getInstance();
    const newFpyto = await db2.executeBinds({
      query: `INSERT INTO folderpyto (idfpyto, codpytoow, codciaow, codfciapar) 
              VALUES (:idfpyto_i, :codpytoow_i, :codciaow_i, :codfciapar_i)
              RETURNING codfpyto INTO :codfpyto_o`,
      params: {
        idfpyto_i: folder.id,
        codpytoow_i: codpyto,
        codciaow_i: codcia,
        codfciapar_i: codfcia,
        codfpyto_o: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
      },
    }) as Record<string, Array<string | number>>;

    if(!newFpyto || !newFpyto.codfpyto_o) throw new Error("Error creating folder into DB");
    return {
      codfpyto: newFpyto.codfpyto_o[0],
      nombfpyto: folderName,
    };
  }

  async getByFCia(codfcia: string) {
    const db1 = db.getInstance();
    const result = (await db1.execute({
      query: `SELECT FOLDERPYTO.CODFPYTO, PROYECTO.NOMBPYTO
              FROM FOLDERPYTO, PROYECTO
              WHERE FOLDERPYTO.CODFCIAPAR = :codfcia AND PROYECTO.CODPYTO = FOLDERPYTO.CODPYTOOW`,
      params: [codfcia],
    })) as Record<"CODFPYTO" | "NOMBPYTO", string | number>[];

    const pytoFormat = result.map((pyto) => ({
      codfproyecto: pyto.CODFPYTO,
      namefproyecto: pyto.NOMBPYTO,
    }));
    return pytoFormat;
  }

  async validateFPytoId(codfpyto: string) {
    const db1 = db.getInstance();
    const result = (await db1.execute({
      query: `SELECT codfpyto FROM folderpyto WHERE codfpyto = :codfpyto`,
      params: [codfpyto],
    })) as ProjectSchema[];

    return result.length > 0;
  }
}

export default FPytoService;
