/* 1. Store the evidence */

const evidence = [
    {
        id: "E-01",
        title: "The Stopped Clock",
        category: "Physical evidence",
        summary: "A brass clock appears to have stopped at 8:46 PM.",
        detail: "The mechanism is damaged. Investigators have not verified that 8:46 was the time of death."
    },
    {
        id: "E-02",
        title: "The Torn Note",
        category: "Written evidence",
        summary: "The note mentions an original entry and a corrected register.",
        detail: "The recovered words read: '...the original entry was never meant to be seen. Ask the person who corrected the register.' The writer is not yet identified."
    },
    {
        id: "E-03",
        title: "The Keycard Event",
        category: "Digital evidence",
        summary: "A system event was recorded at 8:51 PM.",
        detail: "The event does not match a recorded door opening. It may be a system action rather than proof that someone entered."
    },
    {
        id: "E-04",
        title: "The Tea Cup",
        category: "Forensic evidence",
        summary: "Medication was detected in the unfinished tea.",
        detail: "The available test does not establish a lethal dose or prove that the medication caused the death."
    },
    {
        id: "E-05",
        title: "The Ink Smear",
        category: "Physical evidence",
        summary: "Blue-black ink was found at the scene.",
        detail: "A similar stain was noticed on Eleanor Wren's cuff, but no confirmed forensic match has been established."
    },
    {
        id: "E-06",
        title: "The Corrected Register",
        category: "Document evidence",
        summary: "Professor Thorne approved a later catalogue correction.",
        detail: "This connects Marcus to the correction, but it does not prove he altered the original historical record himself."
    },
    {
        id: "E-07",
        title: "The Sealed Passage",
        category: "Architectural evidence",
        summary: "An old service passage is marked as sealed on a floor plan.",
        detail: "A later maintenance drawing raises doubt about whether the passage was completely closed. Its condition on the night of the death remains unverified."
    },
    {
        id: "E-08",
        title: "The Camera Gap",
        category: "Digital evidence",
        summary: "Corridor footage is missing from 8:38 to 8:45 PM.",
        detail: "The gap creates uncertainty about movement in the corridor. It does not, by itself, identify who caused it."
    },
    {
        id: "E-09",
        title: "The Missing Tool",
        category: "Inventory evidence",
        summary: "A brass restoration tool is missing from Sofia Bell's inventory.",
        detail: "The missing tool deserves investigation, but there is no confirmed evidence that it was the murder weapon."
    },
    {
        id: "E-10",
        title: "The Maintenance Report",
        category: "Digital evidence",
        summary: "A report was created at 8:49 PM and modified at 9:06 PM.",
        detail: "The report's contents are missing. Its timestamps raise questions about the system activity that night."
    },
    {
        id: "E-11",
        title: "The Phone Backup",
        category: "Digital evidence",
        summary: "A recovered backup contains a tense exchange between Adrian and Marcus.",
        detail: "At 8:30 PM, Adrian messaged Marcus. Marcus replied: 'Then we need to speak before you publish.' This establishes a reason for a meeting, not proof of murder."
    },
    {
        id: "E-12",
        title: "The Passage Inspection",
        category: "Maintenance evidence",
        summary: "A maintenance note says the passage closure was incomplete.",
        detail: "The note was written six months earlier. It makes escape through the passage plausible, but its condition that night still needs confirmation."
    },
    {
        id: "E-13",
        title: "The Original Chronology",
        category: "Document evidence",
        summary: "An authenticated chronology conflicts with the corrected catalogue date.",
        detail: "The discrepancy supports Adrian's concern that the historical record was altered. Marcus approved a later correction, but that alone does not establish who made the original alteration."
    }
];


/* 2. Store the suspects */

const suspects = [
    {
        id: "eleanor",
        name: "Eleanor Wren",
        role: "Head Archivist",
        motive: "She secretly removed a document and may have wanted to protect the archive's reputation.",
        clue: "Ink was noticed on her cuff, but no confirmed match connects it to the scene.",
        alibi: "She says she left at 8:20 PM. Her exact movements after that require verification."
    },
    {
        id: "marcus",
        name: "Professor Marcus Thorne",
        role: "Senior Historian",
        motive: "The disputed historical discovery could damage his reputation and legacy.",
        clue: "He approved the later catalogue correction and received Adrian's message before publication.",
        alibi: "A graduate assistant saw him near the west staircase, but the exact time is uncertain."
    },
    {
        id: "sofia",
        name: "Dr. Sofia Bell",
        role: "Restoration Specialist",
        motive: "She noticed inconsistencies in the ink layers but did not report her finding.",
        clue: "A brass restoration tool is missing from her inventory.",
        alibi: "A colleague saw light under her lab door, but that does not prove she remained inside."
    },
    {
        id: "daniel",
        name: "Daniel Cross",
        role: "IT Technician",
        motive: "He may have wanted to hide unauthorized activity on the university system.",
        clue: "His administrator account was associated with a suspicious maintenance event.",
        alibi: "A lecturer saw him near a computer around 8:50 PM but could not see what he was doing."
    }
];


