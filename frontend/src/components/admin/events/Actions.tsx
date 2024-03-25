import { useEffect, useState } from 'react';
import { createFaction } from '../../../services/requests/factions';
import { getActiveEvents, setActiveEvent, setInactiveEvent} from '../../../services/requests/events';
import Select from 'react-select'
import { InactiveEvents, ActiveEvents } from '../../utils/Select';
import { toId } from '../../utils/Submit';

export const StartEvent = () => {
    const [event, setEvent] = useState({} as any)

    const Submit = () => {
        const id = toId(event)
        if (id) {
            setActiveEvent(id)
        }
    }

    return (
        <div>
            <div className="select-container">
                <Select
                options={InactiveEvents()}
                onChange={event => setEvent(event)}
                />
            </div>
            <button className="submit-button" onClick={Submit}>Soumettre</button>
        </div>
    );
};


export const StopEvent = () => {
    const [event, setEvent] = useState({} as any)

    const Submit = () => {
        const id = toId(event)
        if (id) {
            setInactiveEvent(id)
        }
    }

    return (
        <div>
            <div className="select-container">
                <Select
                options={ActiveEvents()}
                onChange={event => setEvent(event)}
                />
            </div>
            <button className="submit-button" onClick={Submit}>Soumettre</button>
        </div>
    );
};


