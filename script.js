
// Data produk awal (minimal 5 produk)
let produk = [
    { id: 1, nama: "Laptop", harga: 7500000 },
    { id: 2, nama: "Mouse", harga: 150000 },
    { id: 3, nama: "Keyboard", harga: 300000 },
    { id: 4, nama: "Headset", harga: 250000 },
    { id: 5, nama: "Monitor", harga: 1800000 }
];

// Mengambil elemen HTML
const namaInput = document.getElementById("namaProduk");
const hargaInput = document.getElementById("hargaProduk");
const tambahBtn = document.getElementById("tambahBtn");
const listProduk = document.getElementById("listProduk");

// Menampilkan semua produk menggunakan Rest Parameter
function tampilkanProduk(...daftarProduk) {
    listProduk.innerHTML = "";

    if (daftarProduk.length === 0) {
        listProduk.innerHTML = '<p class="kosong">Belum ada produk.</p>';
        return;
    }

    // Destructuring objek produk
    daftarProduk.forEach(({ id, nama, harga }) => {
        const item = document.createElement("div");
        item.className = "produk";

        item.innerHTML = `
            <div>
                <h3>${nama}</h3>
                <p>Rp ${harga.toLocaleString("id-ID")}</p>
            </div>
            <button class="hapus" data-id="${id}">Hapus</button>
        `;

        listProduk.appendChild(item);
    });
}

// Menambahkan produk menggunakan Spread Operator
function tambahProduk(nama, harga) {
    const produkBaru = {
        id: Date.now(),
        nama: nama,
        harga: harga
    };

    produk = [...produk, produkBaru];
    tampilkanProduk(...produk);
}

// Event Listener tombol tambah
tambahBtn.addEventListener("click", function () {
    const nama = namaInput.value.trim();
    const harga = Number(hargaInput.value);

    if (nama === "" || harga <= 0 || !Number.isFinite(harga)) {
        alert("Masukkan nama dan harga produk yang valid!");
        return;
    }

    tambahProduk(nama, harga);

    namaInput.value = "";
    hargaInput.value = "";
});

// Event Listener untuk menghapus produk
listProduk.addEventListener("click", function (event) {
    if (event.target.classList.contains("hapus")) {
        const id = Number(event.target.dataset.id);

        produk = produk.filter(item => item.id !== id);
        tampilkanProduk(...produk);
    }
});

// Menampilkan produk awal
tampilkanProduk(...produk);