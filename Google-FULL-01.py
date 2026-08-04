from google import genai
from google.genai import types
import wave
import os
import sys

OUTPUT_FILE = "VIDEO-V001_full_voice_Google_Kore/VIDEO-V001_full_01_opening_hook_Google_Kore_2026-08-04.wav"

prompt = """請用自然、溫和、清楚的繁體中文旁白語氣朗讀以下內容。

這是 Jazz AI Lab 影片《爵士到底在聽什麼？新手第一張地圖》的正式旁白第 1 段。

語氣要像一位有耐心的導覽者，正在陪完全新手慢慢進入爵士。
不要像新聞主播。
不要像廣告推銷。
不要像客服語音。
不要每一句都用一樣長度的停頓。

問句要像真的在問觀眾。
節奏要自然，有長短不同的停頓。
整體語氣要安定、親近、可信任。
重點是讓觀眾覺得：原來不是我不懂音樂，而是我還不知道可以從哪裡開始聽。

朗讀文字如下：

你聽爵士的時候，有沒有想過：

我到底應該聽哪裡？

旋律好像有出現，可是一下子又不見了。

節奏好像不是很整齊，但樂手又好像知道自己在做什麼。

有時候你甚至會想：

這是在亂彈嗎？

如果你有這種感覺，先不要急著覺得自己不懂音樂。

你可能只是，還不知道可以從哪裡開始聽。

今天這支影片，我們不考樂理，也不背爵士史。

我們只做一件事：

先找到幾個最容易聽見的線索，讓你用自己的方式，慢慢走進爵士。
"""

def write_wave(filename, pcm_bytes, channels=1, rate=24000, sample_width=2):
    with wave.open(filename, "wb") as wf:
        wf.setnchannels(channels)
        wf.setsampwidth(sample_width)
        wf.setframerate(rate)
        wf.writeframes(pcm_bytes)

def main():
    if not os.environ.get("GEMINI_API_KEY"):
        print("錯誤：GEMINI_API_KEY 沒有載入。")
        sys.exit(1)

    client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])

    response = client.models.generate_content(
        model="gemini-2.5-flash-preview-tts",
        contents=prompt,
        config=types.GenerateContentConfig(
            response_modalities=["AUDIO"],
            speech_config=types.SpeechConfig(
                voice_config=types.VoiceConfig(
                    prebuilt_voice_config=types.PrebuiltVoiceConfig(
                        voice_name="Kore"
                    )
                )
            )
        )
    )

    audio_data = response.candidates[0].content.parts[0].inline_data.data
    write_wave(OUTPUT_FILE, audio_data)

    print(f"已輸出：{OUTPUT_FILE}")

if __name__ == "__main__":
    main()
