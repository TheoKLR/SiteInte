import { newstudentSchema, newstudentUUID } from '../schemas/newstudent.schema';
import { db } from "../database/db"
import { eq } from 'drizzle-orm'
import { api_utt_admis_url, api_utt_auth_url, api_utt_password, api_utt_username } from '../utils/secret';
import axios from 'axios';

export const setUUID = async (UUID: string, isUsed: boolean, userId: number) => {
    try {
        await db.update(newstudentSchema)
            .set({ isUsed: isUsed })
            .where(eq(newstudentSchema.uuid, UUID));
    } catch (error) {
        throw new Error("Failed to set user UUID. Please try again later.");
    }
}

export const createUUID = async (email : string) => {
    try {
        const newstudent: newstudentUUID = {email : email};
        await db.insert(newstudentSchema).values(newstudent);
    } catch (error) {
        throw new Error("Failed to create user UUID. Please try again later.");
    }
}

export const deleteByUUID = async (UUID: string) => {
    try {
        await db.delete(newstudentSchema).where(eq(newstudentSchema.uuid, UUID));
    } catch (error) {
        throw new Error("Failed to delete user UUID. Please try again later.");
    }
}

export const getAllnewStudent = async () => {
    try {
        return await db.select({
            uuid: newstudentSchema.uuid,
            isUsed: newstudentSchema.isUsed,
            email: newstudentSchema.email
        })
            .from(newstudentSchema);
    } catch (error) {
        throw new Error("An error occurred. Please try again later.");
    }
}

export const getIsUsedbyUUID = async (UUID: string) => {
    try {
        const response = await db.select(
            { isUsed: newstudentSchema.isUsed }
        )
            .from(newstudentSchema)
            .where(eq(newstudentSchema.uuid, UUID));

        if (response.length === 0) {
            return null;
        }
        return response[0].isUsed;
    } catch (error) {
        console.error("Database query failed: ", error);
        throw new Error("An error occurred. Please try again later.");
    }
}

export const getNewStudentbyEmail = async (email: string) => {
    try {
        const response = await db.select(
            { isUsed: newstudentSchema.isUsed }
        )
            .from(newstudentSchema)
            .where(eq(newstudentSchema.email, email));

        if (response.length === 0) {
            return null;
        }
        return response[0];
    } catch (error) {
        console.error("Database query failed: ", error);
        throw new Error("An error occurred. Please try again later.");
    }
}

export const getTokenUTTAPI = async() => {
    try {
        const response = await axios.post(api_utt_auth_url, {
          login: api_utt_username,
          password: api_utt_password,
        }, {
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
          }
        });
        return response.data.token; // Supposons que la réponse contient le token
      } catch (error) {
        console.error('Error during POST request:', error);
      }
}

export const getNewStudentsFromUTTAPI = async(token: string) => {
    try {
      const response = await axios.get(api_utt_admis_url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data["hydra:member"];
    } catch (error) {
      console.error('Error during GET request:', error);
    }
  }

