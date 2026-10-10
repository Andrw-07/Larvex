
/* =====================================
   LARVEX - SCRIPT PRINCIPAL
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    console.log("Larvex iniciado correctamente");

});



// ========================================
// CARRUSEL
// ========================================

const track = document.querySelector(".carousel-track");

if (track) {

    const cards = document.querySelectorAll(".info-card");
    const dots = document.querySelectorAll(".dot");

    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");

    let currentSlide = 0;

    function showSlide(index) {

        if (index < 0) {
            index = cards.length - 1;
        }

        if (index >= cards.length) {
            index = 0;
        }

        currentSlide = index;

        track.style.transform =
            `translateX(-${currentSlide * 100}%)`;

        dots.forEach((dot, i) => {
            dot.classList.toggle(
                "active",
                i === currentSlide
            );
        });
    }

    nextBtn.addEventListener("click", () => {
        showSlide(currentSlide + 1);
    });

    prevBtn.addEventListener("click", () => {
        showSlide(currentSlide - 1);
    });

    dots.forEach((dot, index) => {

        dot.addEventListener("click", () => {
            showSlide(index);
        });

    });

}


// ========================================
// REPORTES
// ========================================

function enviarReporte() {

    const direccion =
        document.getElementById("dir").value.trim();

    const tipo =
        document.getElementById("tipo").value;

    const descripcion =
        document.getElementById("desc").value.trim();

    const mensaje =
        document.getElementById("success-msg");


    if (
        direccion === "" ||
        tipo === "" ||
        descripcion === ""
    ) {

        mensaje.style.display = "block";

        mensaje.textContent =
            "⚠️ Completa todos los campos antes de enviar.";

        mensaje.style.background =
            "#fff4e5";

        mensaje.style.color =
            "#9a5b00";

        mensaje.style.borderColor =
            "#f3d39d";

        return;
    }


    const lista =
        document.getElementById("lista-reportes");


    const nuevoReporte =
        document.createElement("div");


    nuevoReporte.className =
        "reporte-item";


    nuevoReporte.innerHTML = `
        <div class="reporte-dot"></div>

        <div class="reporte-text">

            <strong>
                ${direccion}
            </strong>

            <span>
                ${descripcion}
            </span>

        </div>
    `;


    lista.prepend(nuevoReporte);


    mensaje.style.display =
        "block";

    mensaje.textContent =
        "✅ ¡Reporte enviado correctamente!";

    mensaje.style.background =
        "#e8f8ee";

    mensaje.style.color =
        "#13703f";

    mensaje.style.borderColor =
        "#bde5ca";


    document.getElementById(
        "dir"
    ).value = "";


    document.getElementById(
        "tipo"
    ).value = "";


    document.getElementById(
        "desc"
    ).value = "";


    setTimeout(() => {

        mensaje.style.display =
            "none";

    }, 3500);

}

// ========================================
// JUEGO LARVEX
// ========================================

const preguntas = [

    {
        p: "¿Cuál de estos objetos puede convertirse en criadero del mosquito Aedes aegypti?",
        ops: [
            "Un balde con agua estancada",
            "Una bolsa de plástico seca",
            "Un libro mojado",
            "Una maceta sin agua"
        ],
        r: 0,
        explicacion:
            "Los recipientes que acumulan agua pueden convertirse en lugares donde el mosquito deposita sus huevos."
    },

    {
        p: "¿Cómo se llama el mosquito transmisor del dengue?",
        ops: [
            "Anopheles gambiae",
            "Culex pipiens",
            "Aedes aegypti",
            "Simulium damnosum"
        ],
        r: 2,
        explicacion:
            "El Aedes aegypti es el principal mosquito transmisor del dengue."
    },

    {
        p: "¿Qué fenómeno climático intensifica las lluvias en la costa peruana y favorece la acumulación de agua?",
        ops: [
            "La Niña",
            "El Fenómeno El Niño",
            "El cambio de estación",
            "La corriente de Humboldt"
        ],
        r: 1,
        explicacion:
            "El Fenómeno El Niño puede producir lluvias intensas e inundaciones que dejan agua acumulada."
    },

    {
        p: "¿Cuánto puede tardar aproximadamente el Aedes aegypti en pasar de huevo a mosquito adulto en condiciones favorables?",
        ops: [
            "Entre 1 y 2 días",
            "Aproximadamente una semana",
            "Entre 30 y 40 días",
            "Más de 3 meses"
        ],
        r: 1,
        explicacion:
            "En condiciones ambientales favorables, el ciclo del mosquito puede completarse aproximadamente en una semana."
    },

    {
        p: "¿Cuál de estas acciones ayuda a prevenir la aparición de criaderos?",
        ops: [
            "Dejar los baldes afuera bajo la lluvia",
            "Tapar correctamente los recipientes de agua",
            "Acumular llantas en el patio",
            "No limpiar las canaletas"
        ],
        r: 1,
        explicacion:
            "Los depósitos de agua deben permanecer correctamente tapados para impedir que los mosquitos depositen huevos."
    },

    {
        p: "¿Cuál de estos puede ser un síntoma frecuente del dengue?",
        ops: [
            "Fiebre acompañada de dolor de cabeza y dolores corporales",
            "Únicamente tos seca",
            "Dolor leve de oído",
            "Solamente picazón en los ojos"
        ],
        r: 0,
        explicacion:
            "El dengue puede producir fiebre, dolor de cabeza, dolores musculares y articulares, entre otros síntomas."
    },

    {
        p: "¿Dónde puede reproducirse el mosquito transmisor del dengue?",
        ops: [
            "Únicamente en agua de mar",
            "En recipientes con agua acumulada",
            "Únicamente en ríos",
            "Solamente en piscinas grandes"
        ],
        r: 1,
        explicacion:
            "El Aedes aegypti aprovecha pequeños recipientes y objetos capaces de almacenar agua."
    },

    {
        p: "Si encuentras un recipiente con agua estancada cerca de tu vivienda, ¿qué deberías hacer?",
        ops: [
            "Ignorarlo",
            "Vaciarlo, limpiarlo o reportarlo si no puedes eliminar el riesgo",
            "Esperar varias semanas",
            "Agregar más agua"
        ],
        r: 1,
        explicacion:
            "Eliminar el agua acumulada ayuda a interrumpir el ciclo de reproducción del mosquito."
    }

];


let preguntaActual = 0;
let puntos = 0;
let correctas = 0;
let respondido = false;


// ========================================
// INICIAR JUEGO
// ========================================

function iniciarJuego() {

    preguntaActual = 0;
    puntos = 0;
    correctas = 0;
    respondido = false;

    document.getElementById("game-intro").style.display = "none";
    document.getElementById("game-fin").style.display = "none";
    document.getElementById("game-play").style.display = "block";

    document.getElementById("puntos").textContent = 0;

    mostrarPregunta();
}


// ========================================
// MOSTRAR PREGUNTA
// ========================================

function mostrarPregunta() {

    respondido = false;

    const q = preguntas[preguntaActual];

    const numPregunta =
        document.getElementById("num-pregunta");

    const preguntaTexto =
        document.getElementById("pregunta-texto");

    const opcionesContainer =
        document.getElementById("opciones-container");

    const feedback =
        document.getElementById("feedback");

    const btnNext =
        document.getElementById("btn-next");

    const questionLabel =
        document.getElementById("question-label");


    numPregunta.textContent =
        preguntaActual + 1;

    questionLabel.textContent =
        `Pregunta ${preguntaActual + 1} de ${preguntas.length}`;

    preguntaTexto.textContent =
        q.p;


    // Reiniciar feedback

    feedback.innerHTML = "";
    feedback.className = "feedback";

    btnNext.style.display = "none";


    // Actualizar barra

    actualizarProgreso();


    // Crear respuestas

    opcionesContainer.innerHTML = "";


    q.ops.forEach((opcion, indice) => {

        const boton =
            document.createElement("button");

        boton.className =
            "opcion-btn";

        boton.innerHTML = `
            <span class="option-letter">
                ${String.fromCharCode(65 + indice)}
            </span>

            <span>
                ${opcion}
            </span>
        `;

        boton.addEventListener(
            "click",
            () => responder(indice, boton)
        );

        opcionesContainer.appendChild(boton);

    });

}


// ========================================
// RESPONDER
// ========================================

function responder(indice, botonSeleccionado) {

    if (respondido) {
        return;
    }

    respondido = true;

    const q =
        preguntas[preguntaActual];

    const botones =
        document.querySelectorAll(".opcion-btn");

    const feedback =
        document.getElementById("feedback");

    const btnNext =
        document.getElementById("btn-next");


    // Desactivar respuestas

    botones.forEach(boton => {
        boton.disabled = true;
    });


    if (indice === q.r) {

        botonSeleccionado.classList.add(
            "correcta"
        );

        puntos += 100;
        correctas++;

        document.getElementById(
            "puntos"
        ).textContent = puntos;


        feedback.innerHTML = `
            <strong>✅ ¡Correcto!</strong>
            <span>+100 puntos</span>
            <p>${q.explicacion}</p>
        `;

        feedback.className =
            "feedback bien";

    } else {

        botonSeleccionado.classList.add(
            "incorrecta"
        );

        botones[q.r].classList.add(
            "correcta"
        );


        feedback.innerHTML = `
            <strong>❌ No es correcto.</strong>
            <p>
                La respuesta correcta es:
                <b>${q.ops[q.r]}</b>.
            </p>
            <p>${q.explicacion}</p>
        `;

        feedback.className =
            "feedback mal";

    }


    btnNext.style.display =
        "inline-flex";

}


// ========================================
// SIGUIENTE
// ========================================

function siguientePregunta() {

    preguntaActual++;

    if (preguntaActual < preguntas.length) {

        mostrarPregunta();

    } else {

        mostrarFin();

    }

}


// ========================================
// PROGRESO
// ========================================

function actualizarProgreso() {

    const porcentaje =
        (preguntaActual / preguntas.length) * 100;

    document.getElementById(
        "progress-bar"
    ).style.width =
        porcentaje + "%";

}


// ========================================
// FINAL
// ========================================

function mostrarFin() {

    document.getElementById(
        "game-play"
    ).style.display =
        "none";

    document.getElementById(
        "game-fin"
    ).style.display =
        "block";


    document.getElementById(
        "progress-bar"
    ).style.width =
        "100%";


    document.getElementById(
        "puntaje-fin"
    ).textContent =
        puntos;


    document.getElementById(
        "resultado-correctas"
    ).textContent =
        `${correctas} de ${preguntas.length} respuestas correctas`;


    const porcentaje =
        correctas / preguntas.length;


    let emoji;
    let titulo;
    let comentario;


    if (porcentaje >= 0.875) {

        emoji = "🏆";

        titulo =
            "¡Experto Larvex!";

        comentario =
            "Reconoces muy bien los principales riesgos y las medidas para prevenir los criaderos.";

    }

    else if (porcentaje >= 0.625) {

        emoji = "⭐";

        titulo =
            "¡Muy buen trabajo!";

        comentario =
            "Tienes buenos conocimientos. Repasa algunos conceptos para convertirte en un experto Larvex.";

    }

    else if (porcentaje >= 0.375) {

        emoji = "💪";

        titulo =
            "¡Vas por buen camino!";

        comentario =
            "Ya conoces algunas medidas importantes. Revisa la sección de información y vuelve a intentarlo.";

    }

    else {

        emoji = "📚";

        titulo =
            "¡Sigue aprendiendo!";

        comentario =
            "Revisa la información sobre el dengue y sus criaderos. Después vuelve a jugar y supera tu puntaje.";

    }


    document.getElementById(
        "emoji-fin"
    ).textContent =
        emoji;


    document.getElementById(
        "titulo-fin"
    ).textContent =
        titulo;


    document.getElementById(
        "comentario-fin"
    ).textContent =
        comentario;

}


// ========================================
// REINICIAR
// ========================================

function reiniciarJuego() {

    iniciarJuego();

}


// ========================================
// ANIMACIÓN AL HACER SCROLL
// ========================================

const elementosReveal =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.15
        }
    );


elementosReveal.forEach(elemento => {

    revealObserver.observe(elemento);

});


// ========================================
// MOSTRAR INFORMACIÓN EXTRA
// ========================================

function toggleInfo(boton) {

    const contenido =
        boton.nextElementSibling;

    const abierto =
        contenido.classList.contains(
            "open"
        );


    contenido.classList.toggle(
        "open"
    );


    boton.classList.toggle(
        "open"
    );


    if (abierto) {

        boton.childNodes[0].textContent =
            "Ver recomendaciones ";

    } else {

        boton.childNodes[0].textContent =
            "Ocultar recomendaciones ";

    }

}