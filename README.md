# mnemonicsAI 🌟  
**Mnemonics AI** is a web app designed to help users create and explore mnemonics using advanced AI-powered assistance. Now powered by **Gemini API**, the app offers tailored suggestions for learning and memory enhancement.  

## 🚀 Features  
- **Google Authentication**: Seamlessly log in using your Google account.  
- **AI-Powered Mnemonics**: Generate mnemonic aids with Gemini API.  
- **User-Friendly Interface**: Modern, responsive design built with Next.js and Tailwind CSS.  
- **Data Security**: Uses Supabase for secure authentication and data storage.  

## 📚 Tech Stack  
- **Frontend**: Next.js with TypeScript  
- **Authentication**: Supabase  
- **API Integration**: Gemini API  
- **Styling**: Tailwind CSS
- **blog**: Sanityio
- **Deployment**: mnemonicsAi.com

## 🛠️ Getting Started  
### Prerequisites  
- Node.js (v18+ recommended)  
- npm or yarn  
- A Supabase account  
- Gemini API key
- sanity account

### Installation  
 Clone the repository:  
   ```bash  
   git clone https://github.com/your-username/mnemonicsai.git  
   cd mnemonicsai
   npm install
   ```
#### Add env file with:
.env
```bash
  NEXT_PUBLIC_SUPABASE_URL=<your_supabase_url>  
  NEXT_PUBLIC_SUPABASE_ANON_KEY=<your_supabase_anon_key>  
  GEMINI_API_KEY=<your_gemini_api_key>
```
.env.local
```
NEXT_PUBLIC_SANITY_PROJECT_ID=<your_project_id>
NEXT_PUBLIC_SANITY_DATASET="your_dataset"
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-05
```
#### Start the server
```bash
  npm run dev
```
## 💻 Contribution

Contributions are welcome! Please create a fork, make your changes, and submit a pull request.

## 📄 License

This project is licensed under the MIT License.

