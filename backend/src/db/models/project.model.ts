export interface ProjectSchema {
  CODCIA: number;
  CODPYTO: number;
  NOMBPYTO: string;
  FECREG: Date;
  OBSERVAC: string;
}

export type Projects = Record<number, ProjectSchema>;

class Project {
  constructor() {}

  public static create(selectProjects: ProjectSchema[]): Projects {
    return Object.fromEntries(
      selectProjects.map((project) => [
        project.CODPYTO,
        {
          ...project,
        },
      ])
    );
  }
}

export default Project;
