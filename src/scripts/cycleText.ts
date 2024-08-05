// cycleText.ts
export function setupTextCycle(): void {
    const words: string[] = ["1. BREATH LIFE", "2. INTO ALL", "3. YOU DO",];
    let currentIndex: number = 0;
    const textElement: HTMLAnchorElement | null = document.querySelector('a[href="/commandments"]');
  
    function cycleText(): void {
      if (textElement) {
        textElement.textContent = words[currentIndex];
        currentIndex = (currentIndex + 1) % words.length; 
      }
    }
  
    cycleText();
    setInterval(cycleText, 756);
  }