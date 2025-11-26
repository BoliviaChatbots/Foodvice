import React, { useState, useEffect } from "react";
import "./BlogPage.css";
import questionsData from "../data/questions.json";
import BlogModals from "./BlogModals";
import { useLoginStore } from "../store/useLoginStore";


const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

export default function BlogPage() {
    const { user, openLogin } = useLoginStore();

    const [questions, setQuestions] = useState([]);
    const [faq, setFaq] = useState([]);
    const [visibleCount, setVisibleCount] = useState(10);

    const [openAnswers, setOpenAnswers] = useState({});
    const [answersVisibleCount, setAnswersVisibleCount] = useState({});
    const [openFaq, setOpenFaq] = useState({});

    const [openModal, setOpenModal] = useState(false);
    const [modalType, setModalType] = useState("");
    const [selectedQuestion, setSelectedQuestion] = useState({ answers: [] });
    const [usersMap, setUsersMap] = useState({});

    // Estado de búsqueda
    const [search, setSearch] = useState("");

    // ================================
    // CARGAR PREGUNTAS
    // ================================
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await fetch("http://192.168.0.16:8000/api/questions/");
                const data = await res.json();

                const questionsWithAnswers = data.map(q => ({ ...q, answers: q.answers || [] }));
                setQuestions(questionsWithAnswers);

                const userIds = Array.from(
                    new Set(
                        questionsWithAnswers.flatMap(q =>
                            q.answers.map(a => a.user)
                        )
                    )
                );

                const usersData = {};
                await Promise.all(
                    userIds.map(async (id) => {
                        try {
                            const resUser = await fetch(`http://192.168.0.16:8000/api/user/${id}/`);
                            const dataUser = await resUser.json();
                            usersData[id] = dataUser;
                        } catch { /* */ }
                    })
                );
                setUsersMap(usersData);

            } catch (err) {
                console.error("Error cargando preguntas:", err);
            }
        };

        fetchQuestions();
        setFaq(JSON.parse(JSON.stringify(questionsData.faq || [])));
    }, []);

    // ======================================
    // BÚSQUEDA AVANZADA (PREGUNTAS + RESPUESTAS)
    // ======================================

    const highlightText = (text, query) => {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, "gi");
        return text.split(regex).map((part, i) =>
            regex.test(part) ? <mark key={i}>{part}</mark> : part
        );
    };
    const filteredQuestions = questions.filter(q => {

        const searchText = search.toLowerCase().trim();
        if (!searchText) return true;

        const userName =
            usersMap[q.user]?.first_name ||
            usersMap[q.user]?.username ||
            "";

        const questionText = `${q.title} ${q.body} ${userName}`.toLowerCase();

        if (questionText.includes(searchText)) return true;

        const matchesInAnswers = (q.answers || []).some(a => {

            const answerUserName =
                usersMap[a.user]?.first_name ||
                usersMap[a.user]?.username ||
                "";

            const answerText = `${a.body} ${answerUserName}`.toLowerCase();

            return answerText.includes(searchText);
        });

        return matchesInAnswers;
    });

    // ================================
    // ABRIR MODALES
    // ================================
    const openCreateModal = () => {
        if (!user) return openLogin();
        setModalType("create");
        setOpenModal(true);
    };

    const openAnswerModal = (q, e) => {
        if (e) e.stopPropagation();
        if (!user) return openLogin();

        const sorted = [...(q.answers || [])]
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        setSelectedQuestion({ ...q, answers: sorted });
        setModalType("answer");
        setOpenModal(true);
    };

    const closeModal = () => {
        setOpenModal(false);
        setModalType("");
        setSelectedQuestion({ answers: [] });
    };

    // ================================
    // MOSTRAR MÁS PREGUNTAS
    // ================================
    const loadMoreQuestions = () => {
        setVisibleCount(prev => prev + 10);
    };

    // ================================
    // RESPUESTAS (5 EN 5)
    // ================================
    const toggleAnswers = (qId) => {
        setOpenAnswers(prev => ({
            ...prev,
            [qId]: !prev[qId]
        }));

        if (!openAnswers[qId]) {
            setAnswersVisibleCount(prev => ({ ...prev, [qId]: 5 }));
        }
    };

    const loadMoreAnswers = (qId) => {
        setAnswersVisibleCount(prev => ({
            ...prev,
            [qId]: (prev[qId] || 5) + 5
        }));
    };

    // ================================
    // CREAR PREGUNTA
    // ================================
    const handleCreateQuestion = async (payload) => {
        try {
            const bodyToSend = {
                user: user?.id || 9,
                title: payload.title,
                body: payload.body,
                is_resolved: true
            };

            const res = await fetch("http://192.168.0.16:8000/api/questions/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bodyToSend)
            });

            if (!res.ok) throw new Error("Error al crear pregunta");

            const createdQuestion = await res.json();
            createdQuestion.answers = [];

            setQuestions(prev => [createdQuestion, ...prev]);
            closeModal();

        } catch (err) { console.error(err); }
    };

    // ================================
    // AGREGAR RESPUESTA
    // ================================
    const handleAddAnswer = async (questionId, answerPayload, files = []) => {
        try {
            const formData = new FormData();
            formData.append("user", user?.id || 9);
            formData.append("question", questionId);
            formData.append("body", answerPayload.body);
            formData.append("accepted", true);

            const resAnswer = await fetch("http://192.168.0.16:8000/api/answers/", {
                method: "POST",
                body: formData
            });

            if (!resAnswer.ok) throw new Error("Error al crear respuesta");

            const createdAnswer = await resAnswer.json();

            let imagesData = [];
            if (files.length > 0) {
                imagesData = await Promise.all(files.map(async (file) => {
                    const imgForm = new FormData();
                    imgForm.append("image", file);
                    imgForm.append("alt_text", file.name || "Imagen");
                    imgForm.append("answer", createdAnswer.id);

                    const resImg = await fetch("http://192.168.0.16:8000/api/answer-images/", {
                        method: "POST",
                        body: imgForm
                    });

                    if (!resImg.ok) throw new Error("Error al subir imagen");
                    return await resImg.json();
                }));
            }

            createdAnswer.images = imagesData;

            setQuestions(prev =>
                prev.map(q =>
                    q.id === questionId
                        ? { ...q, answers: [createdAnswer, ...(q.answers || [])] }
                        : q
                )
            );

            if (selectedQuestion.id === questionId) {
                setSelectedQuestion(prev => ({
                    ...prev,
                    answers: [createdAnswer, ...(prev.answers || [])]
                }));
            }

            try {
                const resUser = await fetch(`http://192.168.0.16:8000/api/user/${createdAnswer.user}/`);
                const userData = await resUser.json();
                setUsersMap(prev => ({ ...prev, [userData.id]: userData }));
            } catch {/* */ }

            closeModal();

        } catch (err) { console.error(err); }
    };

    return (
        <div className="blog-wrapper container">
            <div className="blog-header">
                <h2>Blog de Clientes</h2>
                <p>Intercambia información con clientes de nuestra comunidad.</p>
            </div>

            <div className="blog-layout">

                {/* ======================= */}
                {/* COLUMNA IZQUIERDA */}
                {/* ======================= */}
                <div className="blog-left">

                    <span className="points-label">
                        Busca datos en las preguntas y respuestas de la comunidad.
                    </span>

                    <div className="search-blog">
                        <input
                            type="text"
                            placeholder="Buscar preguntas..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <div className="btn-search-blog">
                            <span className="btn-search-txt">Buscar</span>
                        </div>
                    </div>

                    <span className="points-label">
                        Gana puntos por tus respuestas y obtén descuentos.
                    </span>

                    <div className="group-btn-blog">
                        <div className="btn-search-blog" onClick={openCreateModal}>
                            <span className="btn-search-txt">Nueva pregunta</span>
                        </div>
                    </div>

                    {/* ========================================= */}
                    {/* LISTADO DE PREGUNTAS */}
                    {/* ========================================= */}
                    <div className="questions-list">

                        {filteredQuestions.slice(0, visibleCount).map(q => {

                            const totalAnswers = q.answers?.length || 0;

                            const sortedAnswers = [...(q.answers || [])]
                                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

                            const visibleAnswers = sortedAnswers.slice(
                                0,
                                answersVisibleCount[q.id] || 0
                            );

                            const userName =
                                usersMap[q.user]?.first_name ||
                                usersMap[q.user]?.username ||
                                "Anónimo";

                            return (
                                <div key={q.id} className="question-item">

                                    <div className="question-header">
                                        <h4>
                                            <span style={{ fontWeight: 500, fontStyle: "italic", opacity: 0.8 }}>
                                                {highlightText(userName, search)}
                                            </span>: {highlightText(q.title, search)}
                                        </h4>

                                        <div className="btn-search-blog" onClick={() => toggleAnswers(q.id)}>
                                            <span className="btn-search-txt">Ver respuestas ({totalAnswers})</span>
                                        </div>

                                        {/* <button
                                            className="submit-btn"
                                            onClick={() => toggleAnswers(q.id)}
                                        >
                                            Ver respuestas ({totalAnswers})
                                        </button> */}
                                    </div>

                                    <p>{highlightText(q.body, search)}</p>
                                    <p className="date">Publicado: {formatDate(q.created_at)}</p>

                                    {openAnswers[q.id] && (
                                        <div className="question-body">

                                            <div className="btn-search-blog" onClick={(e) => openAnswerModal(q, e)}>
                                                <span className="btn-search-txt">Agregar Respuesta</span>
                                            </div>

                                            {/* <button
                                                className="submit-btn"
                                                onClick={(e) => openAnswerModal(q, e)}
                                            >
                                                Agregar Respuesta
                                            </button> */}

                                            <div className="answers-block">

                                                {visibleAnswers.length > 0 ? (
                                                    visibleAnswers.map(a => (
                                                        <div key={a.id} className="answer-item">

                                                            <div>
                                                                <span style={{ fontWeight: 500, fontStyle: "italic", opacity: 0.8 }}>
                                                                    {usersMap[a.user]?.first_name ||
                                                                        usersMap[a.user]?.username ||
                                                                        "Anónimo"}
                                                                </span>: {highlightText(a.body, search)}
                                                            </div>


                                                            {/* <span style={{ fontWeight: 500, fontStyle: "italic", opacity: 0.8 }}>
                                                                {usersMap[a.user]?.first_name ||
                                                                    usersMap[a.user]?.username ||
                                                                    "Anónimo"}
                                                            </span>
                                                            <p>{highlightText(a.body, search)}</p> */}

                                                            <div className="answer-photos">
                                                                {(a.images || []).map((img, index) => (
                                                                    <img
                                                                        key={img.id || index}
                                                                        src={img.image}
                                                                        alt={img.alt_text}
                                                                    />
                                                                ))}
                                                            </div>

                                                            <small>{formatDate(a.created_at)}</small>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <span className="no-answers">Sin respuestas aún</span>
                                                )}

                                                {visibleAnswers.length < totalAnswers && (
                                                    <div
                                                        className="btn-load-more-answers"
                                                        onClick={() => loadMoreAnswers(q.id)}
                                                    >
                                                        Ver más...
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        {visibleCount < filteredQuestions.length && (
                            <div className="btn-load-more" onClick={loadMoreQuestions}>
                                Mostrar más preguntas
                            </div>
                        )}
                    </div>
                </div>

                {/* ======================= */}
                {/* COLUMNA DERECHA – FAQ */}
                {/* ======================= */}
                <div className="blog-right">
                    <h3>Preguntas frecuentes</h3>
                    <div className="faq-list">
                        {faq.map(f => (
                            <div key={f.id} className="faq-item">
                                <div className="faq-header" onClick={() => setOpenFaq(prev => ({
                                    ...prev,
                                    [f.id]: !prev[f.id]
                                }))}>
                                    <p>{f.question}</p>
                                </div>

                                {openFaq[f.id] && (
                                    <div className="faq-answer">{f.answer}</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {openModal && (
                <BlogModals
                    type={modalType}
                    question={selectedQuestion}
                    user={user}
                    onClose={closeModal}
                    onCreateQuestion={handleCreateQuestion}
                    onAddAnswer={(payload, files) =>
                        selectedQuestion && handleAddAnswer(selectedQuestion.id, payload, files)
                    }
                />
            )}
        </div>
    );
}
