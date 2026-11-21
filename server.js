// import express from 'express';
// import nodemailer from 'nodemailer';
// import cors from 'cors';
// import dotenv from 'dotenv';

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// const PORT = process.env.PORT || 5000;
// const EMAIL_USER = (process.env.EMAIL_USER || 'akpatial03@gmail.com').trim();
// // Strip spaces from Gmail App Password for SMTP authentication (toxqrecquavvezau)
// const EMAIL_PASS = (process.env.EMAIL_PASS || 'toxq recq uavv ezau').replace(/\s+/g, '');

// // In-Memory Store for OTPs with 5-minute expiry
// // Key: email -> Value: { otp, expiresAt }
// const otpStore = new Map();

// // Configure Nodemailer Transporter using explicit Gmail SSL SMTP
// const transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 465,
//   secure: true,
//   auth: {
//     user: EMAIL_USER,
//     pass: EMAIL_PASS
//   },
//   tls: {
//     rejectUnauthorized: false
//   }
// });

// // Verify SMTP Connection on Startup
// transporter.verify((error, success) => {
//   if (error) {
//     console.error('❌ Gmail SMTP Verification Failed:', error.message);
//   } else {
//     console.log('✅ Gmail SMTP Server Connected! Ready to send email OTPs from:', EMAIL_USER);
//   }
// });

// // 1. POST /api/send-otp -> Generate 6-digit OTP & Send Real Email to User Inbox
// app.post('/api/send-otp', async (req, res) => {
//   try {
//     const { email, name } = req.body;

//     if (!email || !email.includes('@')) {
//       return res.status(400).json({ success: false, message: 'Please enter a valid email address' });
//     }

//     const recipientEmail = email.trim().toLowerCase();

//     // Generate random 6-digit OTP
//     const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
//     const expiresAt = Date.now() + 5 * 60 * 1000; // 5 Minutes Expiry

//     // Save in OTP store
//     otpStore.set(recipientEmail, { otp: generatedOtp, expiresAt });

//     // HTML Email Template
//     const mailOptions = {
//       from: `"AI Short Ad Maker" <${EMAIL_USER}>`,
//       to: recipientEmail,
//       subject: `${generatedOtp} is your AI Short Ad Maker verification code`,
//       html: `
//         <div style="font-family: Arial, sans-serif; background-color: #08091a; padding: 36px; color: #ffffff; border-radius: 16px; max-width: 480px; margin: 0 auto; border: 1px solid #312e81;">
//           <div style="text-align: center; margin-bottom: 20px;">
//             <h1 style="color: #818cf8; margin: 0; font-size: 26px; font-weight: 800;">AI Short Ad Maker</h1>
//             <p style="color: #94a3b8; font-size: 13px; margin-top: 4px;">Account Verification</p>
//           </div>

//           <div style="background-color: #0f172a; padding: 24px; border-radius: 12px; text-align: center; border: 1px solid #1e293b;">
//             <p style="color: #cbd5e1; font-size: 14px; margin-bottom: 12px;">Hello ${name || 'Creator'}, your 6-digit verification code is:</p>
//             <div style="font-size: 38px; font-weight: 900; letter-spacing: 8px; color: #6366f1; background: #1e1b4b; padding: 16px; border-radius: 10px; display: inline-block; margin: 10px 0; border: 1px solid #4f46e5;">
//               ${generatedOtp}
//             </div>
//             <p style="color: #94a3b8; font-size: 12px; margin-top: 12px;">⏰ This code expires in <strong>5 minutes</strong>.</p>
//           </div>

//           <p style="color: #64748b; font-size: 11px; text-align: center; margin-top: 20px;">
//             If you did not request this code, please ignore this email.
//           </p>
//         </div>
//       `
//     };

//     // Send Email via Nodemailer
//     const info = await transporter.sendMail(mailOptions);
//     console.log(`✉️ Email OTP sent to ${recipientEmail} | Message ID: ${info.messageId}`);

//     return res.json({
//       success: true,
//       message: `Verification code sent to ${recipientEmail}`
//     });

