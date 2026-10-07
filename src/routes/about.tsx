import { asset } from "@/lib/asset";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SectionIntro } from "@/components/pixel/site-shell";
import { useLanguage } from "@/lib/pixel-language";
export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Artwork & process — Pixel Current" },
      {
        name: "description",
        content:
          "The original PACHIN pixel-wave artwork, native collision interaction, design process and licensed typography behind Pixel Current.",
      },
      { property: "og:title", content: "Artwork & process — Pixel Current" },
      {
        property: "og:description",
        content: "An original pixel-wave study expanded into a playful browser artifact.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});
function About() {
  const { t } = useLanguage();
  return (
    <main className="detail-page about-page">
      <Link to="/" className="back-link">
        <ArrowLeft size={14} />
        {t("Back to the current", "返回像素流")}
      </Link>
      <SectionIntro number="01 /" label={t("BEHIND THE CURRENT", "像素流的背后")} />
      <div className="detail-heading">
        <h1>
          {t("From a study.", "始于习作。")}
          <br />
          <span>{t("Into a small world.", "成为小小世界。")}</span>
        </h1>
        <p>
          {t(
            "Pixel Current is an independent browser interaction toy, grown from PACHIN’s original pixel-collision motion study.",
            "Pixel Current 是一款独立的浏览器互动玩具，从 PACHIN 原版像素碰撞动态习作中生长而来。",
          )}
        </p>
      </div>
      <figure className="artwork-figure">
        <img
          src={asset("/assets/pixel-current.png")}
          alt={t(
            "Original pixel-wave painting: three flowing bands of blue and cyan squares with coral signals on a deep blue-black field.",
            "原版像素波浪作品：蓝黑色背景上，三条蓝色与青色方块流带，点缀珊瑚色信号。",
          )}
        />
        <figcaption>
          <span>{t("THE ORIGINAL FIELD / PACHIN", "原版场景 / PACHIN")}</span>
          <span>pixel-current.png</span>
        </figcaption>
      </figure>
      <section className="process-section">
        <SectionIntro number="02 /" label={t("WHAT STAYS. WHAT GROWS.", "留下什么，生长什么。")} />
        <div>
          <h2>{t("The artwork leads.", "作品先行。")}</h2>
          <p>
            {t(
              "The original painted composition stays intact: three drifting bands, electric blues, and quiet coral interruptions. The image is centered and cover-aligned, not rebuilt or recolored.",
              "原版绘制的构图完整保留：三条流带、电光般的蓝色，以及安静的珊瑚色点缀。图像居中铺满，不重绘，也不改色。",
            )}
          </p>
          <h2>{t("The gesture remains.", "动作依旧。")}</h2>
          <p>
            {t(
              "Ambient pixels follow the source’s seeded wave pattern. Pointer movement sends the same compact, radial collision bursts; clicking remains optional. The interaction now lives in a bounded native Canvas layer.",
              "环境像素沿用原版固定种子的波浪分布。移动指针仍触发紧凑的放射状碰撞迸散，无需点击。互动现由有数量上限的原生 Canvas 图层承载。",
            )}
          </p>
          <h2>{t("A reason to return.", "多一个回来的理由。")}</h2>
          <p>
            {t(
              "The signal challenge adds a real clock and real collisions, not a simulated score. Bilingual pages, keyboard play and a still reduced-motion mode make room for more ways to explore.",
              "信号挑战加入真实计时与真实碰撞，而不是模拟分数。双语页面、键盘游玩与减少动态后的静态模式，让探索有更多可能。",
            )}
          </p>
        </div>
      </section>
      <section className="credits-section">
        <SectionIntro number="03 /" label={t("ARTWORK & CREDITS", "作品与鸣谢")} />
        <dl>
          <div>
            <dt>{t("Original artwork & study", "原版作品与动态习作")}</dt>
            <dd>
              PACHIN / Pachin1919{" "}
              <a
                href="https://github.com/Pachin1919/pixel-collision-motion-preview/tree/3d0d5452fd9b63a3c204ee2c0e2096392304ea81"
                target="_blank"
                rel="noreferrer"
              >
                {t("View source", "查看源代码")}
                <ArrowUpRight size={14} />
              </a>
            </dd>
          </div>
          <div>
            <dt>{t("Original interaction", "原版互动")}</dt>
            <dd>
              {t(
                "Seeded pixel drift and pointer-triggered collision bursts. Adapted from the supplied HTML, CSS and JavaScript.",
                "固定种子的像素漂移与指针触发的碰撞迸散，改编自所提供的 HTML、CSS 与 JavaScript。",
              )}
            </dd>
          </div>
          <div>
            <dt>{t("Typography", "字体")}</dt>
            <dd>
              Barlow Condensed · IBM Plex Sans · Noto Sans SC{" "}
              <div className="license-links">
                <a href={asset("/assets/barlow-condensed-LICENSE.txt")}>Barlow OFL ↗</a>
                <a href={asset("/assets/ibm-plex-sans-LICENSE.txt")}>Plex OFL ↗</a>
                <a href={asset("/assets/noto-sans-sc-LICENSE.txt")}>Noto OFL ↗</a>
              </div>
            </dd>
          </div>
          <div>
            <dt>{t("Artwork permission", "作品授权")}</dt>
            <dd>
              {t(
                "Used for this owner-authorized expansion. The original artwork is project-specific and is not offered for general reuse.",
                "用于本次所有者授权的扩展。原版作品属于本项目，不对外提供通用复用授权。",
              )}
            </dd>
          </div>
        </dl>
      </section>
      <div className="about-return">
        <p>
          {t(
            "Enough about the pixels. Go make a ripple.",
            "像素的故事说到这里，去掀起一点涟漪吧。",
          )}
        </p>
        <Link to="/play">
          {t("Enter the current", "进入像素流")}
          <ArrowUpRight />
        </Link>
      </div>
    </main>
  );
}
