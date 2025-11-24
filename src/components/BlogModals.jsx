import React, { useEffect, useRef, useState } from "react";
import "./BlogModals.css";

export default function BlogModals({ type, question, user, onClose, onCreateQuestion, onAddAnswer }) {
    const [answerPhotos, setAnswerPhotos] = useState([]);
    const [newQuestion, setNewQuestion] = useState({ title: "", body: "", username: "", email: "" });
    const [newAnswer, setNewAnswer] = useState({ body: "", author: "" });
    const fileInputFoto = useRef(null);

    useEffect(() => {
        if (user && type === "create") setNewQuestion({ title: "", body: "", username: user.first_name || user.name || "", email: user.email || "" });
        else if (type === "create") setNewQuestion({ title: "", body: "", username: "", email: "" });
        if (user && type === "answer") setNewAnswer({ body: "", author: user.first_name || user.name || "" });
        else if (type === "answer") setNewAnswer({ body: "", author: "" });
    }, [user, type]);

    useEffect(() => () => { answerPhotos.forEach(p => URL.revokeObjectURL(p.preview)); }, [answerPhotos]);

    const handleFileInput = e => {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;
        const allowed = files.slice(0, 3 - answerPhotos.length);
        const withPreview = allowed.map(file => ({ file, preview: URL.createObjectURL(file) }));
        setAnswerPhotos(prev => [...prev, ...withPreview]);
        e.target.value = "";
    };

    const removePhotoAtIndex = index => {
        setAnswerPhotos(prev => {
            const item = prev[index];
            if (item) URL.revokeObjectURL(item.preview);
            return prev.filter((_, i) => i !== index);
        });
        if (fileInputFoto.current) fileInputFoto.current.value = "";
    };

    const submitQuestion = () => {
        if (!newQuestion.title.trim() || !newQuestion.body.trim()) return;
        onCreateQuestion({ title: newQuestion.title.trim(), body: newQuestion.body.trim(), username: newQuestion.username, email: newQuestion.email });
        setNewQuestion({ title: "", body: "", username: user?.first_name || "", email: user?.email || "" });
        onClose();
    };

    const submitAnswer = () => {
        if (!newAnswer.body.trim()) return;
        onAddAnswer({ body: newAnswer.body.trim(), author: user?.first_name || user?.name || "Anónimo" }, answerPhotos.map(p => p.file));
        answerPhotos.forEach(p => URL.revokeObjectURL(p.preview));
        setAnswerPhotos([]);
        if (fileInputFoto.current) fileInputFoto.current.value = "";
        setNewAnswer({ body: "", author: user?.first_name || user?.name || "" });
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-card" onClick={e => e.stopPropagation()}>
                {type === "create" && (
                    <>
                        <h3 className="modal-title">Crear nueva pregunta</h3>
                        <label>Título</label>
                        <input type="text" value={newQuestion.title} onChange={e => setNewQuestion({ ...newQuestion, title: e.target.value })} placeholder="Escribe un título" />
                        <label>Pregunta</label>
                        <textarea value={newQuestion.body} onChange={e => setNewQuestion({ ...newQuestion, body: e.target.value })} placeholder="Describe tu pregunta" />
                        <label>Tu nombre</label>
                        <input type="text" value={newQuestion.username} readOnly className="readonly-input" />
                        <label>Correo</label>
                        <input type="email" value={newQuestion.email} readOnly className="readonly-input" />
                        <div className="modal-actions">
                            <button className="cancel-btn" onClick={() => { setNewQuestion({ title: "", body: "", username: user?.first_name || "", email: user?.email || "" }); onClose(); }}>Cancelar</button>
                            <button className="submit-btn" onClick={submitQuestion}>Publicar</button>
                        </div>
                    </>
                )}
                {type === "answer" && (
                    <>
                        <h3 className="modal-title">Responder pregunta</h3>
                        {question && <div className="selected-question-box"><h4>{question.title}</h4><p>{question.body}</p></div>}
                        <label>Tu nombre</label>
                        <input type="text" value={newAnswer.author} readOnly className="readonly-input" />
                        <label>Respuesta</label>
                        <textarea value={newAnswer.body} onChange={e => setNewAnswer({ ...newAnswer, body: e.target.value })} placeholder="Escribe tu respuesta aquí" />
                        <label>Fotos (máximo 3):</label>
                        <div className="photo-upload">
                            <input ref={fileInputFoto} type="file" accept="image/*" multiple style={{ display: "none" }} disabled={answerPhotos.length >= 3} onChange={handleFileInput} />
                            <button type="button" className="upload-btn" onClick={() => fileInputFoto.current && fileInputFoto.current.click()} disabled={answerPhotos.length >= 3}>
                                📷 Subir fotos ({answerPhotos.length}/3)
                            </button>
                            <div className="photo-previews">
                                {answerPhotos.map((item, index) => (
                                    <div className="preview-item" key={item.preview}>
                                        <img src={item.preview} alt={`preview-${index}`} />
                                        <button type="button" className="remove-photo" onClick={() => removePhotoAtIndex(index)}>✕</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="modal-actions">
                            <button className="cancel-btn" onClick={() => { answerPhotos.forEach(p => URL.revokeObjectURL(p.preview)); setAnswerPhotos([]); setNewAnswer({ body: "", author: user?.first_name || "" }); if (fileInputFoto.current) fileInputFoto.current.value = ""; onClose(); }}>Cancelar</button>
                            <button className="submit-btn" onClick={submitAnswer}>Enviar respuesta</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
