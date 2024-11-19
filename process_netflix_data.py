import pandas as pd
import json

# Load Netflix dataset
print("Loading Netflix dataset...")
df = pd.read_csv("netflix_titles.csv")

# Filter for TV Shows only
tv_shows = df[df["type"] == "TV Show"]

# Select relevant columns
tv_shows = tv_shows[["title", "listed_in", "rating", "description", "release_year"]]

# Convert genres to a list
tv_shows["genres"] = tv_shows["listed_in"].str.split(", ")

# Save as JSON
tv_shows_list = tv_shows.to_dict(orient="records")
with open("netflix_series.json", "w", encoding="utf-8") as f:
    json.dump(tv_shows_list, f, indent=4)

print(f"Processed {len(tv_shows_list)} Netflix series and saved to netflix_series.json!")
