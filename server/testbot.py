from openai import OpenAI

client = OpenAI()

completion = client.chat.completions.create(
    model="davinci-002",
    max_tokens=20,
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "What are some famous astronomical observatories?"},
    ],
)
