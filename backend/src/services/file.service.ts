import bd from "../libs/sequelize";
import { FileSchema, type urls } from "../db/models/file.model";
import { DFile } from "../db/models";
import drive from "../libs/drive";

class FileService {
  constructor() {}

  async getFileByOwner(id: string) {
    const bd1 = bd.getInstance();
    const result = (await bd1.execute({
      query: `SELECT * FROM files WHERE codciaowner = :id`,
      params: [id],
    })) as FileSchema[];
    const res_urls = await Promise.all(
      result.map(async (file) => {
        const { webViewLink, thumbnailLink, webContentLink } =
          (await this.getUrl(file.URL_ID)) as urls;

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
        codciaowner: file.CODCIAOWNER,
        description: file.DESCRIPTION,
        codproyecto: file.CODPROYECTO,
      };
    });
    return files;
  }

  async getUrl(id: string) {
    const drive1 = drive.getInstance();
    const res = await drive1.generatePublicUrl(id);
    return res;
  }

  async createFile(body: any, file: Express.Multer.File) {
    const drive1 = drive.getInstance();
    const res = await drive1.uploadFile(file);
    const bd1 = bd.getInstance();
    await bd1.execute({
      query: `INSERT INTO files (filename, url_id, type, codciaowner, description, codproyecto) 
              VALUES (:filename_i, :url_id_i, :type_i, :owner_i, :description_i, :id_project_i)`,
      params: [
        body.filename,
        res.id,
        res.mimeType,
        body.codciaowner,
        body.description,
        body.codproyecto,
      ],
    });
  }
}

export default FileService;
