import "./Datainc.css"

export const Datainc = ({ loggedIn, userImage }) => {


    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
            {/* Logo */}
            <a className="navbar-brand d-flex align-items-center" href="#">
                <img
                    src="/logo.png"
                    alt="Logo"
                    width="32"
                    height="32"
                    className="me-2"
                />
                <span className="d-md-inline">MiApp</span>
                {/* 👆 se oculta en pantallas pequeñas */}
            </a>

            <div className="ms-auto">
                {/* Si está logueado muestra avatar, si no botón login */}
                {loggedIn ? (
                    <img
                        src={userImage}
                        alt="User"
                        width="36"
                        height="36"
                        className="rounded-circle"
                    />
                ) : (
                    <button className="btn btn-light">Login</button>
                )}
            </div>
        </nav>
    );
}