//   } catch (error) {
//     console.error('❌ Error sending email OTP:', error);
//     return res.status(500).json({
//       success: false,
//       message: `Failed to send email. ${error.message}`
//     });
//   }
// });

// // 2. POST /api/verify-otp -> Validate OTP & Expiry Flow
// app.post('/api/verify-otp', (req, res) => {
//   const { email, otp, name } = req.body;

//   if (!email || !otp) {
//     return res.status(400).json({ success: false, message: 'Email and OTP code are required' });
//   }

//   const recipientEmail = email.trim().toLowerCase();
//   const record = otpStore.get(recipientEmail);
//   const currentTime = Date.now();

//   // Strict user condition check: (enteredOtp === storedOtp && currentTime < expiresAt)
//   if (record && record.otp === otp.trim() && currentTime < record.expiresAt) {
//     // Invalidate OTP
//     otpStore.delete(recipientEmail);

//     console.log(`✅ OTP Verified Successfully for ${recipientEmail}`);

//     return res.json({
//       success: true,
//       message: 'Logged in successfully',
//       user: {
//         name: name || recipientEmail.split('@')[0],
//         email: recipientEmail,
//         plan: 'Pro Plan',
//         credits: 20,
//         token: `jwt_session_${Date.now()}`
//       }
//     });
//   } else if (record && currentTime >= record.expiresAt) {
//     return res.status(400).json({
//       success: false,
//       message: 'Verification code has expired. Please request a new code.'
//     });
//   } else {
//     return res.status(400).json({
//       success: false,
//       message: 'Invalid verification code. Please check your email inbox and try again.'
//     });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`🚀 AI Short Ad Maker Server running on http://localhost:${PORT}`);
// });


// import express from 'express';
// import nodemailer from 'nodemailer';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import Replicate from 'replicate';
// import { GoogleGenAI } from '@google/genai';

// dotenv.config();

// const app = express();
// app.use(cors());
// // Image base64 payload ke liye limit 50mb rakhi hai
// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ limit: '50mb', extended: true }));

// const PORT = process.env.PORT || 5000;
// const EMAIL_USER = (process.env.EMAIL_USER || 'akpatial03@gmail.com').trim();
// const EMAIL_PASS = (process.env.EMAIL_PASS || 'toxq recq uavv ezau').replace(/\s+/g, '');

// // Replicate Client for Real Image-to-Video AI
// const replicate = new Replicate({
//   auth: process.env.REPLICATE_API_TOKEN || '',
// });

// // Google Gemini Client for Ad Assistant Bot
// const ai = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY || ''
// });

// // In-Memory Store for OTPs with 5-minute expiry
// const otpStore = new Map();

// // Configure Nodemailer Transporter using explicit Gmail SSL SMTP
// const transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 465,
//   secure: true,
//   auth: {
//     user: EMAIL_USER,
//     pass: EMAIL_PASS
//   },
//   tls: {
//     rejectUnauthorized: false
//   }
// });

// // Verify SMTP Connection on Startup
// transporter.verify((error, success) => {
//   if (error) {
//     console.error('❌ Gmail SMTP Verification Failed:', error.message);
//   } else {
//     console.log('✅ Gmail SMTP Server Connected! Ready to send email OTPs from:', EMAIL_USER);
//   }
// });

// // ==========================================
// // 1. AUTH ROUTES (OTP GENERATION & VERIFY)
// // ==========================================

// // POST /api/send-otp -> Generate 6-digit OTP & Send Email
// app.post('/api/send-otp', async (req, res) => {
//   try {
//     const { email, name } = req.body;

//     if (!email || !email.includes('@')) {
//       return res.status(400).json({ success: false, message: 'Please enter a valid email address' });
//     }

//     const recipientEmail = email.trim().toLowerCase();
//     const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
//     const expiresAt = Date.now() + 5 * 60 * 1000; // 5 Minutes Expiry

//     otpStore.set(recipientEmail, { otp: generatedOtp, expiresAt });

