import React, { useState } from 'react';
import { Sparkles, Wand2, Download, RefreshCw } from 'lucide-react';
import '../index.css';

const AIWallpaperGenerator = () => {
    const [prompt, setPrompt] = useState('');
    const [generating, setGenerating] = useState(false);
    const [resultImage, setResultImage] = useState(null);
    const [magicEnhance, setMagicEnhance] = useState(true);
    const [engine, setEngine] = useState('openai'); // 'openai', 'google', or 'puter'

    const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || "";
    const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY || "";
    const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || "";

    const enhancePromptWithGroq = async (userPrompt) => {
        try {
            const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${GROQ_API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "llama-3.3-70b-versatile",
                    messages: [
                        {
                            role: "system",
                            content: "You are a professional AI image prompt engineer. Expand the user's idea into a highly detailed cinematic 4K wallpaper prompt. Output ONLY the prompt."
                        },
                        {
                            role: "user",
                            content: `Expand this wallpaper idea: ${userPrompt}`
                        }
                    ],
                    max_tokens: 150
                })
            });
            const data = await response.json();
            return data.choices[0]?.message?.content || userPrompt;
        } catch (error) {
            console.error("Groq enhancement failed:", error);
            return userPrompt;
        }
    };

    const generateWithGoogle = async (finalPrompt) => {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict?key=${GOOGLE_API_KEY}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                instances: [{ prompt: finalPrompt }],
                parameters: { sampleCount: 1 }
            })
        });
        
        const data = await response.json();
        if (data.predictions && data.predictions[0]?.bytesBase64Encoded) {
            return `data:image/png;base64,${data.predictions[0].bytesBase64Encoded}`;
        } else if (data.error) {
            throw new Error(data.error.message || "Google AI Error");
        }
        throw new Error("Invalid response from Google AI");
    };

    const generateWithOpenAI = async (finalPrompt) => {
        const response = await fetch("https://api.openai.com/v1/images/generations", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENAI_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "dall-e-3",
                prompt: finalPrompt,
                n: 1,
                size: "1024x1024",
                quality: "hd"
            })
        });

        const data = await response.json();
        if (data.data && data.data[0]?.url) {
            return data.data[0].url;
        } else if (data.error) {
            throw new Error(data.error.message || "OpenAI Error");
        }
        throw new Error("Invalid response from OpenAI");
    };

    const handleGenerate = async (e) => {
        e.preventDefault();
        if (!prompt) return;
        
        setGenerating(true);
        try {
            let finalPrompt = prompt;
            
            if (magicEnhance) {
                finalPrompt = await enhancePromptWithGroq(prompt);
            }

            let imageUrl = '';
            if (engine === 'openai') {
                try {
                    imageUrl = await generateWithOpenAI(finalPrompt);
                } catch (oaErr) {
                    console.error("OpenAI Engine failed, falling back to Google:", oaErr);
                    try {
                        imageUrl = await generateWithGoogle(finalPrompt);
                    } catch (googleErr) {
                        imageUrl = (await window.puter.ai.txt2img(finalPrompt)).src;
                    }
                }
            } else if (engine === 'google') {
                try {
                    imageUrl = await generateWithGoogle(finalPrompt);
                } catch (googleErr) {
                    console.error("Google Engine failed, falling back to Puter:", googleErr);
                    imageUrl = (await window.puter.ai.txt2img(finalPrompt)).src;
                }
            } else {
                imageUrl = (await window.puter.ai.txt2img(finalPrompt)).src;
            }
            
            setResultImage(imageUrl);
        } catch (error) {
            console.error("AI Generation failed:", error);
            alert("AI Generation failed. Please try again.");
        } finally {
            setGenerating(false);
        }
    };

    return (
        <div style={{paddingTop: '100px', minHeight: '100vh', paddingBottom: '100px'}}>
            <div className="container" style={{maxWidth: '1000px'}}>
                <div style={{textAlign: 'center', marginBottom: '50px'}}>
                    <h1 className="text-gradient" style={{fontSize: '3.5rem', marginBottom: '10px'}}>AI Wallpaper Generator</h1>
                    <p style={{color: 'var(--text-secondary)', fontSize: '1.2rem'}}>Turn your imagination into stunning 4K wallpapers using AI.</p>
                </div>

                <div className="glass-panel" style={{padding: '40px', borderRadius: '24px'}}>
                    <form onSubmit={handleGenerate} style={{display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px'}}>
                        <div style={{display: 'flex', gap: '15px'}}>
                            <div className="glass-input" style={{flex: 1, display: 'flex', alignItems: 'center', gap: '15px', padding: '15px 25px'}}>
                                <Sparkles size={24} color="var(--neon-cyan)" />
                                <input 
                                    type="text" 
                                    placeholder="Describe your dream wallpaper (e.g., 'Cyberpunk city in rain')" 
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    style={{background: 'transparent', border: 'none', color: 'white', width: '100%', fontSize: '1.1rem', outline: 'none'}}
                                />
                            </div>
                            <button type="submit" className="btn-glow" disabled={generating} style={{padding: '0 40px', display: 'flex', alignItems: 'center', gap: '10px'}}>
                                {generating ? <RefreshCw className="animate-spin" size={20} /> : <Wand2 size={20} />} 
                                {generating ? 'Generating...' : 'Generate'}
                            </button>
                        </div>
                        
                        <div style={{display: 'flex', alignItems: 'center', gap: '10px', paddingLeft: '10px'}}>
                            <input 
                                type="checkbox" 
                                id="magic-enhance" 
                                checked={magicEnhance} 
                                onChange={(e) => setMagicEnhance(e.target.checked)}
                                style={{cursor: 'pointer', accentColor: 'var(--neon-cyan)'}}
                            />
                            <label htmlFor="magic-enhance" style={{color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px'}}>
                                <Sparkles size={14} color="var(--neon-cyan)" />
                                Magic Enhance (using Groq AI)
                            </label>
                        </div>

                        <div style={{display: 'flex', alignItems: 'center', gap: '20px', paddingLeft: '10px', marginTop: '5px'}}>
                            <span style={{fontSize: '0.9rem', color: 'var(--text-secondary)'}}>AI Engine:</span>
                            <div style={{display: 'flex', gap: '10px'}}>
                                <button 
                                    type="button"
                                    onClick={() => setEngine('openai')}
                                    className={engine === 'openai' ? 'engine-btn active' : 'engine-btn'}
                                    style={{
                                        padding: '5px 15px', borderRadius: '15px', fontSize: '0.8rem', cursor: 'pointer',
                                        background: engine === 'openai' ? 'var(--neon-cyan)' : 'rgba(255,255,255,0.05)',
                                        border: engine === 'openai' ? '1px solid var(--neon-cyan)' : '1px solid var(--glass-border)',
                                        color: engine === 'openai' ? '#000' : 'white', transition: '0.3s', fontWeight: engine === 'openai' ? 700 : 400
                                    }}
                                >
                                    OpenAI DALL-E 3 (Premium)
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => setEngine('google')}
                                    className={engine === 'google' ? 'engine-btn active' : 'engine-btn'}
                                    style={{
                                        padding: '5px 15px', borderRadius: '15px', fontSize: '0.8rem', cursor: 'pointer',
                                        background: engine === 'google' ? 'var(--neon-purple)' : 'rgba(255,255,255,0.05)',
                                        border: engine === 'google' ? '1px solid var(--neon-purple)' : '1px solid var(--glass-border)',
                                        color: 'white', transition: '0.3s'
                                    }}
                                >
                                    Google Imagen 3
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => setEngine('puter')}
                                    className={engine === 'puter' ? 'engine-btn active' : 'engine-btn'}
                                    style={{
                                        padding: '5px 15px', borderRadius: '15px', fontSize: '0.8rem', cursor: 'pointer',
                                        background: engine === 'puter' ? 'var(--neon-blue)' : 'rgba(255,255,255,0.05)',
                                        border: engine === 'puter' ? '1px solid var(--neon-blue)' : '1px solid var(--glass-border)',
                                        color: 'white', transition: '0.3s'
                                    }}
                                >
                                    Puter Fast
                                </button>
                            </div>
                        </div>
                    </form>

                    <div style={{
                        width: '100%', height: '500px', borderRadius: '16px', 
                        background: 'rgba(0,0,0,0.3)', border: '2px dashed var(--glass-border)',
                        display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden'
                    }}>
                        {resultImage ? (
                            <div style={{position: 'relative', width: '100%', height: '100%'}}>
                                <img src={resultImage} alt="AI Result" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                                <div style={{position: 'absolute', bottom: '20px', right: '20px', display: 'flex', gap: '10px'}}>
                                    <button 
                                        onClick={async () => {
                                            try {
                                                const response = await fetch(resultImage);
                                                const blob = await response.blob();
                                                const url = window.URL.createObjectURL(blob);
                                                const link = document.createElement('a');
                                                link.href = url;
                                                link.download = `AI_Wallpaper_${Date.now()}.png`;
                                                document.body.appendChild(link);
                                                link.click();
                                                document.body.removeChild(link);
                                                window.URL.revokeObjectURL(url);
                                            } catch (err) {
                                                console.error("Download failed:", err);
                                                // Fallback to simple link if fetch fails
                                                window.open(resultImage, '_blank');
                                            }
                                        }}
                                        className="btn-glow" 
                                        style={{padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer'}}
                                    >
                                        <Download size={18} /> Download 4K
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div style={{textAlign: 'center', color: 'var(--text-secondary)'}}>
                                {generating ? (
                                    <p style={{fontSize: '1.2rem'}}>AI is dreaming up your wallpaper...</p>
                                ) : (
                                    <>
                                        <Sparkles size={60} style={{marginBottom: '20px', opacity: 0.2}} />
                                        <p>Enter a prompt above to start generating.</p>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div style={{marginTop: '50px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px'}}>
                   <div className="glass-card" style={{padding: '20px', textAlign: 'center'}}>
                       <h4 style={{marginBottom: '10px'}}>Pro Quality</h4>
                       <p style={{fontSize: '0.8rem', color: 'var(--text-secondary)'}}>All generated images are optimized for 4K displays.</p>
                   </div>
                   <div className="glass-card" style={{padding: '20px', textAlign: 'center'}}>
                       <h4 style={{marginBottom: '10px'}}>Unique Art</h4>
                       <p style={{fontSize: '0.8rem', color: 'var(--text-secondary)'}}>Every prompt creates a one-of-a-kind masterpiece.</p>
                   </div>
                   <div className="glass-card" style={{padding: '20px', textAlign: 'center'}}>
                       <h4 style={{marginBottom: '10px'}}>Lightning Fast</h4>
                       <p style={{fontSize: '0.8rem', color: 'var(--text-secondary)'}}>Get your custom wallpaper in less than 5 seconds.</p>
                   </div>
                </div>
            </div>
        </div>
    );
};

export default AIWallpaperGenerator;
