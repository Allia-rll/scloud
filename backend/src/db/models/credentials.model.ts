export interface CredsSchema {
  CODCRED: number;
  TYPE: string;
  PROJECT_ID: string;
  PRIVATE_KEY_ID: string;
  PRIVATE_KEY: string;
  CLIENT_EMAIL: string;
  CLIENT_ID: string;
  UNIVERSE_DOMAIN: string;
  FROOT: string;
  NAMECREDS: string;
}

export interface PrivCredsSchema {
  TYPE: string;
  PROJECT_ID: string;
  PRIVATE_KEY_ID: string;
  PRIVATE_KEY: string;
  CLIENT_EMAIL: string;
  CLIENT_ID: string;
  UNIVERSE_DOMAIN: string;
  FROOT: string;
}

export interface AuthCredsSchema {
  TYPE: string;
  PROJECT_ID: string;
  PRIVATE_KEY_ID: string;
  PRIVATE_KEY: string;
  CLIENT_EMAIL: string;
  CLIENT_ID: string;
  UNIVERSE_DOMAIN: string;
}

export interface PubCredsSchema {
  CODCRED: number;
  NAMECREDS: string;
}

export type Credentials = Record<number, CredsSchema>;

class Credential {
  constructor() {}

  public static create(selectProjects: CredsSchema[]): Credentials {
    return Object.fromEntries(
      selectProjects.map((cred) => [
        cred.CODCRED,
        {
          ...cred,
        },
      ])
    );
  }
}

export default Credential;
