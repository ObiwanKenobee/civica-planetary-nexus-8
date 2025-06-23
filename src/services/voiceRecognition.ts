// CIVICA 144 Voice Recognition Service
// Sacred voice input for scroll creation

import { VoiceRecording } from "@/types/scrollSignal";

export interface VoiceRecognitionConfig {
  language: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  wakeWords: string[];
  confidenceThreshold: number;
}

export interface VoiceRecognitionCallbacks {
  onStart?: () => void;
  onResult?: (transcript: string, confidence: number, isFinal: boolean) => void;
  onEnd?: () => void;
  onError?: (error: string) => void;
  onWakeWord?: (wakeWord: string) => void;
}

export class VoiceRecognitionService {
  private recognition: SpeechRecognition | null = null;
  private isListening = false;
  private config: VoiceRecognitionConfig;
  private callbacks: VoiceRecognitionCallbacks = {};
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private dataArray: Uint8Array | null = null;

  constructor(config: Partial<VoiceRecognitionConfig> = {}) {
    this.config = {
      language: "en-US",
      continuous: true,
      interimResults: true,
      maxAlternatives: 3,
      wakeWords: ["sacred scroll", "civica scroll", "community scroll"],
      confidenceThreshold: 0.7,
      ...config,
    };

    this.initializeSpeechRecognition();
  }

  private initializeSpeechRecognition(): void {
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      console.warn("Speech Recognition not supported in this browser");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();

    this.recognition.continuous = this.config.continuous;
    this.recognition.interimResults = this.config.interimResults;
    this.recognition.lang = this.config.language;
    this.recognition.maxAlternatives = this.config.maxAlternatives;

    this.setupEventHandlers();
  }