//     const mailOptions = {
//       from: `"AI Short Ad Maker" <${EMAIL_USER}>`,
//       to: recipientEmail,
//       subject: `${generatedOtp} is your AI Short Ad Maker verification code`,
//       html: `
//         <div style="font-family: Arial, sans-serif; background-color: #08091a; padding: 36px; color: #ffffff; border-radius: 16px; max-width: 480px; margin: 0 auto; border: 1px solid #312e81;">
//           <div style="text-align: center; margin-bottom: 20px;">
//             <h1 style="color: #818cf8; margin: 0; font-size: 26px; font-weight: 800;">AI Short Ad Maker</h1>
//             <p style="color: #94a3b8; font-size: 13px; margin-top: 4px;">Account Verification</p>
//           </div>

//           <div style="background-color: #0f172a; padding: 24px; border-radius: 12px; text-align: center; border: 1px solid #1e293b;">
//             <p style="color: #cbd5e1; font-size: 14px; margin-bottom: 12px;">Hello ${name || 'Creator'}, your 6-digit verification code is:</p>
//             <div style="font-size: 38px; font-weight: 900; letter-spacing: 8px; color: #6366f1; background: #1e1b4b; padding: 16px; border-radius: 10px; display: inline-block; margin: 10px 0; border: 1px solid #4f46e5;">
//               ${generatedOtp}
//             </div>
//             <p style="color: #94a3b8; font-size: 12px; margin-top: 12px;">⏰ This code expires in <strong>5 minutes</strong>.</p>
//           </div>

//           <p style="color: #64748b; font-size: 11px; text-align: center; margin-top: 20px;">
//             If you did not request this code, please ignore this email.
//           </p>
//         </div>
//       `
//     };

//     const info = await transporter.sendMail(mailOptions);
//     console.log(`✉️ Email OTP sent to ${recipientEmail} | Message ID: ${info.messageId}`);

//     return res.json({
//       success: true,
//       message: `Verification code sent to ${recipientEmail}`
//     });

//   } catch (error) {
//     console.error('❌ Error sending email OTP:', error);
//     return res.status(500).json({
//       success: false,
//       message: `Failed to send email. ${error.message}`
//     });
//   }
// });

// // POST /api/verify-otp -> Validate OTP & Login
// app.post('/api/verify-otp', (req, res) => {
//   const { email, otp, name } = req.body;

//   if (!email || !otp) {
//     return res.status(400).json({ success: false, message: 'Email and OTP code are required' });
//   }

//   const recipientEmail = email.trim().toLowerCase();
//   const record = otpStore.get(recipientEmail);
//   const currentTime = Date.now();

//   if (record && record.otp === otp.trim() && currentTime < record.expiresAt) {
//     otpStore.delete(recipientEmail);

//     console.log(`✅ OTP Verified Successfully for ${recipientEmail}`);

//     return res.json({
//       success: true,
//       message: 'Logged in successfully',
//       user: {
//         name: name || recipientEmail.split('@')[0],
//         email: recipientEmail,
//         plan: 'Pro Plan',
//         credits: 20,
//         token: `jwt_session_${Date.now()}`
//       }
//     });
//   } else if (record && currentTime >= record.expiresAt) {
//     return res.status(400).json({
//       success: false,
//       message: 'Verification code has expired. Please request a new code.'
//     });
//   } else {
//     return res.status(400).json({
//       success: false,
//       message: 'Invalid verification code. Please check your email inbox and try again.'
//     });
//   }
// });

// // ==========================================
// // 2. REAL AI VIDEO GENERATOR (IMAGE-TO-VIDEO)
// // ==========================================
// // POST /api/generate-video -> Calls Replicate AI (Minimax / SVD)
// app.post('/api/generate-video', async (req, res) => {
//   try {
//     const { image, prompt, duration } = req.body;

//     if (!image) {
//       return res.status(400).json({ error: 'Product image is required for video generation' });
//     }

//     console.log('🎬 Requesting Image-to-Video AI Model...');

