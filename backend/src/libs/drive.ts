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

const key = [
  {
    type: "service_account",
    project_id: "scloud-427302",
    private_key_id: "b3c7bba858ea18cefff633c13d05b8ddb91e2339",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDRp4ZEW9MZkxLd\nH3sC6cfRDs8hizLUJEYUcf6NW9J0hl1O5uekfkjqsooT3ZAyOqE7EKHpcsHwBsFs\nK53JRV2ymx/ivGnxt/y3CaDJksIcdDA+ciKR7Y7C+t1Sc37yxtHo4pHWDI/pd9Gu\noT5Ej4hUe+oyuKg06flU+TWAghfvbeCln3+v0pFNbDXofb9zCa/leEFyPtC5IbqG\nsvfgzfKlsEk/J5dcbq5IwaAfOuTMzYIHtUNwDzDlF+n9wthxld928h2/AbdQWgmR\nGcYvRuotPq3dYJERfYFE11439hj/HwFh6Jgm2MFKOZWICsx0OdefO+6ewW3fTANA\nF81yBj7JAgMBAAECggEAAW1ao4E9BAPtaVIvKg9JmA2Z4Rxzl4BaNkYq4Y82FOs7\nvB9kBQmDiU53FGjKFB90TMTBl2dbtNy06R24ZJ/7Ye1+p3JZJcc2+g9/l9OvDNbJ\nI8mu3M+xTLg8tLSa0QADuoo9TCfYfHI/fAj2tayE9O9Fgjwhz/9mPjr2j2YDT/LM\nQHozcz8LnLJ5SWyW4oc9WEDWvWWTchyoM/gA4Oa/K1olRPQ2NgPQDgJYHdhN90hf\nGqcD4+4bYLFQZsn9NWwB6mMyUDDS44w/2FtPEXS/rpr9lnOEqBRxypLYdFSXQyuv\nUCsY4HTu4HrADz+/c5bQOR10CGbf5zoV5k/Z8A/HYQKBgQDu5mqFJTliKDbWH+DL\nnB7i//xVzP8sqs/7Wzj2hRT7lplhmvt9df/igoCIR0MaXjMm0RmOiRFqWScWKTs3\nZic5SGkIeaq2SX1poghuQ0eQvFJ+FUXM3K0Lqtx092/q+4VAx3MfciK2L6x6IQ6+\nMia8ifS1LZ8E/5IyI4DNKVVM4QKBgQDgqTaZKft2TfkPOBQ0HNpgKOAhKdZck/Z4\ncd4VNccgdiBgBEy2/+IGMTAqK1ytnmVXipsbuJWXm4oOzcdA+qrHhjIIWkcbNbFv\nBpQBMXbXjV8g95mXv/ta+s6jbkLYSqRzAV6QasvNCWgk8VECzaZ5BGR6Al3XWYca\njI7TAFYG6QKBgAQegPOuwqCIpPloL04TcQzk8Qrhr/yrLU7eMcs+XDBCVn6yV2fA\nYxsauPCgme2YdjVTIaetgVleFChzqYu4/TAlqXn17xWZisoJey+7hT5foOR/pWZ0\n35714Ts7EPjyQUfuqHOAWkzd4ZFxhHmPD8/saQW+taE2buTia9QdxFTBAoGAQAq8\nj6jSEAVmLBp2V+ypq6O7UHjWrIlZRzhecHlmDDDgRb60B66lxdIbwsmdn7h5dx0B\n3kMeEZu7HUE3vaQ3Lq1occ0aW/1QWS/s3PI2yHd6WLF8TS/i/Spl4Vy7HWEZw9bu\nGAj5k7dMwssvprbs76563fTyv0K8KqtKw4di/pECgYAO+9nOKaWodnsvmc5mqBxa\nlan0p0LNT5vBlVOQvVigAgclAwKj/03NkjR6kTBu4KxGfYiFr3DWhSZEK9jrhcDw\nXrbzYa/TQciZxMdIjtxX1kOfu//CgVXd7L+w287p/Zg4trXRu6It3UZMxM+bC2IN\nNwpLOJwAfGIqx/5rJWVGTg==\n-----END PRIVATE KEY-----\n",
    client_email: "scloud-upload@scloud-427302.iam.gserviceaccount.com",
    client_id: "101302710792134007577",
    universe_domain: "googleapis.com",
  },
  { scope: ["https://www.googleapis.com/auth/drive"] },
];

function getAuth(credentials: AuthCredentials) {
  return new google.auth.GoogleAuth({
    credentials: credentials,
    scopes: ["https://www.googleapis.com/auth/drive"],
  });
}

