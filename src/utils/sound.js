const getAudioContext = () => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return null;
    return new AudioContext();
};

let audioCtx = getAudioContext();

export const playCorrectSound = () => {
    if (!audioCtx) return;
    if (audioCtx.state === 'suspended') audioCtx.resume();

    // Funny power-up arpeggio
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(400, audioCtx.currentTime);
    osc.frequency.setValueAtTime(600, audioCtx.currentTime + 0.1);
    osc.frequency.setValueAtTime(800, audioCtx.currentTime + 0.2);
    osc.frequency.setValueAtTime(1200, audioCtx.currentTime + 0.3);

    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.5);
};

export const playIncorrectSound = () => {
    if (!audioCtx) return;
    if (audioCtx.state === 'suspended') audioCtx.resume();

    // Funny womp womp slide down with vibrato
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(300, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.6);

    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.5, audioCtx.currentTime + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.6);

    const lfo = audioCtx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 8;
    const lfoGain = audioCtx.createGain();
    lfoGain.gain.value = 20;
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    lfo.start();
    lfo.stop(audioCtx.currentTime + 0.6);

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.6);
};

export const playTimeUpSound = () => {
    if (!audioCtx) return;
    if (audioCtx.state === 'suspended') audioCtx.resume();

    // Funny boing sound
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.1);
    osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.3);

    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.5, audioCtx.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.4);
};