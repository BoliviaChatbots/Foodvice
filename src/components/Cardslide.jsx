


const Cardslide = () => {

    return (
        <>

            <div className="card">
                <div className="card-image">
                    <img src="/cardslider/ai.jpg" alt="Imagen Design" />
                    <p className="card-tag">Mexicana</p>
                </div>
                <div className="card-content">
                    <h3 className="card-title">Restaurante Valenciaga II</h3>
                    <p className="card-text">Av Santos Dumont 3550 4to Anillo frente al Coliseo Santa Rosita.</p>
                    <div className="card-footer">
                        <div className="card-profile">
                            <img src="/cardslider/user-2.jpg" alt="imagen User" />
                            <div className="card-profile-info">
                                <span className="card-profile-name">El mejor plato del local</span>
                                <span className="card-profile-role">Domingos</span>
                            </div>
                        </div>
                        <div className="card-promo">
                            <button
                                className="card-button"
                            // onClick={() => onSelectProduct(product)}
                            >
                                Oferta 50%
                            </button>

                            <a href="/restaurants/restaurant/123" className="card-button">Reservar</a>

                        </div>

                    </div>
                </div>
            </div>


        </>


    )
}

export default Cardslide