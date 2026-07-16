import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useAnimationFrame, useReducedMotion } from "framer-motion";

const SIZE = 18; // px (muy pequeño)
const HALF = SIZE / 2;
const GAP = 30; // separación respecto al cursor (nunca queda debajo)
const BASE_TILT = -18; // pose inicial
const IDLE_SPEED = 26; // grados/seg en reposo
const FAST_SPEED = 320; // grados/seg mientras la web "trabaja"
const MIN_BUSY = 700; // ms mínimos de giro rápido por click
const FOLLOW = 0.18; // suavizado del seguimiento (0-1 por frame ~16ms)

// Las 6 caras: rotación propia + empuje hacia fuera por translateZ.
const FACES = [
  `translateZ(${HALF}px)`,
  `rotateY(180deg) translateZ(${HALF}px)`,
  `rotateY(90deg) translateZ(${HALF}px)`,
  `rotateY(-90deg) translateZ(${HALF}px)`,
  `rotateX(90deg) translateZ(${HALF}px)`,
  `rotateX(-90deg) translateZ(${HALF}px)`,
];

// Caras sólidas y bordes nítidos (evita aspecto borroso al ser pequeño).
const FACE_CLASS =
  "absolute inset-0 rounded-[4px] border bg-[#FC5185]/25 border-[#FC5185] " +
  "dark:bg-[#2ee6b6]/25 dark:border-[#2ee6b6]";

// Ratios no enteros → el eje de giro precesa (ni horizontal, ni vertical, ni
// diagonal fija: un tumble con variación).
const AXIS = { x: 0.53, y: 1, z: 0.29 };

/**
 * Cubo decorativo pequeño que FLOTA junto al cursor (solo desktop). Escribe el
 * transform directamente en el DOM desde un único rAF (sin motion values ni
 * estado por frame): seguimiento suave + tumble en 3 ejes, y giro rápido
 * mientras se pulsa cualquier enlace/botón hasta que la web carga.
 */
export default function MouseCube() {
  const reduced = useReducedMotion();
  const router = useRouter();
  const wrapRef = useRef(null); // elemento posicionado (traslación)
  const cubeRef = useRef(null); // elemento que rota

  const s = useRef({
    tx: 0,
    ty: 0, // objetivo (cursor + gap)
    px: 0,
    py: 0, // posición suavizada actual
    ax: BASE_TILT,
    ay: 0,
    az: 12, // ángulos
    speed: IDLE_SPEED,
    busyUntil: 0,
    pendingNav: false,
    seen: false,
  });

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    const st = s.current;
    const wrap = wrapRef.current;
    const cube = cubeRef.current;
    if (!wrap || !cube) return;

    // Seguimiento suave hacia el cursor.
    const k = Math.min(1, (delta / 16) * FOLLOW);
    st.px += (st.tx - st.px) * k;
    st.py += (st.ty - st.py) * k;

    // Velocidad de giro (se acelera al pulsar enlaces/botones).
    const now = performance.now();
    const busy = st.pendingNav || now < st.busyUntil;
    const targetSpeed = busy ? FAST_SPEED : IDLE_SPEED;
    st.speed += (targetSpeed - st.speed) * Math.min(1, delta / 220);

    const stepDeg = (delta / 1000) * st.speed;
    st.ax += stepDeg * AXIS.x;
    st.ay += stepDeg * AXIS.y;
    st.az += stepDeg * AXIS.z;

    wrap.style.transform = `translate3d(${st.px}px, ${st.py}px, 0)`;
    wrap.style.opacity = st.seen ? "1" : "0";
    cube.style.transform = `rotateX(${st.ax}deg) rotateY(${st.ay}deg) rotateZ(${st.az}deg)`;
  });

  useEffect(() => {
    if (reduced) return undefined;
    const st = s.current;

    const onMove = (e) => {
      st.tx = e.clientX + GAP - HALF;
      st.ty = e.clientY + GAP - HALF;
      if (!st.seen) {
        // Aparece en la posición correcta (sin volar desde la esquina).
        st.px = st.tx;
        st.py = st.ty;
        st.seen = true;
      }
    };

    const onInteractive = (e) => {
      if (
        e.target?.closest?.(
          'a, button, [role="button"], input[type="submit"], summary'
        )
      ) {
        st.busyUntil = performance.now() + MIN_BUSY;
      }
    };

    const onNavStart = () => {
      st.pendingNav = true;
    };
    const onNavEnd = () => {
      st.pendingNav = false;
      st.busyUntil = Math.max(st.busyUntil, performance.now() + 250);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("pointerdown", onInteractive, true);
    router.events.on("routeChangeStart", onNavStart);
    router.events.on("routeChangeComplete", onNavEnd);
    router.events.on("routeChangeError", onNavEnd);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("pointerdown", onInteractive, true);
      router.events.off("routeChangeStart", onNavStart);
      router.events.off("routeChangeComplete", onNavEnd);
      router.events.off("routeChangeError", onNavEnd);
    };
  }, [reduced, router.events]);

  if (reduced) return null;

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block"
      style={{
        width: SIZE,
        height: SIZE,
        perspective: 500,
        opacity: 0,
        willChange: "transform",
        transition: "opacity 0.3s ease",
      }}
    >
      {/* Glow sutil detrás del cubo (sin desenfocar el cubo) */}
      <div className="absolute inset-0 -z-10 scale-110 rounded-full bg-[#FC5185]/30 blur-md dark:bg-[#2ee6b6]/30" />
      <div
        ref={cubeRef}
        className="relative h-full w-full [transform-style:preserve-3d]"
        style={{ transform: `rotateX(${BASE_TILT}deg) rotateZ(12deg)` }}
      >
        {FACES.map((transform, i) => (
          <div key={i} className={FACE_CLASS} style={{ transform }} />
        ))}
      </div>
    </div>
  );
}
