import React, { useState, useEffect } from "react"
import {Role, Faction, User, Team, Event, newStudent, Perm, Challenge, ChallType} from '../../services/interfaces'
import {getAllCe, getAllFactions, getAllTeams, getAllUsers} from '../../services/requests'
import { getAllRoles } from "../../services/requests/roles"
import { getActiveEvents, getInactiveEvents } from "../../services/requests/events"
import { getAllNewStudent } from "../../services/requests/newstudent"
import {getAllPerms, getRegistration} from "../../services/requests/perms"
import { getAllByPermission } from "../../services/requests/users"
import {getAllChallenges, getAllFreeChallengesTexts, getChallenges} from "../../services/requests/challenges";

export const Roles = () => {
  const [options, setOptions] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllRoles()
        const usersOptions = response.map((role: Role) => ({
          value: role.id,
          label: role.name,
        }))
        setOptions(usersOptions)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return options
}

export const Factions = () => {
  const [options, setOptions] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllFactions()
        const usersOptions = response.map((faction: Faction) => ({
          value: faction.id,
          label: faction.name,
        }))
        setOptions(usersOptions)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return options
}


export const Perms = () => {
  const [options, setOptions] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllPerms()
        const usersOptions = response.map((perm: Perm) => ({
          value: perm.id,
          label: perm.title,
        }))
        setOptions(usersOptions)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return options
}


export const Teams = () => {
  const [options, setOptions] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllTeams()
        const usersOptions = response.map((team: Team) => ({
          value: team.id,
          label: team.name,
        }))
        setOptions(usersOptions)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return options
}

export enum Choice {
  ALL = "all",
  AVAILABLE = "available",
  COMPLETED = "completed"
}

export const Challenges = (challType: ChallType, filter: Choice, associateId: number | undefined) => {
  const [options, setOptions] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getChallenges(challType, filter, associateId)
        const challOptions = response.map((chall: Challenge) => {
          return {
            value: chall.id,
            label: chall.name,
            description: chall.description,
            points: chall.points
          }
        })
        setOptions(challOptions)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [associateId])

  return options
}

export const getFreeChallengeText = async (factionId: number): Promise<{value: string, label: string}[]> => {

  return await getAllFreeChallengesTexts(factionId)
      .then(data => {
        if(!data || data.length === 0) return []
        const response = data.map((chall: Challenge) => {
          if(!chall) return {value: "", label: "undefined"}
          console.log(chall)
          return {
            value: chall,
            label: chall,
          }
        })
        return response
      })
      .catch(error => {
        console.log(error)
      })

}

export const PermUsers = (permId: number) => {
  const [options, setOptions] = useState([])

  const fetchData = async () => {
    try {
      const response = await getRegistration(permId)
      const usersOptions = response.map((user: User) => ({
        value: user.id,
        label: `${user.first_name} ${user.last_name}`,
        email : user.email,
      }))
      setOptions(usersOptions)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  fetchData()

  return options
}


export const Users = () => {
  const [options, setOptions] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllUsers()
        const usersOptions = response.map((user: User) => ({
          value: user.id,
          label: `${user.first_name} ${user.last_name}`,
          email : user.email,
        }))
        setOptions(usersOptions)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return options
}

export const Ces = () => {
  const [options, setOptions] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllCe()
        const usersOptions = response.map((user: User) => ({
          value: user.id,
          label: `${user.first_name} ${user.last_name}`,
          email : user.email,
        }))
        setOptions(usersOptions)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return options
}

export const NewStudents = () => {
  const [options, setOptions] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllByPermission("NewStudent");
        const usersOptions = response.map((user: User) => ({
          value: user.id,
          label: `${user.first_name} ${user.last_name}`,
        }))
        setOptions(usersOptions)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return options
}

export const UUIDs = () => {
  const [options, setOptions] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllNewStudent();
        const newStudentOptions = response.map((newStudent: newStudent) => ({
          value: newStudent.uuid,
          label: newStudent.email,
        }))
        setOptions(newStudentOptions)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return options
}


export const InactiveEvents = () => {
  const [options, setOptions] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getInactiveEvents()
        const usersOptions = response.map((event: Event) => ({
          value: event.id,
          label: `${event.name}`,
        }))
        setOptions(usersOptions)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return options
}

export const ActiveEvents = () => {
  const [options, setOptions] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getActiveEvents()
        const usersOptions = response.map((event: Event) => ({
          value: event.id,
          label: `${event.name}`,
        }))
        setOptions(usersOptions)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return options
}