/* 3. Store the timeline */

const timeline = [
    ["7:55 PM", "Adrian enters the archive."],
    ["8:20 PM", "Eleanor says she leaves."],
    ["8:30 PM", "Adrian and Marcus exchange a tense message."],
    ["8:38 PM", "The corridor camera footage becomes unavailable."],
    ["8:41 PM", "Sofia logs a restoration check."],
    ["8:45 PM", "The corridor camera resumes recording."],
    ["8:46 PM", "The brass clock appears to have stopped."],
    ["8:49 PM", "A maintenance report is created."],
    ["8:51 PM", "An unusual system event is recorded."],
    ["9:04 PM", "An anonymous caller asks whether the archive was opened."],
    ["9:06 PM", "The maintenance report is last modified."],
    ["9:12 PM", "Adrian's body is discovered."]
];


/* 4. Track examined evidence */

const discoveredEvidence = new Set();


/* 5. Reusable card function */

function createCard(title, tag, description, buttonText, action) {
    const card = document.createElement("article");
    card.className = "card";

    const heading = document.createElement("h3");
    heading.textContent = title;

    const label = document.createElement("p");
    label.className = "tag";
    label.textContent = tag;

    const paragraph = document.createElement("p");
    paragraph.textContent = description;

    card.append(heading, label, paragraph);

    if (buttonText && action) {
        const button = document.createElement("button");
        button.textContent = buttonText;
        button.addEventListener("click", action);
        card.appendChild(button);
    }

    return card;
}


/* 6. Display evidence */

function showEvidence() {
    const container = document.getElementById("evidence-list");

    if (!container) return;

    evidence.forEach(function(item) {
        const card = createCard(
            item.title,
            item.id + " | " + item.category,
            item.summary,
            "Examine Exhibit",
            function() {
                examineEvidence(item.id);
            }
        );

        container.appendChild(card);
    });
}


/* 7. Open evidence popup */

function examineEvidence(id) {
    const item = evidence.find(function(clue) {
        return clue.id === id;
    });

    if (!item) return;

    discoveredEvidence.add(id);

    document.getElementById("modal-title").textContent =
        item.id + " - " + item.title;

    document.getElementById("modal-description").textContent =
        item.detail;

    document.getElementById("modal-progress").textContent =
        "EXHIBITS EXAMINED: " +
        discoveredEvidence.size + " OF " + evidence.length;

    document.getElementById("evidence-modal")
        .classList.remove("hidden");
}


/* 8. Close evidence popup */

const evidenceCloseButton = document.getElementById("modal-ok");

if (evidenceCloseButton) {
    evidenceCloseButton.addEventListener("click", function() {
        document.getElementById("evidence-modal")
            .classList.add("hidden");
    });
}


/* 9. Display suspects */

function showSuspects() {
    const container = document.getElementById("suspect-list");

    if (!container) return;

    suspects.forEach(function(suspect) {
        const card = createCard(
            suspect.name,
            suspect.role,
            "Motive: " + suspect.motive,
            "Read Dossier",
            function() {
                readSuspect(suspect.id);
            }
        );

        container.appendChild(card);
    });
}


/* 10. Open suspect dossier */

function readSuspect(id) {
    const suspect = suspects.find(function(person) {
        return person.id === id;
    });

    if (!suspect) return;

    document.getElementById("suspect-modal-title").textContent =
        suspect.name + " - " + suspect.role;

    document.getElementById("suspect-modal-description").textContent =
        "MOTIVE\n" + suspect.motive +
        "\n\nCLUE\n" + suspect.clue +
        "\n\nALIBI\n" + suspect.alibi;

    document.getElementById("suspect-modal")
        .classList.remove("hidden");
}


/* 11. Close suspect dossier */

const suspectCloseButton = document.getElementById("suspect-modal-ok");

if (suspectCloseButton) {
    suspectCloseButton.addEventListener("click", function() {
        document.getElementById("suspect-modal")
            .classList.add("hidden");
    });
}


/* 12. Display timeline */

function showTimeline() {
    const container = document.getElementById("timeline-list");

    if (!container) return;

    timeline.forEach(function(event) {
        const row = document.createElement("div");
        row.className = "timeline-item";

        const time = document.createElement("strong");
        time.textContent = event[0];

        const description = document.createElement("p");
        description.textContent = event[1];

        row.append(time, description);
        container.appendChild(row);
    });
}


/* 13. Sidebar toggle */

function toggleSidebar() {
    const sidebar = document.querySelector(".sidebar");
    const pageContent = document.querySelector(".page-content");

    sidebar.classList.toggle("hidden");
    pageContent.classList.toggle("expanded");
}