//     // Agar Replicate Token configured hai toh real AI video generate karega
//     if (process.env.REPLICATE_API_TOKEN) {
//       const output = await replicate.run(
//         "minimax/video-01",
//         {
//           input: {
//             prompt: prompt || "Cinematic camera movement, studio lighting, smooth 4k ad",
//             first_frame_image: image
//           }
//         }
//       );

//       console.log('✅ AI Video Generated:', output);
//       return res.json({ videoUrl: output });
//     }

//     // Fallback Sample video stream agar token na ho taaki app 404 na de
//     console.log('⚠️ REPLICATE_API_TOKEN not found in .env, using sample video stream fallback');
//     return res.json({
//       videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
//     });

//   } catch (error) {
//     console.error('❌ Video Generation Error:', error);
//     return res.status(500).json({
//       error: error.message,
//       videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
//     });
//   }
// });

// // ==========================================
// // 3. AD ASSISTANT CHAT BOT (GOOGLE GEMINI AI)
// // ==========================================
// // POST /api/chat-bot -> Generates Scenarios, Captions & Hashtags
// app.post('/api/chat-bot', async (req, res) => {
//   try {
//     const { prompt } = req.body;

//     if (!prompt) {
//       return res.status(400).json({ error: 'Prompt is required' });
//     }

//     if (process.env.GEMINI_API_KEY) {
//       const systemInstruction = `You are an expert commercial ad director.
// The user wants an ad idea for: "${prompt}".
// Respond with pure JSON object (no markdown, no backticks):
// {
//   "videoPrompt": "Detailed cinematic visual prompt for AI video generator including camera angles, subject motion, and lighting.",
//   "caption": "Catchy social media reel hook with emojis.",
//   "hashtags": "8-10 trending hashtags separated by spaces."
// }`;

//       const response = await ai.models.generateContent({
//         model: 'gemini-2.5-flash',
//         contents: systemInstruction
//       });

//       const cleanJson = response.text.replace(/```json/g, '').replace(/```/g, '').trim();
//       const parsed = JSON.parse(cleanJson);
//       return res.json(parsed);
//     }

//     // Default fallback agar API key configured na ho
//     return res.json({
//       videoPrompt: `Cinematic commercial showcasing ${prompt}. Smooth orbiting camera motion, volumetric neon rim lighting, ultra-detailed 4k render.`,
//       caption: `Unleash the next level with ${prompt}! 🔥 Limited stock available.`,
//       hashtags: `#${prompt.replace(/\s+/g, '')} #TrendingAd #ReelsViral #MustHave`
//     });

//   } catch (error) {
//     console.error('❌ Chatbot Error:', error);
//     return res.status(500).json({ error: error.message });
//   }
// });

// // Start Server
// app.listen(PORT, () => {
//   console.log(`🚀 AI Short Ad Maker Server running on http://localhost:${PORT}`);
// });


import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import Replicate from 'replicate';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const PORT = process.env.PORT || 5000;
const EMAIL_USER = (process.env.EMAIL_USER || 'akpatial03@gmail.com').trim();
const EMAIL_PASS = (process.env.EMAIL_PASS || 'toxq recq uavv ezau').replace(/\s+/g, '');

// Replicate Client for Real Image-to-Video AI
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN || '',
});

// Google Gemini Client (Gemini 2.5 Flash)
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || ''
});

// In-Memory Store for OTPs
const otpStore = new Map();

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

transporter.verify((error) => {
  if (error) {
    console.error('❌ Gmail SMTP Verification Failed:', error.message);
  } else {
    console.log('✅ Gmail SMTP Server Connected! Ready to send email OTPs.');
  }
});

