# Real-time Korean Translator

An application that translates English to Korean in real-time, with a text-to-speech feature to read the translation aloud.

## Features

- **Real-time Translation**: Instantly translate English text into Korean as you type.
- **Debounced Input**: API calls are optimized by waiting for a pause in typing, saving resources and costs.
- **Text-to-Speech**: Listen to the Korean translation with a natural-sounding voice powered by Google's TTS model.
- **Responsive Design**: A clean and modern interface that works seamlessly on desktop and mobile devices.

## Tech Stack

- **Frontend**: [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/)
- **AI/ML**: [Google Gemini API](https://ai.google.dev/docs) (`@google/genai`)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

This project is built with modern web technologies and uses ES modules loaded via a CDN. You just need a modern web browser and a local web server to run it.

### Configuration

To use the Google Gemini API, you need to provide an API key.

1.  Obtain an API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
2.  When running locally or deploying, you will need to set up an environment variable named `TRANSLATE_API_KEY` with the value of your key.

### Running Locally

Since the application uses ES modules, you'll need to serve the files from a local web server. A simple way to do this is with Python's built-in server.

1.  Open your terminal in the project's root directory.
2.  Run the following command:
    ```bash
    python -m http.server
    ```
3.  Open your browser and navigate to `http://localhost:8000`.

*Note: The application will not work locally without a mechanism to inject the `TRANSLATE_API_KEY` environment variable. Running it in a development environment that supports this (like Vite, or through a deployment platform) is recommended.*

## Deployment

This application is ready to be deployed on static hosting services like [Netlify](https://www.netlify.com/).

### Deploying to Netlify

1.  **Push your code** to a GitHub, GitLab, or Bitbucket repository.
2.  **Create a new site** on Netlify and connect it to your repository.
3.  **Configure environment variables:**
    - In your Netlify site settings, go to `Site configuration > Environment variables`.
    - Add a new variable:
      - **Key**: `TRANSLATE_API_KEY`
      - **Value**: Your Google Gemini API key.
4.  **Configure build settings:**
    - **Build command**: `echo "window.process = { env: { TRANSLATE_API_KEY: '$TRANSLATE_API_KEY' } };" > env.js`
    - **Publish directory**: Set this to the root directory (`.`).
5.  **Deploy your site.** Netlify will automatically deploy your application.

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
furnished to do so, a aistudio-copy-text: 
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.