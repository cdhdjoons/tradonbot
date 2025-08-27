require('dotenv').config();
const { Bot } = require("grammy");

// Telegram 봇 토큰
const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);

// 봇 초기화
await bot.init();

// /start 명령어 처리
bot.command("start", async (ctx) => {
  const keyboard = {
    inline_keyboard: [
      [{ text: "🔘 Start Now", web_app: { url: "https://www.tradon.world" } }],  // 게임 링크 수정
      [{ text: "💬 Telegram", url: "https://t.me/tradonai" }],
      [{ text: "🧵 Twitter (X)", url: "https://x.com/aitradonx" }],
      [{ text: "🌐 Website", url: "https://www.tradon.world" }],
      [{ text: "📄 Whitepaper", url: "https://tradonai.gitbook.io/docs/" }],
    ],
  };

  const message = `
🧠 Welcome to Tradon!

You've just entered the AI-powered trading arena — where your Tradon agent learns, evolves, and helps you trade smarter.

🔍 What you can do here:

🧬 Create and evolve your AI trader (“Tradon”)
📈 Analyze token trends and receive real-time insights
🧠 Train your Tradon through personalized trading missions
📊 Track your agent's performance, growth, and ranking
💡 Get token recommendations tailored by your strategy
🎮 Compete in weekly missions to earn $TRDN rewards
🔗 Connect your wallet and simulate trades across BSC

🚀 This isn't just a bot.
It's your personal AI trader — built to learn your style and win the market.

Train it. Evolve it. Trade with intelligence.
  `;

  const pngUrl = 'https://tradonbot.vercel.app/tradonpic.png';  // public 폴더에 있는 이미지 파일 경로

  // ✅ GIF + 메시지 + 버튼을 한 번에 보냄
  await ctx.replyWithPhoto(pngUrl, {
    caption: message,
    reply_markup: keyboard,
    parse_mode: "Markdown",
  });
});

// ✅ Vercel 서버리스 API로 실행
export async function POST(req) {
  try {
    const body = await req.json();
    await bot.handleUpdate(body);
    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Bot Error:", error);
    return new Response("Error", { status: 500 });
  }
}

