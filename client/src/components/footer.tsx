import { Link } from "wouter";
import logoWhiteUrl from "@assets/noBgWhite (1)_1756064217632.png";

export default function Footer() {
  return (
    <footer className="bg-corporate text-white py-16" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8 mb-12">
          {/* Company Info */}
          <div data-testid="footer-company" className="lg:col-span-1">
            <img 
              src={logoWhiteUrl} 
              alt="Limitless Energy CO" 
              className="h-10 w-auto mb-6"
            />
            <p className="text-gray-300 mb-6 text-sm leading-relaxed">
              Comprehensive commercial energy solutions that drive sustainability and reduce costs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200" data-testid="link-linkedin">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200" data-testid="link-twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200" data-testid="link-facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Solutions */}
          <div data-testid="footer-solutions" className="lg:pl-4">
            <h4 className="font-semibold text-lg mb-6">Solutions</h4>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li><Link href="/solutions/commercial-solar-battery" data-testid="footer-link-solar"><span className="hover:text-white transition-colors duration-200">Commercial Solar</span></Link></li>
              <li><Link href="/solutions/battery-storage" data-testid="footer-link-battery"><span className="hover:text-white transition-colors duration-200">Battery Storage</span></Link></li>
              <li><Link href="/solutions/energy-procurement" data-testid="footer-link-procurement"><span className="hover:text-white transition-colors duration-200">Energy Procurement</span></Link></li>
              <li><Link href="/solutions/om-asset-management" data-testid="footer-link-om"><span className="hover:text-white transition-colors duration-200">O&M Services</span></Link></li>
              <li><Link href="/solutions/energy-consulting" data-testid="footer-link-consulting"><span className="hover:text-white transition-colors duration-200">Energy Consulting</span></Link></li>
            </ul>
          </div>

          {/* Company */}
          <div data-testid="footer-company-links" className="lg:pl-4">
            <h4 className="font-semibold text-lg mb-6">Company</h4>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li><Link href="/about" data-testid="footer-link-about"><span className="hover:text-white transition-colors duration-200">About Us</span></Link></li>
              <li><Link href="/about#team" data-testid="footer-link-team"><span className="hover:text-white transition-colors duration-200">Our Team</span></Link></li>
              <li><Link href="/projects" data-testid="footer-link-projects"><span className="hover:text-white transition-colors duration-200">Projects</span></Link></li>
              <li><Link href="/clients" data-testid="footer-link-clients"><span className="hover:text-white transition-colors duration-200">Clients</span></Link></li>
              <li><Link href="/partners" data-testid="footer-link-partners"><span className="hover:text-white transition-colors duration-200">Partners</span></Link></li>
            </ul>
          </div>

          {/* Support */}
          <div data-testid="footer-support">
            <h4 className="font-semibold text-lg mb-6">Support</h4>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li><Link href="/contact" data-testid="footer-link-contact"><span className="hover:text-white transition-colors duration-200">Contact Us</span></Link></li>
              <li><Link href="/faqs" data-testid="footer-link-faqs"><span className="hover:text-white transition-colors duration-200">FAQs</span></Link></li>
              <li><a href="tel:+13476825050" className="hover:text-white transition-colors duration-200" data-testid="footer-phone">(347) 682-5050</a></li>
              <li><a href="mailto:info@limitlessenergyco.com" className="hover:text-white transition-colors duration-200" data-testid="footer-email">info@limitlessenergyco.com</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-gray-400" data-testid="footer-copyright">
          <p>&copy; 2024 Limitless Energy CO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
