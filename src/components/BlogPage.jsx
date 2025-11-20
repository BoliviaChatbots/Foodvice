import React, { useState, useEffect } from "react";
import "./BlogPage.css";
import questionsData from "../data/questions.json";
import BlogModals from "./BlogModals"; // ⬅️ IMPORTACIÓN DE LOS MODALES

export default function BlogPage() {
    const [questions, setQuestions] = useState([]);
    const [faq, setFaq] = useState([]);

    const [showClientQuestions, setShowClientQuestions] = useState(false);
    const [openQuestions, setOpenQuestions] = useState({});
    const [openFaq, setOpenFaq] = useState({});

    // Estados para abrir los modales
    const [openModal, setOpenModal] = useState(false);
    const [modalType, setModalType] = useState(""); // "create" | "answer"
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    useEffect(() => {
        setQuestions(questionsData.questions);
        setFaq(questionsData.faq);
    }, []);

    const toggleClientAccordion = () => {
        setShowClientQuestions(!showClientQuestions);
    };

    const toggleQuestion = (id) => {
        setOpenQuestions((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const toggleFaq = (id) => {
        setOpenFaq((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    // Abrir modal Crear Pregunta
    const openCreateModal = () => {
        setModalType("create");
        setOpenModal(true);
    };

    // Abrir modal Responder Pregunta
    const openAnswerModal = (q) => {
        setSelectedQuestion(q);
        setModalType("answer");
        setOpenModal(true);
    };

    // Cerrar cualquier modal
    const closeModal = () => {
        setOpenModal(false);
        setSelectedQuestion(null);
        setModalType("");
    };

    return (
        <div className="blog-wrapper container">

            {/* HEADER */}
            <div className="blog-header">
                <h2>Blog de Clientes</h2>
                <p>Busca información, Responde preguntas o Escribe tus dudas.</p>
            </div>

            <div className="blog-layout">

                {/* COLUMNA IZQUIERDA */}
                <div className="blog-left">

                    {/* BUSCADOR */}
                    <span className="points-label">
                        Gana puntos por tus respuestas y obtén descuentos.
                    </span>

                    <div className="search-box">
                        <input type="text" placeholder="Buscar preguntas..." />
                        <button className="btn-search">
                            <i className="bx bx-search"></i>
                            <span className="search-text">Buscar</span>
                        </button>
                    </div>

                    {/* CTA */}
                    <span className="points-label">
                        Gana puntos por tus respuestas y obtén descuentos.
                    </span>

                    <div className="group-btn-blog">
                        {/* BOTÓN CREAR PREGUNTA */}
                        <button
                            className="btn-create-question"
                            onClick={openCreateModal}
                        >
                            <i className="bx bx-edit"></i> Crear pregunta
                        </button>

                        <button
                            className="btn-client-questions"
                            onClick={toggleClientAccordion}
                        >
                            <span>Preguntas de Clientes</span>
                            <i
                                className={`bx ${showClientQuestions ? "bx-minus" : "bx-plus"}`}
                            ></i>
                        </button>
                    </div>

                    {/* LISTADO DE PREGUNTAS */}
                    {showClientQuestions && (
                        <div className="questions-list">
                            {questions.map((q) => (
                                <div
                                    key={q.id}
                                    className="question-item"
                                    onClick={() => toggleQuestion(q.id)}
                                >
                                    <div className="question-header">
                                        <h4>{q.title}</h4>
                                        <i
                                            className={`bx bx-chevron-${openQuestions[q.id] ? "up" : "down"
                                                }`}
                                        ></i>
                                    </div>

                                    {openQuestions[q.id] && (
                                        <div className="question-body">
                                            <p>{q.body}</p>

                                            <p className="date">
                                                Publicado:{" "}
                                                {new Date(q.createdAt).toLocaleDateString()}
                                            </p>

                                            {/* RESPUESTAS */}
                                            {q.answers.length > 0 ? (
                                                <div className="answers-block">
                                                    {q.answers.map((a) => (
                                                        <div key={a.id} className="answer-item">
                                                            <strong>{a.author}</strong>
                                                            <p>{a.body}</p>

                                                            {/* FOTOS */}
                                                            <div className="answer-photos">
                                                                {a.photos.map((ph, idx) => (
                                                                    <img
                                                                        key={idx}
                                                                        src={ph}
                                                                        alt="foto respuesta"
                                                                    />
                                                                ))}
                                                            </div>

                                                            <small>
                                                                {new Date(a.createdAt).toLocaleDateString()}
                                                            </small>

                                                            {/* BOTÓN RESPONDER */}
                                                            <button
                                                                className="btn-answer"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    openAnswerModal(q);
                                                                }}
                                                            >
                                                                Responder
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <span className="no-answers">Sin respuestas aún</span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* COLUMNA DERECHA (FAQ) */}
                <div className="blog-right">
                    <h3>Preguntas frecuentes</h3>

                    <div className="faq-list">
                        {faq.map((f) => (
                            <div key={f.id} className="faq-item">
                                <div
                                    className="faq-header"
                                    onClick={() => toggleFaq(f.id)}
                                >
                                    <p>{f.question}</p>
                                    <i
                                        className={`bx bx-chevron-${openFaq[f.id] ? "up" : "down"
                                            }`}
                                    ></i>
                                </div>

                                {openFaq[f.id] && (
                                    <div className="faq-answer">{f.answer}</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ⬇️ MODALES AQUÍ — YA NO ESTÁN INCLUIDOS EN ESTE ARCHIVO */}
            {openModal && (
                <BlogModals
                    type={modalType}         // create | answer
                    question={selectedQuestion}
                    onClose={closeModal}
                />
            )}

        </div>
    );
}
