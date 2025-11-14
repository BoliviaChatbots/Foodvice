import React, { useState, useRef } from "react";
import useLoginStore from "../store/useLoginStore";
import "./RestaurantReviews.css";

export default function RestaurantReviews({ reviews = [] }) {
    const fileInputRef = useRef(null);
    const { user, openLogin } = useLoginStore();
    const [showModal, setShowModal] = useState(false);
    const [newReview, setNewReview] = useState({
        puntuacion: 1,
        titulo: "",
        comentario: "",
        fotos: [],
    });

    const avg =
        reviews.length > 0
            ? reviews.reduce((sum, r) => sum + (Number(r.puntuacion) || 0), 0) / reviews.length
            : 0;

    const scoreLabels = ["Excelente", "Bueno", "Promedio", "Malo", "Horrible"];
    const scoreCounts = [5, 4, 3, 2, 1].map(
        (n) => reviews.filter((r) => Number(r.puntuacion) === n).length
    );

    const renderStars = (score, editable = false) => {
        const full = Math.round(score);
        return (
            <div className="stars">
                {Array.from({ length: 5 }).map((_, i) => (
                    <box-icon
                        key={i}

                        type="solid"
                        name="star"
                        className={i < full ? "star-yellow" : "star-grey"}
                        size="sm"
                        onClick={() =>
                            editable &&
                            setNewReview((prev) => ({ ...prev, puntuacion: i + 1 }))
                        }
                        style={{ cursor: editable ? "pointer" : "default" }}
                    ></box-icon>
                ))}
            </div>
        );
    };

    const handleAddReview = () => {
        if (!user) {
            openLogin();
        } else {
            setShowModal(true);
        }
    };
    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {

        const files = Array.from(e.target.files);
        const validFiles = files.slice(0, 3 - newReview.fotos.length);
        const previews = validFiles.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));
        setNewReview((prev) => ({
            ...prev,
            fotos: [...prev.fotos, ...previews],
        }));
    };

    const removePhoto = (index) => {
        setNewReview((prev) => ({
            ...prev,
            fotos: prev.fotos.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Nueva reseña:", {
            ...newReview,
            usuario: `${user.name} ${user.lastname}`,
            email: user.email,
            fecha: new Date().toISOString(),
            avatar: user.avatar,
        });
        setShowModal(false);
        setNewReview({ puntuacion: 1, titulo: "", comentario: "", fotos: [] });
    };

    return (
        <div className="restaurant-reviews">
            <div className="reviews-header">
                <h2 className="section-title">Valoraciones</h2>
                <button className="btn-add-review" onClick={handleAddReview}>
                    Agregar opinión
                </button>
            </div>

            {/* === NUEVO RESUMEN === */}
            <div className="reviews-summary-card">
                <div className="avg-block">
                    <h1>{avg.toFixed(1)}</h1>
                    <p className="avg-label">
                        {avg >= 4.5
                            ? "Excelente"
                            : avg >= 3.5
                                ? "Bueno"
                                : avg >= 2.5
                                    ? "Promedio"
                                    : avg >= 1.5
                                        ? "Malo"
                                        : "Horrible"}
                    </p>
                    {renderStars(avg)}
                    <p className="review-count">({reviews.length.toLocaleString()} opiniones)</p>
                </div>

                <div className="reviews-breakdown">
                    {scoreLabels.map((label, idx) => {
                        const count = scoreCounts[idx];
                        return (
                            <div className="score-row" key={label}>
                                <div className="label">{label}</div>
                                <div className="bar">
                                    <div
                                        className="bar-fill"
                                        style={{
                                            width: `${reviews.length > 0
                                                ? (count / reviews.length) * 100
                                                : 0
                                                }%`,
                                        }}
                                    ></div>
                                </div>
                                <div className="count">{count}</div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* === LISTA DE RESEÑAS === */}
            {reviews.length === 0 ? (
                <p className="no-reviews">Aún no hay opiniones para este restaurante.</p>
            ) : (
                <div className="reviews-list">
                    <h2 className="section-title">Comentarios</h2>
                    {reviews.map((r, i) => (
                        <article className="review-card" key={i}>
                            <div className="review-top">
                                <div className="review-user-info">
                                    <div className="review-avatar">
                                        <img
                                            src={r.imagen || "/default-user.png"}
                                            alt={r.usuario}
                                        />
                                    </div>
                                    <div>
                                        <h4 className="review-username">{r.usuario || "Anónimo"}</h4>
                                        <p className="review-date">
                                            {new Date(r.fecha).toLocaleDateString("es-ES", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </p>
                                    </div>
                                </div>
                                <div className="review-rating">{renderStars(r.puntuacion)}</div>
                            </div>

                            {r.titulo && <h3 className="review-title">{r.titulo}</h3>}
                            <p className="review-text">{r.comentario}</p>

                            {r.fotos && r.fotos.length > 0 && (
                                <div className="review-gallery">
                                    {r.fotos.map((foto, id) => (
                                        <img
                                            key={id}
                                            src={foto.imagen}
                                            alt={`foto reseña ${id + 1}`}
                                        />
                                    ))}
                                </div>
                            )}
                        </article>
                    ))}
                </div>
            )}

            {/* === MODAL === */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Tú opinión es importante</h3>
                        <form onSubmit={handleSubmit}>
                            <label>Puntuación:</label>

                            {renderStars(newReview.puntuacion, true)}

                            <label>Título:</label>
                            <input
                                type="text"
                                value={newReview.titulo}
                                onChange={(e) =>
                                    setNewReview((prev) => ({ ...prev, titulo: e.target.value }))
                                }
                                required
                            />

                            <label>Comentario:</label>
                            <textarea
                                rows="4"
                                value={newReview.comentario}
                                onChange={(e) =>
                                    setNewReview((prev) => ({
                                        ...prev,
                                        comentario: e.target.value,
                                    }))
                                }
                                required
                            ></textarea>

                            <label>Fotos (máximo 3):</label>
                            <div className="photo-upload">
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleFileChange}
                                    disabled={newReview.fotos.length >= 3}
                                    style={{ display: "none" }}
                                />

                                {/* Botón personalizado */}
                                <button
                                    type="button"
                                    onClick={handleClick}
                                    disabled={newReview.fotos.length >= 3}
                                    className="upload-btn"
                                >
                                    📷 Subir fotos ({newReview.fotos.length}/3)
                                </button>
                                <div className="photo-previews">
                                    {newReview.fotos.map((foto, index) => (
                                        <div className="preview-item" key={index}>
                                            <img src={foto.preview} alt={`preview-${index}`} />
                                            <button
                                                type="button"
                                                className="remove-photo"
                                                onClick={() => removePhoto(index)}
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="modal-actions">
                                <button type="button" onClick={() => setShowModal(false)}>
                                    Cancelar
                                </button>
                                <button type="submit" className="btn-submit">
                                    Enviar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
