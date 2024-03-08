import ReactDOM from 'react-dom';

import classes from './Status.module.css';

function Status(props) {
    const { title, message, status } = props;

    let statusClasses = '';

    if (status === 'success') {
        statusClasses = classes.success;
    }

    if (status === 'error') {
        statusClasses = classes.error;
    }

    const cssClasses = `${classes.status} ${statusClasses}`;

    return ReactDOM.createPortal(
        <div className={cssClasses}>
            <h2>{title}</h2>
            <p>{message}</p>
        </div>,
        document.getElementById('status')
    );
}

export default Status;