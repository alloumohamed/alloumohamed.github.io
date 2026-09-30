<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Sign in</title>
<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  :root {
    --red: #e40303;
    --orange: #ff8c00;
    --yellow: #ffed00;
    --green: #008026;
    --blue: #004dff;
    --violet: #750787;
    --ink: #1c1030;
    --paper: #fffaf3;
  }
  * { box-sizing: border-box; margin: 0; }
  html, body { height: 100%; }
  body {
    font-family: 'Fredoka', system-ui, sans-serif;
    color: var(--ink);
    background: var(--ink);
    display: grid;
    place-items: center;
    padding: 20px;
    overflow-x: hidden;
  }

  /* Rainbow flag as the backdrop: six wavy bands */
  .flag {
    position: fixed; inset: 0; z-index: 0;
    display: flex; flex-direction: column;
  }
  .flag i { flex: 1; }
  .flag i:nth-child(1){background:var(--red)}
  .flag i:nth-child(2){background:var(--orange)}
  .flag i:nth-child(3){background:var(--yellow)}
  .flag i:nth-child(4){background:var(--green)}
  .flag i:nth-child(5){background:var(--blue)}
  .flag i:nth-child(6){background:var(--violet)}
  .flag::after {
    content: ""; position: absolute; inset: 0;
    background: radial-gradient(ellipse at center, rgba(255,250,243,.0) 0%, rgba(28,16,48,.35) 100%);
  }

  .card {
    position: relative; z-index: 1;
    width: min(420px, 100%);
    background: var(--paper);
    border: 4px solid var(--ink);
    border-radius: 28px;
    padding: 34px 30px 30px;
    box-shadow: 10px 10px 0 var(--ink);
  }

  .stripe {
    height: 14px; border-radius: 99px; margin-bottom: 22px;
    background: linear-gradient(90deg,var(--red) 0 16.66%,var(--orange) 0 33.33%,var(--yellow) 0 50%,var(--green) 0 66.66%,var(--blue) 0 83.33%,var(--violet) 0);
    border: 3px solid var(--ink);
  }

  h1 { font-size: 2rem; font-weight: 700; line-height: 1.1; }
  .sub { margin-top: 6px; font-size: 1rem; opacity: .75; }

  form { margin-top: 24px; display: grid; gap: 16px; }
  label { font-weight: 600; font-size: .95rem; display: grid; gap: 6px; }
  input {
    font: inherit; font-weight: 500;
    padding: 13px 16px;
    border: 3px solid var(--ink);
    border-radius: 16px;
    background: #fff;
    color: var(--ink);
    outline: none;
    transition: box-shadow .15s, transform .15s;
  }
  input:focus-visible {
    box-shadow: 0 0 0 4px var(--yellow), 0 0 0 7px var(--ink);
  }

  button {
    font: inherit; font-weight: 700; font-size: 1.1rem;
    padding: 14px;
    border: 3px solid var(--ink);
    border-radius: 16px;
    color: #fff;
    cursor: pointer;
    background: linear-gradient(90deg,var(--red),var(--orange),#e8c700,var(--green),var(--blue),var(--violet));
    text-shadow: 0 2px 0 rgba(0,0,0,.45);
    box-shadow: 0 5px 0 var(--ink);
    transition: transform .1s, box-shadow .1s;
  }
  button:hover { transform: translateY(2px); box-shadow: 0 3px 0 var(--ink); }
  button:active { transform: translateY(5px); box-shadow: 0 0 0 var(--ink); }
  button:focus-visible { outline: 4px solid var(--blue); outline-offset: 3px; }

  .error {
    display: none;
    padding: 12px 14px;
    border: 3px solid var(--ink);
    border-radius: 14px;
    background: #ffd9d9;
    font-weight: 600;
  }
  .error.show { display: block; animation: shake .4s; }
  @keyframes shake {
    20%{transform:translateX(-8px)} 40%{transform:translateX(8px)}
    60%{transform:translateX(-5px)} 80%{transform:translateX(5px)}
  }

  /* Reveal screen */
  .reveal { display: none; text-align: center; }
  .reveal.show { display: block; }
  .duck { font-size: 4.5rem; display: inline-block; animation: waddle 1.2s ease-in-out infinite; }
  @keyframes waddle { 0%,100%{transform:rotate(-8deg)} 50%{transform:rotate(8deg)} }

  .big {
    font-size: 1.7rem; font-weight: 700; line-height: 1.2; margin: 10px 0 18px;
    background: linear-gradient(90deg,var(--red),var(--orange),#d4b000,var(--green),var(--blue),var(--violet));
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }

  .step { opacity: 0; transform: translateY(10px); transition: opacity .5s, transform .5s; }
  .step.in { opacity: 1; transform: none; }

  .email-box {
    margin: 10px 0 6px;
    padding: 14px;
    border: 3px dashed var(--ink);
    border-radius: 16px;
    background: #fff;
    font-weight: 600;
    word-break: break-all;
  }
  .email-box small { display: block; font-weight: 400; opacity: .6; margin-bottom: 4px; }
  .email-box .rev { font-size: 1.15rem; color: var(--violet); direction: ltr; }
  .hint { font-size: .95rem; margin: 14px 0 4px; font-weight: 500; }
  .thanks { margin-top: 18px; font-weight: 700; font-size: 1.15rem; }

  .again {
    margin-top: 18px; background: var(--ink); text-shadow: none;
    font-size: .95rem; padding: 10px 16px; width: auto;
  }

  @media (prefers-reduced-motion: reduce) {
    .duck, .error.show { animation: none; }
    .step { transition: none; }
  }
</style>
</head>
<body>
  <div class="flag" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></div>

  <main class="card">
    <div class="stripe" aria-hidden="true"></div>

    <section id="login">
      <h1>Welcome back</h1>
      <p class="sub">Sign in to continue</p>

      <form id="form" autocomplete="off" novalidate>
        <label>Email
          <input id="email" type="text" placeholder="you@rainbow.com" required>
        </label>
        <label>Password
          <input id="pass" type="password" placeholder="••••••••" required>
        </label>
        <div class="error" id="err" role="alert">Incorrect password</div>
        <button type="submit">Sign in</button>
      </form>
    </section>

    <section id="reveal" class="reveal" aria-live="polite">
      <div class="duck" aria-hidden="true">🦆</div>
      <div class="big" id="line1">yes you are gay 🦆<br>little cute gay</div>

      <div class="step" id="s2">
        <p class="hint">The email you entered. Read it from right to left:</p>
        <div class="email-box">
          <small id="orig"></small>
          <div class="rev" id="rev"></div>
        </div>
      </div>

      <div class="step thanks" id="s3">thank you for confirming you gay 🌈</div>

      <button class="again step" id="s4" type="button">Back to login</button>
    </section>
  </main>

<script>
  const SECRET_EMAIL = "yagami@yagami.yag.em.ih";
  const SECRET_PASS  = "yes_i_am";

  const $ = id => document.getElementById(id);
  const form = $("form"), err = $("err");

  form.addEventListener("submit", e => {
    e.preventDefault();
    const email = $("email").value.trim();
    const pass  = $("pass").value;

    if (email.toLowerCase() === SECRET_EMAIL && pass === SECRET_PASS) {
      showReveal(email);
    } else {
      err.classList.remove("show");
      void err.offsetWidth;            // restart the shake
      err.classList.add("show");
    }
  });

  function showReveal(email) {
    $("login").style.display = "none";
    $("reveal").classList.add("show");
    $("orig").textContent = email;
    $("rev").textContent = [...email].reverse().join("");

    ["s2","s3","s4"].forEach((id, i) =>
      setTimeout(() => $(id).classList.add("in"), 1200 + i * 1600)
    );
  }

  $("s4").addEventListener("click", () => {
    $("reveal").classList.remove("show");
    ["s2","s3","s4"].forEach(id => $(id).classList.remove("in"));
    $("login").style.display = "";
    err.classList.remove("show");
    form.reset();
  });
</script>
</body>
</html>
