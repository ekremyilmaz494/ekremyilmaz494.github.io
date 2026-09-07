"use client";
/* eslint-disable react-hooks/immutability -- three.js sahnesi (kamera, materyal, ortam) mutasyonla sürülür; R3F'in çalışma biçimi bu. */
// -*- coding: utf-8 -*-
/** R3F SAHNESİ — örnek şube GLB'si + kaydırmaya bağlı kamera. Yalnız istemcide çalışır
 *  (SubeTuru içinden dynamic/ssr:false ile gelir). Kaydırma ilerlemesi ref'ten okunur:
 *  React state yok, her karede yeniden render yok; kamera useFrame içinde lerp eder. */
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import { SUBE_3D } from "@/data/franchise";
import { ornekle, yolKur } from "./gezintiYol";

export type SahneProps = {
  /** 0–1 kaydırma ilerlemesi; SubeTuru her kaydırma olayında yazar, sahne her karede okur. */
  ilerleme: RefObject<number>;
  /** Bölüm görünürken sürekli çizim; değilken "demand" (kimse invalidate etmez, GPU boşa dönmez). */
  aktif: boolean;
  onHazir: () => void;
  onHata: () => void;
};

const DRACO = "/draco/";
const ARKA_PLAN = "#EDE6D6";

/** Işık ve pozlama — TEK yer. 30.08.2026 ölçümü (Ekrem: "içi dışı çok parlak, renkler çok açık"):
 *  ACES + spot 22 cd ile iç yeşil duvar #D1E1BE (S 0.15) çıkıyordu; marka yeşili #428522 (S 0.74).
 *  Neutral ton eşlemesi aşırı pozlananı pastele çevirmez; spotlar fiziksel birim (cd), 2 m'de I/d². */
const TON_ESLEME = THREE.NeutralToneMapping;
const POZ = 0.80;          // toneMappingExposure
const ORTAM = 0.22;        // RoomEnvironment şiddeti
const GUNES = 1.15;        // directionalLight
const GOK_ISIK = 0.18;     // hemisphereLight
const SPOT = 5.5;          // tavan spotları (cd)
const KASA_SPOT = 5;       // kasa üstü
/** Kaynak .blend'de boyalı yüzeyler 0.55 (Cycles için); web'de GI yok, yarı parlaklık duvarı süte buluyor
 *  (yan duvar S 0.16 ölçüldü). Yalnız 0.55 bandındaki dokusuz, metal olmayan malzemeler matlaştırılır;
 *  lightbox/ekran/sos gibi parlak olanlar (≤0.38) ve dokulu olanlar (karo, ahşap) dokunulmaz. */
const BOYA_PURUZ = 0.90;
/** Koyu doygun renkte %4'lük beyaz spekülerlik bile mavi kanalı %60 artırıp doygunluğu 0.58→0.37 düşürdü (ölçüldü). */
const BOYA_SPEKULER = 0.15;
/** GLB camı alfa 0.22 beyaz-mavi düz örtü: camdan bakılan her şey (afiş dokusu S 0.27, duvar 0.37) süte bulanıyordu;
 *  Cycles camı dik bakışta ~%0 yansıtır. Web'de yansıma pürüzsüz yüzeyden zaten geliyor, örtü küçültülür. */
const CAM_OPAKLIK = 0.10;

function Dukkan({ onHazir }: { onHazir: () => void }) {
  const { scene } = useGLTF(SUBE_3D.dosya, DRACO);
  useEffect(() => {
    const boya = new Map<THREE.Material, THREE.MeshPhysicalMaterial>();   // paylaşılan malzeme bir kez çevrilir
    scene.traverse((o) => {
      const m = o as THREE.Mesh;
      if (!m.isMesh) return;
      m.castShadow = true;
      m.receiveShadow = true;
      const mat = m.material as THREE.MeshStandardMaterial;
      if (!mat) return;
      // cam: iç mekândan dışarı bakışta kapanmasın
      if (mat.transparent) { m.castShadow = false; mat.depthWrite = false; mat.opacity = CAM_OPAKLIK; return; }
      // boyalı/mat yüzeyler (yeniden koşturulduğunda 0.90'lık olanlar banda girmez → idempotent)
      // emisyonlu paneller (tabela, lightbox, menü) DOKUNULMAZ: Base Color siyah, görsel yalnız emisyondan gelir
      if (mat.emissiveMap || mat.emissive.getHex() !== 0) return;
      if (!mat.map && mat.metalness < 0.5 && mat.roughness > 0.45 && mat.roughness < 0.85) {
        let y = boya.get(mat);
        if (!y) {
          y = new THREE.MeshPhysicalMaterial({ name: mat.name, color: mat.color, roughness: BOYA_PURUZ, metalness: 0, specularIntensity: BOYA_SPEKULER, side: mat.side });
          boya.set(mat, y);
        }
        m.material = y;
      }
    });
    onHazir();
  }, [scene, onHazir]);
  return <primitive object={scene} />;
}

