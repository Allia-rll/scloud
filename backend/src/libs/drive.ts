import { google } from "googleapis";
import multer from "multer";
import path from "path";
import stream from "stream";

/* const KEYFILEPATH = path.join(__dirname, "scloud-creden.json");
const SCOPES = ["https://www.googleapis.com/auth/drive"];

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});
 */
class Drive {
  private static instance: Drive;
  private auth: any;

  private constructor(keypath: string, scope: string[]) {
    this.auth = new google.auth.GoogleAuth({
      keyFile: keypath,
      scopes: scope,
    });
  }

  public static init(keypath: string, scope: string[]) {
    if (!Drive.instance) {
      Drive.instance = new Drive(keypath, scope);
    }
    return Drive.instance;
  }

  public static getInstance() {
    if (!Drive.instance) {
      throw new Error("Drive instance not initialized");
    }
    return Drive.instance;
  }

  public async generatePublicUrl(id: string) {
    const drive = google.drive({ version: "v3", auth: this.auth });
    await drive.permissions.create({
      fileId: id,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });
    const res = await drive.files.get({
      fileId: id,
      fields: "webViewLink, webContentLink, thumbnailLink, ",
    });
    return res.data;
  }

  public async uploadFile(file: Express.Multer.File) {
    const bufferStream = new stream.PassThrough();
    bufferStream.end(file.buffer);
    const drive = google.drive({ version: "v3", auth: this.auth });
  
    const res = await drive.files.create({
      media: {
        mimeType: file?.mimetype,
        body: bufferStream,
      },
      requestBody: {
        name: file?.originalname,
        parents: ["1ZMStthAb2JHC5Efq9E3FAUucGqepMtxA"],
      },
    });

    if(!res.data.id) throw new Error("Error uploading file");
    return res.data;
  }
}

// TODO: Calculate path to credentials file
Drive.init(path.join("C:\\Users\\Jose\\Downloads\\scloud\\backend\\", "scloud-creden.json"), [
  "https://www.googleapis.com/auth/drive",
]);

export default Drive;
