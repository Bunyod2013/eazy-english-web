"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import {
  translations,
  languageLabels,
  type Language,
} from "@/lib/translations";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Zap,
  Gamepad2,
  Bot,
  Flame,
  Volume2,
  Check,
  X,
  Loader2,
} from "lucide-react";

const LANGUAGES: Language[] = ["uz", "en", "ru"];

type TranslationSet = (typeof translations)[Language];

/* ────────────────────────────────────────────
   Scroll-reveal wrapper (IntersectionObserver)
   ──────────────────────────────────────────── */
function FadeIn({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8",
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ────────────────────────────────────────────
   Animated progress bar (animates on scroll)
   ──────────────────────────────────────────── */
function AnimatedProgress({
  target,
  className,
}: {
  target: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Small delay so the transition is visible
          setTimeout(() => setValue(target), 200);
          obs.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <div ref={ref}>
      <Progress
        value={value}
        className={cn(
          "h-3 bg-brand/20 [&>[data-slot=progress-indicator]]:bg-brand [&>[data-slot=progress-indicator]]:transition-transform [&>[data-slot=progress-indicator]]:duration-1000 [&>[data-slot=progress-indicator]]:ease-out",
          className
        )}
      />
    </div>
  );
}

/* ────────────────────────────────────────────
   Exercise tabs (listening + sentence builder)
   ──────────────────────────────────────────── */
function ExerciseTabs({ t }: { t: TranslationSet }) {
  const [tab, setTab] = useState<"listen" | "build">("build");
  return (
    <div className="w-full max-w-sm space-y-3">
      <div className="flex rounded-xl bg-muted/50 p-1 gap-1">
        <button
          type="button"
          onClick={() => setTab("build")}
          className={cn(
            "flex-1 rounded-lg py-2 text-sm font-medium transition-all duration-200",
            tab === "build"
              ? "bg-white text-brand shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {t.exercise.buildSentence.split(" ").slice(0, 2).join(" ")}
        </button>
        <button
          type="button"
          onClick={() => setTab("listen")}
          className={cn(
            "flex-1 rounded-lg py-2 text-sm font-medium transition-all duration-200",
            tab === "listen"
              ? "bg-white text-brand shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {t.exercise.listen}
        </button>
      </div>
      {tab === "build" ? (
        <SentenceBuilderCard t={t} />
      ) : (
        <ExerciseCard t={t} />
      )}
    </div>
  );
}

/* ────────────────────────────────────────────
   Sentence builder card
   ──────────────────────────────────────────── */
const SENTENCE = ["My", "name", "is", "Bunyod"];
const EXTRA_WORDS = ["Hello", "I", "am"];
const ALL_WORDS = [...SENTENCE, ...EXTRA_WORDS];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function SentenceBuilderCard({ t }: { t: TranslationSet }) {
  const [selected, setSelected] = useState<string[]>([]);
  const [available, setAvailable] = useState<string[]>(ALL_WORDS);
  const [phase, setPhase] = useState<"idle" | "correct" | "incorrect">("idle");

  useEffect(() => {
    setAvailable(shuffle(ALL_WORDS));
  }, []);

  const addWord = (word: string, idx: number) => {
    if (phase !== "idle") return;
    setSelected((s) => [...s, word]);
    setAvailable((a) => a.filter((_, i) => i !== idx));
  };

  const removeWord = (idx: number) => {
    if (phase !== "idle") return;
    const word = selected[idx];
    setSelected((s) => s.filter((_, i) => i !== idx));
    setAvailable((a) => [...a, word]);
  };

  const handleCheck = () => {
    if (selected.length === 0 || phase !== "idle") return;
    const isCorrect = selected.join(" ") === SENTENCE.join(" ");
    setPhase(isCorrect ? "correct" : "incorrect");
    setTimeout(() => {
      setPhase("idle");
      setSelected([]);
      setAvailable(shuffle(ALL_WORDS));
    }, 2000);
  };

  const handleReset = () => {
    if (phase !== "idle") return;
    setSelected([]);
    setAvailable(shuffle(ALL_WORDS));
  };

  return (
    <Card className="w-full max-w-sm border-0 py-0 shadow-xl shadow-brand/10 transition-shadow duration-500 hover:shadow-2xl hover:shadow-brand/20">
      <CardContent className="space-y-5 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="font-semibold">{t.exercise.level}</span>
          <span className="text-sm text-muted-foreground">8/20</span>
        </div>

        {/* Instruction */}
        <p className="text-sm font-medium text-muted-foreground">
          {t.exercise.buildSentence}
        </p>

        {/* Answer area */}
        <div
          className={cn(
            "min-h-[52px] rounded-xl border-2 border-dashed p-3 flex flex-wrap gap-2 transition-colors duration-300",
            phase === "correct"
              ? "border-brand bg-brand/5"
              : phase === "incorrect"
                ? "border-red-400 bg-red-50"
                : selected.length > 0
                  ? "border-brand/40"
                  : "border-muted"
          )}
        >
          {selected.length === 0 ? (
            <span className="text-xs text-muted-foreground self-center">
              {t.exercise.tapWords}
            </span>
          ) : (
            selected.map((word, i) => (
              <button
                key={i}
                type="button"
                onClick={() => removeWord(i)}
                disabled={phase !== "idle"}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-sm font-medium border-2 transition-all duration-200 active:scale-[0.97]",
                  phase === "correct"
                    ? "border-brand bg-brand/10 text-brand"
                    : phase === "incorrect"
                      ? "border-red-400 bg-red-50 text-red-600"
                      : "border-brand/30 bg-brand/5 text-brand hover:bg-red-50 hover:border-red-300 hover:text-red-500"
                )}
              >
                {word}
              </button>
            ))
          )}
        </div>

        {/* Word tiles */}
        <div className="flex flex-wrap gap-2">
          {available.map((word, i) => (
            <button
              key={i}
              type="button"
              onClick={() => addWord(word, i)}
              disabled={phase !== "idle"}
              className={cn(
                "rounded-xl border-2 px-3 py-1.5 text-sm font-medium transition-all duration-200 active:scale-[0.97]",
                "border-muted hover:border-brand/40 hover:bg-brand/5 hover:shadow-sm",
                phase !== "idle" && "pointer-events-none opacity-50"
              )}
            >
              {word}
            </button>
          ))}
        </div>

        {/* Result message */}
        {(phase === "correct" || phase === "incorrect") && (
          <div
            className={cn(
              "flex items-center justify-center gap-2 rounded-lg p-2 text-sm font-semibold animate-fade-in-up",
              phase === "correct"
                ? "bg-green-50 text-brand"
                : "bg-red-50 text-red-500"
            )}
          >
            {phase === "correct" ? (
              <Check className="size-4" />
            ) : (
              <X className="size-4" />
            )}
            {phase === "correct" ? t.exercise.correct : t.exercise.incorrect}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={handleReset}
            disabled={phase !== "idle"}
            className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground disabled:opacity-40"
          >
            {t.exercise.skip}
          </button>
          <Button
            onClick={handleCheck}
            disabled={selected.length === 0 || phase !== "idle"}
            className={cn(
              "rounded-xl px-8 font-semibold text-white transition-all duration-300",
              phase === "correct"
                ? "bg-brand"
                : phase === "incorrect"
                  ? "bg-red-500"
                  : "bg-brand hover:bg-brand-dark hover:shadow-md hover:shadow-brand/20 active:scale-[0.97]"
            )}
          >
            {phase === "correct" ? (
              <Check className="size-4" />
            ) : phase === "incorrect" ? (
              <X className="size-4" />
            ) : null}
            {phase === "correct"
              ? t.exercise.correct
              : phase === "incorrect"
                ? t.exercise.incorrect
                : t.exercise.check}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

/* ────────────────────────────────────────────
   Interactive exercise card
   ──────────────────────────────────────────── */
function ExerciseCard({ t }: { t: TranslationSet }) {
  const [selected, setSelected] = useState<"buenos" | "dobroe" | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [checkPhase, setCheckPhase] = useState<
    "idle" | "checking" | "correct" | "incorrect"
  >("idle");
  const [shakeOptions, setShakeOptions] = useState(false);

  const playSound = () => {
    if (typeof window === "undefined") return;
    if (isPlaying) {
      speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance("Good morning");
    utterance.lang = "en-US";
    utterance.rate = 0.85;
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    setIsPlaying(true);
    speechSynthesis.speak(utterance);
  };

  const handleCheck = () => {
    if (checkPhase !== "idle") return;

    if (!selected) {
      setShakeOptions(true);
      setTimeout(() => setShakeOptions(false), 500);
      return;
    }

    setCheckPhase("checking");
    setTimeout(() => {
      const isCorrect = selected === "dobroe";
      setCheckPhase(isCorrect ? "correct" : "incorrect");
      setTimeout(() => {
        setCheckPhase("idle");
        setSelected(null);
      }, 2000);
    }, 3000);
  };

  const handleSkip = () => {
    if (checkPhase !== "idle") return;
    setSelected(null);
    setCheckPhase("idle");
  };

  return (
    <Card className="w-full max-w-sm border-0 py-0 shadow-xl shadow-brand/10 transition-shadow duration-500 hover:shadow-2xl hover:shadow-brand/20">
      <CardContent className="space-y-5 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="font-semibold">{t.exercise.level}</span>
          <span className="text-sm text-muted-foreground">12/20</span>
        </div>

        {/* Listen prompt */}
        <button
          type="button"
          onClick={playSound}
          className="flex w-full items-center gap-3 rounded-xl bg-green-50 p-4 text-left transition-all duration-300 hover:bg-green-100 active:scale-[0.98]"
        >
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand transition-all duration-300",
              isPlaying && "animate-pulse-ring scale-110"
            )}
          >
            <Volume2
              className={cn(
                "size-5 text-white transition-transform duration-300",
                isPlaying && "scale-110"
              )}
            />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">
              {t.exercise.listen}
            </div>
            <div className="font-semibold">&ldquo;Good morning&rdquo;</div>
          </div>
        </button>

        {/* Answer options */}
        <div
          className={cn(
            "grid grid-cols-2 gap-3",
            shakeOptions && "animate-shake"
          )}
        >
          <button
            type="button"
            onClick={() => checkPhase === "idle" && setSelected("buenos")}
            className={cn(
              "rounded-xl border-2 p-3 text-sm font-medium transition-all duration-200 active:scale-[0.97]",
              selected === "buenos"
                ? "border-brand bg-brand/5 text-brand shadow-sm shadow-brand/10"
                : "border-muted hover:border-brand/40 hover:shadow-sm",
              checkPhase === "incorrect" &&
                selected === "buenos" &&
                "border-red-400 bg-red-50 text-red-600",
              checkPhase !== "idle" && "pointer-events-none"
            )}
          >
            Buenos dias
          </button>
          <button
            type="button"
            onClick={() => checkPhase === "idle" && setSelected("dobroe")}
            className={cn(
              "rounded-xl border-2 p-3 text-sm font-medium transition-all duration-200 active:scale-[0.97]",
              selected === "dobroe"
                ? "border-brand bg-brand/5 text-brand shadow-sm shadow-brand/10"
                : "border-muted hover:border-brand/40 hover:shadow-sm",
              checkPhase === "correct" &&
                "border-brand bg-brand/10 text-brand",
              checkPhase !== "idle" && "pointer-events-none"
            )}
          >
            Xayrli tong
          </button>
        </div>

        {/* Result message */}
        {(checkPhase === "correct" || checkPhase === "incorrect") && (
          <div
            className={cn(
              "flex items-center justify-center gap-2 rounded-lg p-2 text-sm font-semibold animate-fade-in-up",
              checkPhase === "correct"
                ? "bg-green-50 text-brand"
                : "bg-red-50 text-red-500"
            )}
          >
            {checkPhase === "correct" ? (
              <Check className="size-4" />
            ) : (
              <X className="size-4" />
            )}
            {checkPhase === "correct"
              ? t.exercise.correct
              : t.exercise.incorrect}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={handleSkip}
            className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            {t.exercise.skip}
          </button>
          <Button
            onClick={handleCheck}
            disabled={checkPhase === "correct" || checkPhase === "incorrect"}
            className={cn(
              "rounded-xl px-8 font-semibold text-white transition-all duration-300",
              checkPhase === "checking"
                ? "bg-brand/70"
                : checkPhase === "correct"
                  ? "bg-brand"
                  : checkPhase === "incorrect"
                    ? "bg-red-500"
                    : "bg-brand hover:bg-brand-dark hover:shadow-md hover:shadow-brand/20 active:scale-[0.97]"
            )}
          >
            {checkPhase === "checking" ? (
              <Loader2 className="size-4 animate-spin" />
            ) : checkPhase === "correct" ? (
              <Check className="size-4" />
            ) : checkPhase === "incorrect" ? (
              <X className="size-4" />
            ) : null}
            {checkPhase === "checking"
              ? ""
              : checkPhase === "correct"
                ? t.exercise.correct
                : checkPhase === "incorrect"
                  ? t.exercise.incorrect
                  : t.exercise.check}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

/* ────────────────────────────────────────────
   Main Landing Page
   ──────────────────────────────────────────── */
export function LandingPage() {
  const [lang, setLang] = useState<Language>("uz");
  const t = translations[lang];

  return (
    <div className="min-h-screen bg-background">
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 border-b border-white/20 bg-white/40 backdrop-blur-xl backdrop-saturate-150 shadow-[0_4px_30px_rgba(0,0,0,0.05)]">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <img src="/eazyenglish-logo.png" alt="EazyEnglish" width={32} height={32} className="h-8 w-8 rounded-md" />
            <span className="text-xl font-bold">
              Eazy<span className="text-brand">English</span>
            </span>
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#"
              className="text-sm font-medium text-foreground transition-colors duration-200 hover:text-brand"
            >
              {t.nav.home}
            </a>
            <a
              href="#features"
              className="text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-brand"
            >
              {t.nav.features}
            </a>
            <a
              href="https://app.eazy-english.uz"
              className="text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-brand"
            >
              {t.nav.start}
            </a>
          </nav>

          <div className="flex items-center rounded-full bg-white/50 p-1 backdrop-blur-sm border border-white/30">
            {LANGUAGES.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-300",
                  lang === l
                    ? "bg-brand text-white shadow-sm shadow-brand/30"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {languageLabels[l]}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ── Hero Section ── */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <FadeIn delay={100}>
                <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                  {t.hero.titleLine1}{" "}
                  <span className="text-brand">{t.hero.titleLine2}</span>
                </h1>
              </FadeIn>

              <FadeIn delay={200}>
                <p className="max-w-md text-lg text-muted-foreground">
                  {t.hero.subtitle}
                </p>
              </FadeIn>

              <FadeIn delay={300}>
                <Button
                  asChild
                  className="h-12 rounded-full bg-brand px-8 text-base font-semibold text-white transition-all duration-300 hover:bg-brand-dark hover:shadow-lg hover:shadow-brand/25 active:scale-[0.97]"
                >
                  <a href="https://app.eazy-english.uz">
                    <Zap className="size-5" />
                    {t.hero.cta}
                  </a>
                </Button>
              </FadeIn>
            </div>

            {/* Exercise Cards */}
            <FadeIn delay={300} className="flex flex-col items-center gap-4 lg:items-end">
              <ExerciseTabs t={t} />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section id="features" className="bg-muted/30 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="mb-12 text-center text-3xl font-bold sm:text-4xl">
              {t.features.heading}
            </h2>
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-3">
            {(
              [
                {
                  icon: Gamepad2,
                  iconClass: "text-brand",
                  bgClass: "bg-green-100",
                  title: t.features.gamifiedTitle,
                  desc: t.features.gamifiedDesc,
                },
                {
                  icon: Bot,
                  iconClass: "text-red-500",
                  bgClass: "bg-red-100",
                  title: t.features.aiTitle,
                  desc: t.features.aiDesc,
                },
                {
                  icon: Flame,
                  iconClass: "text-orange-500",
                  bgClass: "bg-orange-100",
                  title: t.features.streakTitle,
                  desc: t.features.streakDesc,
                },
              ] as const
            ).map((f, i) => (
              <FadeIn key={i} delay={i * 150}>
                <Card className="group border py-0 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <CardContent className="space-y-4 px-6 py-8">
                    <div
                      className={cn(
                        "mx-auto flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110",
                        f.bgClass
                      )}
                    >
                      <f.icon className={cn("size-7", f.iconClass)} />
                    </div>
                    <h3 className="text-lg font-bold">{f.title}</h3>
                    <p className="text-sm text-muted-foreground">{f.desc}</p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Progress & Leaderboard Section ── */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-8 md:grid-cols-2">
            {/* Progress tracker */}
            <FadeIn>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">{t.progress.heading}</h2>
                <p className="text-muted-foreground">
                  {t.progress.description}
                </p>

                <Card className="py-0 shadow-sm transition-shadow duration-300 hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="font-semibold">
                        {t.progress.nextLevel}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        240/500 XP
                      </span>
                    </div>
                    <AnimatedProgress target={48} />
                  </CardContent>
                </Card>
              </div>
            </FadeIn>

            {/* Leaderboard */}
            <FadeIn delay={200}>
              <Card className="py-0 shadow-sm transition-shadow duration-300 hover:shadow-md">
                <CardHeader className="px-6 pb-2 pt-6">
                  <CardTitle>{t.leaderboard.heading}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1 px-6 pb-6">
                  {[
                    {
                      name: "Anna K.",
                      xp: "2,450 XP",
                      bg: "bg-amber-100",
                      textColor: "text-amber-600",
                      highlight: false,
                    },
                    {
                      name: "You",
                      xp: "2,150 XP",
                      bg: "bg-green-100",
                      textColor: "text-brand",
                      highlight: true,
                    },
                    {
                      name: "Marcus",
                      xp: "1,980 XP",
                      bg: "bg-orange-100",
                      textColor: "text-orange-600",
                      highlight: false,
                    },
                  ].map((entry, i) => (
                    <div
                      key={i}
                      className={cn(
                        "flex items-center justify-between rounded-lg p-3 transition-all duration-200 hover:bg-muted/50",
                        entry.highlight && "-mx-3 bg-brand/5 hover:bg-brand/10"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-full text-sm transition-transform duration-200 hover:scale-110",
                            entry.bg
                          )}
                        >
                          🔥
                        </span>
                        <span className="font-medium">{entry.name}</span>
                      </div>
                      <span className={cn("font-semibold", entry.textColor)}>
                        {entry.xp}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-center text-sm text-muted-foreground">
              {t.footer.copyright}
            </p>
            <a
              href="https://app.eazy-english.uz/legal/privacy"
              className="text-sm text-muted-foreground transition-colors duration-200 hover:text-brand"
            >
              {t.footer.privacy}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
