export interface fpytoSchema {
  CODFPYTO: number;
  IDFPYTO: string;
  CODPYTOOW: number;
  CODCIAOW: number;
  CODFCIAPAR: number;
}

export type FolderPytos = Record<number, fpytoSchema>;

class FProyecto {
  constructor() {}

  public static create(selectFpyto: fpytoSchema[]): FolderPytos {
    return Object.fromEntries(
      selectFpyto.map((fpyto) => [
        fpyto.CODFPYTO,
        {
          ...fpyto,
        },
      ])
    );
  }
}

export default FProyecto;
