import { Navbar } from "../components/shared/Navbar"
import { useEffect, useState } from "react";
import { getRole } from "../services/requests";
import { ShotgunCE} from "../components/events/ShotgunCE";
import { Barbecue } from "../components/events/Barbecue";
import { ShotgunPerm } from "../components/events/ShotgunPerm";
import { PreInscription } from "../components/events/PreinscriptionCE";
import { Section } from "../components/shared/Section";
import { getActiveEvents } from "../services/requests/events";
import { toIdArray } from "../utils/utils";
import { Default } from "../components/events/Default";

export const Events =  () => {
    const [activeEvents, setEvent] = useState<number[]>([]); 
    const [activeEventsArray, setEventArray] = useState<number[]>([]);  

    useEffect(() => {
        const init = async () => {
            try {
                const role = await getRole();
                //tableau avec les noms des events actifs
                const activeEvents = await getActiveEvents();
                if (!role) {
                    window.location.href = '/';
                    return null;
                }
                const activeEventsArray = toIdArray(activeEvents);
                setEventArray(activeEventsArray)
                return activeEventsArray;
            } catch (error) {
                console.error('Error fetching role:', error);
            }

        };
        init();
    }, []);

    return (
        <div className="Events">
            <Navbar/>
            {
              activeEventsArray.length === 0 ? (
                <Section titre="Aucun événement en cours" contenu={Default}/>
              ):null
            }
            {
               activeEventsArray.includes(1) ? (
                <Section titre="Pre-inscription" contenu={PreInscription} />
               ):null
            }
            {
               activeEventsArray.includes(2) ? (
                <Section titre="ShotgunCE" contenu={ShotgunCE} />
               ):null
            }
            {
                activeEventsArray.includes(3) ? (
                    <Section titre="ShotgunPerm" contenu={ShotgunPerm} />
                ):null
            }
            {
                activeEventsArray.includes(4) ? (
                    <Section titre="Barbecue" contenu={Barbecue} />
                ):null
            }
        </div>
    )
}