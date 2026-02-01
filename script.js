
const projects = [
    {
        title:"My Portfolio",
        description: "MyPortfolio is a dynamic and visually engaging project that showcases my skills, experience, and accomplishments, providing a comprehensive overview of my professional journey and creative work.",
        techStack: ["HTML", "CSS", "JavaScript"],
        image: "images/image7.projet3.png",
        codeLink: "https://github.com/ibrahimnajjarine/MyPortfolio",
        demoLink: "https://ibrahimnajjarine.github.io/MyPortfolio"
    },
    {
        title: "TASK MASTER",
        description: "ask Master is an intuitive and comprehensive project management tool designed to help users efficiently organize, track, and prioritize their tasks. It empowers teams to collaborate seamlessly.",
        techStack: ["HTML", "CSS", "JavaScript"],
        image: "images/image9.projet3.png",
        codeLink: "https://github.com/ibrahimnajjarine/Task-Master",
        demoLink: "https://ibrahimnajjarine.github.io/Task-Master"
    },
];
const container = document.getElementById("projects-container");
  projects.forEach(project => {
    const card = document.createElement("div");
    card.classList.add("project-card");
    card.innerHTML = `
        <img src="${project.image}" alt="${project.title}">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="tech-stack">
          ${project.techStack.map(tech => `<span>${tech}</span>`).join('')}
        </div>
        <div class="project-links">
            <a href="${project.codeLink}" target="_blank"><i class="iconify" data-icon="bi:github"></i>Code</a>
            <a href="${project.demoLink}" target="_blank"><i class="iconify" data-icon="garden:new-window-fill-12"></i>Live Demo</a>
        </div>
    `;    
    container.appendChild(card);
});
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const messageInput = document.getElementById("message");
  const wordsCounter = document.getElementById("words");

  messageInput.addEventListener("input", () => {
    const words = messageInput.value
      .trim()
      .split(/\s+/)
      .filter(word => word.length > 0);

    const count = words.length;
    wordsCounter.textContent = `${count}/300 words`;
    wordsCounter.style.color = count >= 300 ? "red" : "#393c40";
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = messageInput.value.trim();

    if (!name || !email || !message) {
      alert("❌ Please fill in all required fields.");
      return;
    }

    if (!isValidEmail(email)) {
      alert("❌ Please enter a valid email address.");
      return;
    }

    const wordCount = message.split(/\s+/).filter(w => w.length > 0).length;
    if (wordCount > 300) {
      alert("❌ Message must be 300 words or less.");
      return;
    }

    try {
      const response = await fetch(
        "https://api.emailjs.com/api/v1.0/email/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            service_id: "service_i7ystzc",
            template_id: "template_awly5ym",
            user_id: "C4ZaqT2XRh1HltNao",
            template_params: {
              name: name,
              email: email,
              phone: phone,
              message: message,
            },
          }),
        }
      );

      if (response.status === 200) {
        alert("✅ Message sent successfully!");
        form.reset();
        wordsCounter.textContent = "0/300 words";
      } else {
        alert("❌ Failed to send message. Check EmailJS settings.");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Network error. Please try again later.");
    }
  });

  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
});