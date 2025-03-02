import React from 'react';
import {  Mail, Sparkles, Heart } from 'lucide-react';
import { FaTelegram } from 'react-icons/fa';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div className="relative">
            <footer className="bg-white/10 backdrop-blur-xl mt-10 text-[var(--soft-blue)] w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Top Section with Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
                        {/* Company Info */}
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <Sparkles className="w-6 h-6 text-[var(--light-blue)]" />
                                <h3 className="text-xl font-bold sigmar-one bg-gradient-to-r from-[var(--white)] to-[var(--soft-blue)] inline-block text-transparent bg-clip-text">
                                BLUETV
                                </h3>
                            </div>
                            <p className="text-md text-[var(--light-blue)] roboto">
                            ပင်ပန်းနေပြီလား??ဒီမှာလာအနားယူပါ 🙂‍↔️ <br/>
                            Are u tired ? Come and relax here dude
                            </p>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h4 className="font-semibold text-[#ffffff] mb-4">Contact</h4>
                            <ul className="space-y-2">
                                <li>
                                    <a
                                        href="mailto:darkken415@gmail.com"
                                        className="text-sm hover:text-[#007c8e] transition-colors duration-300 flex items-center font-bold space-x-2 group"
                                    >
                                        <Mail className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
                                        <span className='' >Send Mail</span>
                                    </a>
                                </li>
                                <a
                                    href="https://t.me/bluetv67"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm hover:text-[#007c8e] transition-colors duration-300 flex items-center font-bold space-x-2 group"
                                >
                                    <FaTelegram className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
                                    <span>Join Our Telegram</span>
                                </a>
                            </ul>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-[#93a4ab]/20 to-transparent" />

                    {/* Bottom Section */}
                    <div className="py-6">
                        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                            {/* Copyright */}
                            <div className="flex items-center space-x-2">
                                <Heart className="w-4 h-4 text-[var(--light-blue)]" />
                                <p className="text-sm">
                                    © {currentYear} BLUETV. All rights reserved.
                                </p>
                            </div>


                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
