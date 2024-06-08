// JavaScript for Timer Logic
document.addEventListener('DOMContentLoaded', () => {
    const timerDisplay = document.getElementById('timer');
    const startButton = document.getElementById('start-button');
    const pauseButton = document.getElementById('pause-button');
    const resetButton = document.getElementById('reset-button');

    let workTime = 25 * 60; // 25 minutes in seconds
    let breakTime = 5 * 60; // 5 minutes in seconds
    let currentTime = workTime;
    let isRunning = false;
    let isWorkSession = true;
    let interval;

    function updateDisplay(time) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    function startTimer() {
        if (!isRunning) {
            isRunning = true;
            interval = setInterval(() => {
                if (currentTime > 0) {
                    currentTime--;
                    updateDisplay(currentTime);
                } else {
                    if (isWorkSession) {
                        currentTime = breakTime;
                        isWorkSession = false;
                        alert("Time for a break!");
                    } else {
                        currentTime = workTime;
                        isWorkSession = true;
                        alert("Back to work!");
                    }
                    updateDisplay(currentTime);
                }
            }, 1000);
        }
    }

    function pauseTimer() {
        if (isRunning) {
            isRunning = false;
            clearInterval(interval);
        }
    }

    function resetTimer() {
        pauseTimer();
        currentTime = isWorkSession ? workTime : breakTime;
        updateDisplay(currentTime);
    }

    startButton.addEventListener('click', startTimer);
    pauseButton.addEventListener('click', pauseTimer);
    resetButton.addEventListener('click', resetTimer);

    // Initialize display
    updateDisplay(currentTime);
});
