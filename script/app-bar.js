class AppBar extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <header>
          <h1>Notes App</h1>
        </header>
      `;
      const style = document.createElement('style');
      style.textContent = `
        header {
          background-color: var(--color-primary-dark);
          color: var(--color-accent);
          text-align: center;
          padding: 1rem 0;
        }
  
        header h1 {
          font-size: 2rem;
          margin: 0;
        }
      `;
      this.appendChild(style);
    }
  }
  
  customElements.define('app-bar', AppBar);
  