  private setupEventHandlers(): void {
    if (!this.recognition) return;

    this.recognition.onstart = () => {
      this.isListening = true;
      console.log(
        "🎙️ Voice recognition started - listening for sacred wisdom...",
      );
      this.callbacks.onStart?.();
    };

    this.recognition.onresult = (event) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const transcript = result[0].transcript.toLowerCase().trim();
        const confidence = result[0].confidence;
        const isFinal = result.isFinal;

        console.log(`Voice input: "${transcript}" (confidence: ${confidence})`);

        // Check for wake words
        if (this.checkForWakeWords(transcript)) {
          this.callbacks.onWakeWord?.(transcript);
        }

        if (confidence >= this.config.confidenceThreshold) {
          this.callbacks.onResult?.(transcript, confidence, isFinal);
        }
      }
    };

    this.recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      this.callbacks.onError?.(event.error);
    };

    this.recognition.onend = () => {
      this.isListening = false;
      console.log("🔇 Voice recognition ended");
      this.callbacks.onEnd?.();
    };
  }

  private checkForWakeWords(transcript: string): boolean {
    return this.config.wakeWords.some((wakeWord) =>
      transcript.includes(wakeWord.toLowerCase()),
    );
  }

  async startListening(
    callbacks: VoiceRecognitionCallbacks = {},
  ): Promise<void> {
    if (!this.recognition) {
      throw new Error("Speech Recognition not available");
    }

    if (this.isListening) {
      console.log("Already listening...");
      return;
    }

    this.callbacks = callbacks;

    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });

      this.recognition.start();
      await this.initializeAudioAnalysis();
    } catch (error) {
      console.error("Error starting voice recognition:", error);
      throw error;
    }
  }

  stopListening(): void {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
    }

    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
  }

  private async initializeAudioAnalysis(): Promise<void> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.audioContext = new AudioContext();
      const source = this.audioContext.createMediaStreamSource(stream);
      this.analyser = this.audioContext.createAnalyser();

      this.analyser.fftSize = 256;
      const bufferLength = this.analyser.frequencyBinCount;
      this.dataArray = new Uint8Array(bufferLength);

      source.connect(this.analyser);
    } catch (error) {
      console.error("Error initializing audio analysis:", error);
    }
  }

  getWaveformData(): number[] {
    if (!this.analyser || !this.dataArray) {
      return [];
    }

    this.analyser.getByteFrequencyData(this.dataArray);
    return Array.from(this.dataArray).map((value) => value / 255);
  }

  setLanguage(language: string): void {
    this.config.language = language;
    if (this.recognition) {
      this.recognition.lang = language;
    }
  }

  setWakeWords(wakeWords: string[]): void {
    this.config.wakeWords = wakeWords;
  }

  isCurrentlyListening(): boolean {
    return this.isListening;
  }

  // Convert speech to VoiceRecording object
  async createVoiceRecording(
    transcript: string,
    confidence: number,
    duration: number,
  ): Promise<VoiceRecording> {
    const waveform = this.getWaveformData();

    return {
      audioUrl: "", // In real implementation, this would be a blob URL
      transcript,
      language: this.config.language,
      confidence,
      duration,
      waveform: waveform.length > 0 ? waveform : [0.2, 0.5, 0.8, 0.6, 0.3],
    };
  }

  // Simulate AI-enhanced voice processing
  async enhanceTranscript(recording: VoiceRecording): Promise<VoiceRecording> {
    console.log("🧠 Enhancing transcript with AI language processing...");

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In real implementation, this would:
    // 1. Correct transcription errors
    // 2. Add cultural context
    // 3. Identify intent and emotion
    // 4. Translate to preferred language

    const enhancedTranscript = this.applyBasicEnhancements(
      recording.transcript,
    );

    return {
      ...recording,
      transcript: enhancedTranscript,
      confidence: Math.min(recording.confidence + 0.1, 1.0), // Slight confidence boost
    };
  }

  private applyBasicEnhancements(transcript: string): string {
    // Basic text cleaning and enhancement
    let enhanced = transcript
      .trim()
      .replace(/\s+/g, " ") // Normalize whitespace
      .replace(/^./, (char) => char.toUpperCase()); // Capitalize first letter

    // Add punctuation if missing
    if (!enhanced.match(/[.!?]$/)) {
      enhanced += ".";
    }

    // Cultural and sacred language adaptations
    enhanced = enhanced
      .replace(/\bwater\b/gi, "sacred water")
      .replace(/\bcommunity\b/gi, "blessed community")
      .replace(/\bhealth\b/gi, "wellness and healing");

    return enhanced;
  }

  // Language detection for multilingual support
  async detectLanguage(transcript: string): Promise<string> {
    // Simple language detection based on common words
    const languagePatterns = {
      sw: ["maji", "jamii", "afya", "elimu", "mazingira"], // Swahili
      es: ["agua", "comunidad", "salud", "educación", "medio"], // Spanish
      fr: ["eau", "communauté", "santé", "éducation", "environnement"], // French
      ar: ["ماء", "مجتمع", "صحة", "تعليم", "بيئة"], // Arabic
      pt: ["água", "comunidade", "saúde", "educação", "meio"], // Portuguese
    };

    const lowerTranscript = transcript.toLowerCase();

    for (const [lang, patterns] of Object.entries(languagePatterns)) {
      if (patterns.some((pattern) => lowerTranscript.includes(pattern))) {
        return lang;
      }
    }

    return "en"; // Default to English
  }

  // Multi-language support
  getSupportedLanguages(): { code: string; name: string; native: string }[] {
    return [
      { code: "en", name: "English", native: "English" },
      { code: "sw", name: "Swahili", native: "Kiswahili" },
      { code: "es", name: "Spanish", native: "Español" },
      { code: "fr", name: "French", native: "Français" },
      { code: "pt", name: "Portuguese", native: "Português" },
      { code: "ar", name: "Arabic", native: "العربية" },
      { code: "hi", name: "Hindi", native: "हिन्दी" },
      { code: "zu", name: "Zulu", native: "isiZulu" },
    ];
  }

  // Test audio input
  async testMicrophone(): Promise<boolean> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
      return true;
    } catch (error) {
      console.error("Microphone test failed:", error);
      return false;
    }
  }

  // Sacred audio feedback
  playFeedbackSound(
    type: "activation" | "processing" | "completion" | "error",
  ): void {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    const frequencies = {
      activation: 528, // 528 Hz - "Love frequency"
      processing: 396, // 396 Hz - "Liberation frequency"
      completion: 741, // 741 Hz - "Awakening frequency"
      error: 174, // 174 Hz - "Foundation frequency"
    };

    oscillator.frequency.setValueAtTime(
      frequencies[type],
      this.audioContext.currentTime,
    );
    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(
      0.1,
      this.audioContext.currentTime + 0.1,
    );
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      this.audioContext.currentTime + 0.5,
    );

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.5);
  }
}

// Export singleton instance
export const voiceRecognitionService = new VoiceRecognitionService();

// Browser compatibility check
export const isVoiceRecognitionSupported = (): boolean => {
  return "webkitSpeechRecognition" in window || "SpeechRecognition" in window;
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}
