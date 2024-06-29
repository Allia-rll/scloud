import bd from "../libs/sequelize";
import Proyect, { ProjectSchema } from "../db/models/project.model";

class PoyectService {
  constructor() {}

  async getProyectsbyCia(codcia: number) {
    const bd1 = bd.getInstance();
    const result = (await bd1.execute({
      query: `SELECT codpyto, nombpyto, fecreg, observac FROM proyecto WHERE codcia = :codcia`,
      params: [codcia],
    })) as ProjectSchema[];
    const proyectos = result.map((proyecto) => {
      return {
        codpyto: proyecto.CODPYTO,
        nombpyto: proyecto.NOMBPYTO,
        fecreg: proyecto.FECREG,
        observac: proyecto.OBSERVAC,
      };
    });
    return proyectos;
  }

  async getProyectWithOutFolder(codfcia: string, codcia: string) {
    const bd1 = bd.getInstance();
    const result = await bd1.execute({
      query: `SELECT codpyto, nombpyto, fecreg, observac FROM PROYECTO 
              WHERE CODPYTO NOT IN (SELECT CODPYTOOW FROM FOLDERPYTO WHERE CODFCIAPAR = :codfcia) AND PROYECTO.CODCIA = :codcia`,
      params: [codfcia, codcia],
    }) as ProjectSchema[];

    const proyectos = result.map((proyecto) => {
      return {
        codpyto: proyecto.CODPYTO,
        nombpyto: proyecto.NOMBPYTO,
        fecreg: proyecto.FECREG,
        observac: proyecto.OBSERVAC,
      };
    });
    return proyectos;
  }
}

export default PoyectService;
