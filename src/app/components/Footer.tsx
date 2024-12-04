"use client";
import React from "react";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              mnemonicsAI
            </h3>
            <p className="text-gray-400">
              Making learning easier with AI-powered mnemonics.
            </p>
            <div className="flex space-x-4 mt-4">
              <a
                href="https://x.com/sailorworks"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors text-2xl"
              >
                <FaSquareXTwitter />
              </a>
              <a
                href="https://www.instagram.com/sailorworks/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors text-2xl"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>Address: Mumbai, India</li>
              <li>Email: sahilprasadroxxxx11@gmail.com</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p>© 2024 mnemonicsAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
