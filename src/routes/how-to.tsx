import { asset } from "@/lib/asset";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Plus, Pause, RotateCcw } from "lucide-react";
import { InputGuide } from "@/components/pixel/input-guide";
import { SectionIntro } from "@/components/pixel/site-shell";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/pixel-language";
import { CrossCurrent } from "@/components/pixel/art-studies";
export const Route = createFileRoute("/how-to")({
  head: () => ({
    meta: [
      { title: "How to play — Pixel Current" },
      {
        name: "description",
        content:
          "Pointer, touch and keyboard instructions, exact scoring rules and the 45-second signal challenge.",
      },
      { property: "og:title", content: "How to play — Pixel Current" },
      {
        property: "og:description",
        content: "Small gestures, clear rules. Learn to scatter pixels and collect coral signals.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HowTo,
});
function HowTo() {
  const { t } = useLanguage();
  return (
    <main className="detail-page howto-round2">
      <Link to="/" className="back-link">
        <ArrowLeft size={14} />
        {t("Back to the current", "返回像素流")}
      </Link>
      <SectionIntro number="01 /" label={t("INPUT & RULES", "操作与规则")} />
      <div className="detail-heading">
        <h1>
          {t("A gesture is", "一个动作，")}
          <br />
          <span>{t("all it takes.", "就够了。")}</span>
        </h1>
        <p>
          {t(
            "Explore for the feeling. Challenge for the chase. The same field, two ways to play.",
            "探索，为了感受；挑战，为了追逐。同一片场景，两种玩法。",
          )}
        </p>
      </div>
      <section className="input-manual"><div className="manual-inner"><InputGuide /></div></section>
      <section className="rules-section">
        <div>
          <SectionIntro number="02 /" label={t("THE 45-SECOND CHALLENGE", "45 秒挑战")} />
          <h2>
            {t("Coral means", "珊瑚色，")}
            <br />
            <span>{t("catch me.", "就是信号。")}</span>
          </h2>
          <div className="scoring-diagram">
            <span className="demo-target" />
            <Plus size={20} />
            <strong>1</strong>
            <span>{t("SIGNAL = POINT", "信号 = 分数")}</span>
          </div>
          <figure className="rule-study"><img src={asset("assets/round2-signal-fragments.png")} width={1024} height={1024} loading="lazy" decoding="async" alt={t("Coral signal fragments and sparse cyan marks on a blue-black field.", "蓝黑场景中的珊瑚色信号碎片与稀疏青色标记。")}/><figcaption>{t("Signal fragments — a still study, not a game target.", "信号碎片——静态习作，并非游戏目标。")}</figcaption></figure>
        </div>
        <ol className="rules-list">
          <li>
            <span>01</span>
            <div>
              <h3>{t("Start when you’re ready.", "准备好，再开始。")}</h3>
              <p>
                {t(
                  "Start creates a fresh 45-second session with three coral squares. The clock runs only while your field is visible and the challenge is active.",
                  "开始会创建全新的 45 秒挑战，场景出现三个珊瑚色方块。只有场景可见且挑战进行中，倒计时才会运行。",
                )}
              </p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <h3>{t("One square. One point.", "一个方块，一分。")}</h3>
              <p>
                {t(
                  "Touch a square with your pointer, tap it, or move the keyboard marker into it. Each target counts exactly once. A new square takes its place.",
                  "用指针碰到方块，轻点它，或将键盘标记移入其中。每个目标只计分一次，收集后会出现新的方块。",
                )}
              </p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <h3>
                <Pause size={16} />
                {t("Take a breath.", "歇一会儿。")}
              </h3>
              <p>
                {t(
                  "Pause freezes the clock and targets. Switching tabs or scrolling the field out of view freezes time too; returning continues from the same moment.",
                  "暂停会冻结倒计时与目标。切换标签页，或将场景滚出视野，也会停止计时；返回后从同一时刻继续。",
                )}
              </p>
            </div>
          </li>
          <li>
            <span>04</span>
            <div>
              <h3>
                <RotateCcw size={16} />
                {t("See what you caught.", "看看你的收获。")}
              </h3>
              <p>
                {t(
                  "At zero, your actual score appears. Retry starts fresh; Explore removes the timer. Your best score is session-only, kept during navigation and cleared on reload.",
                  "倒计时归零后，显示你实际获得的分数。再玩一次会重新开始；探索会移除计时。最佳分数仅在本次访问中保留，切换页面仍在，刷新即清除。",
                )}
              </p>
            </div>
          </li>
        </ol>
      </section>
      <CrossCurrent compact />
      <section className="access-note">
        <span className="micro-label">{t("A QUIETER CURRENT", "更安静的像素流")}</span>
        <p>
          {t(
            "With reduced motion enabled, the artwork and targets stay still. All scoring and controls remain available. There is no audio, and no need to hover on a touchscreen.",
            "开启减少动态效果后，作品与目标保持静止。计分和所有操作照常可用。没有音频，触屏也不需要悬停。",
          )}
        </p>
      </section>
      <Button variant="signal" asChild>
        <Link to="/play">
          {t("Let’s play", "开始玩")}
          <ArrowUpRight />
        </Link>
      </Button>
    </main>
  );
}
