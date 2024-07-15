import { useState, useEffect } from "react"
import { Role, Faction, User, Team, Event, newStudent, Perm } from '../../services/interfaces'
import { getAllFactions, getAllTeams, getAllUsers } from '../../services/requests'
import { getAllRoles } from "../../services/requests/roles"
import { getActiveEvents, getInactiveEvents } from "../../services/requests/events"
import { getAllUUID } from "../../services/requests/newstudent"
import { getAllPerms } from "../../services/requests/perms"

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
          label: perm.name,
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

export const Users = () => {
  const [options, setOptions] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllUsers()
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
        const response = await getAllUUID();
        const newStudentOptions = response.map((newStudent: newStudent) => ({
          value: newStudent.uuid,
          label: `${newStudent.uuid}`,
        }))
        console.log(newStudentOptions);
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