// Дані навчальних проєктів. Тут можна змінити назви, категорії та описи.
const projects = [
  {
    title: "Технокряк",
    category: "web",
    label: "Веб-сайт",
    image: 1,
    description:
      "Концепт вебсайту технологічного проєкту. Акцент на структурі контенту, зрозумілій навігації та стриманій візуальній мові.",
  },
  {
    title: "New Orlean × Golden Star",
    category: "design",
    label: "Дизайн",
    image: 2,
    description:
      "Навчальний постер спортивної події. Динамічна композиція, контраст і типографіка передають енергію гри.",
  },
  {
    title: "Seafood",
    category: "app",
    label: "Додаток",
    image: 3,
    description:
      "Візуальний концепт ресторанного проєкту. Дослідження айдентики та її застосування в цифровому середовищі.",
  },
  {
    title: "Prime",
    category: "marketing",
    label: "Маркетинг",
    image: 4,
    description:
      "Демонстраційна продуктова подача. Мінімалістична композиція зосереджує увагу на продукті.",
  },
  {
    title: "Boxes",
    category: "app",
    label: "Додаток",
    image: 5,
    description:
      "Концепт презентації пакування та бренду. Приклад використання кольору й предметної композиції.",
  },
  {
    title: "Inspiration has no Borders",
    category: "web",
    label: "Веб-сайт",
    image: 6,
    description:
      "Навчальний вебконцепт із виразною типографікою та фокусом на візуальному контенті.",
  },
  {
    title: "Limited Edition",
    category: "design",
    label: "Дизайн",
    image: 7,
    description:
      "Концепт редакційного дизайну. Робота з сіткою, фотографією та ритмом журнальних розворотів.",
  },
  {
    title: "LAB",
    category: "marketing",
    label: "Маркетинг",
    image: 8,
    description:
      "Демонстраційна айдентика. Лаконічна графіка та узгоджене оформлення матеріалів.",
  },
  {
    title: "Growing Business",
    category: "app",
    label: "Додаток",
    image: 9,
    description:
      "Навчальна презентація цифрового продукту. Приклад композиції інтерфейсу в контексті реального пристрою.",
  },
];

// Створення карток портфоліо та відкриття опису проєкту.
const grid = document.querySelector("#project-grid");
if (grid)
  projects.forEach((p) => {
    const button = document.createElement("button");
    button.className = "project";
    button.dataset.category = p.category;
    button.innerHTML = `
<div class="project-visual">
<img src="images/project${p.image}.jpg" alt="${p.title} — навчальний концепт" loading="lazy" width="370" height="294">
<span class="project-overlay">Переглянути проєкт</span>
</div>
<div class="project-info">
<h3>${p.title}</h3>
<span>${p.label}</span>
</div>
`;
    button.setAttribute("aria-label", `Переглянути кейс ${p.title}`);
    button.addEventListener("click", () => {
      document.querySelector("#case-title").textContent = p.title;
      document.querySelector("#case-description").textContent =
        p.description + " Це навчальний матеріал, а не виконане замовлення для клієнта.";
      const img = document.querySelector("#case-image");
      img.src = `images/project${p.image}.jpg`;
      img.alt = p.title;
      document.querySelector("#case-dialog").showModal();
    });
    grid.append(button);
  });

// Фільтрація карток за категорією.
document.querySelectorAll("[data-filter]").forEach((button) =>
  button.addEventListener("click", () => {
    document
      .querySelectorAll("[data-filter]")
      .forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
    let count = 0;
    document.querySelectorAll(".project").forEach((card) => {
      card.hidden =
        button.dataset.filter !== "all" &&
        card.dataset.category !== button.dataset.filter;
      if (!card.hidden) count++;
    });
    document.querySelector("#results").textContent = `Показано проєктів: ${count}`;
  }),
);

// Мобільне меню: відкриття, закриття та клавіша Escape.
const menu = document.querySelector(".menu-toggle"),
  nav = document.querySelector("#nav");
function closeMenu() {
  nav.classList.remove("open");
  menu.setAttribute("aria-expanded", "false");
}
menu.addEventListener("click", () => {
  const open = menu.getAttribute("aria-expanded") !== "true";
  nav.classList.toggle("open", open);
  menu.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});

// Кнопки, які відкривають форму брифу.
document.querySelectorAll("[data-brief]").forEach((button) =>
  button.addEventListener("click", () => {
    document.querySelector("#case-dialog").close();
    closeMenu();
    document.querySelector("#brief-dialog").showModal();
  }),
);

// Закриття діалогових вікон кнопкою або кліком за їхніми межами.
document.querySelectorAll("dialog").forEach((dialog) => {
  dialog.querySelector(".close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) {
      const r = dialog.getBoundingClientRect();
      if (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      )
        dialog.close();
    }
  });
});

// Завантаження брифу у текстовий файл. Дані не надсилаються на сервер.
document.querySelector("#brief-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const text = `WEBSTUDIO — БРИФ\n\nІм’я: ${data.get("name")}\nEmail: ${data.get("email")}\nПослуга: ${data.get("service")}\n\nІдея:\n${data.get("idea")}\n\nСтворено в демо-формі. Нікуди не надіслано.`;
  const url = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = "webstudio-brief.txt";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  document.querySelector("#form-status").textContent =
    "Бриф підготовлено для завантаження. Дані не надсилалися.";
});
