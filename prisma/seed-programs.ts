import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Mulai seeding program...\n");

  // ===== 1. PROGRAM CATEGORIES (3) =====
  const programCategories = await Promise.all(
    [
      {
        name: "Sumatera",
        slug: "sumatera",
        title: "Sumatera",
        description: "Berbagi untuk Wilayah Terdampak Bencana",
        backgroundUrl: "https://zakatpedia-production.s3.ap-southeast-1.amazonaws.com/uploads/01KEV1AVMY1SK4KSX7Z3M17PRN.png",
      },
      {
        name: "Wilayah 3T & Nasional",
        slug: "wilayah-3t-nasional",
        title: "Wilayah 3T dan Nasional",
        description: "Kebaikan Ramadan ke Wilayah Tertinggal, Terdepan & Terluar Indonesia",
        backgroundUrl: null,
      },
      {
        name: "Palestina",
        slug: "palestina",
        title: "Palestina",
        description: "Kebaikan Ramadan Yang Menguatkan Palestina",
        backgroundUrl: "https://zakatpedia-production.s3.ap-southeast-1.amazonaws.com/uploads/01KEV1EXEN6C3SN9C9EFKF65P2.png",
      },
    ].map((cat) =>
      prisma.programCategory.upsert({
        where: { slug: cat.slug },
        update: cat,
        create: cat,
      }),
    ),
  );
  console.log(`✅ ${programCategories.length} kategori program ditambahkan`);

  // ===== 2. PROGRAMS (16) =====
  const programsData = [
    // SUMATERA PROGRAMS
    {
      categoryId: programCategories[0].id,
      slug: "paket-fidyah-sumatera",
      title: "PAKET FIDYAH SUMATERA",
      content: `<p>Bagi umat muslim, fidyah hadir sebagai keringanan dari Allah agar kewajiban puasa tetap tertunaikan, dan keberkahan tetap mengalir.</p>
<p>Melalui program Paket Fidyah dari LAZNAS Inisiatif Zakat Indonesia ini, setiap hari puasa yang Sahabat gantikan dengan fidyah akan didistribusikan menjadi paket pangan bergizi bagi saudara duafa di wilayah terdampak bencana, pelosok Indonesia, hingga Palestina. Agar memastikan mereka bisa khusyuk & maksimal beribadah selama Ramadan.</p>
<p>Sempurnakan kewajiban puasa, hadirkan senyum di meja makan sesama. Booking Paket Fidyah sekarang!</p>`,
      imageUrl: "https://zakatpedia-production.s3.ap-southeast-1.amazonaws.com/uploads/01KFDBQJNCYZZK91PNSE49DTN9.jpg",
      raised: 2640000,
      goal: 20000000,
      minimalAmount: 40000,
      endDate: new Date("2026-03-17"),
      programOrder: 1,
      distributionUrl: "https://inisiatifzakat.my.canva.site/bbr-sumatera",
    },
    {
      categoryId: programCategories[0].id,
      slug: "paket-ifthor-takjil-sumatera",
      title: "PAKET IFTHOR TAKJIL SUMATERA",
      content: `<p>Ramadan tahun ini, mari hadirkan kebahagiaan lewat Paket Ifthor & Takjil untuk saudara duafa di wilayah terdampak bencana, pelosok Indonesia, hingga Palestina.</p>
<p>"Siapa yang memberi makan orang berpuasa, maka ia mendapat pahala seperti orang tersebut tanpa mengurangi pahalanya sedikit pun." (HR. Tirmidzi)</p>
<p>Jadilah bagian dari senyum syukur mereka saat berbuka. Booking sekarang, kirimkan Paket Ifthor & Takjil terbaikmu.</p>`,
      imageUrl: "https://zakatpedia-production.s3.ap-southeast-1.amazonaws.com/uploads/01KFDDQPHTS5Y541NS0XPDSZPA.jpg",
      raised: 585000,
      goal: 4500000,
      minimalAmount: 45000,
      endDate: new Date("2026-03-13"),
      programOrder: 2,
      distributionUrl: "https://inisiatifzakat.my.canva.site/bbr-sumatera",
    },
    {
      categoryId: programCategories[0].id,
      slug: "paket-ramadan-sumatera",
      title: "PAKET RAMADAN SUMATERA",
      content: `<p>Di saat meja makan kita dipenuhi makanan dan minuman, ribuan saudara kita di pelosok Nusantara—di tepian batas negeri yang sulit terjangkau— masih menatap langit yang sama penuh harap.</p>
<p>Bagi mereka di wilayah 3T (Terdepan, Terluar, & Tertinggal), Ramadan bukan hanya tentang menahan lapar, tapi tentang ketangguhan bertahan hidup saat beribadah di tengah keterbatasan bahan pangan.</p>
<p>Itulah kenapa LAZNAS Inisiatif Zakat Indonesia & Zakatpedia hadirkan "Program Paket Ramadan" dengan bantuan berupa beras, gula pasir, sarden, minyak goreng, dan bahan sembako lainnya. Dalam rangka memastikan mustahik tercukupi kebutuhan selama Ramadan.</p>`,
      imageUrl: "https://zakatpedia-production.s3.ap-southeast-1.amazonaws.com/uploads/01KFDD84S1RTPVTMYG3KQSSW2N.jpg",
      raised: 0,
      goal: 50000000,
      minimalAmount: 500000,
      endDate: new Date("2026-03-11"),
      programOrder: 3,
      distributionUrl: "https://inisiatifzakat.my.canva.site/bbr-sumatera",
    },
    {
      categoryId: programCategories[0].id,
      slug: "hadiah-lebaran-yatim-dhuafa-sumatera",
      title: "HADIAH LEBARAN YATIM DHUAFA SUMATERA",
      content: `<p>Hari yang paling dinantikan setelah 30 hari berpuasa adalah hari lebaran, hari istimewa bagi seluruh umat Islam. Termasuk bagi anak-anak Yatim & duafa.</p>
<p>LAZNAS Inisiatif Zakat Indonesia hadirkan program "Hadiah Lebaran Yatim & Duafa" untuk memberikan kebahagiaan di hari raya nanti. Jangan biarkan Idul Fitri mereka berlalu dalam kesedihan dan rasa sepi.</p>
<p>Berikan hadiah lebaran terbaik, hadirkan kemenangan sempurna bagi mereka. Booking paketnya sekarang!</p>`,
      imageUrl: "https://zakatpedia-production.s3.ap-southeast-1.amazonaws.com/uploads/01KFDFXPDW8YFXSKHZD1BM269Z.jpg",
      raised: 0,
      goal: 175000000,
      minimalAmount: 500000,
      endDate: new Date("2026-03-18"),
      programOrder: 4,
      distributionUrl: "https://inisiatifzakat.my.canva.site/bbr-sumatera",
    },
    {
      categoryId: programCategories[0].id,
      slug: "sebar-quran-sumatera",
      title: "SEBAR QURAN SUMATERA",
      content: `<p>Di wilayah terpencil Nusantara, gema suara lantunan ayat Al-Qur'an terdengar dari surau-surau kayu yang sederhana menggunakan mushaf yang sudah usang, robek, dan lembarannya tak utuh lagi.</p>
<p>Melalui Program "Sebar Al-Qur'an" LAZNAS Inisiatif Zakat Indonesia hingga ke pelosok negeri, agar setiap orang memahami dan merasakan isi petunjuk Al-Qur'an dan terbiasa membaca, memperbaiki, dan mempelajarinya.</p>
<p>Sebarkan cahaya Al-Qur'an, alirkan pahala hingga akhirat. Infak sekarang!</p>`,
      imageUrl: "https://zakatpedia-production.s3.ap-southeast-1.amazonaws.com/uploads/01KFDVX0E2QBAN2Y8M7B7VYT64.jpg",
      raised: 600000,
      goal: 170000000,
      minimalAmount: 100000,
      endDate: new Date("2026-03-14"),
      programOrder: 5,
      distributionUrl: "https://inisiatifzakat.my.canva.site/bbr-sumatera",
    },
    {
      categoryId: programCategories[0].id,
      slug: "hadiah-dai-dan-guru-sumatera",
      title: "HADIAH DAI DAN GURU SUMATERA",
      content: `<p>Di saat kita bisa dengan mudah mengakses ilmu agama & pengetahuan, ada sosok-sosok tangguh di pelosok negeri yang menembus batas geografi, menelusuri hutan, mendaki gunung & bukit, menyebrangi sungai & lautan demi menjaga nyala api iman & ilmu.</p>
<p>Bulan Ramadan, bulan yang penuh dengan keberkahan ini adalah momentum terbaik bagi LAZNAS Inisiatif Zakat Indonesia melalui program "Hadiah Da'i & Guru Honorer" untuk memuliakan mereka.</p>
<p>Mari muliakan para pejuang pendidikan ini. Kirim apresiasi terbaik Sahabat sekarang juga.</p>`,
      imageUrl: "https://zakatpedia-production.s3.ap-southeast-1.amazonaws.com/uploads/01KFDVKCKN47TFEFRQVKGVNX47.jpg",
      raised: 0,
      goal: 500000000,
      minimalAmount: 500000,
      endDate: new Date("2026-03-14"),
      programOrder: 6,
      distributionUrl: "https://inisiatifzakat.my.canva.site/bbr-sumatera",
    },
    {
      categoryId: programCategories[0].id,
      slug: "sedekah-beras-sumatera",
      title: "SEDEKAH BERAS SUMATERA",
      content: `<p>Bagi kita, beras mungkin hanya kebutuhan harian yang selalu tersedia di dapur. Namun bagi keluarga duafa, punya persediaan beras yang cukup untuk satu bulan adalah sebuah kemewahan yang bisa hadirkan ketenangan luar biasa.</p>
<p>Melalui Program "Sedekah Beras" LAZNAS Inisiatif Zakat Indonesia, Sahabat tidak hanya memberi makan, tapi sedang memberikan "tiket ketenangan" agar saudara-saudara duafa bisa beribadah dengan khusyuk tanpa dihantui rasa lapar yang menyiksa.</p>
<p>Salurkan Sedekah Beras Sahabat sekarang, hadirkan Ramadan yang kenyang & tenang.</p>`,
      imageUrl: "https://zakatpedia-production.s3.ap-southeast-1.amazonaws.com/uploads/01KFDFKT6MZFFRXA5WK0WEPCR5.jpg",
      raised: 495000,
      goal: 412500000,
      minimalAmount: 165000,
      endDate: new Date("2026-03-13"),
      programOrder: 7,
      distributionUrl: "https://inisiatifzakat.my.canva.site/bbr-sumatera",
    },

    // WILAYAH 3T & NASIONAL PROGRAMS
    {
      categoryId: programCategories[1].id,
      slug: "paket-fidyah-wilayah-3t-nasional",
      title: "PAKET FIDYAH WILAYAH 3T & NASIONAL",
      content: `<p>Bagi umat muslim, fidyah hadir sebagai keringanan dari Allah agar kewajiban puasa tetap tertunaikan, dan keberkahan tetap mengalir.</p>
<p>Melalui program Paket Fidyah dari LAZNAS Inisiatif Zakat Indonesia ini, setiap hari puasa yang Sahabat gantikan dengan fidyah akan didistribusikan menjadi paket pangan bergizi bagi saudara duafa di wilayah terdampak bencana, pelosok Indonesia, hingga Palestina.</p>`,
      imageUrl: "https://zakatpedia-production.s3.ap-southeast-1.amazonaws.com/uploads/01KFDW556WP9N9MMCFW4CN5Y2D.jpg",
      raised: 40000,
      goal: 200000000,
      minimalAmount: 40000,
      endDate: new Date("2026-03-12"),
      programOrder: 1,
      distributionUrl: "https://inisiatifzakat.my.canva.site/bbr-nasional",
    },
    {
      categoryId: programCategories[1].id,
      slug: "paket-ifthor-takjil-wilayah-3t-nasional",
      title: "PAKET IFTHOR TAKJIL WILAYAH 3T & NASIONAL",
      content: `<p>Ramadan tahun ini, mari hadirkan kebahagiaan lewat Paket Ifthor & Takjil untuk saudara duafa di wilayah terdampak bencana, pelosok Indonesia, hingga Palestina.</p>
<p>"Siapa yang memberi makan orang berpuasa, maka ia mendapat pahala seperti orang tersebut tanpa mengurangi pahalanya sedikit pun." (HR. Tirmidzi)</p>`,
      imageUrl: "https://zakatpedia-production.s3.ap-southeast-1.amazonaws.com/uploads/01KFDWM220CEKMJZCG9S3ZTSYS.jpg",
      raised: 45000,
      goal: 324000000,
      minimalAmount: 45000,
      endDate: new Date("2026-03-14"),
      programOrder: 2,
      distributionUrl: "https://inisiatifzakat.my.canva.site/bbr-nasional",
    },
    {
      categoryId: programCategories[1].id,
      slug: "paket-ramadan-wilayah-3t-nasional",
      title: "PAKET RAMADAN WILAYAH 3T & NASIONAL",
      content: `<p>Di saat meja makan kita dipenuhi makanan dan minuman, ribuan saudara kita di pelosok Nusantara masih menatap langit yang sama penuh harap.</p>
<p>Mari kita hapus jarak itu. Bukan hanya sekadar mengirimkan bantuan, tapi menemani perjuangan mereka untuk bisa beribadah maksimal di bulan Ramadan.</p>`,
      imageUrl: "https://zakatpedia-production.s3.ap-southeast-1.amazonaws.com/uploads/01KFDWAFC0Y7F1HXKMHC5F9CAK.jpg",
      raised: 3000000,
      goal: 1700000000,
      minimalAmount: 500000,
      endDate: new Date("2026-03-14"),
      programOrder: 3,
      distributionUrl: "https://inisiatifzakat.my.canva.site/bbr-nasional",
    },
    {
      categoryId: programCategories[1].id,
      slug: "sebar-quran-wilayah-3t-nasional",
      title: "SEBAR QURAN WILAYAH 3T & NASIONAL",
      content: `<p>Di wilayah terpencil Nusantara, gema suara lantunan ayat Al-Qur'an terdengar dari surau-surau kayu yang sederhana menggunakan mushaf yang sudah usang.</p>
<p>Melalui Program "Sebar Al-Qur'an" LAZNAS Inisiatif Zakat Indonesia hingga ke pelosok negeri, agar setiap orang memahami dan merasakan isi petunjuk Al-Qur'an.</p>`,
      imageUrl: "https://zakatpedia-production.s3.ap-southeast-1.amazonaws.com/uploads/01KFDXBP2SNDYN1DWG19BVY1HG.jpg",
      raised: 0,
      goal: 170000000,
      minimalAmount: 100000,
      endDate: new Date("2026-03-14"),
      programOrder: 4,
      distributionUrl: "https://inisiatifzakat.my.canva.site/bbr-nasional",
    },
    {
      categoryId: programCategories[1].id,
      slug: "hadiah-dai-dan-guru-wilayah-3t-nasional",
      title: "HADIAH DAI DAN GURU WILAYAH 3T & NASIONAL",
      content: `<p>Di saat kita bisa dengan mudah mengakses ilmu agama & pengetahuan, ada sosok-sosok tangguh di pelosok negeri yang mengabdi tanpa pamrih.</p>
<p>Bulan Ramadan adalah momentum terbaik bagi LAZNAS Inisiatif Zakat Indonesia untuk memuliakan mereka.</p>`,
      imageUrl: "https://zakatpedia-production.s3.ap-southeast-1.amazonaws.com/uploads/01KFDX7C1S9G71DZDRZPY2Z3N0.jpg",
      raised: 0,
      goal: 500000000,
      minimalAmount: 500000,
      endDate: new Date("2026-03-14"),
      programOrder: 5,
      distributionUrl: "https://inisiatifzakat.my.canva.site/bbr-nasional",
    },
    {
      categoryId: programCategories[1].id,
      slug: "hadiah-lebaran-yatim-dhuafa",
      title: "HADIAH LEBARAN YATIM DHUAFA",
      content: `<p>Hari yang paling dinantikan setelah 30 hari berpuasa adalah hari lebaran. LAZNAS Inisiatif Zakat Indonesia hadirkan program "Hadiah Lebaran Yatim & Duafa" untuk memberikan kebahagiaan di hari raya nanti.</p>
<p>Berikan hadiah lebaran terbaik, hadirkan kemenangan sempurna bagi mereka.</p>`,
      imageUrl: "https://zakatpedia-production.s3.ap-southeast-1.amazonaws.com/uploads/01KFDX1S6VXV7DNT7Y3MNYNE2T.jpg",
      raised: 0,
      goal: 175000000,
      minimalAmount: 500000,
      endDate: new Date("2026-03-14"),
      programOrder: 6,
      distributionUrl: "https://inisiatifzakat.my.canva.site/bbr-nasional",
    },
    {
      categoryId: programCategories[1].id,
      slug: "sedekah-beras-wilayah-3t-nasional",
      title: "SEDEKAH BERAS WILAYAH 3T & NASIONAL",
      content: `<p>Bagi kita, beras mungkin hanya kebutuhan harian. Namun bagi keluarga duafa, punya persediaan beras yang cukup adalah sebuah kemewahan.</p>
<p>Melalui Program "Sedekah Beras" LAZNAS Inisiatif Zakat Indonesia, Sahabat memberikan "tiket ketenangan" agar duafa bisa beribadah dengan khusyuk.</p>`,
      imageUrl: "https://zakatpedia-production.s3.ap-southeast-1.amazonaws.com/uploads/01KFDWV2B5D59RSV2XX1278PQ9.jpg",
      raised: 0,
      goal: 412500000,
      minimalAmount: 165000,
      endDate: new Date("2026-03-14"),
      programOrder: 7,
      distributionUrl: "https://inisiatifzakat.my.canva.site/bbr-nasional",
    },

    // PALESTINA PROGRAMS
    {
      categoryId: programCategories[2].id,
      slug: "paket-ifthor-takjil-palestina",
      title: "PAKET IFTHOR TAKJIL PALESTINA",
      content: `<p>Ramadan tahun ini, mari hadirkan kebahagiaan lewat Paket Ifthor & Takjil untuk saudara kita di Palestina.</p>
<p>"Siapa yang memberi makan orang berpuasa, maka ia mendapat pahala seperti orang tersebut tanpa mengurangi pahalanya sedikit pun." (HR. Tirmidzi)</p>
<p>Jadilah bagian dari senyum syukur mereka saat berbuka.</p>`,
      imageUrl: "https://zakatpedia-production.s3.ap-southeast-1.amazonaws.com/uploads/01KFDZ899EY9P4C47TZYZZX2K9.jpg",
      raised: 602000,
      goal: 900000000,
      minimalAmount: 100000,
      endDate: new Date("2026-03-14"),
      programOrder: 1,
      distributionUrl: "https://inisiatifzakat.my.canva.site/bbr-palestina",
    },
    {
      categoryId: programCategories[2].id,
      slug: "paket-ramadhan-palestina",
      title: "PAKET RAMADHAN PALESTINA",
      content: `<p>Di saat meja makan kita dipenuhi makanan dan minuman, ribuan saudara kita di Palestina masih bertahan dengan penuh perjuangan.</p>
<p>LAZNAS Inisiatif Zakat Indonesia hadirkan "Program Paket Ramadan" untuk memastikan mereka tercukupi kebutuhan selama Ramadan.</p>`,
      imageUrl: "https://zakatpedia-production.s3.ap-southeast-1.amazonaws.com/uploads/01KFDZ3XNEAXJ84J57194B4959.jpg",
      raised: 1000000,
      goal: 300000000,
      minimalAmount: 1000000,
      endDate: new Date("2026-03-14"),
      programOrder: 2,
      distributionUrl: "https://inisiatifzakat.my.canva.site/bbr-palestina",
    },
    {
      categoryId: programCategories[2].id,
      slug: "baju-lebaran-anak-palestina",
      title: "BAJU LEBARAN ANAK PALESTINA",
      content: `<p>Hari lebaran adalah hari istimewa bagi seluruh umat Islam, termasuk anak-anak di Palestina.</p>
<p>LAZNAS Inisiatif Zakat Indonesia hadirkan program "Baju Lebaran Anak Palestina" untuk memberikan kebahagiaan di hari raya nanti.</p>
<p>Berikan hadiah lebaran terbaik untuk anak-anak Palestina.</p>`,
      imageUrl: "https://zakatpedia-production.s3.ap-southeast-1.amazonaws.com/uploads/01KFDYYJWAA8PNA2YK8GFQZKVC.jpg",
      raised: 0,
      goal: 150000000,
      minimalAmount: 500000,
      endDate: new Date("2026-03-14"),
      programOrder: 3,
      distributionUrl: "https://bookingberkahramadan.my.canva.site/booking-berkah-ramadan-palestina",
    },
  ];

  const programs = await Promise.all(
    programsData.map((program) =>
      prisma.program.upsert({
        where: { slug: program.slug },
        update: program,
        create: program,
      }),
    ),
  );
  console.log(`✅ ${programs.length} program ditambahkan`);

  console.log("\n🎉 Seeding program selesai!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
