### BitTerms

BitTerms is an open-source project dedicated to demystifying Bitcoin terminology. We help everyone—from newcomers to experienced users—understand Bitcoin concepts through clear, simple definitions paired with friendly visual illustrations and optional audio explanations.

### Project Purpose

Bitcoin can be intimidating due to its technical jargon. BitTerms bridges this gap by providing:

- **Simple definitions** for Bitcoin and cryptocurrency terms
- **Visual illustrations** to aid understanding and memory retention
- **Technical definitions** for those wanting deeper technical knowledge
- **Audio explanations** (optional) for multi-sensory learning
- **Popular term tracking** to highlight the most searched concepts
- **Community contributions** to continuously expand the term library

### Contributing

We welcome contributions! BitTerms supports two main types of contributions:

**1. Adding or Improving Bitcoin Terminology**

Help expand or improve the Bitcoin knowledge base by contributing new terms or refining existing ones.

**How to Contribute**

- **Method 1: Using the Web Interface (Recommended for Non-Technical Users)**
  1. Visit the BitTerms website: [https://www.bitterms.com](https://www.bitterms.com)
  2. Navigate to the **"Suggest a Term"** page
  3. Fill out the form with your contribution
  4. Submit and we’ll review it

- **Method 2: Creating a GitHub Issue (For Technical Contributors)**
  1. Create a new GitHub issue: [https://github.com/GadaStudios/BitTerms/issues/new](https://github.com/GadaStudios/BitTerms/issues/new)
  2. Use the template below:

  ```markdown
  ### Term Contribution

  **Term Name:** [REQUIRED] - The Bitcoin/crypto term you want to define

  **Simple Definition:** [OPTIONAL] - Beginner-friendly explanation (max 300 characters)

  **Technical Definition:** [REQUIRED] - Detailed and accurate explanation (2–1000 characters)

  **Illustration:** [OPTIONAL] - PNG, JPG, or SVG file (max 2MB)

  **Audio File:** [OPTIONAL] - MP3 or WAV pronunciation or explanation

  **Author Name:** [OPTIONAL] - Your name for attribution

  **Additional Context:** [OPTIONAL] - Any supporting details or sources
  ```

**Contribution Guidelines**

- Ensure definitions are accurate and up to date
- Use clear and simple language
- Keep explanations concise and understandable
- Illustrations should be clean and easy to interpret
- Avoid opinions; stick to factual information

**2. Adding or Updating Translations (i18n)**

BitTerms supports multiple languages using JSON files located in the `/messages` directory.

Each file represents a locale:

```
en.json
es.json
fr.json
de.json
sw.json
```

**How to Contribute Translations**

**1. Add a New Language**

- Create a new file in `/messages` (example: `pt.json`, `ar.json`)
- Copy the structure from `en.json`
- Translate **only the values**, not the keys

**2. Update Existing Translations**

- Open the relevant locale file
- Improve or fix translations
- Ensure consistency with other languages

**3. Rules**

- Do NOT rename or remove keys
- Keep JSON structure identical across all locales
- Missing keys may break the UI

**4. Local Testing**

After adding or updating translations, run:

```bash
pnpm run gen-locales
```

The system will automatically:

- Detect locale changes
- Update supported languages
- Reorder locales (default first)

### Features

- Search functionality for Bitcoin terms
- Community-driven term expansion
- Simple + technical definitions
- Visual learning support
- Audio explanations
- Responsive design
- Dark mode support
- Open-source collaboration

### Reporting Issues

If you find a bug or inconsistency:

- Create an issue: [https://github.com/GadaStudios/BitTerms/issues](https://github.com/GadaStudios/BitTerms/issues)
- Include:
  - Clear description
  - Steps to reproduce
  - Screenshots (if applicable)
  - Expected vs actual behavior

### Acknowledgments

- Special thanks to all contributors who help make Bitcoin more accessible
- Inspired by the need for clearer Bitcoin education
- Built with the open-source community in mind

### Socials

- Twitter: [https://x.com/bit_terms](https://x.com/bit_terms)
- LinkedIn: [https://www.linkedin.com/company/bitterms](https://www.linkedin.com/company/bitterms)

### License

MIT License

**Help make Bitcoin education accessible to everyone.** 🚀
