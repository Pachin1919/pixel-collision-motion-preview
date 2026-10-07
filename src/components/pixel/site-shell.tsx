import { Link } from "@tanstack/react-router";
import { ArrowUpRight, MoveUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/pixel-language";
export function SiteHeader() {
  const { language, setLanguage, t } = useLanguage();
  return (
    <header className="site-header">
      <Link to="/" className="wordmark" aria-label={t("Pixel Current home", "Pixel Current 首页")}>
        <span className="pixel-logo" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
        PIXEL CURRENT
      </Link>
      <nav aria-label={t("Main navigation", "主导航")}>
        <Link to="/play" activeProps={{ className: "nav-active" }}>
          {t("Play", "开始玩")}
        </Link>
        <Link to="/how-to" activeProps={{ className: "nav-active" }}>
          {t("How to", "玩法")}
        </Link>
        <Link to="/about" activeProps={{ className: "nav-active" }}>
          {t("About", "关于")}
        </Link>
      </nav>
      <div className="language-switch" aria-label={t("Language", "语言")}>
        <Button
          variant="language"
          aria-pressed={language === "en"}
          onClick={() => setLanguage("en")}
        >
          EN
        </Button>
        <span>/</span>
        <Button
          variant="language"
          aria-pressed={language === "zh"}
          onClick={() => setLanguage("zh")}
        >
          中文
        </Button>
      </div>
    </header>
  );
}
export function SiteFooter() {
  const { t } = useLanguage();
  return (
    <footer className="site-footer">
      <Link to="/" className="footer-brand">
        PIXEL CURRENT <MoveUpRight size={16} />
      </Link>
      <span>{t("A small experiment in playful interaction.", "一场关于互动与玩心的小实验。")}</span>
      <Link to="/about">
        {t("Artwork & credits", "作品与鸣谢")} <ArrowUpRight size={14} />
      </Link>
    </footer>
  );
}
export function SectionIntro({ number, label }: { number: string; label: string }) {
  return (
    <div className="section-label">
      <span>{number}</span>
      <span>{label}</span>
    </div>
  );
}
