let startTime;
let timerInterval;

// スクロール復元無効化（手動制御）
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

  window.scrollTo(0, 0);

window.addEventListener("DOMContentLoaded", () => {
    // タイマー開始
  startTime = Date.now();
  const timerDisplay = document.getElementById("timer");

  timerInterval = setInterval(() => {
    const elapsed = (Date.now() - startTime) / 1000;
    timerDisplay.textContent = `経過時間：${elapsed.toFixed(2)}秒`;
  }, 10);

  // 同意ボタンの処理
  const agreeButton = document.getElementById("agreeButton");
  agreeButton.addEventListener("click", () => {
    const checkboxes = document.querySelectorAll(".checkpoint");
    const unchecked = Array.from(checkboxes).filter(cb => !cb.checked);

    if (unchecked.length > 0) {
      alert(`読了確認ができていません（残り${unchecked.length}箇所）`);
      return;
    }

    // タイマーストップ
    clearInterval(timerInterval);
    const finalTime = (Date.now() - startTime) / 1000;

    // 評価生成（例：時間によって変化）
    let rating;
    if (finalTime < 5) {
      rating = "速すぎ！ズルしたでしょ！";
    } else if (finalTime < 15) {
      rating = "高速読了、お見事！";
    } else {
      rating = "じっくり確認して素晴らしい！";
    }

    // 結果表示
    const resultMessage = document.getElementById("resultMessage");
    resultMessage.innerHTML = `
      <p>利用規約に <strong>${finalTime.toFixed(2)}秒</strong> で同意しました！</p>
      <p>${rating}</p>
    `;

    // ボタンを無効化
    agreeButton.disabled = true;
  });
});
