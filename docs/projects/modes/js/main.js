var r1 = 0;
var r2 = 0;

const notes = ["F", "C", "G", "D", "A", "E", "B", "F#", "C#", "G#", "D#", "A#"];
const modes = [
  "Lydian",
  "Ionian (Major)",
  "Mixolydian",
  "Dorian",
  "Aeolian (Minor)",
  "Phrygian",
  "Locrian",
];

var note_index = 0;
var mode_index = 0;

function mode() {
  return `${notes[(note_index + mode_index) % notes.length]}-${
    modes[mode_index]
  }`;
}

function rotateOuterLeft() {
  const disk = document.getElementById("outerDisk");
  r1 = r1 - 30;
  note_index = (note_index + 1) % notes.length;
  disk.style["transform"] = `rotate(${r1}deg)`;
}

function rotateOuterRight() {
  const disk = document.getElementById("outerDisk");
  r1 = r1 + 30;
  note_index = (notes.length + (note_index - 1)) % notes.length;
  disk.style["transform"] = `rotate(${r1}deg)`;
}

function rotateInnerLeft() {
  if (mode_index > 0) {
    const disk = document.getElementById("innerDisk");
    r2 = r2 - 30;
    mode_index = (mode_index - 1) % modes.length;
    disk.style["transform"] = `rotate(${r2}deg)`;
  }
}

function rotateInnerRight() {
  if (mode_index < modes.length - 1) {
    const disk = document.getElementById("innerDisk");
    r2 = r2 + 30;
    mode_index = (mode_index + 1) % modes.length;
    disk.style["transform"] = `rotate(${r2}deg)`;
  }
}

function maybeRotate(e) {
  switch (e.code) {
    case "ArrowRight": {
      rotateOuterRight();
      break;
    }
    case "ArrowLeft": {
      rotateOuterLeft();
      break;
    }
    case "ArrowUp": {
      rotateInnerLeft();
      break;
    }
    case "ArrowDown": {
      rotateInnerRight();
      break;
    }
    default:
      return;
  }
  updateMode();
  return;
}

function updateMode() {
  document.getElementById("currentMode").innerText = mode();
}

document.addEventListener("DOMContentLoaded", updateMode);
document.addEventListener("keydown", maybeRotate);
