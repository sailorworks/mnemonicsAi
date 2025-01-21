"use client";
import React from "react";
import Image from "next/image";
import { FaSquareXTwitter, FaGithub } from "react-icons/fa6";
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
              <a
                href="https://github.com/sailorworks/mnemonicsAi"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors text-2xl flex items-center gap-1"
              >
                <FaGithub />
                <span className="text-sm">Star on GitHub</span>
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
                <a
                  href="https://mnemonicsai.com/privacy-policy"
                  className="hover:text-white"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="https://mnemonicsai.com/terms-of-service"
                  className="hover:text-white"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <div className="flex justify-center items-center space-x-4">
            {/* Product Hunt Badge */}
            <a
              href="https://www.producthunt.com/posts/mnemonicsai?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-mnemonicsai"
              target="_blank"
              rel="noopener noreferrer"
            >
              <a
                href="https://www.producthunt.com/products/mnemonicsai?utm_source=badge-follow&utm_medium=badge&utm_souce=badge-mnemonicsai"
                target="_blank"
              >
                <img
                  src="https://api.producthunt.com/widgets/embed-image/v1/follow.svg?product_id=796305&theme=neutral"
                  alt="mnemonicsAi - Learn&#0032;faster&#0044;&#0032;retain&#0032;longer&#0032;with&#0032;mnemonics&#0046; | Product Hunt"
                  style={{ width: "250px", height: "54px" }}
                  width="250"
                  height="54"
                />
              </a>
            </a>

            {/* TinyLaunch Badge */}
            <a
              href="https://www.tinylaun.ch/launch/50"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/tinylaunch_badge_2.svg"
                alt="TinyLaunch Badge"
                width={250}
                height={54}
                className="inline-block"
              />
            </a>
          </div>
          <p className="mt-4">© 2025 mnemonicsAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
