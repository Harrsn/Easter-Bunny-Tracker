# 🐰 Easter Bunny Tracker

Track the Easter Bunny as he hops through South Charleston, West Virginia in real time! This fun and interactive web app is designed to engage families, kids, and holiday enthusiasts during the Easter season.

![Bunny Screenshot](https://)

## 🌟 Features

- 🎵 **Background Music & Sound Effects**  
  Festive background music with manual toggle and fun bunny hop sounds on click.

- 🗺️ **Real-Time Bunny Tracking**  
  Smoothly updates bunny’s location on a Leaflet.js-powered map using live GPS data.

- 📍 **Interactive Zones**  
  Clickable map zones highlight areas around South Charleston and allow zooming on hover.

- 🧭 **Follow the Bunny Mode**  
  Auto-pan to the bunny’s position as it updates across the map.

- 🥚 **Animated Falling Easter Eggs**  
  Cosmetic animated eggs drop at random intervals for holiday flair.

- 📤 **Social Sharing**  
  Share the tracker via the Web Share API or copy a link with one click.

- 💾 **Persistent Path Tracking**  
  Saves the bunny’s travel path to local storage so users can revisit it.

## 🚀 Live Demo

[👉 View the Tracker](https://securenet.website)  

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Map Rendering**: [Leaflet.js](https://leafletjs.com/)
- **Backend**: Flask (Python)
- **External API**: Bunny location pulled via proxy from `https://securenet.website/proxy`
- **Storage**: Browser `localStorage` for path history

## 📁 Key Files

| File                      | Purpose                                      |
|---------------------------|----------------------------------------------|
| `app.py`                  | Flask server handling routing and proxying   |
| `static/script.js`     | Frontend interactivity and map logic         |
| `templates/index.html`    | Main HTML page using Jinja2 template engine  |

## 📦 Installation (for local development)

1. Clone the repository:
 ```
   git clone https://github.com/Harrsn/holiday-tracker.git
   cd holiday-tracker
```
2.Create and activate a Python virtual environment:
```
  python -m venv venv
  source venv/bin/activate  # On Windows: venv\Scripts\activate
```
Install dependencies:
```
  pip install -r requirements.txt
```
Run the Flask app:
```
  flask run
```
Visit `http://localhost:5000` in your browser to test.

📜 License
This project is licensed under the BSD 3-Clause License. See the LICENSE file for details.

✉️ Contact
Made with 💜 by @Harrsn
For questions or collaboration: hkorodi@wvsupport.net
