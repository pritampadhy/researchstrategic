import subprocess
# pyrefly: ignore [missing-import]
from google import genai
from google.genai import types
import os
import sys
import datetime
import time
import warnings
import io

#from google.colab import userdata

#try:
    # Securely retrieve the API key from Colab's secrets
    #api_key = userdata.get("GEMINI_API_KEY")
#except Exception:
    # Fallback placeholder if secret is not set yet
    #api_key = "YOUR_GEMINI_API_KEY"

# Initialize the modern GenAI Client with the retrieved API key
api_key=""
client = genai.Client(api_key=api_key)
result=""

def read_file(path: str) -> str:
    """Read a UTF-8 text file from the working directory."""
    with open(path, "r") as f:
        return f.read()

def write_file(path: str, content: str) -> str:
    """Write content to a file, overwriting it if it exists."""
    with open(path, "w") as f:
        f.write(content)
    return f"wrote {len(content)} bytes to {path}"

def run_bash(command: str) -> str:
    """Run a shell command inside the sandbox directory and return its output."""
    import os
    os.makedirs("./sandbox", exist_ok=True)
    result = subprocess.run(
        command,
        shell=True,
        cwd="./sandbox",
        capture_output=True,
        text=True,
        timeout=30,
    )
    return result.stdout + result.stderr

def run_harness(client,model_name,task, max_turns=3):
    # Define the list of tools
    tools = [read_file, write_file, run_bash]
    
    # In google-genai, we pass configuration inside GenerateContentConfig
    config = types.GenerateContentConfig(
        tools=tools,
        temperature=0.5,
    )
    
    # We create a chat session on the client using gemini-2.5-flash or gemini-2.5-pro
    chat = client.chats.create(
        model=model_name,
        config=config
    )
    
    response = chat.send_message(task)
    print(response.text)
    return response.text

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 MinimalHarness.py '<Topic or Question>'")
        sys.exit(1)

    topic = sys.argv[1]
    print(f"\n🚀 Initiating Harness by")
    print(f"📌 Topic: {topic}")

    raw_key = os.environ.get("GOOGLE_API_KEY")
    if not raw_key:
        print("Error: GOOGLE_API_KEY environment variable is not set.")
        print("Please set it using: export GOOGLE_API_KEY='your-api-key'")
        sys.exit(1)

    # Clean API key: strip all whitespace (including \n, \r), quotes, and non-ASCII chars
    api_key = "".join(c for c in raw_key if not c.isspace() and ord(c) < 128 and c not in "'\"“”‘’")

    # Initialize the Google GenAI Client directly (uses HTTP REST, avoiding gRPC metadata bugs)
    client = genai.Client(api_key=api_key)
    
    # Model selection: sanitize to strip any newlines or trailing whitespace
    raw_model = os.environ.get("GEMINI_MODEL", "gemini-3.5-flash-lite")
    model_name = "".join(c for c in raw_model if not c.isspace() and c not in "'\"“”‘’")

    try:

    #topic1 = "Write a short story about a traveller in desert seeing a oasis and seeing meteroite."
    #topic2 = "You are a software engineer working on a distributed file system. You receive a bug report that the file server is crashing when handling concurrent writes to the same file. Write a Python script to simulate this condition by performing concurrent writes to a file from multiple processes. Make sure your script handles the race condition and logs the output to a file named 'concurrent_write.txt'."

        result=run_harness(client,model_name,topic,3)

        print("\n🎉 Harness Run Succesfully. using :")
        print(model_name)
        print("\n🎉 ")
        print(result)
    except Exception as e:
        print(f"\n❌ Error during multi-agent execution: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()





