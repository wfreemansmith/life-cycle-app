<script>
</script>

<main
  class="flex bg-black flex-col items-center w-screen h-full min-h-screen relative"
>
  <div class="custom-shape-divider-top-1680002298">
    <svg
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
    >
      <path
        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
        class="shape-fill"
      />
    </svg>
  </div>
  <section class="about">
    <div class="about-container">
      <h1>About Life Cycle</h1>
      <h2>Mission Statement:</h2>
      <p>
        At LifeCycle, our mission is to empower individuals to showcase their
        life journey and accomplishments with personality and flair. We believe
        that everyone has a unique story to tell, and our web application helps
        users bring their stories to life by creating interactive, animated, and
        engaging digital CVs.
      </p>
      <br />
      <h3>Our Story:</h3>
      <p>
        The idea for LifeCycle was born when a team member was updating their
        CV, struggling to condense their life experiences onto a single, dull
        page. It was a frustrating process that left them feeling like the
        traditional CV format didn't accurately capture their essence or
        achievements. This realization sparked the idea for a platform that
        could revolutionize how people present themselves to potential
        employers, clients, and the world.
      </p>
      <br />
      <p>
        Life Cycle was created to break away from the conventional
        black-and-white text format, and instead provide a vibrant, animated,
        and interactive way to document and present life milestones,
        experiences, and achievements.
      </p>
      <h4>Meet the Team:</h4>
      <p>
        Life Cycle was created during our time as students at the Northcoders
        Full-stack Bootcamp. Our team is made up of four talented individuals
        who are passionate about bringing this innovative platform to life.
      </p>
      <div class="team-grid">
        <div class="team-member">
          <h5>Josh Foster</h5>
        </div>
        <div class="team-member">
          <h5>Wes Freeman-Smith</h5>
        </div>
        <div class="team-member">
          <h5>Aaron Kelly</h5>
        </div>
        <div class="team-member">
          <h5>Zahed Miah</h5>
        </div>
      </div>

      <h5>Whats in it for you?</h5>
      <p>With Life Cycle, users can:</p>
      <ol class="bullets">
        <li>
          Create a unique and engaging profile that reflects their personality,
          interests, and accomplishments.
        </li>
        <br />
        <li>Add, edit, and organize their life milestones.</li>
        <br />
        <li>
          Attach various types of information to each milestone, such as text,
          photos, location, skills and qualifications.
        </li>
        <br />
        <li>
          Share their interactive CV with potential employers, clients, or
          simply with friends and family.
        </li>
        <br />
        <li>
          Stand out from the crowd by showcasing their life journey in a
          captivating and memorable way.
        </li>
      </ol>
      <p>
        Join Life Cycle today and start redefining how you present yourself to
        the world! Let your life story take center stage with the help of our
        innovative platform, and never feel confined by the limitations of
        traditional CVs again.
      </p>
    </div>
  </section>

  <div class="custom-shape-divider-bottom-1680002532">
    <svg
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
    >
      <path
        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
        class="shape-fill"
      />
    </svg>
  </div>
</main>

<style>
  body {
    margin: 0;
    padding: 0;
  }

  .team-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 16px;
    text-align: center;
    margin-bottom: 16px;
  }

  .team-member {
    padding: 8px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
  }

  .bullets {
    list-style: none;
    counter-reset: list-counter;
  }

  .bullets li {
    position: relative;
    counter-increment: list-counter;
  }

  .bullets li::before {
    content: counter(list-counter) ".";
    position: absolute;
    left: -1.5em;
    color: white;
  }

  .about {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    color: white;
    margin: 10px;
    margin-top: 0;
    padding: 20px;
    border: 2px solid white;
    box-shadow: 0 0 10px 5px rgba(221, 209, 44, 0.1);
    overflow-y: auto;
  }
  .about-container {
    max-width: 800px;
    max-height: 870px;
    overflow-y: auto;
    padding-right: 16px;
  }
  .about-container::-webkit-scrollbar {
    width: 8px;
  }

  .about-container::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 5px;
  }

  .about-container::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 5px;
  }

  .about-container::-webkit-scrollbar-thumb:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
  h1 {
    font-size: 3em;
    margin-bottom: 8px;
  }

  h2,
  h3,
  h4,
  h5 {
    font-size: 1.5em;
    margin-bottom: 8px;
  }

  p {
    margin-bottom: 16px;
    text-align: center;
  }

  ol {
    margin-bottom: 16px;
    padding-left: 24px;
    text-align: left;
  }

  ul {
    margin-bottom: 16px;
    padding-left: 24px;
    text-align: center;
  }
  .custom-shape-divider-top-1680002298 {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
    z-index: 0;
  }

  .custom-shape-divider-top-1680002298 svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 144px;
    z-index: 0;
  }

  .custom-shape-divider-top-1680002298 .shape-fill {
    fill: #fcba28;
    z-index: 0;
  }

  .custom-shape-divider-bottom-1680002532 {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
    transform: rotate(180deg);
    z-index: 0;
  }

  .custom-shape-divider-bottom-1680002532 svg {
    position: relative;
    display: block;
    width: calc(211% + 1.3px);
    height: 152px;
    transform: rotateY(180deg);
    z-index: 0;
  }

  .custom-shape-divider-bottom-1680002532 .shape-fill {
    fill: #0cb2c0;
    z-index: 0;
  }
</style>
