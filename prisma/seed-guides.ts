import type { PrismaClient } from "../src/generated/prisma/client";
import { stockImage } from "../src/lib/stock-images";

interface GuideSectionSeed {
  heading: string;
  content: string;
}

interface GuideSeed {
  title: string;
  slug: string;
  excerpt: string;
  focusKeyword: string;
  seoTitle: string;
  seoDescription: string;
  coverImageUrl: string;
  readingMinutes: number;
  sortOrder: number;
  sections: GuideSectionSeed[];
}

const guides: GuideSeed[] = [
  {
    title: "Ayder Turu Rehberi: Yayla, Şelale ve Gezilecek Yerler",
    slug: "ayder-turu-rehberi",
    focusKeyword: "Ayder turu",
    seoTitle: "Ayder Turu Rehberi 2026 | Gezilecek Yerler ve Rota İpuçları",
    seoDescription:
      "Ayder turu planlıyor musunuz? Gelintulu Şelalesi, termal bölge, yayla manzaraları ve günübirlik Ayder gezi rehberi — Kaçkarlı Tur rotasıyla.",
    excerpt:
      "Ayder Yaylası, Karadeniz'in en tanınmış destinasyonlarından biri. Bu rehberde Ayder turu rotası, gezilecek noktalar ve günübirlik planlama ipuçlarını bulacaksınız.",
    coverImageUrl: stockImage("mistyValley", 1200),
    readingMinutes: 7,
    sortOrder: 1,
    sections: [
      {
        heading: "Ayder turu neden popüler?",
        content:
          "Ayder, Çamlıhemşin sınırları içinde yer alan ve yıl boyunca yerli ve yabancı turistlerin ilgisini çeken bir yayla bölgesidir. Yeşil vadiler, ahşap köprüler ve termal kaynaklarıyla Ayder turu, Rize gezisinin vazgeçilmez durağıdır.\n\nKaçkarlı Tur günübirlik rotasında Ayder, Fırtına Vadisi'nden sonra programın en keyifli molalarından biridir. Grup temposuna uygun planlanmış duraklar sayesinde hem fotoğraf çekmek hem de yayla atmosferini hissetmek için yeterli zaman ayrılır.",
      },
      {
        heading: "Ayder'de gezilecek yerler",
        content:
          "Gelintulu Şelalesi çevresindeki yürüyüş parkurları, geleneksel yayla evleri ve vadi manzarası Ayder turunun öne çıkan noktalarıdır. Kısa süreli serbest zamanla bölgeyi keşfetmek mümkündür.\n\nTermal tesisler ve yerel restoranlarda Karadeniz mutfağını deneyimleyebilirsiniz. Özellikle muhlama ve yayla çayı, Ayder molasının klasik lezzetleridir.",
      },
      {
        heading: "Ayder turu ne zaman yapılmalı?",
        content:
          "Haziran'dan Eylül sonuna kadar yayla yolları açık ve manzara en canlı dönemindedir. İlkbahar yağışları sonrası yeşillik zirve yapar; sonbaharda ise sis ve renk geçişleri fotoğraf tutkunları için idealdir.\n\nHafta içi turlar genellikle daha sakin geçer. Hafta sonu yoğunluğu artabilir; erken rezervasyon önerilir.",
      },
      {
        heading: "Kaçkarlı Tur Ayder rotası",
        content:
          "Günübirlik yayla turumuz Ayder'i Fırtına Vadisi, Zil Kalesi seyir noktası ve Pokut–Sal yaylalarıyla birleştirir. Rize merkezden hareketle tek günde Karadeniz'in en ikonik duraklarını deneyimleyebilirsiniz.\n\nTur programı ve müsait tarihler için /turlar sayfamızı inceleyebilir veya /iletisim üzerinden bilgi alabilirsiniz.",
      },
    ],
  },
  {
    title: "Rize Günübirlik Tur Rehberi: Tek Günde Yaylalar",
    slug: "rize-gunubirlik-tur-rehberi",
    focusKeyword: "Rize günübirlik tur",
    seoTitle: "Rize Günübirlik Tur Rehberi | Yayla Rotası ve Program",
    seoDescription:
      "Rize günübirlik tur nasıl planlanır? Ayder, Pokut, Sal ve Fırtına Vadisi rotası, biniş noktaları ve günübirlik yayla turu ipuçları.",
    excerpt:
      "Rize günübirlik tur ile Karadeniz'in yaylalarını tek günde keşfetmek mümkün. Rota, süre ve hazırlık rehberi.",
    coverImageUrl: stockImage("mountainPeaks", 1200),
    readingMinutes: 8,
    sortOrder: 2,
    sections: [
      {
        heading: "Rize günübirlik tur nedir?",
        content:
          "Rize günübirlik tur, sabah Rize merkez veya belirlenen biniş noktalarından başlayıp akşam aynı noktaya dönülen organize yayla gezisidir. Konaklama gerektirmez; gün boyunca rehber eşliğinde planlı duraklar ve molalar yapılır.\n\nKaçkarlı Tur'un ana programı bu model üzerine kuruludur: Fırtına Vadisi'nden Ayder'e, ardından Pokut ve Sal yaylalarına uzanan kapsamlı bir rota.",
      },
      {
        heading: "Günübirlik rotada hangi duraklar var?",
        content:
          "Tipik rota Fırtına Vadisi fotoğraf molası, Zil Kalesi seyir noktası, Ayder yaylası, öğle yemeği molası, Pokut ve Sal yaylaları ile gün sonu dönüşü kapsar. Her durakta yeterli süre ayrılır.\n\nYolculuk klimalı ve bakımlı araçlarla yapılır. Grup büyüklüğü konfor ve güvenlik için sınırlı tutulur.",
      },
      {
        heading: "Kimler için uygun?",
        content:
          "Aileler, çiftler ve doğa fotoğrafçıları için idealdir. Orta düzey yürüyüş gerektiren kısa parkurlar isteğe bağlıdır; ana program araçla ilerler.\n\nÇocuklu aileler ve ilk kez yayla turuna çıkacak misafirler için rehberli günübirlik tur en güvenli seçenektir.",
      },
      {
        heading: "Rezervasyon ve tarih seçimi",
        content:
          "Yaz sezonunda kontenjan dolabilir. Müsait tarihleri görmek için /rezervasyon sayfasını ziyaret edin veya WhatsApp ile yazın.\n\nHava koşullarına göre rota güvenliği önceliklidir; gerektiğinde durak sırası güncellenir.",
      },
    ],
  },
  {
    title: "Hüser Sis Denizi: Pokut ve Sal Manzarası Rehberi",
    slug: "huser-sis-denizi-rehberi",
    focusKeyword: "Hüser sis denizi",
    seoTitle: "Hüser Sis Denizi Rehberi | Pokut Sal Manzara Noktası",
    seoDescription:
      "Hüser sis denizi nedir, nasıl görülür? Pokut ve Sal yaylaları arasındaki efsanevi sis denizi manzarası için rehber ve tur ipuçları.",
    excerpt:
      "Hüser'de bulutların vadileri kapladığı sis denizi, Kaçkarların en etkileyici manzaralarından biri. Ne zaman gidilir, nasıl görülür?",
    coverImageUrl: stockImage("naturePanorama", 1200),
    readingMinutes: 6,
    sortOrder: 3,
    sections: [
      {
        heading: "Hüser sis denizi nedir?",
        content:
          "Hüser, Pokut ve Sal yaylaları hattında yer alan ve özellikle sabah saatlerinde bulutların vadileri doldurduğu 'sis denizi' manzarasıyla ünlü bir noktadır. Karadeniz'in en çok paylaşılan doğa fotoğraflarından biri burada çekilir.\n\nHava koşulları uygun olduğunda bulut tabakası vadilerin altında kalır; yayla evleri bulutların üzerinde adeta bir ada gibi görünür.",
      },
      {
        heading: "En iyi görüş zamanı",
        content:
          "Sabah erken saatler ve hafif rüzgârlı, nemli günler sis denizi için idealdir. Yaz aylarında sıklıkla görülür ancak garanti edilemez; doğanın sunduğu anlık bir görsel şölen olarak değerlendirilmelidir.\n\nRehberli tur ile doğru noktaya en uygun saatte ulaşmak şansı artar.",
      },
      {
        heading: "Pokut ve Sal bağlantısı",
        content:
          "Hüser manzarası genellikle Pokut–Sal rotası üzerinde deneyimlenir. Kaçkarlı Tur programında bu yaylalar günün öne çıkan duraklarıdır.\n\nYayla evleri, çay molaları ve geniş panorama bu bölgenin ayrılmaz parçasıdır.",
      },
      {
        heading: "Fotoğraf ve güvenlik ipuçları",
        content:
          "Manzara noktalarında rüzgâra karşı hazırlıklı olun; katmanlı giyinin. Fotoğraf için geniş açı lens ve sabah ışığı tercih edilir.\n\nGrup turunda rehber, güvenli seyir noktalarını gösterir.",
      },
    ],
  },
  {
    title: "Pokut Yaylası Turu: Sis Denizi ve Yayla Evleri",
    slug: "pokut-yaylasi-turu",
    focusKeyword: "Pokut yaylası turu",
    seoTitle: "Pokut Yaylası Turu | Gezi Rehberi ve Rota Bilgileri",
    seoDescription:
      "Pokut yaylası turu rehberi: sis denizi manzarası, yayla evleri, en iyi ziyaret zamanı ve Rize günübirlik tur rotası.",
    excerpt:
      "Pokut Yaylası, Karadeniz'in kartpostallık manzaralarına ev sahipliği yapar. Pokut yaylası turu planlama rehberi.",
    coverImageUrl: stockImage("alpineLake", 1200),
    readingMinutes: 6,
    sortOrder: 4,
    sections: [
      {
        heading: "Pokut yaylası nerede?",
        content:
          "Pokut, Rize'nin Çamlıhemşin ilçesinde, yaklaşık 2000 metre rakımda yer alan bir yayladır. Sal yaylasına yakınlığı ve Hüser manzarasıyla ünlüdür.\n\nYılın büyük bölümünde yeşil çayırlar, ahşap yayla evleri ve sisli manzaralar ziyaretçileri karşılar.",
      },
      {
        heading: "Pokut yaylası turunda neler yapılır?",
        content:
          "Panorama fotoğrafları, kısa yayla yürüyüşleri ve yerel lezzet molaları programın parçasıdır. Sis denizi oluştuğunda manzara unutulmaz bir deneyime dönüşür.\n\nKaçkarlı Tur rotasında Pokut, Sal ile birlikte günün ana yayla duraklarından biridir.",
      },
      {
        heading: "Ne giymeli, ne getirmeli?",
        content:
          "Yayla havası serin olabilir; katmanlı kıyafet ve rüzgâr geçirmeyen bir üst önerilir. Güneş kremi ve su şişesi unutulmamalıdır.\n\nRahat yürüyüş ayakkabısı kısa parkurlar için yeterlidir.",
      },
      {
        heading: "Tur rezervasyonu",
        content:
          "Pokut'u tek günde Ayder ve Fırtına Vadisi ile birleştiren program için /turlar sayfasına bakın. Kontenjan sınırlıdır.",
      },
    ],
  },
  {
    title: "Sal Yaylası Gezi Rehberi: Kaçkarların Kalbi",
    slug: "sal-yaylasi-gezi-rehberi",
    focusKeyword: "Sal yaylası",
    seoTitle: "Sal Yaylası Gezi Rehberi | Pokut Rotası ve Manzara",
    seoDescription:
      "Sal yaylası gezi rehberi: Pokut'a komşu yayla, sis denizi manzarası, ulaşım ve günübirlik tur programı.",
    excerpt:
      "Sal Yaylası, Pokut ile birlikte Kaçkar silüetinin en güzel görüldüğü noktalardan biri. Sal yaylası gezi rehberi.",
    coverImageUrl: stockImage("forestPath", 1200),
    readingMinutes: 6,
    sortOrder: 5,
    sections: [
      {
        heading: "Sal yaylasını tanıyalım",
        content:
          "Sal Yaylası, Pokut'un komşusu olarak bilinen ve geniş çayırlık alanlarıyla dikkat çeken bir yayladır. Geleneksel yayla yaşamının izlerini taşıyan ahşap evler hâlâ görülebilir.\n\nKaçkar Dağları silüeti birçok noktadan net şekilde izlenebilir.",
      },
      {
        heading: "Sal–Pokut rotası",
        content:
          "İki yayla birbirine yakın olduğu için günübirlik turlarda genellikle birlikte ziyaret edilir. Aradaki manzara noktaları fotoğraf için idealdir.\n\nRehber eşliğinde ilerlemek yol ve hava koşulları açısından avantaj sağlar.",
      },
      {
        heading: "Ziyaret önerileri",
        content:
          "Sabah erken saatler manzara ve sis için şansı artırır. Yayla sakinlerine ve doğaya saygılı davranmak bölgenin sürdürülebilir turizmi için önemlidir.\n\nÇöp bırakmamak ve belirlenen yürüyüş alanlarında kalmak temel kurallardır.",
      },
      {
        heading: "Kaçkarlı Tur ile Sal",
        content:
          "Sal yaylası, günübirlik rotamızın vazgeçilmez son yayla duraklarından biridir. Program detayları için /turlar sayfasını inceleyin.",
      },
    ],
  },
  {
    title: "Fırtına Vadisi Turu: Yeşil Vadi ve Zil Kalesi",
    slug: "firtina-vadisi-turu",
    focusKeyword: "Fırtına Vadisi turu",
    seoTitle: "Fırtına Vadisi Turu | Zil Kalesi ve Vadi Gezi Rehberi",
    seoDescription:
      "Fırtına Vadisi turu rehberi: coşkulu dere, yeşil yamaçlar, Zil Kalesi manzarası ve Rize günübirlik rota ipuçları.",
    excerpt:
      "Fırtına Vadisi, Karadeniz'in en dramatik doğa koridorlarından biri. Tur rotası ve gezilecek noktalar.",
    coverImageUrl: stockImage("mistyValley", 1200),
    readingMinutes: 7,
    sortOrder: 6,
    sections: [
      {
        heading: "Fırtına Vadisi neden özel?",
        content:
          "Fırtına Vadisi, adını aldığı coşkulu deresi ve yemyeşil yamaçlarıyla Rize turizminin simgesidir. Vadi boyunca köprüler, şelaleler ve tarihi yapılar bir arada görülür.\n\nKaçkarlı Tur rotasının ilk büyük manzara durağı genellikle bu vadide verilir.",
      },
      {
        heading: "Zil Kalesi seyir noktası",
        content:
          "Fırtına Deresi üzerindeki Zil Kalesi, vadi manzarasıyla birlikte fotoğraf için eşsiz bir noktadır. Kısa mola ile kale silüeti ve dere bir arada izlenebilir.\n\nTarihi yapı ve doğanın birleşimi bölgeye özgün bir karakter katar.",
      },
      {
        heading: "Vadi turu ipuçları",
        content:
          "Yağışlı havalarda yol ve yürüyüş koşulları değişebilir; rahat ayakkabı ve yağmurluk önerilir. Grup turunda tempo rehber tarafından ayarlanır.\n\nFotoğraf için sabah ışığı vadide özellikle güzeldir.",
      },
      {
        heading: "Rota bağlantısı",
        content:
          "Fırtına Vadisi turu Ayder ve yaylalarla birleştirildiğinde tam gün program oluşur. Detaylar /turlar sayfasında.",
      },
    ],
  },
  {
    title: "Kaçkar Dağları Tur Rehberi: Zirve Manzaraları",
    slug: "kackar-daglari-tur-rehberi",
    focusKeyword: "Kaçkar Dağları turu",
    seoTitle: "Kaçkar Dağları Tur Rehberi | Yayla ve Trekking Rotaları",
    seoDescription:
      "Kaçkar Dağları turu rehberi: zirve manzaraları, yayla rotaları, Pokut Sal ve günübirlik gezi planı.",
    excerpt:
      "Kaçkar Dağları, Türkiye'nin en etkileyici dağ silüetlerinden birine sahip. Tur ve gezi rehberi.",
    coverImageUrl: stockImage("mountainPeaks", 1200),
    readingMinutes: 7,
    sortOrder: 7,
    sections: [
      {
        heading: "Kaçkar Dağları hakkında",
        content:
          "Kaçkar Dağları, 3937 metrelik zirvesiyle Karadeniz'in en yüksek noktalarından biridir. Yaylalar, buzul gölleri ve zengin biyolojik çeşitlilik sunar.\n\nProfesyonel trekking dışında günübirlik yayla turları da Kaçkar silüetini yakından görmek için idealdir.",
      },
      {
        heading: "Günübirlik tur perspektifi",
        content:
          "Kaçkarlı Tur rotası zirve tırmanışı değil, yayla manzaraları ve vadi geçişleri üzerine kuruludur. Pokut, Sal ve Ayder'den Kaçkar silüeti farklı açılardan izlenir.\n\nBu model aileler ve ilk kez bölgeye gelenler için uygundur.",
      },
      {
        heading: "En iyi sezon",
        content:
          "Haziran–Eylül arası yayla yolları açık ve manzara nettir. İlkbahar yeşili, yaz canlılığı ve sonbahar renkleri farklı deneyimler sunar.",
      },
      {
        heading: "Planlama",
        content:
          "Rehberli tur ile güvenli ve planlı bir Kaçkar deneyimi yaşayın. /rezervasyon üzerinden tarih seçebilirsiniz.",
      },
    ],
  },
  {
    title: "Rize Yayla Turu Ne Zaman Yapılır?",
    slug: "rize-yayla-turu-ne-zaman",
    focusKeyword: "Rize yayla turu ne zaman",
    seoTitle: "Rize Yayla Turu Ne Zaman? En İyi Sezon Rehberi",
    seoDescription:
      "Rize yayla turu ne zaman yapılır? Ayder, Pokut, Sal için en iyi ay, hava durumu ve sezon ipuçları.",
    excerpt:
      "Rize yayla turu için en uygun dönem, hava koşulları ve yoğunluk rehberi.",
    coverImageUrl: stockImage("lakeReflection", 1200),
    readingMinutes: 5,
    sortOrder: 8,
    sections: [
      {
        heading: "Yayla sezonu ne zaman başlar?",
        content:
          "Yayla yolları genellikle Mayıs sonu–Haziran başında açılır; Eylül ortasına kadar aktif sezon devam eder. Bu dönem Rize yayla turu için idealdir.\n\nKış aylarında yüksek rakımlı yaylalara ulaşım kısıtlı veya kapalı olabilir.",
      },
      {
        heading: "Ay bazında öneriler",
        content:
          "Haziran: Taze yeşillik, serin hava. Temmuz–Ağustos: En canlı sezon, sis denizi şansı yüksek. Eylül: Daha sakin, renk geçişleri.\n\nHafta içi turlar daha az kalabalıktır.",
      },
      {
        heading: "Hava ve giyim",
        content:
          "Yayla havası değişkendir; katmanlı giyinmek önemlidir. Yağmurluk ve güneş koruması yıl boyunca önerilir.",
      },
      {
        heading: "Tarih seçimi",
        content:
          "Müsait tur tarihleri için /rezervasyon sayfasını kontrol edin.",
      },
    ],
  },
  {
    title: "Ayder'den Pokut'a Rota: Yayla Geçiş Rehberi",
    slug: "ayderden-pokuta-rota",
    focusKeyword: "Ayder Pokut rota",
    seoTitle: "Ayder'den Pokut'a Rota | Yayla Geçiş ve Tur Programı",
    seoDescription:
      "Ayder'den Pokut'a rota rehberi: günübirlik yayla turu, ara duraklar ve Kaçkarlı Tur programı.",
    excerpt:
      "Ayder'den Pokut yaylasına uzanan rota, Rize'nin en popüler günübirlik yayla geçişlerinden biri.",
    coverImageUrl: stockImage("naturePanorama", 1200),
    readingMinutes: 6,
    sortOrder: 9,
    sections: [
      {
        heading: "Rota özeti",
        content:
          "Ayder'den Pokut'a giden yol, Fırtına Vadisi ve yüksek yayla geçitleri üzerinden ilerler. Manzara her virajda değişir; rehberli tur bu rotayı güvenle tamamlamanızı sağlar.\n\nKaçkarlı Tur programı bu geçişi optimize edilmiş duraklarla sunar.",
      },
      {
        heading: "Ara duraklar",
        content:
          "Zil Kalesi, vadi seyir noktaları ve çay molaları rota boyunca yer alır. Öğle yemeği molası yayla restoranlarında Karadeniz lezzetleriyle yapılır.",
      },
      {
        heading: "Süre ve mesafe",
        content:
          "Günübirlik program yaklaşık 12 saat sürer; yol ve mola süreleri dahildir. Sabah erken hareket, akşam Rize merkeze dönüş planlanır.",
      },
      {
        heading: "Rezervasyon",
        content:
          "Ayder–Pokut–Sal rotasını /turlar sayfasından inceleyebilirsiniz.",
      },
    ],
  },
  {
    title: "Gelintulu Şelalesi Turu: Ayder'in Doğal Güzelliği",
    slug: "gelintulu-selalesi-turu",
    focusKeyword: "Gelintulu Şelalesi",
    seoTitle: "Gelintulu Şelalesi Turu | Ayder Gezi ve Fotoğraf Rehberi",
    seoDescription:
      "Gelintulu Şelalesi turu: Ayder yakınındaki şelale, ulaşım, en iyi ziyaret zamanı ve günübirlik rota.",
    excerpt:
      "Gelintulu Şelalesi, Ayder turunun en çok ziyaret edilen doğal güzelliklerinden biri.",
    coverImageUrl: stockImage("alpineLake", 1200),
    readingMinutes: 5,
    sortOrder: 10,
    sections: [
      {
        heading: "Gelintulu Şelalesi nerede?",
        content:
          "Gelintulu Şelalesi, Ayder Yaylası çevresinde yer alır ve yürüyüş mesafesinde ziyaret edilebilir. Şelale ve çevresindeki yeşil alan fotoğraf için popülerdir.\n\nAyder turu programlarında genellikle serbest zaman veya kısa yürüyüş molası olarak dahil edilir.",
      },
      {
        heading: "Ziyaret ipuçları",
        content:
          "Kaygan zeminlere karşı uygun ayakkabı giyin. Yağış sonrası su debisi artabilir; güvenlik işaretlerine uyun.\n\nSabah saatleri daha sakin ve fotoğraf için uygun olabilir.",
      },
      {
        heading: "Ayder turu ile birleştirme",
        content:
          "Gelintulu, Ayder molasının doğal parçasıdır. Günübirlik yayla turunda Ayder ve ardından Pokut–Sal rotası bir arada planlanır.",
      },
      {
        heading: "Tur bilgisi",
        content:
          "Program detayları için /turlar ve /rehberlerimiz sayfalarına bakın.",
      },
    ],
  },
  {
    title: "Zil Kalesi Turu: Fırtına Vadisi Manzarası",
    slug: "zil-kalesi-turu",
    focusKeyword: "Zil Kalesi turu",
    seoTitle: "Zil Kalesi Turu | Fırtına Vadisi Seyir ve Gezi Rehberi",
    seoDescription:
      "Zil Kalesi turu rehberi: Fırtına Deresi üzerindeki tarihi kale, manzara noktası ve Rize günübirlik rota.",
    excerpt:
      "Zil Kalesi, Fırtına Vadisi'nin en ikonik tarihi yapılarından biri. Tur ve seyir rehberi.",
    coverImageUrl: stockImage("forestPath", 1200),
    readingMinutes: 5,
    sortOrder: 11,
    sections: [
      {
        heading: "Zil Kalesi tarihi",
        content:
          "Zil Kalesi, Fırtına Deresi'nin iki yakasını birleştiren efsanevi bir yapıdır. Tarihi kaynaklarda farklı dönemlere atfedilir; günümüzde seyir ve fotoğraf noktası olarak ziyaret edilir.\n\nVadi ve dere manzarasıyla birlikte etkileyici bir silüet sunar.",
      },
      {
        heading: "Tur programında yeri",
        content:
          "Kaçkarlı Tur günübirlik rotasında Zil Kalesi seyir noktası planlı bir fotoğraf molasıdır. Kısa sürede en iyi açıdan görülebilir.",
      },
      {
        heading: "Fotoğraf önerileri",
        content:
          "Geniş açı lens ve sabah veya öğleden sonra ışığı idealdir. Sisli günler atmosferik kareler verir.",
      },
      {
        heading: "Rota bağlantısı",
        content:
          "Zil Kalesi, Ayder ve yaylalar rotasının başlangıç bölümünde yer alır. /turlar sayfasından programa bakın.",
      },
    ],
  },
  {
    title: "Çamlıhemşin Gezi Rehberi: Vadiler ve Yaylalar",
    slug: "camlihemsin-gezi-rehberi",
    focusKeyword: "Çamlıhemşin gezi",
    seoTitle: "Çamlıhemşin Gezi Rehberi | Ayder, Pokut ve Fırtına Vadisi",
    seoDescription:
      "Çamlıhemşin gezi rehberi: Ayder, Pokut, Sal yaylaları ve Fırtına Vadisi — Rize'nin doğa başkenti.",
    excerpt:
      "Çamlıhemşin, Ayder ve Kaçkar yaylalarının kalbi. Gezi ve tur rehberi.",
    coverImageUrl: stockImage("mistyValley", 1200),
    readingMinutes: 6,
    sortOrder: 12,
    sections: [
      {
        heading: "Çamlıhemşin neden önemli?",
        content:
          "Çamlıhemşin, Rize'nin en turistik ilçelerinden biridir. Ayder, Pokut, Sal ve Fırtına Vadisi bu ilçe sınırları içinde veya yakınında yer alır.\n\nYayla turizminin merkezi konumundadır.",
      },
      {
        heading: "Gezilecek ana noktalar",
        content:
          "Fırtına Vadisi, Ayder Yaylası, Gelintulu çevresi, Pokut ve Sal yaylaları tipik Çamlıhemşin turunun duraklarıdır.\n\nGünübirlik organize tur bu noktaları tek programda birleştirir.",
      },
      {
        heading: "Ulaşım",
        content:
          "Rize merkezden organize tur araçları en pratik seçenektir. Özel araçla gitmek isteyenler için yol durumu sezona göre değişir; rehberli tur önerilir.",
      },
      {
        heading: "Kaçkarlı Tur",
        content:
          "Çamlıhemşin rotamızın tamamını kapsayan program /turlar sayfasında.",
      },
    ],
  },
  {
    title: "Rize Turu Hazırlık Listesi: Yayla Gezisi İçin",
    slug: "rize-turu-hazirlik-listesi",
    focusKeyword: "Rize turu hazırlık",
    seoTitle: "Rize Turu Hazırlık Listesi | Yayla Gezisi İçin Gerekli Eşyalar",
    seoDescription:
      "Rize turu hazırlık listesi: günübirlik yayla turu için giyim, ekipman ve sağlık önerileri.",
    excerpt:
      "Rize yayla turuna çıkmadan önce yanınıza almanız gerekenler. Pratik hazırlık rehberi.",
    coverImageUrl: stockImage("lakeReflection", 1200),
    readingMinutes: 5,
    sortOrder: 13,
    sections: [
      {
        heading: "Giyim önerileri",
        content:
          "Katmanlı giyim: tişört, polar veya hırka, rüzgâr geçirmeyen üst. Rahat yürüyüş ayakkabısı şart. Şapka ve güneş gözlüğü yaz aylarında önemlidir.\n\nYağmurluk veya hafif yağmurluk her mevsimde önerilir; Karadeniz'de hava hızla değişebilir.",
      },
      {
        heading: "Çanta içeriği",
        content:
          "Su şişesi, atıştırmalık, kişisel ilaçlar, powerbank ve kamera. Kimlik ve rezervasyon bilgilerini yanınızda bulundurun.\n\nBüyük sırt çantası gerekmez; günübirlik tur için küçük bir daypack yeterlidir.",
      },
      {
        heading: "Sağlık notları",
        content:
          "Hareket kısıtlılığı veya kronik rahatsızlık varsa tur öncesi bildirin. Yayla rakımında hafif baş dönmesi yaşayanlar yavaş tempoda ilerlemelidir.",
      },
      {
        heading: "Tur öncesi",
        content:
          "Rezervasyon onayı ve biniş noktası bilgisini kontrol edin. /rezervasyon sayfasından detaylara ulaşın.",
      },
    ],
  },
  {
    title: "Günübirlik Yayla Turu Fiyatları: Nelere Dikkat Edilmeli?",
    slug: "gunubirlik-yayla-turu-fiyatlari",
    focusKeyword: "günübirlik yayla turu fiyatları",
    seoTitle: "Günübirlik Yayla Turu Fiyatları | Rize Tur Rehberi 2026",
    seoDescription:
      "Günübirlik yayla turu fiyatları nasıl belirlenir? Rize turunda dahil olanlar, grup büyüklüğü ve rezervasyon ipuçları.",
    excerpt:
      "Günübirlik yayla turu fiyatlarını etkileyen faktörler ve doğru tur seçimi rehberi.",
    coverImageUrl: stockImage("mountainPeaks", 1200),
    readingMinutes: 6,
    sortOrder: 14,
    sections: [
      {
        heading: "Fiyatı etkileyen faktörler",
        content:
          "Tur fiyatı; sezon, grup büyüklüğü, dahil olan hizmetler (rehber, araç, molalar) ve tur süresine göre değişir. En düşük fiyat her zaman en iyi değer anlamına gelmez.\n\nGüvenlik, lisanslı rehber ve bakımlı araç fiyatın önemli bileşenleridir.",
      },
      {
        heading: "Dahil olanlar",
        content:
          "Kaçkarlı Tur günübirlik programında klimalı araç transferi, profesyonel rehberlik ve planlı duraklar standarttır. Öğle yemeği genellikle ek ücretlidir; rezervasyon sırasında netleştirilir.\n\nGüncel fiyat için /turlar ve /rezervasyon sayfalarına bakın.",
      },
      {
        heading: "Erken rezervasyon avantajı",
        content:
          "Yaz sezonunda kontenjan dolabilir. Erken tarih seçimi hem yer garantisi hem planlama kolaylığı sağlar.",
      },
      {
        heading: "Karşılaştırma ipuçları",
        content:
          "Rota içeriğini (Ayder, Pokut, Sal dahil mi?) ve grup büyüklüğünü karşılaştırın. Aynı gün içinde kaç durak ziyaret edildiği deneyimi doğrudan etkiler.",
      },
    ],
  },
  {
    title: "Kaçkarlı Tur Rotası: Fırtına Vadisi'nden Pokut'a",
    slug: "rize-kackarli-tur-rotasi",
    focusKeyword: "Kaçkarlı tur rotası",
    seoTitle: "Kaçkarlı Tur Rotası | Rize Günübirlik Yayla Programı",
    seoDescription:
      "Kaçkarlı Tur rotası: Rize merkezden Fırtına Vadisi, Ayder, Pokut ve Sal — günübirlik yayla turu programı ve duraklar.",
    excerpt:
      "Kaçkarlı Tur'un günübirlik yayla rotası, duraklar ve program özeti.",
    coverImageUrl: stockImage("naturePanorama", 1200),
    readingMinutes: 8,
    sortOrder: 15,
    sections: [
      {
        heading: "Rota özeti",
        content:
          "Kaçkarlı Tur günübirlik rotası Rize merkezden sabah hareketle başlar. Fırtına Vadisi ve Zil Kalesi seyir noktası, Ayder Yaylası molası, öğle yemeği, ardından Pokut ve Sal yaylaları ziyareti ve akşam dönüşü kapsar.\n\nTek günde Karadeniz'in en ikonik yayla deneyimini sunmayı hedefler.",
      },
      {
        heading: "Duraklar ve molalar",
        content:
          "Her durakta fotoğraf ve dinlenme süresi ayrılır. Grup temposu rehber tarafından yönetilir; güvenlik ve konfor önceliklidir.\n\nYol üzerinde çay molaları ve manzara seyirleri programa dahildir.",
      },
      {
        heading: "Kimler için ideal?",
        content:
          "İlk kez Rize yaylalarını görecekler, aileler ve doğa fotoğrafçıları için uygundur. Yoğun trekking gerektirmez; isteğe bağlı kısa yürüyüşler vardır.",
      },
      {
        heading: "Rezervasyon ve iletişim",
        content:
          "Müsait tarihler ve güncel program için /rezervasyon sayfasını ziyaret edin. Sorularınız için /iletisim üzerinden WhatsApp ile ulaşabilirsiniz.\n\nDiğer rehber içeriklerimiz için /rehberlerimiz sayfasına göz atın.",
      },
    ],
  },
];

