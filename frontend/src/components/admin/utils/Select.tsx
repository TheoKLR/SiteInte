import { useState, useEffect } from "react"
import { Desire, Faction, User, Team, Event } from '../../../services/interfaces'
import { getAllDesires, getAllFactions, getAllTeams, getAllUsers } from '../../../services/requests'
import { getActiveEvents, getInactiveEvents } from "../../../services/requests/events"

export const Desires = () => {
  const [options, setOptions] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllDesires()
        const usersOptions = response.data.map((desire: Desire) => ({
          value: desire.id,
          label: `${desire.name}`,
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
        const usersOptions = response.data.map((faction: Faction) => ({
          value: faction.id,
          label: `${faction.name}`,
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
        const usersOptions = response.data.map((team: Team) => ({
          value: team.id,
          label: `${team.name}`,
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