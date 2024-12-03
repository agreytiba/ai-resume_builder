// import OpenAI from "openai";

// const openai = new OpenAI();

// export default openai;
import Groq from "groq-sdk"; // Replace with the actual Groq package if different

// Load environment variables
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
apiKey: process.env.GROQ_API_KEY;
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
export default groq;
