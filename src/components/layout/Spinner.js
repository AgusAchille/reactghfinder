export default function Spinner (){
    return (
        <div className='text-center'>
            <i className="fas fa-fan fa-spin" style={spinnerStyle}></i>
        </div>
    )
}

const spinnerStyle = {
    marginTop: '15vh',
    fontSize: '10rem',
    color: '#E04A58'
}