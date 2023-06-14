// class responsiveVoice {
//   speak(text: string) {
//     if ("responsiveVoice" in window) {
//       (window as any).responsiveVoice.speak(text, "UK English Male");
//     }
//   }
//   speakSlow(text: string, rate: number) {
//     if ("responsiveVoice" in window) {
//       (window as any).responsiveVoice.speak(text, "UK English Male", { rate });
//     }
//   }
// }
function responsiveVoice(text: string): void;
function responsiveVoice(text: string, rate: number): void;
function responsiveVoice(text: string, rate?: number): void {
  if ("responsiveVoice" in window) {
    if (rate) {
      (window as any).responsiveVoice.speak(text, "UK English Male", { rate });
    } else {
      (window as any).responsiveVoice.speak(text, "UK English Male");
    }
  }
}
export default responsiveVoice;
