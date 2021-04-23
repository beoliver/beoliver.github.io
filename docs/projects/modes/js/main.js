const circle_of_fifths = [
  "F",
  "C",
  "G",
  "D",
  "A",
  "E",
  "B",
  "F#",
  "C#",
  "G#",
  "D#",
  "A#",
];
const modes = [
  "Lydian",
  "Ionian (Major)",
  "Mixolydian",
  "Dorian",
  "Aeolian (Minor)",
  "Phrygian",
  "Locrian",
];

const state = {
  outer_disk_rotation: 0,
  inner_disk_rotation: 0,
  note_index: 0,
  mode_index: 0,
};

function mode() {
  return `${
    circle_of_fifths[
      (state.note_index + state.mode_index) % circle_of_fifths.length
    ]
  }-${modes[state.mode_index]}`;
}

function rotateOuterLeft() {
  const disk = document.getElementById("outerDisk");
  state.outer_disk_rotation = state.outer_disk_rotation - 30;
  state.note_index = (state.note_index + 1) % circle_of_fifths.length;
  disk.style["transform"] = `rotate(${state.outer_disk_rotation}deg)`;
}

function rotateOuterRight() {
  const disk = document.getElementById("outerDisk");
  state.outer_disk_rotation = state.outer_disk_rotation + 30;
  state.note_index =
    (circle_of_fifths.length + (state.note_index - 1)) %
    circle_of_fifths.length;
  disk.style["transform"] = `rotate(${state.outer_disk_rotation}deg)`;
}

function rotateInnerLeft() {
  if (state.mode_index > 0) {
    const disk = document.getElementById("innerDisk");
    state.inner_disk_rotation = state.inner_disk_rotation - 30;
    state.mode_index = (state.mode_index - 1) % modes.length;
    disk.style["transform"] = `rotate(${state.inner_disk_rotation}deg)`;
  }
}

function rotateInnerRight() {
  if (state.mode_index < modes.length - 1) {
    const disk = document.getElementById("innerDisk");
    state.inner_disk_rotation = state.inner_disk_rotation + 30;
    state.mode_index = (state.mode_index + 1) % modes.length;
    disk.style["transform"] = `rotate(${state.inner_disk_rotation}deg)`;
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
