import { asset } from "@/lib/asset";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, Play, Pause, RotateCcw, Expand, Crosshair } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/pixel-language";
import { advanceGame, collectTarget, initialGame, type GameState } from "@/lib/pixel-game";
let sessionBest = 0;
let nextTarget = 1;
type Particle = {
  x: number;
  y: number;
  dx: number;
  dy: number;
  life: number;
  size: number;
  color: string;
};
type PixelWindow = Window & {
  __pixelEffects?: {
    mounted: number;
    loops: number;
    frames: number;
    bursts: number;
    maxParticles: number;
  };
};
export function Playfield({ focused = false }: { focused?: boolean }) {
  const { t } = useLanguage();
  const [, refreshMarker] = useState(0);
  const field = useRef<HTMLDivElement>(null),
    canvas = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<"explore" | "challenge">("explore");
  const [game, setGame] = useState<GameState>(initialGame),
    [motionPaused, setMotionPaused] = useState(false),
    [reduced, setReduced] = useState(false),
    [keyboard, setKeyboard] = useState(false),
    [best, setBest] = useState(sessionBest);
  const gameRef = useRef(game),
    marker = useRef({ x: 0.5, y: 0.52 }),
    burstRef = useRef<(x: number, y: number, click: boolean) => void>(() => {});
  const update = (fn: (s: GameState) => GameState) => {
    const next = fn(gameRef.current);
    gameRef.current = next;
    setGame(next);
  };
  const start = () => {
    setMode("challenge");
    update(() => ({ ...initialGame(), status: "running" }));
    field.current?.focus({ preventScroll: true });
  };
  const explore = () => {
    setMode("explore");
    update(initialGame);
  };
  useEffect(() => {
    const q = matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => setReduced(q.matches);
    change();
    q.addEventListener("change", change);
    return () => q.removeEventListener("change", change);
  }, []);
  useEffect(() => {
    const el = field.current,
      c = canvas.current;
    if (!el || !c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const win = window as PixelWindow;
    const debug = win.__pixelEffects ?? {
      mounted: 0,
      loops: 0,
      frames: 0,
      bursts: 0,
      maxParticles: 0,
    };
    win.__pixelEffects = debug;
    debug.mounted++;
    let width = 1,
      height = 1,
      raf = 0,
      visible = true,
      last = performance.now(),
      lastPaint = 0,
      lastBurst = 0,
      lastX = -100,
      lastY = -100,
      seed = 260928;
    let particles: Particle[] = [];
    const random = () => {
      seed = (Math.imul(seed, 1664525) + 1013904223) | 0;
      return (seed >>> 0) / 4294967296;
    };
    const palette = [
      "--pixel-cyan",
      "--pixel-blue",
      "--pixel-lilac",
      "--signal",
      "--pixel-ice",
    ].map((v) => getComputedStyle(el).getPropertyValue(v).trim());
    const burstPalette = ["--foreground", "--pixel-ice", "--primary", "--signal"].map((v) =>
      getComputedStyle(el).getPropertyValue(v).trim(),
    );
    const ambient = Array.from({ length: window.innerWidth < 700 ? 125 : 270 }, (_, i) => {
      const x = random(),
        band = i % 3;
      const y = Math.max(
        0.05,
        Math.min(
          0.93,
          ([0.19, 0.46, 0.73][band] ?? 0.46) +
            Math.sin(x * Math.PI * 2 + band * 1.7) * ([0.047, 0.082, 0.045][band] ?? 0.082) +
            (random() - 0.5) * ([0.11, 0.18, 0.09][band] ?? 0.18),
        ),
      );
      return {
        x,
        y,
        size: 2 + Math.floor(random() * 4),
        alpha: 0.42 + random() * 0.43,
        duration: 7 + random() * 11,
        delay: random() * 14,
        color: palette[Math.floor(random() * palette.length)] ?? palette[0] ?? "transparent",
      };
    });
    const resize = () => {
      const box = el.getBoundingClientRect();
      width = box.width;
      height = box.height;
      const dpr = Math.min(devicePixelRatio, width < 700 ? 1.5 : 2);
      c.width = width * dpr;
      c.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(performance.now());
    };
    const draw = (now: number) => {
      ctx.clearRect(0, 0, width, height);
      if (!reduced)
        for (const p of ambient) {
          const phase = (now / 1000 + p.delay) / p.duration;
          const wave = motionPaused ? 0 : Math.sin(phase * Math.PI);
          ctx.globalAlpha = p.alpha * (0.65 + wave * 0.25);
          ctx.fillStyle = p.color;
          ctx.fillRect(p.x * width + wave * 15, p.y * height - wave * 8, p.size, p.size);
        }
      for (const p of particles) {
        ctx.globalAlpha = p.life / 0.9;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, (p.size * p.life) / 0.9, (p.size * p.life) / 0.9);
      }
      ctx.globalAlpha = 1;
    };
    burstRef.current = (x, y, click) => {
      if (reduced || motionPaused || gameRef.current.status === "paused" || !visible || document.hidden) return;
      const now = performance.now();
      if (!click && (now - lastBurst < 95 || Math.hypot(x - lastX, y - lastY) < 15)) return;
      lastBurst = now;
      lastX = x;
      lastY = y;
      const count = Math.min(click ? 26 : 22, 72 - particles.length);
      if (count <= 0) return;
      debug.bursts++;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (random() - 0.5) * 0.5;
        const travel = 18 + random() * (click ? 70 : 64);
        particles.push({
          x,
          y,
          dx: Math.cos(angle) * travel * 2,
          dy: Math.sin(angle) * travel * 2,
          life: 0.9,
          size: 4 + Math.floor(random() * 5),
          color: burstPalette[Math.floor(random() * 4)] ?? burstPalette[0] ?? "transparent",
        });
      }
      debug.maxParticles = Math.max(debug.maxParticles, particles.length);
    };
    const tick = (now: number) => {
      const elapsed = Math.max(0, now - last);
      last = now;
      debug.frames++;
      const current = gameRef.current;
      if (current.status === "running") {
        let next = advanceGame(current, elapsed);
        if (next.status === "running" && next.targets.length < 3) {
          const targets = [...next.targets];
          while (targets.length < 3)
            targets.push({
              id: nextTarget++,
              x: 0.12 + random() * 0.76,
              y: 0.26 + random() * 0.46,
            });
          next = { ...next, targets };
        }
        gameRef.current = next;
        if (now - lastPaint > 60 || next.status === "ended") {
          setGame(next);
          lastPaint = now;
        }
        if (next.status === "ended") {
          sessionBest = Math.max(sessionBest, next.score);
          setBest(sessionBest);
        }
      }
      if (!motionPaused && !reduced && current.status !== "paused") {
        for (const p of particles) {
          p.x += (p.dx * elapsed) / 1000;
          p.y += (p.dy * elapsed) / 1000;
          p.dx *= 0.93;
          p.dy *= 0.93;
          p.life -= elapsed / 1000;
        }
        particles = particles.filter((p) => p.life > 0);
        draw(now);
      }
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
        debug.loops--;
      }
    };
    const sync = () => {
      const active = visible && !document.hidden && (gameRef.current.status === "running" || (!reduced && !motionPaused && gameRef.current.status !== "paused"));
      el.dataset["effectActive"] = String(active && !reduced && !motionPaused);
      if (active && !raf) {
        last = performance.now();
        debug.loops++;
        raf = requestAnimationFrame(tick);
      } else if (!active) { stop(); setGame(gameRef.current); }
    };
    const visibility = () => {
      last = performance.now();
      sync();
    };
    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? false;
        sync();
      },
      { threshold: 0.05 },
    );
    observer.observe(el);
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    document.addEventListener("visibilitychange", visibility);
    resize();
    sync();
    return () => {
      stop();
      debug.mounted--;
      observer.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      particles = [];
      burstRef.current = () => {};
      ctx.clearRect(0, 0, width, height);
    };
  }, [reduced, motionPaused, game.status]);
  const hit = (x: number, y: number) => {
    const el = field.current;
    if (!el) return;
    const b = el.getBoundingClientRect();
    const ids: number[] = [];
    for (const target of gameRef.current.targets)
      if (Math.abs(target.x * b.width - x) <= 24 && Math.abs(target.y * b.height - y) <= 24)
        ids.push(target.id);
    update((s) => ids.reduce((current, id) => collectTarget(current, id), s));
  };
  return (
    <section className={`play-section ${focused ? "focused" : ""}`}>
      <div
        ref={field}
        className={`playfield ${keyboard ? "keyboard-active" : ""} ${reduced || motionPaused ? "still" : ""}`}
        tabIndex={0}
        role="region"
        aria-label={t(
          "Interactive pixel field. Arrow keys or WASD move; Space bursts.",
          "互动像素场景。方向键或 WASD 移动，空格触发迸散。",
        )}
        data-status={game.status}
        data-remaining={Math.round(game.remaining)}
        data-score={game.score}
        data-reduced={reduced}
        onBlur={() => setKeyboard(false)}
        onKeyDown={(e) => {
          if (e.target !== e.currentTarget) return;
          const key = e.key.toLowerCase();
          const delta: Record<string, [number, number]> = {
            arrowleft: [-0.022, 0],
            a: [-0.022, 0],
            arrowright: [0.022, 0],
            d: [0.022, 0],
            arrowup: [0, -0.035],
            w: [0, -0.035],
            arrowdown: [0, 0.035],
            s: [0, 0.035],
          };
          if (delta[key] || key === " ") {
            e.preventDefault();
            setKeyboard(true);
            refreshMarker(value => value + 1);
            if (delta[key])
              marker.current = {
                x: Math.max(0.03, Math.min(0.97, marker.current.x + delta[key][0])),
                y: Math.max(0.18, Math.min(0.85, marker.current.y + delta[key][1])),
              };
            const b = field.current?.getBoundingClientRect();
            if (b) {
              hit(marker.current.x * b.width, marker.current.y * b.height);
              burstRef.current(marker.current.x * b.width, marker.current.y * b.height, true);
            }
          }
        }}
        onPointerMove={(e) => {
          if ((e.target as HTMLElement).closest("button,a")) return;
          const b = e.currentTarget.getBoundingClientRect();
          hit(e.clientX - b.left, e.clientY - b.top);
          burstRef.current(e.clientX - b.left, e.clientY - b.top, false);
        }}
        onPointerDown={(e) => {
          if ((e.target as HTMLElement).closest("button,a")) return;
          setKeyboard(false);
          const b = e.currentTarget.getBoundingClientRect();
          hit(e.clientX - b.left, e.clientY - b.top);
          burstRef.current(e.clientX - b.left, e.clientY - b.top, true);
        }}
      >
        <img className="original-art" src={asset("/assets/pixel-current.png")} alt="" />
        <div className="field-shade" />
        <canvas ref={canvas} className="particle-canvas" aria-hidden="true" />
        <div className="stage-top">
          <span className="micro-label">
            <i className="status-dot" />
            {t("INTERACTIVE PLAY / 001", "互动实验 / 001")}
          </span>
          <span className="micro-label stage-caption">
            {t("SIGNAL CARRIED BY PARTICLES", "由粒子承载的信号")}
          </span>
        </div>
        {mode === "explore" ? (
          <div className="hero-copy">
            <div className="hero-eyebrow">
              {t("A LITTLE CHAOS. A LITTLE CURIOSITY.", "一点混沌，一点好奇。")}
            </div>
            <h1>
              PIXEL
              <br />
              <span>
                CURRENT<span className="title-pixel">·</span>
              </span>
            </h1>
            <p>
              {t("A field of pixels. A moment to play.", "一片像素，一刻玩心。")}
              <br />
              {t("Move through it. See what happens.", "穿行其中，看看会发生什么。")}
            </p>
            <div className="hero-actions">
              <Button
                variant="signal"
                onClick={() => {
                  field.current?.focus({ preventScroll: true });
                  setKeyboard(true);
                }}
              >
                <Crosshair size={16} />
                {t("Explore the current", "探索像素流")}
              </Button>
              <Button variant="stageOutline" onClick={start}>
                <Play size={14} />
                {t("45-second challenge", "45 秒挑战")}
                <ArrowUpRight size={15} />
              </Button>
            </div>
            <span className="hero-footnote">
              {t(
                "No score. No hurry. Just you and the current.",
                "没有分数，不用着急。只有你与像素流。",
              )}
            </span>
          </div>
        ) : (
          <>
            <div className="game-hud">
              <div>
                <span>{t("SIGNALS", "信号")}</span>
                <strong aria-live="polite">{String(game.score).padStart(2, "0")}</strong>
              </div>
              <div>
                <span>{t("TIME LEFT", "剩余时间")}</span>
                <strong>
                  {Math.ceil(game.remaining / 1000)}
                   <small>{t("s", "秒")}</small>
                </strong>
              </div>
              <div className="best-score">
                <span>{t("SESSION BEST", "本次访问最佳")}</span>
                <strong>{best}</strong>
              </div>
            </div>
            {game.status === "paused" && (
              <div className="game-message">
                <h2>{t("CURRENT ON HOLD.", "像素流，暂歇。")}</h2>
                <p>{t("Your time and signals are waiting.", "时间与信号都在等你。")}</p>
                <Button
                  variant="signal"
                  onClick={() => update((s) => ({ ...s, status: "running" }))}
                >
                  <Play size={16} />
                  {t("Resume", "继续")}
                </Button>
              </div>
            )}
            {game.status === "ended" && (
              <div className="game-message">
                <span className="micro-label">
                  {t("45 SECONDS. YOUR CURRENT.", "45 秒，你的像素流。")}
                </span>
                <h2>
                  {game.score}
                  <span>{t(" signals collected.", " 个信号已收集。")}</span>
                </h2>
                <p>
                  {t("A small trace of a moment well played.", "一次尽兴的游玩，留下一点痕迹。")}
                </p>
                <div>
                  <Button variant="signal" onClick={start}>
                    <RotateCcw size={16} />
                    {t("Try again", "再玩一次")}
                  </Button>
                  <Button variant="stageOutline" onClick={explore}>
                    {t("Back to Explore", "返回探索")}
                  </Button>
                </div>
              </div>
            )}
            {game.status === "running" &&
              game.targets.map((target) => (
                <Button
                  key={target.id}
                  variant="target"
                  className="signal-target"
                  aria-label={t(`Collect signal ${target.id}`, `收集信号 ${target.id}`)}
                  style={
                    {
                      "--target-x": `${target.x * 100}%`,
                      "--target-y": `${target.y * 100}%`,
                    } as CSSProperties
                  }
                  onPointerEnter={(e) => {
                    if (e.pointerType !== "touch") {
                      const b = field.current?.getBoundingClientRect();
                      if (b) burstRef.current(e.clientX - b.left, e.clientY - b.top, false);
                      update((s) => collectTarget(s, target.id));
                    }
                  }}
                  onPointerDown={() => update((s) => collectTarget(s, target.id))}
                  onClick={(e) => { if (e.detail === 0) update((s) => collectTarget(s, target.id)); }}
                >
                  <span />
                </Button>
              ))}
          </>
        )}
        {keyboard && (
          <div
            className="focus-marker"
            style={
              {
                "--target-x": `${marker.current.x * 100}%`,
                "--target-y": `${marker.current.y * 100}%`,
              } as CSSProperties
            }
            aria-hidden="true"
          >
            <Crosshair size={28} />
          </div>
        )}
        <div className="stage-bottom">
          <span className="field-instruction">
            <span className="tiny-cross">+</span>
            {mode === "explore"
              ? t("Move to scatter. Tap to collide.", "移动拨散，轻点碰撞。")
              : t(
                  "Find the coral squares. One signal, one point.",
                  "寻找珊瑚色方块。一个信号，一分。",
                )}
          </span>
          <div className="stage-tools">
            {mode === "challenge" ? (
              <>
                <Button
                  variant="stageTool"
                  disabled={game.status === "ended"}
                  onClick={() =>
                    update((s) => ({ ...s, status: s.status === "running" ? "paused" : "running" }))
                  }
                >
                  {game.status === "running" ? <Pause size={14} /> : <Play size={14} />}{" "}
                  {game.status === "running" ? t("Pause", "暂停") : t("Resume", "继续")}
                </Button>
                <Button
                  variant="stageTool"
                  aria-label={t("Reset challenge", "重置挑战")}
                  title={t("Reset challenge", "重置挑战")}
                  onClick={start}
                >
                  <RotateCcw size={15} />
                </Button>
                <Button variant="stageTool" onClick={explore}>
                  {t("Explore", "探索")}
                </Button>
              </>
            ) : (
              <Button
                variant="stageTool"
                disabled={reduced}
                aria-pressed={motionPaused}
                onClick={() => setMotionPaused(!motionPaused)}
              >
                {motionPaused ? <Play size={13} /> : <Pause size={13} />}{" "}
                {reduced
                  ? t("Reduced motion", "已减少动态")
                  : motionPaused
                    ? t("Resume motion", "继续动态")
                    : t("Pause motion", "暂停动态")}
              </Button>
            )}
            {!focused && (
              <Button variant="stageTool" asChild>
                <Link
                  to="/play"
                  aria-label={t("Open focused play", "打开专注游玩")}
                  title={t("Open focused play", "打开专注游玩")}
                >
                  <Expand size={15} />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
      {!focused && (
        <div className="hero-edge">
          <span>{t("BUILT FOR YOUR CURIOSITY", "为好奇心而生")}</span>
          <a href="#feel-the-current">
            {t("A little further", "再往下看看")}
            <ArrowDown size={14} />
          </a>
          <span>{t("ENJOY THE SMALL THINGS", "享受小小乐趣")}</span>
        </div>
      )}
    </section>
  );
}
