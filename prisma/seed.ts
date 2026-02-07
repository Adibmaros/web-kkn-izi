import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Mulai seeding...\n");

  // ===== 1. USERS (10) =====
  const hashedPassword = await hash("password123", 12);
  const users = await Promise.all(
    [
      { username: "Admin Utama", email: "admin@izi.id", role: "admin" },
      { username: "Editor Zakat", email: "editor.zakat@izi.id", role: "editor" },
      { username: "Ahmad Fauzi", email: "ahmad.fauzi@izi.id", role: "admin" },
      { username: "Siti Nurhaliza", email: "siti.nur@izi.id", role: "editor" },
      { username: "Budi Santoso", email: "budi.santoso@izi.id", role: "admin" },
      { username: "Rina Marlina", email: "rina.marlina@izi.id", role: "editor" },
      { username: "Dedi Kurniawan", email: "dedi.k@izi.id", role: "admin" },
      { username: "Fitri Handayani", email: "fitri.h@izi.id", role: "editor" },
      { username: "Rizky Pratama", email: "rizky.p@izi.id", role: "admin" },
      { username: "Nadia Safitri", email: "nadia.s@izi.id", role: "editor" },
    ].map((u) =>
      prisma.user.create({
        data: { ...u, password: hashedPassword },
      }),
    ),
  );
  console.log(`✅ ${users.length} users ditambahkan`);

  // ===== 2. CATEGORIES (10) =====
  const categories = await Promise.all(
    ["Zakat Mal", "Zakat Fitrah", "Keuangan Keluarga", "Tips Menabung", "Investasi Syariah", "Infaq & Sedekah", "Ekonomi Islam", "Perencanaan Keuangan", "Wakaf", "Literasi Keuangan Anak"].map((name) =>
      prisma.category.create({ data: { name } }),
    ),
  );
  console.log(`✅ ${categories.length} kategori ditambahkan`);

  // ===== 3. ARTICLES (10) =====
  const articlesData = [
    {
      categoryId: categories[0].id,
      title: "Pengertian Zakat Mal dan Cara Menghitungnya",
      content: `Zakat mal adalah zakat yang dikenakan atas harta yang dimiliki oleh seorang muslim apabila telah memenuhi syarat-syarat tertentu. Syarat utama zakat mal adalah harta tersebut telah mencapai nisab (batas minimum) dan haul (telah dimiliki selama satu tahun hijriah).

Nisab zakat mal setara dengan 85 gram emas murni. Jika harta Anda sudah mencapai atau melebihi nisab tersebut dan telah dimiliki selama setahun, maka wajib mengeluarkan zakat sebesar 2,5% dari total harta.

Contoh perhitungan:
- Harga emas per gram: Rp 1.100.000
- Nisab: 85 x Rp 1.100.000 = Rp 93.500.000
- Jika harta Anda Rp 100.000.000, maka zakat = 2,5% x Rp 100.000.000 = Rp 2.500.000

Harta yang termasuk zakat mal meliputi: emas & perak, uang tunai & tabungan, hasil pertanian, hewan ternak, dan harta perniagaan.`,
      imageUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800",
    },
    {
      categoryId: categories[1].id,
      title: "Panduan Lengkap Zakat Fitrah: Waktu dan Besarannya",
      content: `Zakat fitrah adalah zakat yang wajib dikeluarkan oleh setiap muslim menjelang Hari Raya Idul Fitri. Zakat ini bertujuan untuk menyucikan diri dari hal-hal yang mungkin mengurangi pahala puasa Ramadhan.

Besaran zakat fitrah adalah 1 sha' atau setara dengan 2,5 kg beras (atau makanan pokok lainnya) per jiwa. Dalam bentuk uang, nilainya disesuaikan dengan harga beras di daerah masing-masing.

Waktu pembayaran zakat fitrah:
1. Waktu wajib: sejak terbenam matahari akhir Ramadhan
2. Waktu utama: sebelum shalat Idul Fitri
3. Waktu yang diperbolehkan: sejak awal Ramadhan

Yang wajib membayar: Setiap muslim yang memiliki kelebihan makanan untuk dirinya dan keluarganya pada hari raya. Kepala keluarga juga membayarkan untuk seluruh anggota keluarga yang menjadi tanggungannya.`,
      imageUrl: "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=800",
    },
    {
      categoryId: categories[2].id,
      title: "5 Langkah Mengatur Keuangan Keluarga dengan Bijak",
      content: `Mengelola keuangan keluarga adalah kunci untuk mencapai stabilitas ekonomi dan ketenangan hidup. Berikut 5 langkah yang bisa Anda terapkan:

1. CATAT SEMUA PEMASUKAN DAN PENGELUARAN
Buat catatan detail setiap pemasukan dan pengeluaran. Gunakan aplikasi atau buku catatan sederhana. Ini akan membantu Anda melihat pola pengeluaran.

2. BUAT ANGGARAN BULANAN
Alokasikan pendapatan dengan formula 50-30-20:
- 50% untuk kebutuhan pokok (makan, listrik, transport)
- 30% untuk keinginan (hiburan, makan di luar)
- 20% untuk tabungan dan investasi

3. SISIHKAN DANA DARURAT
Idealnya, dana darurat sebesar 3-6 bulan pengeluaran. Dana ini untuk menghadapi situasi tak terduga seperti sakit atau kehilangan pekerjaan.

4. HINDARI HUTANG KONSUMTIF
Bedakan antara hutang produktif (untuk usaha/investasi) dan hutang konsumtif (untuk gaya hidup). Hindari hutang konsumtif sebisa mungkin.

5. JANGAN LUPA ZAKAT DAN SEDEKAH
Sisihkan minimal 2,5% untuk zakat dan tambahan untuk sedekah. Ini membersihkan harta dan mendatangkan keberkahan.`,
      imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800",
    },
    {
      categoryId: categories[3].id,
      title: "Tips Menabung untuk Pemula: Mulai dari Rp 10.000/Hari",
      content: `Menabung tidak harus dengan jumlah besar. Yang terpenting adalah konsistensi. Berikut tips menabung untuk pemula:

MULAI DARI YANG KECIL
Sisihkan Rp 10.000 per hari. Dalam sebulan Anda sudah memiliki Rp 300.000, dan dalam setahun Rp 3.600.000. Jumlah ini bisa ditingkatkan seiring waktu.

GUNAKAN METODE AMPLOP
Bagi uang bulanan ke dalam amplop-amplop berlabel: makan, transport, tagihan, hiburan, dan tabungan. Disiplin dengan alokasi masing-masing.

OTOMATISKAN TABUNGAN
Manfaatkan fitur auto-debit dari rekening gaji ke rekening tabungan. Dengan cara ini, Anda "dipaksa" menabung sebelum uang habis untuk pengeluaran lain.

TANTANGAN 52 MINGGU
Minggu pertama tabung Rp 5.000, minggu kedua Rp 10.000, dan seterusnya bertambah Rp 5.000 per minggu. Di akhir tahun, Anda akan memiliki hampir Rp 7 juta!

VISUALISASIKAN TUJUAN
Pasang foto atau gambar target tabungan Anda (rumah, pendidikan anak, umrah) sebagai motivasi.`,
      imageUrl: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=800",
    },
    {
      categoryId: categories[4].id,
      title: "Mengenal Investasi Syariah: Halal dan Menguntungkan",
      content: `Investasi syariah adalah penanaman modal yang sesuai dengan prinsip-prinsip Islam. Berikut panduan lengkapnya:

PRINSIP DASAR INVESTASI SYARIAH
- Bebas dari riba (bunga)
- Bebas dari gharar (ketidakpastian berlebihan)
- Bebas dari maysir (judi/spekulasi)
- Tidak berinvestasi pada sektor haram

JENIS INVESTASI SYARIAH
1. Reksa Dana Syariah: Cocok untuk pemula, dikelola manajer investasi profesional
2. Saham Syariah: Saham perusahaan yang terdaftar di Jakarta Islamic Index (JII)
3. Sukuk (Obligasi Syariah): Surat berharga negara berbasis syariah
4. Deposito Syariah: Simpanan berjangka di bank syariah
5. Emas: Investasi fisik yang sesuai syariah

TIPS MEMULAI
- Tentukan tujuan investasi (jangka pendek/panjang)
- Pelajari profil risiko Anda
- Mulai dengan nominal kecil
- Diversifikasi portofolio
- Konsultasikan dengan advisor keuangan syariah`,
      imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
    },
    {
      categoryId: categories[5].id,
      title: "Perbedaan Zakat, Infaq, dan Sedekah yang Perlu Diketahui",
      content: `Banyak masyarakat yang masih bingung membedakan antara zakat, infaq, dan sedekah. Berikut penjelasan lengkapnya:

ZAKAT
- Hukumnya WAJIB bagi yang memenuhi syarat
- Ada nisab dan haul yang harus dipenuhi
- Kadar/besaran sudah ditentukan (2,5%, 5%, 10%, dll)
- Penerima (mustahik) sudah ditentukan: 8 asnaf
- Termasuk rukun Islam ke-4

INFAQ
- Hukumnya bisa wajib (seperti nafkah keluarga) atau sunnah
- Tidak ada nisab atau haul
- Jumlahnya tidak ditentukan
- Penerima lebih luas dari zakat
- Berupa harta/materi

SEDEKAH
- Hukumnya sunnah
- Tidak ada batasan minimal
- Tidak harus berupa harta (bisa senyum, ilmu, tenaga)
- Penerima sangat luas
- Rasulullah SAW bersabda: "Senyummu di hadapan saudaramu adalah sedekah"

KEUTAMAAN KETIGANYA
Semua bentuk pemberian ini memiliki pahala yang besar. Zakat membersihkan harta, infaq membantu sesama, dan sedekah mendatangkan keberkahan dalam hidup.`,
      imageUrl: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800",
    },
    {
      categoryId: categories[6].id,
      title: "Prinsip Ekonomi Islam dalam Kehidupan Sehari-hari",
      content: `Ekonomi Islam bukan hanya tentang perbankan syariah. Prinsip-prinsipnya bisa diterapkan dalam kehidupan sehari-hari:

1. LARANGAN RIBA
Hindari transaksi yang mengandung bunga. Gunakan akad-akad syariah seperti murabahah (jual-beli) atau mudharabah (bagi hasil).

2. KEADILAN DAN KESEIMBANGAN
Tidak boleh ada pihak yang dirugikan dalam transaksi. Harga harus wajar dan transparan.

3. KEBEBASAN BEREKONOMI
Islam mendorong umatnya untuk aktif berusaha. Rasulullah SAW sendiri adalah seorang pedagang sukses.

4. LARANGAN PENIMBUNAN (IHTIKAR)
Menimbun barang untuk menaikkan harga adalah haram. Ini merugikan masyarakat luas.

5. KEHALALAN PRODUK DAN JASA
Pastikan usaha dan pekerjaan Anda menghasilkan produk/jasa yang halal.

6. DISTRIBUSI KEKAYAAN
Melalui zakat, infaq, sedekah, dan wakaf, Islam mendorong distribusi kekayaan yang merata sehingga tidak hanya beredar di kalangan orang kaya saja.`,
      imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800",
    },
    {
      categoryId: categories[7].id,
      title: "Membuat Perencanaan Keuangan untuk Masa Depan",
      content: `Perencanaan keuangan yang baik dimulai dari sekarang. Berikut panduan menyusun rencana keuangan:

LANGKAH 1: EVALUASI KONDISI KEUANGAN SAAT INI
- Hitung total aset (tabungan, investasi, properti)
- Hitung total kewajiban (hutang, cicilan)
- Kekayaan bersih = Aset - Kewajiban

LANGKAH 2: TENTUKAN TUJUAN KEUANGAN
Jangka pendek (1-2 tahun): Dana darurat, liburan
Jangka menengah (3-5 tahun): DP rumah, pendidikan anak
Jangka panjang (>5 tahun): Pensiun, ibadah haji

LANGKAH 3: BUAT STRATEGI
- Alokasikan pendapatan sesuai prioritas
- Pilih instrumen investasi yang sesuai
- Siapkan proteksi (asuransi syariah)

LANGKAH 4: EKSEKUSI DAN MONITORING
- Jalankan rencana secara konsisten
- Review setiap 3-6 bulan
- Sesuaikan jika ada perubahan kondisi

LANGKAH 5: JANGAN LUPA ASPEK SPIRITUAL
- Sisihkan untuk zakat dan sedekah
- Niatkan usaha sebagai ibadah
- Berdoa dan bertawakal`,
      imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800",
    },
    {
      categoryId: categories[8].id,
      title: "Mengenal Wakaf: Amal Jariyah yang Tak Pernah Putus",
      content: `Wakaf adalah salah satu bentuk amal jariyah yang pahalanya terus mengalir meskipun pemberi wakaf telah meninggal dunia.

PENGERTIAN WAKAF
Wakaf adalah menahan harta yang dapat diambil manfaatnya tanpa musnah seketika dan untuk penggunaan yang mubah serta dimaksudkan untuk mendapatkan ridha Allah SWT.

JENIS-JENIS WAKAF
1. Wakaf Tunai: Mewakafkan uang untuk dikelola dan hasilnya dimanfaatkan
2. Wakaf Properti: Tanah, bangunan untuk masjid, sekolah, rumah sakit
3. Wakaf Produktif: Harta yang dikelola untuk menghasilkan keuntungan
4. Wakaf Melalui Asuransi: Mewakafkan sebagian manfaat polis asuransi syariah

MANFAAT WAKAF
- Pahala yang terus mengalir (amal jariyah)
- Membantu pembangunan umat
- Mengurangi kesenjangan sosial
- Mendorong kemandirian ekonomi umat

CARA BERWAKAF
Saat ini berwakaf sangat mudah. Banyak lembaga resmi yang menerima wakaf mulai dari nominal kecil. Anda bisa berwakaf melalui transfer bank, aplikasi, atau datang langsung ke lembaga wakaf terpercaya.`,
      imageUrl: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800",
    },
    {
      categoryId: categories[9].id,
      title: "Mengajarkan Literasi Keuangan pada Anak Sejak Dini",
      content: `Pendidikan keuangan sebaiknya dimulai sejak usia dini agar anak tumbuh menjadi pribadi yang bijak dalam mengelola uang.

USIA 3-5 TAHUN
- Kenalkan konsep uang dan fungsinya
- Bermain jual-beli dengan uang mainan
- Ajarkan menabung di celengan

USIA 6-9 TAHUN
- Beri uang saku dan ajarkan pengelolaannya
- Kenalkan konsep kebutuhan vs keinginan
- Ajak ke bank untuk buka tabungan anak
- Ajarkan konsep sedekah dari uang sakunya

USIA 10-12 TAHUN
- Libatkan dalam perencanaan belanja keluarga
- Ajarkan membuat anggaran sederhana
- Kenalkan konsep menabung untuk tujuan tertentu
- Jelaskan tentang zakat dan kewajiban berbagi

TIPS UNTUK ORANG TUA
1. Jadilah teladan dalam pengelolaan keuangan
2. Jangan malu membahas uang dengan anak
3. Beri kesempatan anak mengambil keputusan keuangan kecil
4. Apresiasi usaha menabung anak
5. Ajarkan bahwa rezeki berasal dari Allah dan harus disyukuri`,
      imageUrl: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800",
    },
  ];

  const articles = await Promise.all(articlesData.map((a) => prisma.article.create({ data: a })));
  console.log(`✅ ${articles.length} artikel ditambahkan`);

  // ===== 4. VIDEOS (10) =====
  const videos = await Promise.all(
    [
      { title: "Apa Itu Zakat? Penjelasan Lengkap untuk Pemula", youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
      { title: "Cara Menghitung Zakat Penghasilan", youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
      { title: "Panduan Zakat Fitrah Menjelang Ramadhan", youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
      { title: "Tips Mengatur Keuangan Rumah Tangga Islami", youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
      { title: "Investasi Syariah untuk Pemula", youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
      { title: "Perbedaan Bank Syariah dan Bank Konvensional", youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
      { title: "Keutamaan Sedekah dalam Islam", youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
      { title: "Cara Mendidik Anak tentang Uang dan Zakat", youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
      { title: "Wakaf Produktif: Amal yang Terus Mengalir", youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
      { title: "Program IZI: Edukasi Zakat untuk Masyarakat", youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
    ].map((v) => prisma.video.create({ data: v })),
  );
  console.log(`✅ ${videos.length} video ditambahkan`);

  // ===== 5. QUESTIONS (10) =====
  const questions = await Promise.all(
    [
      {
        name: "Hendra Wijaya",
        phoneNumber: "081234567890",
        message: "Assalamualaikum, saya ingin bertanya tentang cara menghitung zakat penghasilan. Apakah yang dihitung adalah gaji kotor atau gaji bersih setelah dipotong kebutuhan pokok?",
        status: "pending",
      },
      { name: "Dewi Rahmawati", phoneNumber: "082345678901", message: "Apakah zakat bisa dibayarkan dalam bentuk uang tunai atau harus dalam bentuk beras? Mohon penjelasannya, terima kasih.", status: "replied" },
      { name: "Muhammad Iqbal", phoneNumber: "083456789012", message: "Saya baru mulai bekerja dan gajinya masih UMR. Apakah saya sudah wajib membayar zakat? Berapa nisab yang berlaku tahun ini?", status: "pending" },
      { name: "Fatimah Az-Zahra", phoneNumber: "084567890123", message: "Bagaimana cara menghitung zakat untuk tabungan deposito di bank syariah? Apakah bagi hasilnya juga dihitung?", status: "replied" },
      { name: "Agus Setiawan", phoneNumber: "085678901234", message: "Saya punya usaha kecil-kecilan jualan online. Bagaimana cara menghitung zakat dari keuntungan usaha saya?", status: "pending" },
      { name: "Nur Aisyah", phoneNumber: "086789012345", message: "Apakah seorang istri yang bekerja wajib membayar zakat sendiri atau sudah termasuk dalam zakat suami?", status: "pending" },
      { name: "Rudi Hartono", phoneNumber: "087890123456", message: "Saya ingin tahu lebih lanjut tentang wakaf produktif. Apakah ada program wakaf yang bisa saya ikuti dengan nominal kecil?", status: "replied" },
      { name: "Sri Mulyani", phoneNumber: "088901234567", message: "Bagaimana tips mengatur keuangan untuk ibu rumah tangga dengan penghasilan suami yang pas-pasan? Mohon sarannya.", status: "pending" },
      { name: "Bambang Suryadi", phoneNumber: "089012345678", message: "Apakah ada jadwal konsultasi langsung dengan ustadz untuk membahas masalah zakat dan keuangan syariah?", status: "pending" },
      { name: "Lestari Wulandari", phoneNumber: "081122334455", message: "Saya ingin mengajarkan anak saya tentang menabung dan zakat. Apakah ada materi edukasi yang cocok untuk anak usia SD?", status: "replied" },
    ].map((q) => prisma.question.create({ data: q })),
  );
  console.log(`✅ ${questions.length} pertanyaan ditambahkan`);

  console.log("\n🎉 Seeding selesai!");
  console.log("📧 Login dengan: admin@izi.id / password123");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
