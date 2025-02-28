class LoadingIndicator extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <style>
          .loading-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 1rem;
          }
  
          .spinner {
            display: inline-block;
            width: 64px;
            height: 64px;
            border: 6px solid #f3f3f3;
            border-top: 6px solid #3498db;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
  
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
  
          .loading-text {
            margin-top: 8px;
            font-family: sans-serif;
            font-size: 14px;
            color: #000;
          }
        </style>
  
        <div class="loading-container">
          <div class="spinner"></div>
          <div class="loading-text">Loading...</div>
        </div>
      `;
  }
}

customElements.define('loading-indicator', LoadingIndicator);
