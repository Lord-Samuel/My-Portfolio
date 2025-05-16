AOS.init();
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function scrollToSection(section) {
  const element = document.getElementById(section);
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
};

async function copyEmail() {
  const email = document.getElementById('email');
  await navigator.clipboard.writeText(email.value);
  alert('Email Copied');
};