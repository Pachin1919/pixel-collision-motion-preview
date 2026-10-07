import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Crosshair, Timer } from "lucide-react";
import { Playfield } from "@/components/pixel/playfield";
import { InputGuide } from "@/components/pixel/input-guide";
import { SectionIntro } from "@/components/pixel/site-shell";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/pixel-language";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pixel Current — A field of pixels. A moment to play." },
      {
        name: "description",
        content:
          "Explore an original interactive pixel current or collect signals in a real 45-second browser challenge.",
      },
      { property: "og:title", content: "Pixel Current — Interactive Play" },
      {
        property: "og:description",
        content: "A little chaos. A little curiosity. Play with the current in English or Chinese.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});
function Index() {
  const { t } = useLanguage();
  return (
    <main>
      <Playfield />
      <section id="feel-the-current" className="content-section">
        <SectionIntro number="01 /" label={t("FEEL THE CURRENT", "感受像素流")} />
        <div className="section-heading">
          <h2>
            {t("Small gestures.", "小小动作。")}
            <br />
            <span>{t("Unexpected ripples.", "意外涟漪。")}</span>
          </h2>
          <p>
            {t(
              "Nothing to download. Nothing to master. Just a few ways to make a little digital noise.",
              "不用下载，不必精通。用几种简单的动作，掀起一点数字波澜。",
            )}
          </p>
        </div>
        <InputGuide />
      </section>
      <section className="modes-section">
        <div className="modes-inner">
          <SectionIntro number="02 /" label={t("YOUR KIND OF PLAY", "你的游玩方式")} />
          <div className="mode-row">
            <div className="mode-title">
              <Crosshair />
              <h2>{t("Just wander.", "随意游走。")}</h2>
              <span>{t("EXPLORE", "探索")}</span>
            </div>
            <p>
              {t(
                "No timer, no score, no right direction. Follow the pixels for as long as you like.",
                "没有倒计时，没有分数，也没有正确方向。想跟着像素走多久，都可以。",
              )}
            </p>
            <Button variant="outline" asChild>
              <Link to="/play">
                {t("Enter the field", "进入场景")}
                <ArrowUpRight />
              </Link>
            </Button>
          </div>
          <div className="mode-row">
            <div className="mode-title">
              <Timer />
              <h2>{t("Catch a signal.", "捕捉信号。")}</h2>
              <span>{t("CHALLENGE", "挑战")}</span>
            </div>
            <p>
              {t(
                "45 seconds. Coral squares. One point for every signal you touch. Pause whenever you need.",
                "45 秒，珊瑚色方块。每碰到一个信号，得一分。随时可以暂停。",
              )}
            </p>
            <Button variant="outline" asChild>
              <Link to="/how-to">
                {t("Know the rules", "了解规则")}
                <ArrowUpRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <section className="closing-section">
        <span className="micro-label">{t("NO SOUND. JUST SIGNAL.", "没有声音，只有信号。")}</span>
        <h2>{t("Stay a little curious.", "留住一点好奇。")}</h2>
        <Link to="/play">
          {t("Back into the current", "再入像素流")}
          <ArrowUpRight />
        </Link>
      </section>
    </main>
  );
}