async function getDrive(id: string) {
  const auth = getAuth({
    type: "service_account",
    project_id: "scloud-427302",
    private_key_id: "b3c7bba858ea18cefff633c13d05b8ddb91e2339",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDRp4ZEW9MZkxLd\nH3sC6cfRDs8hizLUJEYUcf6NW9J0hl1O5uekfkjqsooT3ZAyOqE7EKHpcsHwBsFs\nK53JRV2ymx/ivGnxt/y3CaDJksIcdDA+ciKR7Y7C+t1Sc37yxtHo4pHWDI/pd9Gu\noT5Ej4hUe+oyuKg06flU+TWAghfvbeCln3+v0pFNbDXofb9zCa/leEFyPtC5IbqG\nsvfgzfKlsEk/J5dcbq5IwaAfOuTMzYIHtUNwDzDlF+n9wthxld928h2/AbdQWgmR\nGcYvRuotPq3dYJERfYFE11439hj/HwFh6Jgm2MFKOZWICsx0OdefO+6ewW3fTANA\nF81yBj7JAgMBAAECggEAAW1ao4E9BAPtaVIvKg9JmA2Z4Rxzl4BaNkYq4Y82FOs7\nvB9kBQmDiU53FGjKFB90TMTBl2dbtNy06R24ZJ/7Ye1+p3JZJcc2+g9/l9OvDNbJ\nI8mu3M+xTLg8tLSa0QADuoo9TCfYfHI/fAj2tayE9O9Fgjwhz/9mPjr2j2YDT/LM\nQHozcz8LnLJ5SWyW4oc9WEDWvWWTchyoM/gA4Oa/K1olRPQ2NgPQDgJYHdhN90hf\nGqcD4+4bYLFQZsn9NWwB6mMyUDDS44w/2FtPEXS/rpr9lnOEqBRxypLYdFSXQyuv\nUCsY4HTu4HrADz+/c5bQOR10CGbf5zoV5k/Z8A/HYQKBgQDu5mqFJTliKDbWH+DL\nnB7i//xVzP8sqs/7Wzj2hRT7lplhmvt9df/igoCIR0MaXjMm0RmOiRFqWScWKTs3\nZic5SGkIeaq2SX1poghuQ0eQvFJ+FUXM3K0Lqtx092/q+4VAx3MfciK2L6x6IQ6+\nMia8ifS1LZ8E/5IyI4DNKVVM4QKBgQDgqTaZKft2TfkPOBQ0HNpgKOAhKdZck/Z4\ncd4VNccgdiBgBEy2/+IGMTAqK1ytnmVXipsbuJWXm4oOzcdA+qrHhjIIWkcbNbFv\nBpQBMXbXjV8g95mXv/ta+s6jbkLYSqRzAV6QasvNCWgk8VECzaZ5BGR6Al3XWYca\njI7TAFYG6QKBgAQegPOuwqCIpPloL04TcQzk8Qrhr/yrLU7eMcs+XDBCVn6yV2fA\nYxsauPCgme2YdjVTIaetgVleFChzqYu4/TAlqXn17xWZisoJey+7hT5foOR/pWZ0\n35714Ts7EPjyQUfuqHOAWkzd4ZFxhHmPD8/saQW+taE2buTia9QdxFTBAoGAQAq8\nj6jSEAVmLBp2V+ypq6O7UHjWrIlZRzhecHlmDDDgRb60B66lxdIbwsmdn7h5dx0B\n3kMeEZu7HUE3vaQ3Lq1occ0aW/1QWS/s3PI2yHd6WLF8TS/i/Spl4Vy7HWEZw9bu\nGAj5k7dMwssvprbs76563fTyv0K8KqtKw4di/pECgYAO+9nOKaWodnsvmc5mqBxa\nlan0p0LNT5vBlVOQvVigAgclAwKj/03NkjR6kTBu4KxGfYiFr3DWhSZEK9jrhcDw\nXrbzYa/TQciZxMdIjtxX1kOfu//CgVXd7L+w287p/Zg4trXRu6It3UZMxM+bC2IN\nNwpLOJwAfGIqx/5rJWVGTg==\n-----END PRIVATE KEY-----\n",
    client_email: "scloud-upload@scloud-427302.iam.gserviceaccount.com",
    client_id: "101302710792134007577",
    universe_domain: "googleapis.com",
  });
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
  console.log(res)
  return res.data;
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

export default { generatePublicUrl, uploadFile, createFolder, getDrive };
