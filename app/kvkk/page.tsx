// -*- coding: utf-8 -*-
import type { Metadata } from "next";
import GeciciNot from "@/components/ui/GeciciNot";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import { GECICI, MARKA } from "@/data/franchise";
import { ILETISIM } from "@/data/site";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
  description:
    "Franchise başvuru formu ve iletişim formu için KVKK aydınlatma metni: işlenen veriler, amaç, hukuki sebep, saklama ve haklarınız.",
  alternates: { canonical: "/kvkk/" },
};

/** TASLAK; hukuk onayı bekliyor. Köşeli parantezli alanlar ([ticari unvan], [süre])
 *  markadan ve hukukçudan gelecek, uydurulmaz. Metin İKİ formu birden karşılar. */
function Bolum({ baslik, children }: { baslik: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-krem/14 pt-7">
      <h2 className="font-display text-[1.15rem] font-bold leading-snug text-krem">{baslik}</h2>
      <div className="mt-3 space-y-3 leading-relaxed text-krem/78">{children}</div>
    </section>
  );
}

export default function KvkkSayfasi() {
  return (
    <section
      data-zemin="yesil-koyu"
      className="relative isolate overflow-x-clip bg-yesil-koyu pt-28 pb-24 md:pt-32 md:pb-28"
    >
      <div className="mx-auto max-w-[var(--container-site)] px-5 md:px-8">
        <div className="max-w-[68ch]">
          <Eyebrow>KVKK</Eyebrow>
          <h1 className="mt-4 font-display text-h2 font-black text-krem">Aydınlatma Metni</h1>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-krem/78">
            Franchise başvuru formu ve iletişim formu ile toplanan kişisel veriler hakkında, 6698 sayılı
            Kişisel Verilerin Korunması Kanunu md. 10 uyarınca.
          </p>
          {GECICI && (
            <GeciciNot sinif="mt-6 max-w-[62ch]">
              Taslak metin. Veri sorumlusunun ticari unvanı, tebligat adresi ve saklama süreleri hukuk
              onayından sonra doldurulacak; çerez politikası da o turda yazılacak. Site bugün ölçüm ya da
              pazarlama çerezi kullanmıyor.
            </GeciciNot>
          )}
        </div>

        <div className="mt-14 grid max-w-[68ch] gap-7">
          <Bolum baslik="Veri sorumlusu">
            <p>{MARKA.ad} ({MARKA.tescil}), [ticari unvan ve tebligat adresi].</p>
            <p>
              Merkez: {ILETISIM.merkez.adres}. Başvuru ve talepler için:{" "}
              <a href={`mailto:${ILETISIM.merkez.eposta}`} className="underline decoration-krem/40 underline-offset-2 hover:text-krem">
                {ILETISIM.merkez.eposta}
              </a>
            </p>
          </Bolum>

          <Bolum baslik="İşlenen veriler">
            <p>
              <strong className="font-semibold text-krem">Franchise başvuru formu:</strong> ad soyad, telefon
              numarası, il/ilçe, işletme metrekaresi, toplam bütçe aralığı ve forma yazdığınız not.
            </p>
            <p>
              <strong className="font-semibold text-krem">İletişim formu:</strong> ad soyad, telefon numarası,
              şehir, seçtiğiniz konu ve mesajınız.
            </p>
            <p>Formlarda kimlik numarası, adres ya da ödeme bilgisi istenmez.</p>
          </Bolum>

          <Bolum baslik="İşleme amacı">
            <p>
              Franchise başvurunuzu değerlendirmek, sizinle iletişime geçmek ve uygun görülmesi hâlinde
              franchise sürecini yürütmek; iletişim formunda ise mesajınızı ilgili birime iletmek ve yanıtlamak.
            </p>
          </Bolum>

          <Bolum baslik="Hukuki sebep">
            <p>
              KVKK md. 5/2-c (sözleşmenin kurulmasıyla doğrudan ilgili olması) ve md. 5/2-f (meşru menfaat).
              Ticari elektronik ileti gönderimi ise yalnızca açık rızanıza dayanır (KVKK md. 5/1 ve 6563 sayılı Kanun).
            </p>
          </Bolum>

          <Bolum baslik="Aktarım">
            <p>
              Form verileri, başvuruları toplamak için kullanılan form hizmeti sağlayıcısına iletilir; üçüncü
              kişilerle pazarlama amacıyla paylaşılmaz, yurt dışına aktarım için ayrıca bilgilendirme yapılır.
            </p>
          </Bolum>

          <Bolum baslik="Saklama süresi">
            <p>[süre]: başvuru ya da talep sonuçlandıktan sonra veriler silinir, yok edilir veya anonim hâle getirilir.</p>
          </Bolum>

          <Bolum baslik="Haklarınız">
            <p>
              KVKK md. 11 kapsamında verilerinize erişme, düzeltilmesini ve silinmesini isteme, işlemeye itiraz
              etme haklarına sahipsiniz. Talebinizi {ILETISIM.merkez.eposta} adresine iletebilirsiniz.
            </p>
          </Bolum>

          <Bolum baslik="İki ayrı onay">
            <p>Formlardaki iki onay kutusu birbirinden bağımsızdır ve ayrı ayrı verilir:</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-alan border-l-2 border-yesil-acik bg-krem/6 px-5 py-4">
                <p className="text-[0.76rem] font-semibold tracking-[0.14em] text-yesil-acik">ZORUNLU</p>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-krem/85">
                  “Kişisel verilerimin franchise başvurumu değerlendirmek <em>(iletişim formunda: mesajımı
                  yanıtlamak)</em> amacıyla işlenmesini kabul ediyorum.”
                </p>
                <p className="mt-3 text-[0.85rem] text-soluk">
                  Bu onay olmadan form gönderilemez; verilerin işlenmesi başvurunun kendisi için gereklidir.
                </p>
              </div>
              <div className="rounded-alan border-l-2 border-turuncu bg-krem/6 px-5 py-4">
                <p className="text-[0.76rem] font-semibold tracking-[0.14em] text-turuncu-soluk">İSTEĞE BAĞLI</p>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-krem/85">
                  “Kampanya ve duyuruları ticari elektronik ileti olarak almak istiyorum.”
                </p>
                <p className="mt-3 text-[0.85rem] text-soluk">
                  İşaretsiz gelir, boş bırakılabilir; başvurunuzu etkilemez. Verirseniz her iletide çıkma
                  hakkınız saklıdır.
                </p>
              </div>
            </div>
          </Bolum>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Button href="/franchise#basvuru" tur="hayalet">Başvuru formuna dön</Button>
          <Button href="/iletisim#yazin" tur="hayalet">İletişim formuna dön</Button>
        </div>
      </div>
    </section>
  );
}
