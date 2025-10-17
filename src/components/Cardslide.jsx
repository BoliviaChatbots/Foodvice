// Cardslide.jsx
import { Link } from "react-router-dom";
import './Cardslide.css';

const Cardslide = ({ item }) => {
    return (
        <div className="card">
            <div className="card-image">
                <img src={item.imagen} alt={item.nombre} />
            </div>

            <div className="card-content">
                <div>
                    <div className='card-tag-nivel'>
                        <p className="card-tag">{item.estilo}</p>
                        <box-icon type='solid' name='star' size="xm" className='card-star'></box-icon>
                        <p className="card-level">{item.nivel}</p>
                    </div>

                    <h3 className="card-title">{item.nombre}</h3>
                    <p className="card-text">{item.direccion}</p>
                </div>

                <div className="card-footer">
                    <div className="card-profile">
                        <img src={item.prodimagen} alt="Imagen Food" />
                        <div className="card-profile-info">
                            <span className="card-profile-name">{item.prodnombre}</span>
                            <span className="card-profile-role">{item.prodprecio}</span>
                        </div>
                    </div>

                    <div className="card-promo">
                        {item.promo && (
                            <button className="card-button">{item.promo}</button>
                        )}
                        <Link to={`/restaurants/${item.url}`} className="card-button">
                            Reservar
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cardslide;
