import { useState } from 'react';
import { getActiveEvents, setActiveEvent, setInactiveEvent} from '../../../services/requests/events';
import Select from 'react-select'
import { InactiveEvents, ActiveEvents } from '../../utils/Select';
import { toId } from '../../utils/Submit';
import { handleError } from '../../utils/Submit';
import { ToastContainer } from 'react-toastify';

export const StartEvent = () => {
    const [event, setEvent] = useState({} as any)

    const Submit = async () => {
        const id = toId(event)
        await handleError("L'event à commencé ", "Une erreur est survenue", setActiveEvent, id)
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
            <ToastContainer position="bottom-right"/>
        </div>
    );
};


export const StopEvent = () => {
    const [event, setEvent] = useState({} as any)

    const Submit = async () => {
        const id = toId(event)
        await handleError("L'event à commencé ", "Une erreur est survenue", setInactiveEvent, id)
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
            <ToastContainer position="bottom-right"/>
        </div>
    );
};