/* 14. Submit final accusation */

function submitAccusation() {
    const selectedSuspect = document.getElementById("suspect-choice").value;
    const reasoning = document.getElementById("reasoning").value.trim();
    const result = document.getElementById("result");

    // Convert the answer to lowercase and remove punctuation
    const answer = reasoning.toLowerCase()
        .replace(/[^\w\s]/g, " ")
        .replace(/\s+/g, " ");

    // Check whether the explanation discusses each important clue
    const checks = [
        {
            name: "Motive and the message",
            correct:
                /\badrian\b/.test(answer) &&
                /\bmarcus\b|\bthorne\b/.test(answer) &&
                /\b(publish|publication|speak|meeting|message)\b/.test(answer)
        },
        {
            name: "The corrected register",
            correct:
                /\b(corrected|correction|register|catalogue|catalog)\b/.test(answer) &&
                /\b(marcus|thorne)\b/.test(answer)
        },
        {
            name: "The original chronology",
            correct:
                /\b(original|chronology|authenticated)\b/.test(answer) &&
                /\b(conflict|discrepancy|different|altered|changed|date)\b/.test(answer)
        },
        {
            name: "The service passage",
            correct:
                /\b(passage|corridor)\b/.test(answer) &&
                /\b(maintenance|sealed|closure|closed|incomplete)\b/.test(answer)
        },
        {
            name: "The timeline and digital evidence",
            correct:
                /\b(camera|footage|recording)\b/.test(answer) &&
                /\b(gap|missing|unavailable|stopped)\b/.test(answer) &&
                /\b(time|clock|system|event)\b/.test(answer)
        }
    ];

    const passedChecks = checks.filter(function(check) {
        return check.correct;
    });

    const score = passedChecks.length;

    // Display feedback for each clue
    let feedback = "<h3>Investigation Review</h3>";

    checks.forEach(function(check) {
        feedback += `
            <p>
                ${check.correct ? "✓" : "✗"}
                ${check.name}
            </p>
        `;
    });

    // Check the suspect and the quality of the explanation
    if (selectedSuspect === "") {
        result.innerHTML = "Please select a suspect first.";
        return;
    }

    if (selectedSuspect === "marcus" && score >= 4) {
        result.innerHTML = `
            <h2>CASE SOLVED</h2>
            <p>Congratulations! You identified the intended suspect and connected several important pieces of evidence.</p>
            <p>Your investigation score: ${score}/5</p>
            ${feedback}
        `;
    } else {
        result.innerHTML = `
            <h2>CASE NOT SOLVED</h2>
            <p>Your explanation does not yet establish a convincing case.</p>
            <p>Your investigation score: ${score}/5</p>
            ${feedback}
            <p>Review the evidence and strengthen the connections in your explanation.</p>
        `;
    }
}


/* 15. Build the page content once */

showEvidence();
showSuspects();
showTimeline();


/* 16. Switch between page views without reloading the website */

function showPage(pageName) {
    const views = document.querySelectorAll(".page-view");
    const links = document.querySelectorAll(".sidebar-links a[data-page]");
    const sidebar = document.querySelector(".sidebar");
    const pageContent = document.querySelector(".page-content");

    views.forEach(function(view) {
        view.classList.remove("active");
    });

    const selectedView = document.getElementById("page-" + pageName);

    if (selectedView) {
        selectedView.classList.add("active");
    }

    links.forEach(function(link) {
        link.classList.toggle("active", link.dataset.page === pageName);
    });

    // Hide the sidebar when changing pages
    if (sidebar) {
        sidebar.classList.add("hidden");
    }
    
    if (pageContent) {
        pageContent.classList.add("expanded");
    }

    window.scrollTo(0, 0);
}



/* 17. Handle sidebar and page navigation */

document.querySelectorAll("[data-page]").forEach(function(link) {
    link.addEventListener("click", function(event) {
        event.preventDefault();
        showPage(link.dataset.page);
    });
});


/* 18. Background music stays in this document while views change */

const music = document.getElementById("background-music");
const musicButton = document.getElementById("music-toggle");

if (music && musicButton) {
    music.volume = 0.2;
    musicButton.textContent = "♫ Enable Music";

    musicButton.addEventListener("click", function() {
        if (music.paused) {
            music.play().then(function() {
                musicButton.textContent = "♫ Pause Music";
            }).catch(function() {
                musicButton.textContent = "♫ Enable Music";
            });
        } else {
            music.pause();
            musicButton.textContent = "♫ Enable Music";
        }
    });

    music.addEventListener("play", function() {
        musicButton.textContent = "♫ Pause Music";
    });

    music.addEventListener("pause", function() {
        musicButton.textContent = "♫ Enable Music";
    });
}


/* 19. Open the overview page when the website first loads */

showPage("overview");