{
  "nbformat": 4,
  "nbformat_minor": 0,
  "metadata": {
    "colab": {
      "provenance": [],
      "authorship_tag": "ABX9TyM7WCc2eR0tF6fraj0jnEn8"
    },
    "kernelspec": {
      "name": "python3",
      "display_name": "Python 3"
    },
    "language_info": {
      "name": "python"
    }
  },
  "cells": [
    {
      "cell_type": "code",
      "execution_count": 52,
      "metadata": {
        "id": "lBkhtDTNDVhk"
      },
      "outputs": [],
      "source": [
        "import subprocess\n",
        "import os\n",
        "# pyrefly: ignore [missing-import]\n",
        "from google import genai\n",
        "from google.genai import types\n",
        "\n",
        "def read_file(path: str) -> str:\n",
        "    \"\"\"Read a UTF-8 text file from the working directory.\"\"\"\n",
        "    with open(path, \"r\") as f:\n",
        "        return f.read()\n",
        "\n",
        "def write_file(path: str, content: str) -> str:\n",
        "    \"\"\"Write content to a file, overwriting it if it exists.\"\"\"\n",
        "    with open(path, \"w\") as f:\n",
        "        f.write(content)\n",
        "    return f\"wrote {len(content)} bytes to {path}\"\n",
        "\n",
        "def run_bash(command: str) -> str:\n",
        "    \"\"\"Run a shell command inside the sandbox directory and return its output.\"\"\"\n",
        "    import os\n",
        "    os.makedirs(\"./sandbox\", exist_ok=True)\n",
        "    result = subprocess.run(\n",
        "        command,\n",
        "        shell=True,\n",
        "        cwd=\"./sandbox\",\n",
        "        capture_output=True,\n",
        "        text=True,\n",
        "        timeout=30,\n",
        "    )\n",
        "    return result.stdout + result.stderr\n",
        "\n",
        "def run_harness(task, mode=None, text_model=\"gemini-3.5-flash-lite\", code_model=\"gemini-3.5-flash-lite\", max_turns=3):\n",
        "    \"\"\"\n",
        "    Runs the harness with distinct configurations based on task type.\n",
        "    \"\"\"\n",
        "    GEMINI_API_KEY=\"\"\n",
        "    # Try to securely retrieve the API key from Colab's secrets first\n",
        "    try:\n",
        "        api_key = userdata.get(\"GEMINI_API_KEY\")\n",
        "    except Exception:\n",
        "        # Fall back to environment variable if Colab user secret is not found\n",
        "        api_key = os.environ.get(\"GEMINI_API_KEY\")\n",
        "\n",
        "    # If still not found, fallback to the hardcoded testing key\n",
        "    if not api_key:\n",
        "        api_key = GEMINI_API_KEY\n",
        "\n",
        "    if not api_key:\n",
        "        raise ValueError(\n",
        "            \"No API key found. Please add a secret named 'GEMINI_API_KEY' \"\n",
        "            \"in the Colab Secrets tab (the key icon 🔑 on the left-hand panel) \"\n",
        "            \"and grant it access to this notebook, or set it as an environment variable.\"\n",
        "        )\n",
        "\n",
        "    # Initialize the client dynamically inside the harness\n",
        "    os.environ[\"GOOGLE_API_KEY\"] = api_key\n",
        "    client = genai.Client(api_key=api_key)\n",
        "\n",
        "    # 1. Simple auto-detect if mode is not specified\n",
        "    if mode is None:\n",
        "        task_lower = task.lower()\n",
        "        if any(w in task_lower for w in [\"code\", \"python\", \"bash\", \"run\", \"write a script\", \"file\", \"sandbox\"]):\n",
        "            mode = \"code\"\n",
        "        else:\n",
        "            mode = \"text\"\n",
        "\n",
        "    print(f\"Executing in [{mode.upper()}] mode...\")\n",
        "\n",
        "    if mode == \"text\":\n",
        "        # Creative/Research tasks configuration\n",
        "        config = types.GenerateContentConfig(\n",
        "            temperature=0.6,\n",
        "        )\n",
        "        chat = client.chats.create(\n",
        "            model=text_model,\n",
        "            config=config\n",
        "        )\n",
        "    else:\n",
        "        # Coding/Tool execution tasks configuration\n",
        "        tools = [read_file, write_file, run_bash]\n",
        "        config = types.GenerateContentConfig(\n",
        "            tools=tools,\n",
        "            temperature=0.2,\n",
        "        )\n",
        "        chat = client.chats.create(\n",
        "            model=code_model,\n",
        "            config=config\n",
        "        )\n",
        "\n",
        "    response = chat.send_message(task)\n",
        "    return response.text"
      ]
    },