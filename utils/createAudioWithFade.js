export default function createFadableAudio(src, fadeTime = 1000, volume = 0.5) {
  const context = new (window.AudioContext || window.webkitAudioContext)();
  const gain = context.createGain();
  gain.gain.value = 0;

  const audio = new Audio(src);
  audio.loop = true;
  audio.volume = volume;
  const source = context.createMediaElementSource(audio);
  source.connect(gain).connect(context.destination);

  const fadeIn = () => {
    context.resume();
    audio.play();
    gain.gain.cancelScheduledValues(context.currentTime);
    gain.gain.linearRampToValueAtTime(1, context.currentTime + fadeTime / 1000);
  };

  const fadeOut = () => {
    gain.gain.cancelScheduledValues(context.currentTime);
    gain.gain.linearRampToValueAtTime(0, context.currentTime + fadeTime / 1000);
    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
    }, fadeTime);
  };

  return { audio, fadeIn, fadeOut };
}
