# AI Horizon - The Ultimate AI Directory

AI Horizon is a polished, high-performance directory listing over 50 curated Artificial Intelligence tools. It allows users to browse, search, and filter tools by category and pricing to find the perfect solution for their workflow. The application features a modern, responsive design with dark mode support.

---

## Details

*   **Live website URL:** https://aistudio.google.com/app/prompts?state=%7B%22ids%22:%5B%221F7-Xm5ygOmAAqq-bCOhgzrxhKQfB5t5_%22%5D,%22action%22:%22open%22,%22userId%22:%22112089583234787518802%22,%22resourceKeys%22:%7B%7D%7D&usp=sharing
*   **Loom Walkthrough:** https://drive.google.com/file/d/17ZHHUJmxTchSZYzDlR3N-CEcbblyFaGF/view?usp=sharing

---

## 📊 Dataset Information

### Dataset Used
The dataset consists of **50+ AI Tools** categorized into sectors like Image, Video, Code, Text, and Productivity. It models real-world directories such as "There's an AI for That" and "Product Hunt".

**Source URL:** Synthetic dataset generated for this project (modeled after [theresanaiforthat.com](https://theresanaiforthat.com/)).

### Generation Method
Instead of scraping a live website (which can be fragile and prone to rate-limiting), the dataset was programmatically generated using **Large Language Models (LLMs)**.
1.  **Prompting:** I used an LLM to generate a JSON structure containing realistic tool names, descriptions, pricing models, and ratings.
2.  **Cleaning:** The data was normalized to ensure consistent category tags (`Text`, `Image`, `Code`) and pricing tiers (`Free`, `Freemium`, `Paid`).
3.  **Integration:** The data is stored statically in `constants.ts` to ensure fast load times and zero-latency filtering during the demo.

---

## 🛠️ Tech Stack & Design

### Tech Stack
*   **Framework:** React 19 (Client-side Architecture)
*   **Routing:** React Router v7
*   **Styling:** Tailwind CSS (Utility-first CSS)
*   **Language:** TypeScript (Strict typing for robustness)
*   **Icons:** Lucide React
*   **Build/Bundling:** ESM (ECMAScript Modules) via CDN for browser-native execution

### Design Inspiration
The UI was inspired by modern, developer-centric platforms like **Linear**, **Vercel**, and **Raycast**.
*   **Aesthetic:** Minimalist, dark-mode first, with subtle gradients and glassmorphism (backdrop-blur) effects.
*   **Typography:** Inter font for clean, legible sans-serif text.
*   **Interactions:** Smooth transitions on hover, micro-interactions on buttons, and instant search feedback.

---

## 🤖 AI Prompt Examples

Here are a few examples of prompts I used to accelerate development:

**1. Generating the Dataset:**
> "Generate a TypeScript array of 50 fictional AI tool objects. Each object should have an `id`, `name`, `shortDescription`, `fullDescription`, `category` (Text, Image, Code, Audio), `pricing` (Free, Paid, Enterprise), `rating` (3.5 to 5.0), and `tags`. Make the names sound modern and startup-like."

**2. Styling Components:**
> "Create a React functional component for a card using Tailwind CSS. It should have a cover image slot, a floating badge for pricing in the top left, a title, a star rating, and a 'View Details' link at the bottom. Ensure it looks good in both light and dark mode using Tailwind's `dark:` modifier."

**3. Implementing Logic (Debounce):**
> "Write a `FilterBar` component in React. It needs an input for search text. Implement a custom debounce hook or logic so the search state only updates 300ms after the user stops typing to improve performance."

---

## 🔮 Future Improvements (With 2 More Days)

If I had more time, I would implement the following features:

1.  **Backend Integration:** Move from a static JSON file to a real database (like **Supabase** or **PostgreSQL**) to allow dynamic submissions and upvoting.
2.  **Advanced SEO:** Implement Next.js Server Side Rendering (SSR) to generate dynamic metadata for each tool page, improving search engine visibility.
3.  **User Authentication:** Add login functionality so users can save/bookmark their favorite tools and leave reviews.
4.  **Performance Optimization:** Implement virtualization for the list view to support thousands of items without DOM lag.
5.  **Analytics:** Integrate an analytics dashboard to track which tools are being clicked and searched for most frequently.
