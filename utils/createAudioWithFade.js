export default function createFadableAudio(src, fadeTime = 1000, volume = 0.5) {
  const context = new (window.AudioContext || window.webkitAudioContext)();
  const gain = context.createGain();
  gain.gain.value = 0;

  const audio = new Audio(src);
  audio.loop = true;
  audio.volume = volume;
  const source = context.createMediaElementSource(audio);
  source.connect(gain).connect(context.destination);

  let isCancelled = false;
  let playPromise = null;

  const fadeIn = () => {
    isCancelled = false;
    context.resume();

    playPromise = audio.play()
      .then(() => {
        if (isCancelled) return;

        gain.gain.cancelScheduledValues(context.currentTime);
        gain.gain.setValueAtTime(0, context.currentTime);
        gain.gain.linearRampToValueAtTime(volume, context.currentTime + fadeTime / 1000);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.warn("Audio play failed:", err);
        }
      });

    return () => {
      isCancelled = true;
    };
  };

  const fadeOut = () => {
    isCancelled = true;

    // Ensure playPromise resolves before stopping audio
    if (playPromise) {
      playPromise.finally(() => {
        gain.gain.cancelScheduledValues(context.currentTime);
        gain.gain.setValueAtTime(gain.gain.value, context.currentTime);
        gain.gain.linearRampToValueAtTime(0, context.currentTime + fadeTime / 1000);

        setTimeout(() => {
          audio.pause();
          audio.currentTime = 0;
        }, fadeTime);
      });
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  return { audio, fadeIn, fadeOut };
}
