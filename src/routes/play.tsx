import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Playfield } from "@/components/pixel/playfield";
import { useLanguage } from "@/lib/pixel-language";
export const Route = createFileRoute("/play")({
  head: () => ({
    meta: [
      { title: "Play — Pixel Current" },
      {
        name: "description",
        content:
          "Enter the focused pixel field. Explore freely or start a real 45-second signal challenge with pointer, touch or keyboard.",
      },
      { property: "og:title", content: "Play — Pixel Current" },
      {
        property: "og:description",
        content: "A focused, playable pixel field. Collect coral signals or simply wander.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PlayPage,
});
function PlayPage() {
  const { t } = useLanguage();
  return (
    <main>
      <div className="play-navigation">
        <Link to="/">
          <ArrowLeft size={14} />
          {t("Back to the introduction", "返回介绍")}
        </Link>
        <Link to="/how-to">
          {t("Input & rules", "操作与规则")}
          <ArrowUpRight size={14} />
        </Link>
      </div>
      <Playfield focused />
      <div className="play-note">
        <span>
          {t(
            "Explore at your pace. Challenge on your terms.",
            "按自己的节奏探索，按自己的意愿挑战。",
          )}
        </span>
        <span>
          {t(
            "Best score stays only for this visit. No leaderboard.",
            "最佳分数仅保留于本次访问。没有排行榜。",
          )}
        </span>
      </div>
    </main>
  );
}
