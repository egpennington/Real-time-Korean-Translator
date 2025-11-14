# Real-time Korean Translator

An application that translates English to Korean in real-time, with a text-to-speech feature to read the translation aloud.

## Features

- **Real-time Translation**: Instantly translate English text into Korean as you type.
- **Debounced Input**: API calls are optimized by waiting for a pause in typing, saving resources and costs.
- **Text-to-Speech**: Listen to the Korean translation with a natural-sounding voice powered by Google's TTS model.
- **Responsive Design**: A clean and modern interface that works seamlessly on desktop and mobile devices.

## Tech Stack

- **Frontend**: [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (via CDN)
- **AI/ML**: [Google Gemini API](https://ai.google.dev/docs) (`@google/genai`)

## Project Setup

This project runs directly in the browser and does not require a local installation or build step. You can simply open the `index.html` file in your browser. However, the Gemini API will not work without an API key.

For the best experience, including API key management, it's recommended to deploy the project to a hosting service like Netlify.

## Deployment

This application is optimized for easy deployment on static hosting services like [Netlify](https://www.netlify.com/).

### Deploying to Netlify

1.  **Push your code** to a GitHub, GitLab, or Bitbucket repository.
2.  **Create a new site** on Netlify and connect it to your repository.
3.  **Configure environment variables:**
    - In your Netlify site settings, go to `Site configuration > Environment variables`.
    - Add a new variable:
      - **Key**: `TRANSLATE_API_KEY`
      - **Value**: Your Google Gemini API key (obtain from [Google AI Studio](https://aistudio.google.com/app/apikey)).
4.  **Configure build settings:**
    - **Build command**: `echo "window.process = { env: { TRANSLATE_API_KEY: '$TRANSLATE_API_KEY' } };" > env.js`
    - **Publish directory**: Leave this blank (or set to `.`) to publish the root directory.
5.  **Deploy your site.** Netlify will run the build command to create the `env.js` file and deploy your application.

## License

This project is licensed under the MIT License.

---

### MIT License

Copyright (c) 2024 The Project Authors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.