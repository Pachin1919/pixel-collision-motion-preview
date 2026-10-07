import { createFileRoute } from "@tanstack/react-router";
import { CrossCurrent, SignalAtlas, ModeDecision, WorkshopEnding } from "@/components/pixel/art-studies";
import { Playfield } from "@/components/pixel/playfield";
import { InputGuide } from "@/components/pixel/input-guide";
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
      <section id="feel-the-current" className="input-manual">
        <div className="manual-inner">
        <span className="micro-label">{t("FEEL THE CURRENT / INPUT MANUAL", "感受像素流 / 操作手册")}</span>
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
        </div>
      </section>
      <CrossCurrent />
      <SignalAtlas />
      <ModeDecision />
      <WorkshopEnding />
    </main>
  );
}
