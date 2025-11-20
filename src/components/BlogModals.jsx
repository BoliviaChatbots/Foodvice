// Contiene ambos modales: Crear Pregunta y Responder Pregunta
import React, { useState } from "react";
import "./BlogModals.css";

export default function BlogModals() {
    const [showQModal, setShowQModal] = useState(false);
    const [showAnswerModal, setShowAnswerModal] = useState(false);
    const [answerPhotos, setAnswerPhotos] = useState([]);

    const [newQuestion, setNewQuestion] = useState({
        title: "",
        body: "",
        username: "",
        email: "",
    });

    const [newAnswer, setNewAnswer] = useState({
        body: "",
        author: "",
    });

    const handleQChange = (e) => {
        const { name, value } = e.target;
        setNewQuestion({ ...newQuestion, [name]: value });
    };

    const handleAnswerChange = (e) => {
        const { name, value } = e.target;
        setNewAnswer({ ...newAnswer, [name]: value });
    };

    const handleAnswerPhotos = (e) => {
        const files = Array.from(e.target.files).slice(0, 3);
        setAnswerPhotos(files);
    };

    const submitQuestion = () => {
        console.log("Nueva pregunta registrada:", newQuestion);
        setShowQModal(false);
    };

    const submitAnswer = () => {
        console.log("Nueva respuesta registrada:", newAnswer, answerPhotos);
        setShowAnswerModal(false);
    };

    return (
        <>
            {/* Botones de prueba para abrir modales */}
            <button className="open-btn" onClick={() => setShowQModal(true)}>Crear Pregunta</button>
            <button className="open-btn" onClick={() => setShowAnswerModal(true)}>Responder</button>

            {/* Modal Crear Pregunta */}
            {showQModal && (
                <div className="modal-overlay" onClick={() => setShowQModal(false)}>
                    <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                        <h3 className="modal-title">Crear nueva pregunta</h3>

                        <label>Título</label>
                        <input
                            type="text"
                            name="title"
                            value={newQuestion.title}
                            onChange={handleQChange}
                            placeholder="Escribe un título"
                        />

                        <label>Pregunta</label>
                        <textarea
                            name="body"
                            value={newQuestion.body}
                            onChange={handleQChange}
                            placeholder="Describe tu pregunta"
                        ></textarea>

                        <label>Tu nombre</label>
                        <input
                            type="text"
                            name="username"
                            value={newQuestion.username}
                            onChange={handleQChange}
                            placeholder="Nombre completo"
                        />

                        <label>Correo</label>
                        <input
                            type="email"
                            name="email"
                            value={newQuestion.email}
                            onChange={handleQChange}
                            placeholder="correo@ejemplo.com"
                        />

                        <div className="modal-actions">
                            <button className="cancel-btn" onClick={() => setShowQModal(false)}>Cancelar</button>
                            <button className="submit-btn" onClick={submitQuestion}>Publicar</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Responder */}
            {showAnswerModal && (
                <div className="modal-overlay" onClick={() => setShowAnswerModal(false)}>
                    <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                        <h3 className="modal-title">Responder pregunta</h3>

                        <label>Tu nombre</label>
                        <input
                            name="author"
                            type="text"
                            value={newAnswer.author}
                            onChange={handleAnswerChange}
                        />

                        <label>Respuesta</label>
                        <textarea
                            name="body"
                            value={newAnswer.body}
                            onChange={handleAnswerChange}
                        ></textarea>

                        <label>Agregar fotos (máx 3)</label>
                        <input type="file" accept="image/*" multiple onChange={handleAnswerPhotos} />

                        {answerPhotos.length > 0 && (
                            <div className="preview-row">
                                {answerPhotos.map((file, i) => (
                                    <img
                                        key={i}
                                        src={URL.createObjectURL(file)}
                                        alt="preview"
                                        className="preview-img"
                                    />
                                ))}
                            </div>
                        )}

                        <div className="modal-actions">
                            <button className="cancel-btn" onClick={() => setShowAnswerModal(false)}>Cancelar</button>
                            <button className="submit-btn" onClick={submitAnswer}>Enviar respuesta</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}