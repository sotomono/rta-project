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

const ratings = [
  {
    id: "rank-0",
    label: "???",
    min: 0,
    max: 0,
    className: "result-why",
    comment: "どうやって0秒クリアしたの???"
  },
  {
    id: "rank-ss",
    label: "SS",
    min: 0.01,
    max: 3.99,
    className: "result-ss",
    comment: "神レベル。脱帽。"
  },
  {
    id: "rank-s",
    label: "S",
    min: 4,
    max: 5.99,
    className: "result-s",
    comment: "超人レベル！（もしかして裏技バレた？）"
  },
  {
    id: "rank-a+",
    label: "A+",
    min: 6,
    max: 7.99,
    className: "result-a+",
    comment: "速読の匠！"
  },
  {
    id: "rank-a-",
    label: "A-",
    min: 8,
    max: 10.99,
    className: "result-a-",
    comment: "普通の速読レベル。"
  },
  {
    id: "rank-b+",
    label: "B+",
    min: 11,
    max: 15.99,
    className: "result-b+",
    comment: "伸びしろがあります"
  },
  {
    id: "rank-b-",
    label: "B-",
    min: 16,
    max: 20.99,
    className: "result-b-",
    comment: "まだ縮められるぞ！頑張ろう！"
  },
  {
    id: "rank-c+",
    label: "C+",
    min: 21,
    max: 30.99,
    className: "result-c+",
    comment: "のんびり屋さん"
  },
  {
    id: "rank-c-",
    label: "C-",
    min: 31,
    max: 50.99,
    className: "result-c-",
    comment: "じっくり目を通すタイプだね"
  },
  {
    id: "rank-d",
    label: "D",
    min: 51,
    max: Infinity,
    className: "result-d",
    comment: "ちゃんと読んでくれてありがとう♡（しめしめ）"
  },
  {
    id: "rank-prime",
    label: "＊",
    min: 57,
    max: 57,
    className: "result-1",
    comment: "グロタンディーク素数"
  }
];

  // 同意ボタンの処理
  const agreeButton = document.getElementById("agreeButton");
  agreeButton.addEventListener("click", () => {
    const checkboxes = document.querySelectorAll(".checkpoint");
    const unchecked = Array.from(checkboxes).filter(cb => !cb.checked);

  const warning = document.getElementById("warning");
  if (unchecked.length > 0) {
  warning.style.display = "block";
  warning.textContent = `読了確認ができていません（残り${unchecked.length}箇所）`;
  warning.scrollIntoView({ behavior: "smooth", block: "center" });
  return;
  } else {
  warning.style.display = "none"; // チェックOKなら警告を消す
  }

    // タイマーストップ
    clearInterval(timerInterval);
    const finalTime = (Date.now() - startTime) / 1000;

    // タイマー表示を確定タイムに更新
    timerDisplay.textContent = `経過時間：${finalTime.toFixed(2)}秒`;

//結果と評価
let selectedRating = ratings.find(r => finalTime >= r.min && finalTime <= r.max);
let comment = selectedRating.comment;

resultMessage.className = `result ${selectedRating.className}`;
resultMessage.innerHTML = `
<p class="result-rank">ランク：<strong>${selectedRating.label}</strong></p>
  <p class="result-time">利用規約に <strong>${finalTime.toFixed(2)}秒</strong> で同意しました！</p>
  <p class="result-comment">${comment}</p>
`;

resultMessage.scrollIntoView({ behavior: "smooth", block: "center" });

    // ボタンを無効化
    agreeButton.disabled = true;
  });
});

// 🔧 レイアウトシフト対策（遅れてもう一度スクロール）
const initialScroll = window.scrollY;

setTimeout(() => {
  const currentScroll = window.scrollY;
  const delta = Math.abs(currentScroll - initialScroll);

  if (delta < 10) {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    console.log("自動スクロールで先頭へ戻しました");
  } else {
    console.log("ユーザーが動かしていたのでスキップ");
  }
}, 1000);