/** Prosedürel oda ortamı — dış dosya yok, model-viewer'ın "neutral"ına yakın. */
function Ortam() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const tex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = tex;
    scene.environmentIntensity = ORTAM;
    pmrem.dispose();
    return () => { tex.dispose(); scene.environment = null; };
  }, [gl, scene]);
  return null;
}

/** GPU bağlamı çalışma sırasında da kaybolabilir; boş tuval yerine postere dön. */
function GrafikDurumu({ onHata }: { onHata: () => void }) {
  const { gl } = useThree();
  useEffect(() => {
    const tuval = gl.domElement;
    const kayboldu = () => onHata();
    tuval.addEventListener("webglcontextlost", kayboldu);
    if (gl.getContext().isContextLost()) onHata();
    return () => tuval.removeEventListener("webglcontextlost", kayboldu);
  }, [gl, onHata]);
  return null;
}

/** Gökyüzü kubbesi: düz arka plan cam arkasında boş bej boşluk gibi okunuyordu (07. durak).
 *  Ufuk rengi = sis rengi; kubbe de ton eşlemesinden geçer ki sisle aynı çıksın (toneMapped=false iken ufuk
 *  bandı açık kalıyordu). Yarıçap uzak kırpma düzleminin altında: 80 m kubbe + 90 m far, kamera 13 m
 *  kaymışken kubbenin uzak yarısı kırpılıp arka planda bej delik açmıştı (poster karesinde ölçüldü). */
const GOK_UFUK = "#F5DCC0";   // ufuk: şeftali-bej (sıcak, sisle birleşir)
const GOK_ORTA = "#DCE3E9";   // ara: yumuşak açık gri-mavi
const GOK_TEPE = "#A3BDD6";   // tepe: açık mavi
const GOK_YARICAP = 120;
const UZAK = 200;
const YER_MERKEZ = "#BDB2A0"; // yer düzlemi: dükkân çevresi sıcak gri
const YER_KENAR = "#D8C9B4";  // kenar: ufka doğru açılır, sisle birleşir
const SIS = [30, 90] as const;
function Gok() {
  const geo = useMemo(() => {
    const g = new THREE.SphereGeometry(GOK_YARICAP, 32, 16);
    const pos = g.attributes.position;
    const tepe = new THREE.Color(GOK_TEPE), orta = new THREE.Color(GOK_ORTA), ufuk = new THREE.Color(GOK_UFUK), c = new THREE.Color();
    const renk = new Float32Array(pos.count * 3);
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i) / GOK_YARICAP;
      if (y < 0.22) c.copy(ufuk).lerp(orta, THREE.MathUtils.smoothstep(y, -0.02, 0.22));
      else c.copy(orta).lerp(tepe, THREE.MathUtils.smoothstep(y, 0.22, 0.85));
      renk.set([c.r, c.g, c.b], i * 3);
    }
    g.setAttribute("color", new THREE.BufferAttribute(renk, 3));
    return g;
  }, []);
  useEffect(() => () => geo.dispose(), [geo]);
  return (
    <mesh geometry={geo} renderOrder={-1}>
      <meshBasicMaterial vertexColors side={THREE.BackSide} fog={false} depthWrite={false} />
    </mesh>
  );
}

/** Sokak zemini: GLB'deki kaldırım cephe önünde 2.6 m'de bitiyor; ötesi sisle ufka bağlanır. */
function Sokak() {
  const geo = useMemo(() => {
    const g = new THREE.CircleGeometry(110, 64, 0, Math.PI * 2);
    const pos = g.attributes.position;
    const merkez = new THREE.Color(YER_MERKEZ), kenar = new THREE.Color(YER_KENAR), c = new THREE.Color();
    const renk = new Float32Array(pos.count * 3);
    for (let i = 0; i < pos.count; i++) {
      const r = Math.hypot(pos.getX(i), pos.getY(i)) / 110;
      c.copy(merkez).lerp(kenar, THREE.MathUtils.smoothstep(r, 0.05, 0.6));
      renk.set([c.r, c.g, c.b], i * 3);
    }
    g.setAttribute("color", new THREE.BufferAttribute(renk, 3));
    return g;
  }, []);
  useEffect(() => () => geo.dispose(), [geo]);
  return (
    <mesh geometry={geo} rotation-x={-Math.PI / 2} position={[2.5, -0.012, 0]} receiveShadow>
      <meshStandardMaterial vertexColors roughness={1} metalness={0} />
    </mesh>
  );
}

