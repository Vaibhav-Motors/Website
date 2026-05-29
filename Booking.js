// Simulated bookings data (in a real app, this would come from a database)
    const bookingsData = {
        "2024-01-15": 3,
        "2024-01-16": 5, // This date is fully booked
        "2024-01-18": 1, 
        "2024-01-20": 2  
    };

    // Define car models for each brand
    const carModels = {
        "Maruti": ["Alto 800", "Alto K10", "S-Presso", "Celerio", "Wagon R", "Ignis", "Swift", "Baleno", "Dzire", "Ciaz", "Brezza", "Fronx", "Jimny", "Grand Vitara", "Invicto", "Ertiga", "XL6", "Eeco", "Omni", "Gypsy"],
        "Mahindra": ["Thar", "Scorpio N", "Scorpio Classic", "XUV700", "XUV300", "XUV400 EV", "Bolero", "Bolero Neo", "XUV500", "TUV300", "Marazzo"],
        "TATA": ["Tiago", "Altroz", "Punch", "Nexon", "Harrier", "Safari", "Tigor", "Indica", "Nano", "Sumo", "Hexa"],
        "Toyota": ["Innova Crysta", "Innova HyCross", "Rumion", "Fortuner", "Urban Cruiser Hyryder", "Hilux", "Camry", "Glanza", "Vellfire", "Etios", "Corolla Altis"],
        "Hyundai": ["Creta", "Alcazar", "Venue", "Exter", "Tucson", "Kona Electric", "i20", "Grand i10 Nios", "Aura", "Verna", "Ioniq 5", "Santro", "Xcent"],
        "Honda": ["Amaze", "City", "Elevate", "Brio", "Jazz", "WR-V", "CR-V", "Accord", "Civic"],
        "Kia": ["Seltos", "Sonet", "Carens", "EV6", "Carnival"],
        "Renault": ["Kwid", "Kiger", "Triber", "Duster", "Captur", "Lodgy"],
        "Volkswagen": ["Taigun", "Virtus", "Tiguan", "Polo", "Vento", "Ameo", "Passat"],
        "Skoda": ["Kushaq", "Slavia", "Kodiaq", "Superb", "Rapid", "Octavia"],
        "Ford": ["EcoSport", "Endeavour", "Figo", "Aspire", "Freestyle", "Mustang", "Fiesta"],
        "MG": ["Hector", "Hector Plus", "Gloster", "Astor", "ZS EV", "Comet EV"],
        "Nissan": ["Magnite", "Kicks", "Sunny", "Terrano", "Micra"],
        "Jeep": ["Compass", "Meridian", "Grand Cherokee", "Wrangler"],
        "BMW": ["3 Series", "5 Series", "7 Series", "X1", "X3", "X5", "X7", "Z4"],
        "Mercedes-Benz": ["A-Class", "C-Class", "E-Class", "S-Class", "GLA", "GLC", "GLE", "GLS"],
        "Audi": ["A4", "A6", "Q3", "Q5", "Q7", "e-tron"],
        "Volvo": ["XC40", "XC60", "XC90", "S90", "S60"],
        "Jaguar": ["XF", "F-Pace", "I-Pace", "XE"],
        "Land Rover": ["Range Rover Evoque", "Range Rover Sport", "Range Rover", "Discovery", "Defender"]
    };

    // Function to get today's date in YYYY-MM-DD format
    function getTodayDate() {
        const now = new Date();
        const timezoneOffset = now.getTimezoneOffset() * 60000;
        const localDate = new Date(now.getTime() - timezoneOffset);
        return localDate.toISOString().split('T')[0];
    }

    // Initialization
    document.addEventListener('DOMContentLoaded', function() {
        const dateInput = document.getElementById('date');
        const today = getTodayDate();
        dateInput.setAttribute('min', today);
        
        dateInput.addEventListener('change', checkDateAvailability);
        
        // See More Services functionality
        const seeMoreBtn = document.getElementById('see-more-btn');
        
        seeMoreBtn.addEventListener('click', function() {
            const additionalServices = document.querySelectorAll('.additional-service');
            const btn = this;
            const textSpan = btn.querySelector('span');
            
            additionalServices.forEach(service => {
                if (service.style.display === 'none' || !service.style.display) {
                    service.style.display = 'block';
                    textSpan.textContent = 'See Less Services';
                    btn.classList.add('expanded');
                } else {
                    service.style.display = 'none';
                    textSpan.textContent = 'See More Services';
                    btn.classList.remove('expanded');
                }
            });
        });

        // Initialize AI Button
        const analyzeBtn = document.getElementById('analyze-btn');
        if (analyzeBtn) {
            analyzeBtn.addEventListener('click', analyzeSymptoms);
        }
    });

    function checkDateAvailability() {
        const dateInput = document.getElementById('date');
        const dateStatus = document.getElementById('date-status');
        const selectedDate = dateInput.value;
        
        if (!selectedDate) {
            dateStatus.style.display = 'none';
            return;
        }
        
        const today = getTodayDate();
        if (selectedDate < today) {
            dateStatus.innerHTML = "<i class='fas fa-exclamation-circle'></i> Please select a future date";
            dateStatus.className = "date-status date-full";
            dateStatus.style.display = 'block';
            return;
        }
        
        const bookingCount = bookingsData[selectedDate] || 0;
        const slotsLeft = 5 - bookingCount;
        
        if (bookingCount >= 5) {
            dateStatus.innerHTML = "<i class='fas fa-times-circle'></i> Booking Full for this date. Please select another date.";
            dateStatus.className = "date-status date-full";
            dateStatus.style.display = 'block';
        } else if (slotsLeft === 1 || slotsLeft === 2) {
            dateStatus.innerHTML = "<i class='fas fa-exclamation-triangle'></i> Almost full! Book quickly!";
            dateStatus.className = "date-status date-warning";
            dateStatus.style.display = 'block';
        } else {
            dateStatus.innerHTML = `<i class='fas fa-check-circle'></i> Date is available for booking`;
            dateStatus.className = "date-status date-available";
            dateStatus.style.display = 'block';
        }
    }

    function loadModels() {
        const brandSelect = document.getElementById('car-brand');
        const modelSelect = document.getElementById('car-model');
        const modelSection = document.getElementById('model-section');
        
        modelSelect.innerHTML = '<option value="">Select Model</option>';
        const selectedBrand = brandSelect.value;
        
        if (selectedBrand && carModels[selectedBrand]) {
            modelSection.style.display = 'block';
            carModels[selectedBrand].forEach(model => {
                const option = document.createElement('option');
                option.value = model;
                option.textContent = model;
                modelSelect.appendChild(option);
            });
        } else {
            modelSection.style.display = 'none';
        }
    }

    function showCongratulations(name, date) {
        const congratsHTML = `
            <div id="congrats-popup" style="
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0,0,0,0.85); display: flex; align-items: center; justify-content: center;
                z-index: 10000; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            ">
                <div style="
                    background: white; padding: 40px; border-radius: 16px; text-align: center;
                    max-width: 500px; width: 90%; box-shadow: 0 15px 35px rgba(0,0,0,0.4);
                    animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                ">
                    <div style="font-size: 65px; color: #ff6b00; margin-bottom: 15px;">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h2 style="color: #1a1a1a; margin-bottom: 15px; font-size: 2rem; font-weight: 800;">Request Sent!</h2>
                    <p style="color: #718096; margin-bottom: 25px; line-height: 1.6; font-size: 1.05rem;">
                        Thank you <strong>${name}</strong>! Your service appointment request for <strong style="color:#1a1a1a;">${date}</strong> has been received successfully.
                    </p>
                    <div style="background: #fff0e6; border: 1px solid #ffd4b8; padding: 15px; border-radius: 10px; margin: 20px 0; text-align: left;">
                        <p style="margin: 0 0 10px 0; color: #e05e00; font-weight: 700;"><i class="fas fa-info-circle"></i> Next Steps:</p>
                        <p style="margin: 5px 0; color: #2d3748; font-size: 0.95rem;"><i class="fas fa-check" style="color:#ff6b00; width:20px;"></i> Wait for our confirmation call</p>
                        <p style="margin: 5px 0; color: #2d3748; font-size: 0.95rem;"><i class="fas fa-check" style="color:#ff6b00; width:20px;"></i> Bring your vehicle documents</p>
                        <p style="margin: 5px 0; color: #2d3748; font-size: 0.95rem;"><i class="fas fa-check" style="color:#ff6b00; width:20px;"></i> Arrive 10 minutes prior</p>
                    </div>
                    <button onclick="closeCongratulations()" style="
                        background: #ff6b00; color: white; border: none; padding: 14px 35px;
                        border-radius: 50px; font-size: 1.1rem; cursor: pointer; font-weight: 700;
                        transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(255,107,0,0.3);
                        margin-top: 10px;
                    " onmouseover="this.style.background='#e05e00'" onmouseout="this.style.background='#ff6b00'">
                        Close Menu
                    </button>
                </div>
            </div>
            <style>
                @keyframes popIn {
                    0% { transform: scale(0.8); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }
            </style>
        `;
        
        document.body.insertAdjacentHTML('beforeend', congratsHTML);
    }

    function closeCongratulations() {
        const popup = document.getElementById('congrats-popup');
        if (popup) popup.remove();
    }

    function sendToWhatsApp() {
        const form = document.getElementById('appointmentForm');
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = '#f44336';
                isValid = false;
            } else {
                field.style.borderColor = 'var(--gray-light)';
            }
            
            if (field.id === 'registration-number') {
                const regEx = /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,2}[0-9]{4}$/;
                if (!regEx.test(field.value)) {
                    field.style.borderColor = '#f44336';
                    isValid = false;
                }
            }
            
            if (field.id === 'chassis-number') {
                const regEx = /^[A-HJ-NPR-Z0-9]{10,20}$/;
                if (!regEx.test(field.value)) {
                    field.style.borderColor = '#f44336';
                    isValid = false;
                }
            }
        });

        const dateInput = document.getElementById('date');
        const selectedDate = dateInput.value;
        const bookingCount = bookingsData[selectedDate] || 0;
        
        if (bookingCount >= 5) {
            alert('❌ Booking Full for this date. Please select another date.');
            dateInput.focus();
            return;
        }

        if (!isValid) {
            alert('Please fill in all required fields correctly');
            return;
        }

        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const fuelType = document.getElementById('fuel-type').value;
        const brand = document.getElementById('car-brand').value;
        const model = document.getElementById('car-model').value;
        const variant = document.getElementById('vehicle-variant').value;
        const year = document.getElementById('manufacturing-year').value;
        const regNumber = document.getElementById('registration-number').value;
        const chassisNumber = document.getElementById('chassis-number').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        
        const formattedDate = new Date(date).toLocaleDateString('en-US', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });
        
        let services = [];
        document.querySelectorAll('input[name="service"]:checked').forEach(checkbox => {
            services.push(checkbox.nextElementSibling.textContent);
        });
        
        const message = `*New Garage Service Appointment Request* 🚗🔧\n\n` +
                       `*Customer Name:* ${name}\n` +
                       `*Contact Number:* ${phone}\n` +
                       `*Vehicle Details:* ${brand} ${model} (${variant})\n` +
                       `*Fuel Type:* ${fuelType}\n` +
                       `*Manufacturing Year:* ${year}\n` +
                       `*Registration:* ${regNumber}\n` +
                       `*Chassis Number (VIN):* ${chassisNumber}\n` +
                       `*Preferred Date:* ${formattedDate}\n` +
                       `*Preferred Time:* ${time}\n` +
                       `*Services Needed:* ${services.join(', ') || 'None'}\n` +
                       `${document.getElementById('notes').value ? `*Additional Notes:*\n${document.getElementById('notes').value}` : ''}\n\n` +
                       `---\n` +
                       `🎉 *Booking Request Received!*\n` +
                       `Thank you for choosing Vaibhav Motors!\n\n` +
                       `📍 *Vaibhav Motors*\n` +
                       `📞 +91 80872 67039\n` +
                       `⏰ Mon-Sat: 9AM-9PM`;
        
        const encodedMessage = encodeURIComponent(message);
        const whatsappNumber = "918087267039";
        
        window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
        
        showCongratulations(name, formattedDate);
        
        bookingsData[selectedDate] = (bookingsData[selectedDate] || 0) + 1;
        setTimeout(() => checkDateAvailability(), 100);
    }

    // --- AI Helper Functions ---
    const apiKey = "";
    
    async function fetchWithRetry(url, options, maxRetries = 5) {
        const delays = [1000, 2000, 4000, 8000, 16000];
        for (let i = 0; i < maxRetries; i++) {
            try {
                const response = await fetch(url, options);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                return await response.json();
            } catch (error) {
                if (i === maxRetries - 1) throw error;
                await new Promise(resolve => setTimeout(resolve, delays[i]));
            }
        }
    }

    async function analyzeSymptoms() {
        const inputField = document.getElementById('ai-symptom-input');
        const resultBox = document.getElementById('ai-result');
        const analyzeBtn = document.getElementById('analyze-btn');
        const symptoms = inputField.value.trim();
        
        if (!symptoms) {
            resultBox.style.display = 'block';
            resultBox.innerHTML = "<strong style='color:#f44336;'><i class='fas fa-exclamation-circle'></i> Please describe the symptoms first.</strong>";
            return;
        }
        
        analyzeBtn.disabled = true;
        analyzeBtn.innerHTML = '<span class="ai-loading"></span> Analyzing...';
        resultBox.style.display = 'none';
        
        try {
            const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
            const payload = {
                "systemInstruction": {
                    "parts": [{ "text": "You are a highly experienced and friendly car mechanic. The user will describe symptoms their car is experiencing. Diagnose the likely issue in 2-3 friendly sentences. After your diagnosis, recommend which services they need by selecting the exact IDs from this list: 'oil-change', 'tire-rotation', 'brake-service', 'diagnostics', 'battery-check', 'periodic-service', 'ac-repair', 'major-service', 'accidental-service', 'engine-repair', 'suspension-service', 'polishing-service', 'interior-service'. Ensure your response is strictly valid JSON." }]
                },
                "contents": [{ "parts": [{ "text": symptoms }] }],
                "generationConfig": {
                    "responseMimeType": "application/json",
                    "responseSchema": {
                        "type": "OBJECT",
                        "properties": {
                            "diagnosis": { "type": "STRING", "description": "Friendly, brief 2-3 sentence diagnosis." },
                            "suggestedServices": {
                                "type": "ARRAY",
                                "items": { "type": "STRING" },
                                "description": "Array of matching service IDs from the provided list."
                            }
                        }
                    }
                }
            };
            
            const data = await fetchWithRetry(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            
            const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (responseText) {
                const parsedResult = JSON.parse(responseText);
                
                resultBox.style.display = 'block';
                resultBox.innerHTML = `<strong><i class="fas fa-wrench" style="color:var(--primary);"></i> AI Mechanic's Diagnosis:</strong><br/><p style="margin-top:8px;">${parsedResult.diagnosis}</p>`;
                
                if (parsedResult.suggestedServices && Array.isArray(parsedResult.suggestedServices)) {
                    document.querySelectorAll('input[name="service"]').forEach(cb => cb.checked = false);
                    
                    let expandedRequired = false;
                    parsedResult.suggestedServices.forEach(serviceId => {
                        const checkbox = document.getElementById(serviceId);
                        if (checkbox) {
                            checkbox.checked = true;
                            if (checkbox.closest('.additional-service')) {
                                expandedRequired = true;
                            }
                        }
                    });
                    
                    if (expandedRequired) {
                        const seeMoreBtn = document.getElementById('see-more-btn');
                        if (!seeMoreBtn.classList.contains('expanded')) {
                            seeMoreBtn.click();
                        }
                    }
                }
            }
        } catch (error) {
            console.error("AI Assistant Error:", error);
            resultBox.style.display = 'block';
            resultBox.innerHTML = "<strong style='color:#f44336;'><i class='fas fa-exclamation-triangle'></i> Sorry, our AI mechanic is currently busy. Please select the services manually below.</strong>";
        } finally {
            analyzeBtn.disabled = false;
            analyzeBtn.innerHTML = '<span>Analyze Symptoms ✨</span>';
        }
    }