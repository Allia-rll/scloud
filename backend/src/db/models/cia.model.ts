export interface CiaSchema {
  CODCIA: number;
  DESCIA: string;
  DESCORTA: string;
  VIGENTE: string;
}

type Cias = Record<number, CiaSchema>;

class Cia {
  constructor() {}

  public static create(selectCias: CiaSchema[]): Cias {
    let cias: Cias = {};
    cias = Object.fromEntries(
      selectCias.map((cia) => [
        cia.CODCIA,
        {
          ...cia,
        },
      ])
    );

    return cias;
  }
}

export default Cia;
