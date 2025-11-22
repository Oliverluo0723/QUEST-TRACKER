// Simple 8-bit sound synthesizer using Web Audio API

const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();

const playTone = (freq: number, type: OscillatorType, duration: number, startTime: number = 0) => {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime + startTime);
  
  gain.gain.setValueAtTime(0.1, audioCtx.currentTime + startTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + startTime + duration);

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start(audioCtx.currentTime + startTime);
  osc.stop(audioCtx.currentTime + startTime + duration);
};

export const playClickSound = () => {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  playTone(400, 'square', 0.1);
};

export const playSuccessSound = () => {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  playTone(440, 'square', 0.1, 0);
  playTone(554, 'square', 0.1, 0.1); // C#
  playTone(659, 'square', 0.2, 0.2); // E
};

export const playLevelUpSound = () => {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  // Fanfare
  playTone(523.25, 'square', 0.1, 0); // C
  playTone(659.25, 'square', 0.1, 0.1); // E
  playTone(783.99, 'square', 0.1, 0.2); // G
  playTone(1046.50, 'square', 0.4, 0.3); // High C
  
  // Harmony
  playTone(392.00, 'triangle', 0.4, 0.3); // G below
};

export const playDeleteSound = () => {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  playTone(150, 'sawtooth', 0.2);
  playTone(100, 'sawtooth', 0.2, 0.1);
};
