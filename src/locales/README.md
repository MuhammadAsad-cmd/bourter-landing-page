# i18n Translation Files

This directory contains all translation files organized by language.

## Structure

Each language has its own JSON file:

- `en.json` - English translations
- `ar.json` - Arabic translations

## Translation Namespaces

Translations are organized into logical namespaces:

- **common** - Common UI elements (buttons, labels, messages)
- **navigation** - Navigation menu items
- **hero** - Hero section content (slides, titles, descriptions)
- **allInOne** - All-in-One section content
- **howItWorks** - How It Works section
- **features** - Features section
- **whyChooseUs** - Why Choose Us section
- **joinSection** - Join section for riders, drivers, and companies
- **faq** - Frequently Asked Questions
- **downloadBanner** - Download banner content
- **footer** - Footer content

## Adding New Translations

1. Add the translation key to all language files (`en.json`, `ar.json`)
2. Use the translation in your component using the `useTranslations` hook

## Example Usage

```jsx
"use client";

import { useLanguage } from "@/lib/i18n/language-context";
import { getTranslations } from "@/lib/i18n/get-translations";
import { useTranslations } from "@/lib/i18n/use-translations";

function MyComponent() {
  const { locale } = useLanguage();
  const messages = getTranslations(locale);
  const { t } = useTranslations(messages);

  return <h1>{t("common.welcome")}</h1>;
}
```

## Type Safety

All translation keys can be accessed using dot notation (e.g., `"hero.slide1.title"`).
