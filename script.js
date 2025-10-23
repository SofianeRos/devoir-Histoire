console.log('Ça marche 🚀');

// ---------- VOTRE JS ICI ----------

// Recuperation des elements HTML 

const texteQuestion = document.getElementById('texte-question');
const imageQuestion = document.getElementById('image-question');
const reponsesContainer = document.getElementById('reponses-container');


/**
 * Affiche une question et ses réponses à l'écran
 */
function afficherQuestion(questionId) {
    const question = tableauQuestions.find(q => q.id === questionId);
    if (!question) {
        console.error("Question non trouvée !");
        return;
    }

    texteQuestion.textContent = question.text;
    imageQuestion.src = question.image;
    imageQuestion.style.display = 'block'; // On s'assure que l'image est visible

    reponsesContainer.innerHTML = '';

    question.answers.forEach(reponse => {
        const bouton = document.createElement('button');
        bouton.textContent = reponse.text;
        // NOUVEAU : On ajoute un événement au clic
        bouton.addEventListener('click', () => {
            choisirReponse(reponse);
        });
        reponsesContainer.appendChild(bouton);
    });
}

/**
 * NOUVEAU : Gère le choix d'une réponse
 */
function choisirReponse(reponse) {
    if (reponse.nextId === 0) {
        // Si nextId est 0, c'est la fin de l'histoire
        const fin = tableauFins.find(f => f.id === reponse.moralId);
        afficherFin(fin.text);
    } else {
        // Sinon, on affiche la question suivante
        afficherQuestion(reponse.nextId);
    }
}

/**
 * NOUVEAU : Affiche l'écran de fin
 */
function afficherFin(texteFin) {
    texteQuestion.textContent = texteFin;
    imageQuestion.style.display = 'none'; // On cache l'image de la question
    reponsesContainer.innerHTML = ''; // On vide les boutons de choix

    // On crée un bouton pour recommencer
    const boutonRecommencer = document.createElement('button');
    boutonRecommencer.textContent = "Recommencer l'histoire";
    boutonRecommencer.addEventListener('click', () => {
        afficherQuestion(1); // On relance le jeu
    });
    reponsesContainer.appendChild(boutonRecommencer);
}

// On commence l'histoire en affichant la première question
afficherQuestion(1);