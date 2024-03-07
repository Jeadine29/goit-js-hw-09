import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      Notiflix.Report.Failure('Error', 'Please choose a date in the future', 'OK');
      document.getElementById('start-button').disabled = true;
    } else {
      document.getElementById('start-button').disabled = false;
    }
  },
};

flatpickr("#datetime-picker", options);

document.getElementById('start-button').addEventListener('click', () => {
  const selectedDate = new Date(document.getElementById('datetime-picker').value);
  const currentDate = new Date();

  if (selectedDate <= currentDate) {
    Notiflix.Report.Failure('Error', 'Please choose a date in the future', 'OK');
    return;
  }

  const countdownInterval = setInterval(() => {
    const timeDifference = selectedDate - new Date();

    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      Notiflix.Report.Success('Success', 'Countdown finished!', 'OK');
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    renderTimer(days, hours, minutes, seconds);
  }, 1000);
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
