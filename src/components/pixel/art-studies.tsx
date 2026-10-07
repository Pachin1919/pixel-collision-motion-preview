import { asset } from "@/lib/asset";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/pixel-language";

export function CrossCurrent({ compact = false }: { compact?: boolean }) {
  const { t } = useLanguage();
  return <section className={`art-interlude ${compact ? "compact" : ""}`}>
    <div className="interlude-heading"><h2>{t("Where currents cross.", "像素流交汇之处。")}</h2><span>{t("CROSS-CURRENT / PIXEL STUDY", "交汇流 / 像素习作")}</span></div>
    <figure><img src={asset("assets/round2-cross-current.png")} width={1536} height={768} loading="lazy" decoding="async" alt={t("Cyan and cobalt square streams curl around an open, dark eddy, with scattered coral fragments.", "青色与钴蓝方块流环绕深色的空心涡旋，间有零散珊瑚色碎片。")}/><figcaption>{t("Two directions. One open centre.", "两个方向，一个留白的中心。")}</figcaption></figure>
  </section>;
}

export function SignalAtlas() {
  const { t } = useLanguage();
  return <section className="signal-atlas">
    <header><span className="micro-label">{t("FIELD NOTES", "场景笔记")}</span><h2>{t("A signal, up close.", "近看一个信号。")}</h2><p>{t("Three new still studies of the current: a crossing, a fragment, an interference.", "三幅新的像素流静态习作：交汇、碎片、干涉。")}</p></header>
    <figure className="atlas-fragments"><img src={asset("assets/round2-signal-fragments.png")} width={1024} height={1024} loading="lazy" decoding="async" alt={t("Coral square islands break into small fragments across a sparse blue-black field of cyan marks.", "珊瑚色方块岛散成细小碎片，分布在点缀稀疏青色标记的蓝黑场景中。")}/><figcaption><strong>{t("Signal fragments", "信号碎片")}</strong><span>{t("Coral gathers. Cyan leaves room.", "珊瑚色聚集，青色留下空间。")}</span></figcaption></figure>
    <figure className="atlas-interference"><img src={asset("assets/round2-interference.png")} width={768} height={1280} loading="lazy" decoding="async" alt={t("Two staggered vertical cyan and blue pixel columns weave past each other, interrupted by small coral seams.", "两列错落的青蓝像素纵向交织，几处细小珊瑚色接缝打断节奏。")}/><figcaption><strong>{t("Interference", "干涉")}</strong><span>{t("A dense rhythm meets a broken one.", "密集的节奏遇见断续的节奏。")}</span></figcaption></figure>
    <div className="atlas-note"><span className="note-square" aria-hidden="true"/><p>{t("In the challenge, coral is the target. Here, it is a pause in the pattern.", "挑战中，珊瑚色是目标；在这里，它是图案中的一次停顿。")}</p><Link to="/about">{t("Inside the workshop", "走进工作室")}<ArrowUpRight size={16}/></Link></div>
  </section>;
}

export function ModeDecision() {
  const { t } = useLanguage();
  return <section className="mode-decision">
    <div className="decision-explore"><span className="micro-label">{t("EXPLORE", "探索")}</span><h2>{t("Just wander.", "随意游走。")}</h2><p>{t("No timer, no score, no right direction. Follow the pixels for as long as you like.", "没有倒计时，没有分数，也没有正确方向。想跟着像素走多久，都可以。")}</p><Button variant="stageOutline" asChild><Link to="/play">{t("Enter the field", "进入场景")}<ArrowUpRight size={16}/></Link></Button></div>
    <div className="decision-challenge"><div className="decision-clock" aria-hidden="true">45<span>{t("SECONDS", "秒")}</span></div><div><span className="micro-label">{t("CHALLENGE", "挑战")}</span><h2>{t("Catch a signal.", "捕捉信号。")}</h2><p>{t("45 seconds. Coral squares. One point for every signal you touch. Pause whenever you need.", "45 秒，珊瑚色方块。每碰到一个信号，得一分。随时可以暂停。")}</p><Button variant="signal" onClick={() => { const field = document.querySelector<HTMLElement>(".playfield"); field?.querySelector<HTMLButtonElement>(".hero-actions .stage-outline-button")?.click(); field?.scrollIntoView({ behavior: "auto", block: "start" }); }}><Play size={15}/>{t("Start the challenge", "开始挑战")}</Button><Link to="/how-to" className="decision-rules">{t("Read the rules", "阅读规则")}<ArrowUpRight size={14}/></Link></div></div>
  </section>;
}

export function WorkshopEnding() {
  const { t } = useLanguage();
  return <section className="workshop-ending"><span className="micro-label">{t("FROM THE WORKSHOP", "来自工作室")}</span><h2>{t("The artwork leads.", "作品先行。")}</h2><p>{t("PACHIN’s original field stays playable above. These new still studies explore its signal world without replacing it.", "上方的 PACHIN 原版场景仍可游玩。新的静态习作探索它的信号世界，而不取代原作。")}</p><Link to="/about">{t("Artwork, process & credits", "作品、过程与鸣谢")}<ArrowUpRight size={16}/></Link></section>;
}