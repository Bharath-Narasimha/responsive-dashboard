import React from 'react';
import { Heart, Github, Twitter, Linkedin } from 'lucide-react';
import './Footer.css';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`footer ${className}`}>
      <div className="footer-content">
        <div className="footer-left">
          <p className="footer-text">
            Made with <Heart className="heart-icon" size={16} /> by the Dashboard Team
          </p>
          <p className="footer-copyright">
            © {currentYear} Responsive Dashboard. All rights reserved.
          </p>
        </div>

        <div className="footer-center">
          <nav className="footer-nav">
            <a href="/privacy" className="footer-link">
              Privacy Policy
            </a>
            <a href="/terms" className="footer-link">
              Terms of Service
            </a>
            <a href="/support" className="footer-link">
              Support
            </a>
            <a href="/docs" className="footer-link">
              Documentation
            </a>
          </nav>
        </div>

        <div className="footer-right">
          <div className="social-links">
            <a
              href="https://github.com"
              className="social-link"
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={16} />
            </a>
            <a
              href="https://twitter.com"
              className="social-link"
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter size={16} />
            </a>
            <a
              href="https://linkedin.com"
              className="social-link"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
