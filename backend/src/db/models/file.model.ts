export type urls = Record< "webViewLink" | "thumbnailLink" | "webContentLink", string>;

export interface FileSchema {
  CODFILE?: number;
  FILENAME: string;
  URL_ID: string; // para la bd
  URL?: urls; // para el front
  TYPE: string;
  CREATED_AT?: Date;
  CODFPYTO: number;
  DESCRIPTION: string;
}

type Files = Record<number, FileSchema>;

class DFile {
  constructor() {}

  public static create(selectfiles: FileSchema[]): Files {
    let files: Files = {};
    files = Object.fromEntries(
      selectfiles.map((file) => [
        file.CODFILE,
        {
          ...file,
        },
      ])
    );

    return files;
  }
}

export default DFile;
