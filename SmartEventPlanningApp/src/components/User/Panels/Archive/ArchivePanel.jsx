import React, { useEffect } from 'react'
import '../../../../css/User/Panels/Archive/ArchivePanel.css'
import { useDispatch, useSelector } from 'react-redux'
import ArchiveEventCard from './ArchiveEventCard'
import { GetEventsI_CreatedForArchive } from '../../../../redux/slices/eventSlice';

function ArchivePanel() {
    const dispatch = useDispatch();
    const { eventArchive } = useSelector(store => store.event)

    const UserId = localStorage.getItem("UserId");

    useEffect(() => {
        dispatch(GetEventsI_CreatedForArchive(UserId));
    }, [])


    return (
        <div className='archive-panel-container flex-row-align-justify-start'>
            {eventArchive.events?.map((e) => (
                <ArchiveEventCard event={e} />
            ))}
        </div>
    )
}

export default ArchivePanel