const PRESET_NAMES = [
  "Wanderer",
  "Jester",
  "Fool",
  "Pilgrim",
  "Vagabond",
  "Stranger",
  "Nomad",
  "Drifter"
];
function generateCommentId() {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `c_${timestamp}_${random}`;
}

export { PRESET_NAMES as P, generateCommentId as g };