// 1. AUTH ROUTES
app.post('/api/send-otp', async (req, res) => {
  try {
    const { email, name } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email address' });
    }

    const recipientEmail = email.trim().toLowerCase();
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000;

    otpStore.set(recipientEmail, { otp: generatedOtp, expiresAt });

    const mailOptions = {
      from: `"AI Short Ad Maker" <${EMAIL_USER}>`,
      to: recipientEmail,
      subject: `${generatedOtp} is your AI Short Ad Maker verification code`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #08091a; padding: 36px; color: #ffffff; border-radius: 16px; max-width: 480px; margin: 0 auto; border: 1px solid #312e81;">
          <h2 style="color: #818cf8; text-align: center;">AI Short Ad Maker</h2>
          <div style="background-color: #0f172a; padding: 24px; border-radius: 12px; text-align: center; margin-top: 15px;">
            <p style="color: #cbd5e1; font-size: 14px;">Your 6-digit verification code is:</p>
            <div style="font-size: 36px; font-weight: 900; letter-spacing: 6px; color: #6366f1; padding: 12px; background: #1e1b4b; border-radius: 8px; display: inline-block;">
              ${generatedOtp}
            </div>
            <p style="color: #94a3b8; font-size: 12px; margin-top: 12px;">Expires in 5 minutes.</p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return res.json({ success: true, message: `Verification code sent to ${recipientEmail}` });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/verify-otp', (req, res) => {
  const { email, otp, name } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ success: false, message: 'Email and OTP code are required' });
  }

  const recipientEmail = email.trim().toLowerCase();
  const record = otpStore.get(recipientEmail);
  const currentTime = Date.now();

  if (record && record.otp === otp.trim() && currentTime < record.expiresAt) {
    otpStore.delete(recipientEmail);
    return res.json({
      success: true,
      message: 'Logged in successfully',
      user: {
        name: name || recipientEmail.split('@')[0],
        email: recipientEmail,
        plan: 'Pro Plan',
        credits: 20,
        token: `jwt_session_${Date.now()}`
      }
    });
  } else if (record && currentTime >= record.expiresAt) {
    return res.status(400).json({ success: false, message: 'Verification code has expired.' });
  } else {
    return res.status(400).json({ success: false, message: 'Invalid verification code.' });
  }
});

// 2. VIDEO GENERATOR ROUTE
app.post('/api/generate-video', async (req, res) => {
  try {
    const { image, prompt } = req.body;
    if (process.env.REPLICATE_API_TOKEN) {
      const output = await replicate.run(
        "minimax/video-01",
        {
          input: {
            prompt: prompt || "Cinematic product advertisement, studio lights, 4k motion",
            first_frame_image: image
          }
        }
      );
      return res.json({ videoUrl: output });
    }

    return res.json({
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4'
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4'
    });
  }
});

// 3. 🎯 100% PURE DYNAMIC GEMINI AD BOT (No hardcoded templates!)
app.post('/api/chat-bot', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    console.log(`🧠 Gemini analyzing user prompt: "${prompt}"`);

    // System instruction strictly forces Gemini to tailor everything to the EXACT user input
    const systemPrompt = `You are an elite commercial advertisement director, creative visualizer, and copywriter.
Analyze what the user requested: "${prompt}".
Identify the EXACT product, its unique benefits, its natural aesthetic, target audience, and environment.

Return a strictly valid JSON object with NO markdown formatting, NO backticks, and NO conversational filler:
{
  "videoPrompt": "Write a 100% custom, cinematic, scene-by-scene Image-to-Video generation prompt for this specific product. Mention the exact lighting, camera movement (macro close-up, panning, floating, orbit), material textures, environment (e.g. coffee shop for coffee, gaming arena for games, beach/city street for sunglasses, luxury showroom for cars), and frame rate.",
  "caption": "A catchy, viral, high-converting social media ad hook tailored specifically for this product with natural emojis.",
  "hashtags": "8-10 trending, high-traffic hashtags relevant ONLY to this specific product."
}`;

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: systemPrompt
      });

      const cleanJson = response.text.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJson);
      return res.json(parsed);
    }

    // Direct dynamic generation via fetch if client has different env
    return res.status(500).json({ error: "GEMINI_API_KEY is missing in server .env file" });

  } catch (error) {
    console.error('❌ Chatbot Error:', error);
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 AI Short Ad Maker Server running on http://localhost:${PORT}`);
});