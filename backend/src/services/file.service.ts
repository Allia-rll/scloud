import bd from "../libs/sequelize";
import { FileSchema, type urls } from "../db/models/file.model";
import CredsService from "./credentials.service";
import drive, { AuthCredentials } from "../libs/drive";
import oracledb from "oracledb";

const creds = new CredsService();

class FileService {
  constructor() {}

  async getByFPyto(codfpyto: string, auth: AuthCredentials) {
    const bd1 = bd.getInstance();
    const result = (await bd1.execute({
      query: `SELECT * FROM files WHERE codfpyto = :id`,
      params: [codfpyto],
    })) as FileSchema[];
    console.log(result);
    const res_urls = await Promise.all(
      result.map(async (file) => {
        const { webViewLink, thumbnailLink, webContentLink } =
          (await this.getUrl(file.URL_ID, auth)) as urls;

        return { ...file, URL: { webViewLink, thumbnailLink, webContentLink } };
      })
    );
    const files = res_urls.map((file) => {
      return {
        codfile: file.CODFILE,
        filename: file.FILENAME,
        url: file.URL,
        type: file.TYPE,
        created_at: file.CREATED_AT,
        codfpyto: file.CODFPYTO,
        description: file.DESCRIPTION,
      };
    });
    return files;
  }

  async getUrl(id: string, auth: AuthCredentials) {
    const res = await drive.generatePublicUrl(id, auth);
    return res;
  }

  async createFile(body: any, file: Express.Multer.File) {
    const { codcred, codfcia, codfpyto } = body;
    const [credes] = await creds.getAuthCredsById(codcred);
    const bd2 = bd.getInstance();
    const result = (await bd2.execute({
      query: `SELECT idfpyto FROM folderpyto WHERE codfpyto = :codfpyto AND codfciapar = :codfcia`,
      params: [codfpyto, codfcia],
    })) as { IDFPYTO: string }[];
    if (result.length === 0) {
      throw new Error("Folder Proyecto not found");
    }

    const folderPYTO = result[0].IDFPYTO;
    const res = await drive.uploadFile(file, credes, [folderPYTO]);
    const bd1 = bd.getInstance();

    if (!res.id || !res.mimeType) throw new Error("Error uploading file");

    const newFile = await bd1.executeBinds({
      query: `INSERT INTO files (filename, url_id, type, description, codfpyto) 
              VALUES (:filename_i, :url_id_i, :type_i, :description_i, :codfpyto_i)
              RETURNING codfile, created_at INTO :codfile_o, :created_at_o`,
      params: {
        filename_i: body.filename,
        url_id_i: res.id,
        type_i: res.mimeType,
        description_i: body.description,
        codfpyto_i: codfpyto,
        codfile_o: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
        created_at_o: { type: oracledb.DATE, dir: oracledb.BIND_OUT },
      },
    }) as Record<string, Array<string | number>>;

    const { webViewLink, thumbnailLink, webContentLink } = (await this.getUrl(
      res.id as string,
      credes
    )) as urls;

    return {
      codfile: newFile.codfile_o[0],
      filename: body.filename,
      url: { webViewLink, thumbnailLink, webContentLink },
      type: res.mimeType,
      created_at: newFile.created_at_o[0],
      codfpyto: codfpyto,
      description: body.description,
    };
  }
}

export default FileService;
