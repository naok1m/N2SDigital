import React from "react";
import logo from "../assets/logoN2S.png";
import LinkPadrao from "./LinkPadrao";

const linksEsquerda = [
  { href: "#inicio", label: "Início" },
  { href: "#servicos", label: "Serviços" },
];

const linksDireita = [
  { href: "#sobre", label: "Sobre" },
  { href: "#contato", label: "Contato" },
];

export default function Header() {
  return (
    <header className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 animate-fade-down max-w-3xl px-2 md:px-4 opacity-90">
      <nav className="flex items-center justify-center gap-2 md:gap-3
                      bg-gradient-to-r from-[rgba(255,255,255,0.25)] via-[rgba(255,255,255,0.18)] to-[rgba(255,255,255,0.25)]
                      border border-[rgba(255,255,255,0.3)]
                      backdrop-blur-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)]
                      rounded-full px-3 md:px-8 py-1.5 relative overflow-hidden
                      before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-[rgba(255,255,255,0.1)] before:to-transparent
                      before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100">

        {/* Links da esquerda */}
        {linksEsquerda.map(link => (
          <LinkPadrao key={link.href} href={link.href}>{link.label}</LinkPadrao>
        ))}

        {/* Logo central */}
        <div className="w-8 md:w-10 h-6 md:h-8 flex items-center justify-center 
                        bg-gradient-to-br from-[rgba(255,255,255,0.3)] to-[rgba(255,255,255,0.15)]
                        border border-[rgba(255,255,255,0.4)] rounded-full
                        backdrop-blur-[15px] shadow-[0_4px_16px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.3)]
                        relative z-10 hover:shadow-[0_6px_20px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.4)]
                        transition-all duration-300 hover:scale-105">
          <img src={logo} alt="Logo" className="w-5 h-5 md:w-8 md:h-8 filter drop-shadow-sm" />
        </div>

        {/* Links da direita */}
        {linksDireita.map(link => (
          <LinkPadrao key={link.href} href={link.href}>{link.label}</LinkPadrao>
        ))}
      </nav>
    </header>
  );
}
