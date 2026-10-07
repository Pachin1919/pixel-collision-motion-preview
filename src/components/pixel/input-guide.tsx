import { ArrowRight, MousePointer2, Hand, Keyboard, CornerDownLeft } from "lucide-react";
import { useLanguage } from "@/lib/pixel-language";
export function InputGuide() {
  const { t } = useLanguage();
  return (
    <div className="input-guide">
      <article>
        <div className="input-diagram pointer-diagram">
          <span className="trail-dot" />
          <span className="trail-dot" />
          <span className="trail-dot" />
          <MousePointer2 size={32} />
          <ArrowRight className="diagram-arrow" size={24} />
          <span className="geometry-target" aria-hidden="true" />
        </div>
        <div className="step-label">
          <span>01</span>
          <MousePointer2 size={14} />
          {t("POINTER", "鼠标")}
        </div>
        <h3>{t("Move into the current.", "让指针进入像素流。")}</h3>
        <p>
          {t(
            "Move your pointer to scatter pixels. Touch a coral signal to collect it. No click needed.",
            "移动指针，拨散像素。碰到珊瑚色信号即可收集，无需点击。",
          )}
        </p>
      </article>
      <article>
        <div className="input-diagram touch-diagram">
          <span className="touch-square" />
          <Hand size={36} />
        </div>
        <div className="step-label">
          <span>02</span>
          <Hand size={14} />
          {t("TOUCH", "触屏")}
        </div>
        <h3>{t("Tap. Leave a little ripple.", "轻点，留下一圈涟漪。")}</h3>
        <p>
          {t(
            "Tap anywhere to burst. In a challenge, tap a coral square to collect one signal. Scroll normally.",
            "轻点任意位置触发迸散。挑战中，轻点珊瑚色方块收集信号。页面仍可正常滚动。",
          )}
        </p>
      </article>
      <article>
        <div className="input-diagram keys-diagram">
          <div>
            <kbd>W</kbd>
          </div>
          <div>
            <kbd>A</kbd>
            <kbd>S</kbd>
            <kbd>D</kbd>
          </div>
          <span className="keyboard-path" aria-hidden="true"><ArrowRight size={20}/><span className="geometry-target" /></span>
          <CornerDownLeft size={20} />
        </div>
        <div className="step-label">
          <span>03</span>
          <Keyboard size={14} />
          {t("KEYBOARD", "键盘")}
        </div>
        <h3>{t("Follow your own direction.", "沿着自己的方向走。")}</h3>
        <p>
          {t(
            "Focus the field with Tab. Arrow keys or WASD move your marker; Space sends a burst. Reach a square to collect it.",
            "按 Tab 聚焦场景。方向键或 WASD 移动标记，空格触发迸散。抵达方块即可收集。",
          )}
        </p>
      </article>
    </div>
  );
}
