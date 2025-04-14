document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded, initializing script...");

    // Music audio setup
    const backgroundMusic = new Audio('/static/sounds/song.mp3');
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.6; // Optional: adjust volume

    let isMusicPlaying = false;

    const musicToggleBtn = document.getElementById("toggleMusic");
    const musicIcon = document.getElementById("musicIcon");

    // Try autoplay on page load
    backgroundMusic.play().then(() => {
        isMusicPlaying = true;
        if (musicIcon) {
            musicIcon.classList.remove("fa-music");
            musicIcon.classList.add("fa-pause");
        }
    }).catch(e => {
        console.warn("Autoplay blocked by browser:", e);
        // You can notify the user to click the play button to start music
    });

    // Toggle music on button click
    if (musicToggleBtn) {
        musicToggleBtn.addEventListener("click", () => {
            if (isMusicPlaying) {
                backgroundMusic.pause();
                if (musicIcon) {
                    musicIcon.classList.remove("fa-pause");
                    musicIcon.classList.add("fa-music");
                }
            } else {
                backgroundMusic.play().catch(e => console.warn("Music play failed:", e));
                if (musicIcon) {
                    musicIcon.classList.remove("fa-music");
                    musicIcon.classList.add("fa-pause");
                }
            }
            isMusicPlaying = !isMusicPlaying;
        });
    }

    // Bunny hopping sound logic (leave this as-is)
    const bunnyAudio = document.getElementById("bunnyAudio");
    function playBunnySound() {
        if (bunnyAudio) {
            bunnyAudio.currentTime = 0;
            bunnyAudio.play().catch(e => console.warn("Audio play failed:", e));
        }
    }
    
    // Initialize the map
    var map = L.map('map', {
        maxBounds: [
            [38.395, -81.835], // North-West corner
            [38.223, -81.647]  // South-East corner
        ],
        maxBoundsViscosity: 1.0, // Prevents panning outside bounds
        minZoom: 13,             // Prevents zooming out too far
        maxZoom: 19
    }).setView([38.3677, -81.6996], 15);

    // Add tile layer
    L.tileLayer('https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=1de3bae7b3bf44d78575c309d675da62', {
        attribution: 'Â© GeoApify',
        maxZoom: 20
    }).addTo(map);

    console.log("Map initialized:", map);

    // Define custom icon for the Easter Bunny
    var customIcon = L.divIcon({
        className: 'bunny-icon',
        iconSize: [50, 50],
        iconAnchor: [25, 25]
    });


    // Initialize marker (but don't place it yet!!!)
    var marker = null;

    // Restore the path of the Easter Bunny from localStorage or initialize new path
    var storedPath = localStorage.getItem("bunnyPath");
    var bunnyPath = L.polyline(storedPath ? JSON.parse(storedPath) : [], { color: 'green', weight: 4 }).addTo(map);

    // Function to save the path to localStorage
    function savePath() {
        localStorage.setItem("bunnyPath", JSON.stringify(bunnyPath.getLatLngs()));
    }

    // Store the last known position
    var lastPosition = null;

    // Function to smoothly move the bunny
    function smoothMoveMarker(marker, newLatLng, duration = 1000) {
        let startLatLng = marker.getLatLng();
        let startTime = performance.now();

        function animate(time) {
            let progress = Math.min((time - startTime) / duration, 1);
            let lat = startLatLng.lat + (newLatLng.lat - startLatLng.lat) * progress;
            let lon = startLatLng.lng + (newLatLng.lng - startLatLng.lng) * progress;
            marker.setLatLng([lat, lon]);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }
        requestAnimationFrame(animate);
    }

    // Define Zones
    var zones = {
        "zone1": [[38.289, -81.814], [38.295, -81.744], [38.264, -81.738], [38.251, -81.782]],
        "zone2": [[38.325, -81.734], [38.326, -81.722], [38.319, -81.719], [38.315, -81.724], [38.312, -81.728]],
        "zone3": [[38.358576, -81.703798], [38.361763, -81.716644], [38.364747, -81.713211], [38.366024, -81.711061], [38.371, -81.703], [38.372, -81.698], [38.368, -81.686], [38.365547, -81.686076], [38.362964, -81.6939]],
        "zone4": [[38.350, -81.738], [38.346, -81.737], [38.343562, -81.736890], [38.340, -81.741], [38.336, -81.743], [38.334, -81.745], [38.334, -81.753], [38.347, -81.755], [38.350, -81.754], [38.353, -81.752], [38.354, -81.751]],
        "zone5": [[38.355, -81.749], [38.3544, -81.737], [38.3552, -81.733], [38.3578, -81.724], [38.3605, -81.718], [38.359, -81.715], [38.3545, -81.713], [38.3522, -81.720], [38.35169, -81.722], [38.350, -81.729], [38.350, -81.730], [38.3507, -81.740], [38.3529, -81.7469], [38.354, -81.749]],
        "zone6": [[38.352114, -81.71998], [38.354646, -81.712349], [38.351913, -81.712437], [38.346403, -81.71127], [38.344419, -81.710043], [38.342702, -81.715654], [38.330167, -81.722468], [38.334744, -81.733424], [38.339262, -81.735074], [38.349629, -81.737834], [38.350484, -81.727191], [38.350708, -81.726541], [38.35099, -81.724379]],
        "zone7": [[38.359001, -81.700204], [38.354687, -81.697796], [38.351365, -81.692017], [38.348744, -81.683292], [38.345403, -81.676424], [38.344496, -81.674], [38.343546, -81.674104], [38.343058, -81.669906], [38.341467, -81.666074], [38.34194, -81.662815], [38.345195, -81.656636], [38.347693, -81.651735], [38.353346, -81.647172], [38.358505, -81.658409], [38.36041, -81.665579], [38.362825, -81.672253], [38.364628, -81.679344], [38.364692, -81.686358], [38.363556, -81.691052], [38.361236, -81.696265]]
    };

    var zoneLayers = {};

    // Draw zones on the map, make them clickable, and add styling
    for (let key in zones) {
        zoneLayers[key] = L.polygon(zones[key], {
            color: 'pink',
            fillOpacity: 0.2
        })
        .addTo(map)
        .on('click', function () {
            map.fitBounds(this.getBounds());
            console.log("Zooming into", key);
        })
        .on('mouseover', function () {
            this.setStyle({
                color: 'pink',
                fillOpacity: 0.5
            });
        })
        .on('mouseout', function () {
            this.setStyle({
                color: 'pink',
                fillOpacity: 0.3
            });
        });
    }

    // Toolbar Elements
    var followBunnyCheckbox = document.getElementById("followBunny");
    var zoneSelectDropdown = document.getElementById("zoneSelect");

    if (!followBunnyCheckbox || !zoneSelectDropdown) {
        console.error("Toolbar elements not found! Check if they are in index.html.");
        return;
    }

    // Follow the bunny checkbox functionality
    var followBunny = false;
    followBunnyCheckbox.addEventListener("change", function () {
        followBunny = this.checked;
        console.log("Follow Bunny:", followBunny);
        if (followBunny) {
            playBunnySound(); // Play audio when toggled on
        }
    });

    // Handle dropdown selection
    zoneSelectDropdown.addEventListener("change", function () {
        let selectedZone = this.value;
        if (selectedZone && zoneLayers[selectedZone]) {
            map.fitBounds(zoneLayers[selectedZone].getBounds());
        }
    });

    // Falling Eggs Function
    function createFallingEgg() {
        const egg = document.createElement("img");
        egg.src = `/static/images/egg${Math.floor(Math.random() * 6 + 1)}.png`; // Random egg1, egg2, egg3
        egg.classList.add("falling-egg");

        // Random horizontal start position
        egg.style.left = `${Math.random() * window.innerWidth}px`;

        // Random duration and size
        const duration = Math.random() * 5 + 5; // Between 5-10 seconds
        egg.style.animationDuration = `${duration}s`;

        // Optional: vary size slightly
        const scale = Math.random() * 0.5 + 0.75;
        egg.style.transform = `scale(${scale})`;

        document.body.appendChild(egg);

        // Remove the egg after it finishes falling
        setTimeout(() => egg.remove(), duration * 1000);
    }

    // Drop a new egg every 1-3 seconds
    setInterval(() => {
        if (Math.random() > 0.5) { // Slightly random chance to drop one
            createFallingEgg();
        }
    }, 1000);
    
    // Function to update location
    function updateLocation() {
        fetch('https://securenet.website/proxy')
        .then(response => response.json())
        .then(data => {
            console.log("API Response:", data);

            if (data.length > 0) {
                let pos = data[0];
                let lat = pos.latitude;
                let lon = pos.longitude;

                console.log("Bunny Position:", lat, lon);

                if (!marker) {
                    marker = L.marker([lat, lon], { icon: customIcon }).addTo(map);
                    marker.bindPopup("<div style='text-align: center; font-weight: bold;'>Hoppin' through town!</div>");
                    marker.on('click', playBunnySound);
                    console.log("Marker added to map");
                } else {
                    smoothMoveMarker(marker, L.latLng(lat, lon));
                    console.log("Marker updated position");
                }

                if (followBunny) {
                    map.setView([lat, lon], 17);
                }

            } else {
                console.warn("No position data received.");
            }
        })
        .catch(error => console.error("Error fetching location:", error));
    }

    // API polling interval (every 5 seconds)
    setInterval(updateLocation, 5000);
    updateLocation(); // Run once immediately
    
    document.getElementById("shareButton").addEventListener("click", () => {
        if (navigator.share) {
            navigator.share({
                title: "Track the Easter Bunny!",
                text: "Hop on and follow the Easter Bunny through South Charleston!",
                url: window.location.href
            }).catch((err) => console.warn("Share failed:", err));
        } else {
            navigator.clipboard.writeText(window.location.href)
                .then(() => alert("Link copied to clipboard!"))
                .catch(err => console.error("Clipboard copy failed:", err));
        }
    });

    // Hide the loading spinner once everything is ready
    window.addEventListener('load', function () {
        // Hide the spinner and leave the bunny
        document.getElementById('spinner').style.display = 'none';
        // Optional: Hide the loading screen completely after a delay, if you'd like
        setTimeout(() => {
            document.getElementById('loading').style.display = 'none';
        }, 1000); // Keeps the bunny for a brief moment after loading finishes
    });

    console.log("Script initialized successfully.");
});
