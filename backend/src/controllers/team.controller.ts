import { Request, Response, NextFunction } from 'express';
import * as service from '../services/team.service';
import * as user_service from '../services/user.service';
import { Error, Created, Ok } from '../utils/responses';
import { RI_list } from '../utils/RI_list';
import { PermType } from '../schemas/user.schema';


export const getAllTeams = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await service.getAllTeams();
    Ok(res, { data });
  } catch (error) {
    Error(res, { error });
  }
}

export const getAllTeamsWithPoints = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await service.getAllTeamsWithPoints();
    Ok(res, { data });
  } catch (error) {
    console.log("error")
    Error(res, { error });
  }
}

export const getTeam = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const idNumber = parseInt(id, 10);
  if (isNaN(idNumber)) return Error(res, { msg : 'Could not parse Id' });

  try {
    const data = await service.getTeam(idNumber);
    Ok(res, { data });
  } catch (error) {
    Error(res, { error });
  }
};

export const createTeam = async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;

  name ?? Error(res, { msg: "No name" });

  try {
    await service.createTeam(name);
    Created(res, {})
  } catch (error) {
    Error(res, { error });
  }
};

export const deleteTeam = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const idNumber = parseInt(id, 10);
  if (isNaN(idNumber)) return Error(res, { msg : 'could not parse Id' });

  try {
    await user_service.removeUsersFromTeam(idNumber);
    await service.deleteTeam(idNumber);
  } catch (error) {
    Error(res, { error });
  }
};

export const addToFaction = async (req: Request, res: Response, next: NextFunction) => {
  const { teamIds, factionId } = req.body;

  try {
    await service.addToFaction(teamIds, factionId);
    Ok(res, { msg: "Team modified" });
  } catch (error) {
    Error(res, { error });
  }
};

export const registerTeam = async (req: Request, res: Response, next: NextFunction) => {
  const { name, userIds } = req.body;

  try {
    await service.createTeam(name);
    const id = await service.getTeamId(name);
    if (id) {
      await user_service.addToTeam(userIds, id);
    }
    Created(res, {})
  } catch (error) {
    Error(res, { error });
  }
}

export const addTimestamp = async (req: Request, res: Response, next: NextFunction) => {
  const { timestamp, id } = req.body;
  try {
    await service.addTimestamp(timestamp, id);
    Ok(res, { msg: "Team modified" });
  } catch (error) {
    Error(res, { error });
  }
};

export const getTimestamp = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.body;

  try {
    const data = await service.getTimestamp(id);
    Ok(res, { data });
  } catch (error) {
    Error(res, { error });
  }
};


export const modifyTeam = async (req: Request, res: Response, next: NextFunction) => {
  let { id, name, type } = req.body;

  try {
    const currentTeam = await service.getTeam(id);

    if (!currentTeam) {
      return Error(res, { msg: "No team found" });
    }

    if (!name) {
      name = currentTeam.name;
    }

    if (!type) {
      type = currentTeam.type;
    }

    await service.modifyTeam(id, name, type);
    return Ok(res, { msg: "Team renamed!" });
  } catch (error) {
    return next(error);
  }
};


export const validateTeam = async (req: Request, res: Response, next: NextFunction) => {
  const { id, isOfficial } = req.body;

  try {
    await service.validateTeam(id, isOfficial);
    Ok(res, {msg : "Team updated !"})
  } catch (error) {
    Error(res, { error });
  }
};

export const getAllMembersTeam = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const { id } = req.params;
    const idNumber = parseInt(id, 10);
  
    const members = await user_service.getAllMembersTeam(idNumber);
    
    Ok(res, {data : members})
  } catch (error) {
    Error(res, { error });
  }
};



export const teamDistribution = async (req: Request, res: Response) => {
  try {
      
      const newStudents = await user_service.getAllByPermission(PermType.NewStudent);
      const teams = await service.getAllTeams();
      
      // Filtrer les étudiants qui ne sont pas dans la liste RI et qui ne sont pas déjà assignés à une équipe
      const filteredStudents = newStudents
                                .filter((student: any) => !RI_list.includes(student.email))
                                .filter((student : any) => !student.team_id);

      // Filtrer les utilisateurs en fonction de la spécialité
      const tcStudents = filteredStudents
        .filter((student: any) => student.branch === "TC")
        .map((student: any) => ({
          id: student.id,
          email: student.email,
          branch: student.branch
        }));

      const otherStudents = filteredStudents
        .filter((student: any) => student.branch !== "TC" && student.branch !== "RI" && student.branch !== "MM")
        .map((student: any) => ({
          id: student.id,
          email: student.email,
          branch: student.branch
        }));

      // Filtrer les équipes en fonction de leur type
      const tcTeams = teams.filter(team => team.type === "TC");
      const otherTeams = teams.filter(team => team.type !== "TC" && team.type !== "RI" && team.type !== "PMOM");

      // Fonction pour assigner les utilisateurs à des équipes équilibrées
      async function assignUsersToTeams(users: any, teams: any) {
        // Calculer la taille actuelle des équipes
        const teamSizes = await Promise.all(teams.map(async (team: any) => {
          const members = await user_service.getAllMembersTeam(team.id);
          return {
            teamId: team.id,
            size: members.length
          };
        }));

        // Trier les équipes par taille (ascendant)
        teamSizes.sort((a: any, b: any) => a.size - b.size);

        for (const user of users) {
          // Assigner l'utilisateur à l'équipe avec le moins de membres
          const smallestTeam = teamSizes[0];
          await user_service.addToTeam([user.id], smallestTeam.teamId);

          // Mettre à jour la taille de l'équipe après l'ajout
          smallestTeam.size += 1;

          // Réordonner les équipes pour garder la plus petite en premier
          teamSizes.sort((a: any, b: any) => a.size - b.size);
        }
      }

      // Assigner les utilisateurs TC aux équipes TC
      await assignUsersToTeams(tcStudents, tcTeams);

      // Assigner les autres utilisateurs aux équipes non-TC
      await assignUsersToTeams(otherStudents, otherTeams);

      Ok(res, { msg: "NewStudents distributed!" });
  } catch (error) {
      Error(res, { error });
  }
}
