import os
from dotenv import load_dotenv # Import this to read the .env file
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("No API key found. Please check your .env file.")

genai.configure(api_key=api_key)
model = genai.GenerativeModel('gemini-1.5-flash')

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # Your Vite frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data Model 
class AdRequest(BaseModel):
    category: str
    contentType: str
    productName: str
    description: str
    targetAudience: str
    tone: str

# Prompt Builder
def build_prompt(req: AdRequest):
    base_info = f"""
    Product: {req.productName}
    Description: {req.description}
    Target Audience: {req.targetAudience}
    Tone: {req.tone}
    """

    if req.category == "Video Scripts":
        return f"""
        {base_info}
        Task: Write a script for a strictly 10-second video ad.
        Format: Provide a table-like structure with "Visual Scene" and "Audio/Voiceover" columns.
        Keep it punchy and high-energy.
        """
    
    elif req.category == "Email Marketing":
        return f"""
        {base_info}
        Task: Write a {req.contentType}.
        Requirements:
        1. catchy Subject Line.
        2. Personal and engaging Body.
        3. Clear Call to Action (CTA).
        """
        
    elif req.category == "Social Media":
        return f"""
        {base_info}
        Task: Write a {req.contentType}.
        Requirements: Use emojis, short paragraphs, and include 3-5 relevant hashtags.
        """

    else:
        return f"""
        {base_info}
        Task: Write marketing copy for {req.contentType}.
        Requirements: Catchy Headline, Benefit-driven body text, and a strong CTA.
        """

# API Endpoint
@app.post("/api/generate")
async def generate_content(req: AdRequest):
    try:
        prompt = build_prompt(req)
        
        response = model.generate_content(prompt)
        
        return {
            "status": "success", 
            "content": response.text
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Run with: uvicorn main:app --reload