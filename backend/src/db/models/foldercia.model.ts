export interface fciaSchema {
  CODFCIA: number;
  CODCRED: number;
  IDFCIA: string;
  CODCIAOW: number;
}

export type FolderCias = Record<number, fciaSchema>;

class FCia {
  constructor() {}

  public static create(selectFcia: fciaSchema[]): FolderCias {
    return Object.fromEntries(
      selectFcia.map((fcia) => [
        fcia.CODFCIA,
        {
          ...fcia,
        },
      ])
    );
  }
}

export default FCia;
