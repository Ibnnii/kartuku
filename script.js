// Membaca data dari objek P (diisi di file HTML masing-masing) lalu menampilkannya.
(function () {
  var $ = function (i) {
    return document.getElementById(i);
  };
  function el(t, c, x) {
    var e = document.createElement(t);
    if (c) e.className = c;
    if (x) e.textContent = x;
    return e;
  }

  document.title = P.nama + " - KartuKu.id";
  $("nama").textContent = P.nama;
  $("sub").textContent =
    P.jurusan + ", " + P.kampus + " (angkatan " + P.angkatan + ")";
  $("tagline").textContent = P.tagline;

  if (P.foto) {
    var im = el("img");
    im.src = "foto/" + P.foto;
    im.alt = "Foto " + P.nama;
    $("photo").appendChild(im);
  } else {
    $("photo").textContent = P.nama
      .split(" ")
      .slice(0, 2)
      .map(function (w) {
        return w[0];
      })
      .join("")
      .toUpperCase();
  }

  P.skill.forEach(function (s) {
    $("skill").appendChild(el("span", "", s));
  });

  if (!P.proyek.length) {
    $("projSec").style.display = "none";
  }
  P.proyek.forEach(function (p) {
    var d = el("div", "proj");
    d.appendChild(el("b", "", p.judul));
    d.appendChild(el("span", "", p.ket));
    $("proj").appendChild(d);
  });

  var wa = el("a", "btn main", "Chat WhatsApp");
  wa.href = "https://wa.me/" + P.wa;
  wa.target = "_blank";
  wa.rel = "noopener";
  $("kontak").appendChild(wa);
  var em = el("a", "btn", "Kirim email");
  em.href = "mailto:" + P.email;
  $("kontak").appendChild(em);

  var sv = el("button", "btn", "Simpan kontak");
  sv.type = "button";
  sv.onclick = function () {
    var v =
      "BEGIN:VCARD\nVERSION:3.0\nFN:" +
      P.nama +
      "\nORG:" +
      P.kampus +
      "\nTITLE:" +
      P.jurusan +
      "\nTEL;TYPE=CELL:+" +
      P.wa +
      "\nEMAIL:" +
      P.email +
      "\nEND:VCARD";
    var a = el("a");
    a.href = URL.createObjectURL(new Blob([v], { type: "text/vcard" }));
    a.download = P.nama.replace(/\s+/g, "_") + ".vcf";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };
  $("kontak").appendChild(sv);

  P.links.forEach(function (l) {
    var a = el("a", "btn", l.label);
    a.href = l.url;
    a.target = "_blank";
    a.rel = "noopener";
    $("links").appendChild(a);
  });
})();

// ===== Background acak: gradasi + pola =====
(function () {
  var T = [
    { a: "#DCEBFF", b: "#F3E3FF", c: "#5B5BD6" },
    { a: "#D9F5EC", b: "#E3F0FF", c: "#0E8F8F" },
    { a: "#FFE6D6", b: "#FFF3C9", c: "#D9622B" },
    { a: "#FFE0EC", b: "#E6E0FF", c: "#C2447A" },
    { a: "#E1F7D8", b: "#D6F0F7", c: "#2E8B57" },
  ];
  var pick = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };
  var t = pick(T);
  var deg = Math.floor(Math.random() * 360);
  var grad = "linear-gradient(" + deg + "deg," + t.a + "," + t.b + ")";

  var pola = [
    // grid ala kertas koordinat / blueprint
    {
      img: [
        "linear-gradient(" + t.c + "22 1px,transparent 1px)",
        "linear-gradient(90deg," + t.c + "22 1px,transparent 1px)",
      ],
      size: ["28px 28px", "28px 28px"],
    },
    // titik-titik ala dot matrix
    {
      img: ["radial-gradient(" + t.c + "44 1.5px,transparent 1.5px)"],
      size: ["22px 22px"],
    },
    // garis diagonal
    {
      img: [
        "repeating-linear-gradient(45deg," +
          t.c +
          "1A 0 2px,transparent 2px 14px)",
      ],
      size: ["auto"],
    },
  ];
  var p = pick(pola);

  var root = document.documentElement.style;
  root.setProperty("--bg", t.a);
  root.setProperty("--acc", t.c);
  root.setProperty("--tag", t.c + "22");

  var s = document.body.style;
  s.backgroundImage = p.img.concat(grad).join(",");
  s.backgroundSize = p.size.concat("auto").join(",");
  s.backgroundAttachment = "fixed";
})();
