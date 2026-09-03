# 📚 Read Journey

**Read Journey** — це сучасний вебдодаток для трекінгу читання книг, який допомагає користувачам формувати власну бібліотеку, відстежувати прогрес читання та аналізувати динаміку прочитаних сторінок.

---

## 🚀 Технологічний стек

- **Frontend:** React 18, TypeScript, Vite
- **State Management:** Redux Toolkit, RTK Query / Async Thunks
- **Architecture:** Feature-Sliced Design (FSD)
- **Routing:** React Router v6
- **Styling:** CSS Modules, Responsive Design (Mobile, Tablet, Desktop)
- **UI Components & Feedback:** React Hot Toast, Custom Modals & Loaders

---

## ✨ Основний функціонал

- **Особиста бібліотека:** Додавання власної літератури та фільтрація за статусом (_Unread_, _In progress_, _Done_, _All books_).
- **Рекомендовані книги:** Перегляд каталогу книг із можливістю швидкого додавання до своєї колекції.
- **Інтерактивне читання:**
  - Зручний перехід до сесії читання через модальне вікно книги.
  - Фіксація початку та завершення сесій читання з підрахунком сторінок.
  - Інтерактивне відстеження прогресу та збереження історії читання.
- **Повна адаптивність:** Зручний та стильний інтерфейс для мобільних пристроїв, планшетів і десктопів.

---

## 📁 Структура проєкту (FSD)

```text
src/
├── app/          # Ініціалізація додатку, провайдери, глобальні стилі
├── pages/        # Сторінки (LibraryPage, ReadingPage, RecommendedPage)
├── widgets/      # Великі блоки інтерфейсу (Dashboard, MyLibraryBooks, Header)
├── features/     # Інтерактивна логіка (BookForm, AddProgress, DeleteEntry)
├── entities/     # Бізнес-сутності та Redux-слайси (Book, User)
└── shared/       # Перевикористовувані компоненти (Modal, Loader, UI-kit, hooks)
```

🛠️ Встановлення та запуск
Клонувати репозиторій:Bash
git clone [https://github.com/valentina2209/readJourney]
cd read-journey
Встановити залежності:Bash
npm install
Запустити проєкт у режимі розробки:Bash
npm run dev
Зібрати проєкт для продакшену:Bash
npm run build