// kare başına yeni Vector3 üretilmesin diye modül düzeyinde geçici vektörler
const _kam = new THREE.Vector3();
const _hedef = new THREE.Vector3();

function Kamera({ ilerleme }: Pick<SahneProps, "ilerleme">) {
  const { camera } = useThree();
  const yol = useMemo(() => yolKur(), []);
  const durum = useRef({ kam: new THREE.Vector3(), hedef: new THREE.Vector3(), lens: 35, ilk: true });

  useFrame((_, dt) => {
    const t = THREE.MathUtils.clamp(ilerleme.current, 0, 1) * yol.toplam;
    const s = ornekle(yol.anahtar, t);
    _kam.set(s.kam[0], s.kam[1], s.kam[2]);
    _hedef.set(s.hedef[0], s.hedef[1], s.hedef[2]);
    const d = durum.current;
    if (d.ilk) { d.kam.copy(_kam); d.hedef.copy(_hedef); d.lens = s.lens; d.ilk = false; }
    // kare hızından bağımsız yumuşatma (Lenis zaten kaydırmayı yumuşatıyor; bu ikinci katman küçük)
    const f = 1 - Math.exp(-dt * 9);
    d.kam.lerp(_kam, f);
    d.hedef.lerp(_hedef, f);
    d.lens += (s.lens - d.lens) * f;

    camera.position.copy(d.kam);
    camera.lookAt(d.hedef);

    // lens → düşey FOV; yatay açı sabit tutulur (dikey ekranda görüş daralmasın)
    const pc = camera as THREE.PerspectiveCamera;
    const yatay = 2 * Math.atan(18 / d.lens);                       // 36 mm sensör
    const dusey = 2 * Math.atan(Math.tan(yatay / 2) / Math.max(pc.aspect, 0.5));
    const fov = THREE.MathUtils.radToDeg(Math.min(dusey, THREE.MathUtils.degToRad(80)));
    if (Math.abs(pc.fov - fov) > 0.01) { pc.fov = fov; pc.updateProjectionMatrix(); }
  });
  return null;
}

export default function SubeSahne({ ilerleme, aktif, onHazir, onHata }: SahneProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      frameloop={aktif ? "always" : "demand"}
      camera={{ fov: 38, near: 0.05, far: UZAK, position: [0, 2, 20] }}
      gl={{ antialias: true, toneMapping: TON_ESLEME, toneMappingExposure: POZ, powerPreference: "high-performance" }}
      style={{ touchAction: "pan-y" }}
    >
      <color attach="background" args={[ARKA_PLAN]} />
      <fog attach="fog" args={[GOK_UFUK, SIS[0], SIS[1]]} />
      <Ortam />
      <GrafikDurumu onHata={onHata} />
      <Gok />
      <Sokak />
      {/* güneş: cephe +Z'ye bakıyor (film cephesi x=3.44 → GLB z=0); ışık önden-sağdan-üstten */}
      <directionalLight
        position={[9, 16, 12]}
        intensity={GUNES}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0004}
        shadow-normalBias={0.02}
        shadow-camera-left={-14}
        shadow-camera-right={14}
        shadow-camera-top={14}
        shadow-camera-bottom={-14}
        shadow-camera-near={1}
        shadow-camera-far={60}
      />
      <hemisphereLight args={["#ffffff", "#bfb7a6", GOK_ISIK]} />
      {/* iç mekân tavan spotları: gerçek sahnedeki armatür hattı (tavan 3.20 m) */}
      {[-1.6, -3.6, -5.6, -7.4].map((z) => (
        <pointLight key={z} position={[3, 3.05, z]} intensity={SPOT} distance={9} decay={2} color="#fff3e0" />
      ))}
      <pointLight position={[5.2, 2.6, -1.4]} intensity={KASA_SPOT} distance={6} decay={2} color="#fff3e0" />
      <Dukkan onHazir={onHazir} />
      <Kamera ilerleme={ilerleme} />
    </Canvas>
  );
}

// Model yalnız Dukkan içindeki useGLTF çağrısında yüklenir; modül düzeyinde ek istek başlatılmaz.
