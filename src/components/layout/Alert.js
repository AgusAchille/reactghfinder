import React, {useContext} from 'react'
import AlertContext from '../../Context/alert/alertContext'

export default function Alert() {
    const alertContext = useContext(AlertContext);

    return (
        alertContext.alert && 
        <div className={`alert alert-${alertContext.alert.type}`}>
            <i className='fas fa-info-circle'/> {alertContext.alert.message}
        </div>
    )
}
