// Smooth Scroll for Navbar Links
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Hero Button Animation
const heroBtn = document.querySelector('.btn');
if (heroBtn) {
  heroBtn.addEventListener('mouseover', () => {
    heroBtn.style.transform = 'scale(1.1)';
  });
  heroBtn.addEventListener('mouseout', () => {
    heroBtn.style.transform = 'scale(1)';
  });
}

// Destination Cards Hover Animation
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
  card.addEventListener('mouseover', () => {
    card.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)';
  });
  card.addEventListener('mouseout', () => {
    card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
  });
});
// Stats Counter Animation
const counters = document.querySelectorAll('.counter');
const speed = 200; // lower = faster

const animateCounters = () => {
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const increment = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
};

// Trigger animation when section is visible
const statsSection = document.querySelector('.stats');
let statsPlayed = false;

if (statsSection) {
  window.addEventListener('scroll', () => {
    const sectionTop = statsSection.offsetTop;
    const sectionHeight = statsSection.offsetHeight;
    const scrollPos = window.scrollY + window.innerHeight;

    if (!statsPlayed && scrollPos > sectionTop + sectionHeight / 3) {
      animateCounters();
      statsPlayed = true;
    }
  });
}
// Show popup on page load (if popup exists)
window.addEventListener('load', () => {
  const seasonPopup = document.getElementById('seasonPopup');
  if (seasonPopup) {
    seasonPopup.style.display = 'flex';
  }
});

// Close popup (if close button exists)
const closePopup = document.getElementById('closePopup');
if (closePopup) {
  closePopup.addEventListener('click', () => {
    const seasonPopup = document.getElementById('seasonPopup');
    if (seasonPopup) {
      seasonPopup.style.display = 'none';
    }
  });
}
document.addEventListener("DOMContentLoaded", function () {
  /* =========================
     🇮🇳 ALL INDIA STATES
  ========================== */
  const states = [
    "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
    "Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand",
    "Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur",
    "Meghalaya","Mizoram","Nagaland","Odisha","Punjab",
    "Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura",
    "Uttar Pradesh","Uttarakhand","West Bengal","Delhi"
  ];

  const fromState = document.getElementById("fromState");
  const toState = document.getElementById("toState");
  const travellersInput = document.getElementById("travellers");
  const totalPriceDisplay = document.getElementById("totalPrice");
  const hiddenPrice = document.getElementById("hiddenPrice");
  const bookingForm = document.getElementById("bookingForm");
  const paymentMethod = document.getElementById("paymentMethod");
  const cardSection = document.getElementById("cardSection");
  const upiSection = document.getElementById("upiSection");

  if (!bookingForm || !paymentMethod) {
    return; // Exit if booking form doesn't exist on this page
  }

  /* =========================
     Populate Dropdowns
  ========================== */
  function loadStates() {
    fromState.innerHTML = '<option value="">Select Departure</option>';
    toState.innerHTML = '<option value="">Select Destination</option>';

    states.forEach(state => {
      fromState.innerHTML += `<option value="${state}">${state}</option>`;
      toState.innerHTML += `<option value="${state}">${state}</option>`;
    });
  }
  loadStates();

  /* =========================
     💰 PRICE CALCULATION
  ========================== */
  function calculatePrice() {
    const from = fromState.value;
    const to = toState.value;
    const travellers = parseInt(travellersInput.value) || 0;

    if (!from || !to || travellers <= 0) {
      totalPriceDisplay.innerText = 0;
      hiddenPrice.value = 0;
      return;
    }

    if (from === to) {
      alert("Departure and Destination cannot be same!");
      totalPriceDisplay.innerText = 0;
      hiddenPrice.value = 0;
      return;
    }

    const basePrice = 2500;
    const distanceFactor = Math.abs(states.indexOf(from) - states.indexOf(to));
    const calculatedBase = basePrice + (distanceFactor * 300);
    const total = calculatedBase * travellers;

    totalPriceDisplay.innerText = total;
    hiddenPrice.value = total;
  }

  fromState.addEventListener("change", calculatePrice);
  toState.addEventListener("change", calculatePrice);
  travellersInput.addEventListener("input", calculatePrice);

  /* =========================
     💳 PAYMENT TOGGLE
  ========================== */
  paymentMethod.addEventListener("change", function () {
    const cardSection = document.getElementById("cardSection");
    const upiSection = document.getElementById("upiSection");
    if (this.value === "card") {
      if (cardSection) cardSection.style.display = "block";
      if (upiSection) upiSection.style.display = "none";
    } else if (this.value === "upi") {
      if (cardSection) cardSection.style.display = "none";
      if (upiSection) upiSection.style.display = "block";
    } else {
      if (cardSection) cardSection.style.display = "none";
      if (upiSection) upiSection.style.display = "none";
    }
  });

  /* =========================
     🎉 FORM SUBMIT + REDIRECT
  ========================== */
  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const from = fromState.value;
    const to = toState.value;
    const travellers = travellersInput.value;
    const total = hiddenPrice.value;
    const bookingID = "TE" + Date.now();

    if (!from || !to || travellers <= 0) {
      alert("Please complete the form properly!");
      return;
    }

    // Save in localStorage
    localStorage.setItem("bookingID", bookingID);
    localStorage.setItem("from", from);
    localStorage.setItem("to", to);
    localStorage.setItem("travellers", travellers);
    localStorage.setItem("total", total);

    window.open("confirmation.html", "_self");
  });
})
const toggleBtn = document.getElementById("chatbot-toggle");
const chatbox = document.getElementById("chatbot-box");
const closeBtn = document.getElementById("close-btn");
const sendBtn = document.getElementById("send-btn");
const input = document.getElementById("user-input");
const chatBody = document.getElementById("chat-body");

if (toggleBtn && chatbox) {
  toggleBtn.onclick = () => chatbox.style.display = "block";
}

if (closeBtn && chatbox) {
  closeBtn.onclick = () => chatbox.style.display = "none";
}

if (sendBtn) {
  sendBtn.onclick = sendMessage;
}

if (input) {
  input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") sendMessage();
  });
}

function addMessage(text, className) {
  const msg = document.createElement("div");
  msg.className = className;
  msg.innerText = text;
  chatBody.appendChild(msg);
  chatBody.scrollTop = chatBody.scrollHeight;
}

async function sendMessage() {
  const userText = input.value.trim();
  if (!userText) return;

  addMessage(userText, "user");
  input.value = "";

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",  // ✅ UPDATED MODEL
        messages: [
          { role: "user", content: userText }
        ],
        temperature: 0.7,
        max_tokens: 512
      })
    });

    const data = await response.json();
    console.log("FULL RESPONSE:", data);

    if (!response.ok) {
      throw new Error(data.error?.message);
    }

    const botReply = data?.choices?.[0]?.message?.content || "No reply";

    addMessage(botReply, "bot");

  } catch (error) {
    console.error(error);
    addMessage("Error: " + error.message, "bot");
  }
}