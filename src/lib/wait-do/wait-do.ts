export function waitDo(milliseconds: number, callback: (...args: any[]) => void): void {
  const deadline = performance.now() + milliseconds;
  function check() {
    const left = deadline - performance.now();
    if (left <= 0) {
      callback();
    } else setTimeout(check, left);
  }
  check();
}
