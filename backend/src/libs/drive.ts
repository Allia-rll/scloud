import { google } from "googleapis";
import stream from "stream";

/* const KEYFILEPATH = path.join(__dirname, "scloud-creden.json");
const SCOPES = ["https://www.googleapis.com/auth/drive"];

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});
*/

export interface AuthCredentials {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  universe_domain: string;
}

export interface uploadCreds {
  credentials: AuthCredentials;
  froot: string;
}

function getAuth(credentials: AuthCredentials) {
  return new google.auth.GoogleAuth({
    credentials: credentials,
    scopes: ["https://www.googleapis.com/auth/drive"],
  });
}

async function generatePublicUrl(id: string, creds: AuthCredentials) {
  const auth = getAuth(creds);
  const drive = google.drive({ version: "v3", auth });
  await drive.permissions.create({
    fileId: id,
    requestBody: {
      role: "reader",
      type: "anyone",
    },
  });
  const res = await drive.files.get({
    fileId: id,
    fields: "webViewLink, webContentLink, thumbnailLink",
  });
  return res.data;
}

async function uploadFile(
  file: Express.Multer.File,
  creds: AuthCredentials,
  part: string[]
) {
  const auth = getAuth(creds);

  const bufferStream = new stream.PassThrough();
  bufferStream.end(file.buffer);
  const drive = google.drive({ version: "v3", auth });

  const res = await drive.files.create({
    media: {
      mimeType: file?.mimetype,
      body: bufferStream,
    },
    requestBody: {
      name: file?.originalname,
      parents: part,
    },
  });

  if (!res.data.id) throw new Error("Error uploading file");
  return res.data;
}

async function createFolder(
  name: string,
  creds: AuthCredentials,
  par: string[]
) {
  const auth = getAuth(creds);
  const drive = google.drive({ version: "v3", auth });
  const res = await drive.files.create({
    requestBody: {
      name,
      mimeType: "application/vnd.google-apps.folder",
      parents: par,
    },
    fields: "id",
  });
  return res.data;
}

// TODO: Calculate path to credentials file

export default { generatePublicUrl, uploadFile, createFolder };
