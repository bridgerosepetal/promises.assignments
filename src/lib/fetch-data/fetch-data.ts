export function fetchData(toReject: boolean = false): Promise<string> {
  const deadline = performance.now() + 2000;
  return new Promise<string>((resolve, reject) => {
    function check() {
      const left = deadline - performance.now();
      if (left <= 0) {
        if (toReject) reject("Ошибка загрузки");
        resolve("Данные загружены");
      } else setTimeout(check, left);
    }
    check();
  });
}
