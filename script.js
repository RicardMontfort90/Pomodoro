let audio = document.getElementById("alertSound");
let focusButton = document.getElementById("focus");
let buttons = document.querySelectorAll(".btn");
let shortBreakButton = document.getElementById("shortbreak");
let longBreakButton = document.getElementById("longbreak");
let startBtn = document.getElementById("btn-start");
let reset = document.getElementById("btn-reset");
let pause = document.getElementById("btn-pause");
let time = document.getElementById("time");
let set;
let active = "focus";
let count = 59;
let paused = true;
let minCount = 24;

let durations = {
    focus: 10,
    shortbreak: 5,
    longbreak: 15
};

time.textContent = `${minCount + 1}:00`;

const appendZero = (value) => {
    value = value < 10 ? `0${value}` : value;
    return value;
};

reset.addEventListener(
    "click",
    (resetTime = () => {
        pauseTimer();
        switch (active) {
            case "longbreak":
                minCount = 14;
                break;
            case "shortbreak":
                minCount = 4;
                break;
            default:
                minCount = 24;
                break;
        }
        count = 59;
        time.textContent = `${minCount + 1}:00`;
    })
);

const removeFocus = () => {
    buttons.forEach((btn) => {
        btn.classList.remove("btn-focus");
    });
};

const setAnimationDuration = (duration) => {
    let tomato = document.getElementById("tomato");

    // Detener la animación actual
    tomato.style.animation = "none";

    // Obligar a la reflow del navegador
    void tomato.offsetWidth;

    // Establecer la nueva duración de la animación
    tomato.style.animation = `tomatoAnimation ${duration}s linear infinite`;
}

focusButton.addEventListener("click", () => {
    active = "focus";
    removeFocus();
    focusButton.classList.add("btn-focus");
    pauseTimer();
    minCount = 24;
    count = 59;
    time.textContent = `${minCount + 1}:00`;
    setAnimationDuration(durations.focus);
});

shortBreakButton.addEventListener("click", () => {
    active = "shortbreak";
    removeFocus();
    shortBreakButton.classList.add("btn-focus");
    pauseTimer();
    minCount = 4;
    count = 59;
    time.textContent = `${appendZero(minCount + 1)}:00`;
    setAnimationDuration(durations.shortbreak);
});

longBreakButton.addEventListener("click", () => {
    active = "longbreak";
    removeFocus();
    longBreakButton.classList.add("btn-focus");
    pauseTimer();
    minCount = 14;
    count = 59;
    time.textContent = `${minCount + 1}:00`;
    setAnimationDuration(durations.longbreak);
});

pause.addEventListener(
    "click",
    (pauseTimer = () => {
        paused = true;
        clearInterval(set);
        startBtn.classList.remove("hide");
        pause.classList.remove("show");
        reset.classList.remove("show");
    })
);



startBtn.addEventListener("click", () => {
    let duration = durations[active];

    reset.classList.add("show");
    pause.classList.add("show");
    startBtn.classList.add("hide");
    startBtn.classList.remove("show");

    if (paused) {
        paused = false;
        time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
        set = setInterval(() => {
            count--;
            time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
            if (count == 0) {
                if (minCount != 0) {
                    minCount--;
                    count = 60;
                } else {
                    clearInterval(set);
                }
            }
        }, 1000);
        setAnimationDuration(duration);
        audio.play();
    }
});