
    {
      "cell_type": "code",
      "source": [
        "run_harness(\"Write a short story about a traveller in desert seeing a oasis and seeing meteroite\")"
      ],
      "metadata": {
        "colab": {
          "base_uri": "https://localhost:8080/",
          "height": 161
        },
        "id": "sHdv-o8C2yVC",
        "outputId": "5e201c86-5bf5-465e-93c9-8a11cf7fad7e"
      },
      "execution_count": 54,
      "outputs": [
        {
          "output_type": "stream",
          "name": "stdout",
          "text": [
            "Executing in [TEXT] mode...\n"
          ]
        },
        {
          "output_type": "execute_result",
          "data": {
            "text/plain": [
              "\"The dunes were a relentless ocean of copper, rising and falling in waves that swallowed the horizon. Justin’s throat felt like sandpaper, and the sun was a hammer beating down relentlessly upon his skull. He had long since stopped counting the days. There was only the crunch of boot leather, the searing heat, and the heavy drag of a near-empty canteen.\\n\\nHe blinked through a haze of sweat and salt, convinced the vision was just another trick of the dying mind. \\n\\nThere, nestled in a wide depression between two towering ridges of sand, was a shock of emerald green. Palm trees swayed in a breeze that Justin couldn't yet feel, their fronds whispering over the mirrored surface of a still, blue lake. \\n\\n*A mirage,* he told himself, bracing for the inevitable disappointment. *Keep walking. Don’t waste the energy.*\\n\\nHe stumbled forward anyway, drawn by the primal, agonizing hope of survival. As he crested the dune and slid down the cascading slope, his boots hit damp, cool mud. It was real. \\n\\nJustin fell to his knees at the water's edge, cupping his hands and drinking deeply. The water was shockingly cold, tasting of ancient stone and sweet life. He splashed it over his scorched face, letting out a long, ragged breath that sounded like a sob. \\n\\nRevived, he leaned back against the smooth trunk of a date palm, watching the dying sun paint the desert sky in shades of bruised purple, amber, and deep indigo. The sudden transition of desert twilight was beginning, bringing with it a profound, freezing silence.\\n\\nThen, the sky tore open.\\n\\nIt didn't make a sound at first. A brilliant, blinding streak of white-hot fire plunged from the zenith of the darkening heavens, trailing a tail of incandescent blue sparks. It grew larger by the second, illuminating the desert in a flash of daylight. \\n\\nJustin scrambled to his feet, shielding his eyes. \\n\\n*BOOM.*\\n\\nThe shockwave hit a second later, a concussive blast that ruffled the palm fronds and sent ripples racing across the oasis lake. A mile away, a geyser of pulverized sand erupted into the twilight air, followed by a low, subterranean rumble that vibrated through the soles of Justin’s boots.\\n\\nSilence rushed back, heavier than before. \\n\\nWhere the searing light had struck, a faint, eerie glow now pulsed against the horizon—a dim, cherry-red ember smoking in the cold sand. \\n\\nJustin looked down at the cool water of the oasis, then back toward the fallen star. The desert was vast, indifferent, and infinitely ancient, yet here he sat, drinking from a miraculous pool while a piece of the cosmos burned just over the ridge. \\n\\nWith a renewed sense of wonder that chased away the last remnants of his despair, the traveler picked up his canteen, filled it to the brim, and began to walk toward the light.\""
            ],
            "application/vnd.google.colaboratory.intrinsic+json": {
              "type": "string"
            }
          },
          "metadata": {},
          "execution_count": 54
        }
      ]
    }
  ]
}