export async function seedGuides(
  prisma: PrismaClient,
  options?: { createOnly?: boolean }
) {
  console.log("Seeding guide posts...");

  for (const guide of guides) {
    if (options?.createOnly) {
      const existing = await prisma.guidePost.findUnique({
        where: { slug: guide.slug },
      });
      if (existing) {
        console.log(`Skipping existing guide: ${guide.slug}`);
        continue;
      }

      await prisma.guidePost.create({
        data: {
          title: guide.title,
          slug: guide.slug,
          excerpt: guide.excerpt,
          focusKeyword: guide.focusKeyword,
          seoTitle: guide.seoTitle,
          seoDescription: guide.seoDescription,
          coverImageUrl: guide.coverImageUrl,
          status: "PUBLISHED",
          publishedAt: new Date("2026-06-01T08:00:00.000Z"),
          sortOrder: guide.sortOrder,
          readingMinutes: guide.readingMinutes,
          sections: {
            create: guide.sections.map((section, index) => ({
              heading: section.heading,
              content: section.content,
              sortOrder: index + 1,
            })),
          },
        },
      });
      continue;
    }

    await prisma.guidePost.upsert({
      where: { slug: guide.slug },
      create: {
        title: guide.title,
        slug: guide.slug,
        excerpt: guide.excerpt,
        focusKeyword: guide.focusKeyword,
        seoTitle: guide.seoTitle,
        seoDescription: guide.seoDescription,
        coverImageUrl: guide.coverImageUrl,
        status: "PUBLISHED",
        publishedAt: new Date("2026-06-01T08:00:00.000Z"),
        sortOrder: guide.sortOrder,
        readingMinutes: guide.readingMinutes,
        sections: {
          create: guide.sections.map((section, index) => ({
            heading: section.heading,
            content: section.content,
            sortOrder: index + 1,
          })),
        },
      },
      update: {
        title: guide.title,
        excerpt: guide.excerpt,
        focusKeyword: guide.focusKeyword,
        seoTitle: guide.seoTitle,
        seoDescription: guide.seoDescription,
        coverImageUrl: guide.coverImageUrl,
        status: "PUBLISHED",
        publishedAt: new Date("2026-06-01T08:00:00.000Z"),
        sortOrder: guide.sortOrder,
        readingMinutes: guide.readingMinutes,
        sections: {
          deleteMany: {},
          create: guide.sections.map((section, index) => ({
            heading: section.heading,
            content: section.content,
            sortOrder: index + 1,
          })),
        },
      },
    });
  }

  console.log(`Seeded ${guides.length} guide posts.`);
}
