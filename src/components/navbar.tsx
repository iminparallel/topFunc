'use client'
import Link from 'next/link'
import { Me } from "@/components/me";
import { ConnectWalletButton } from "@/components/wallet/connect";
import { CSSProperties } from "react";


type NavbarProps = {};

export function Navbar(props: NavbarProps) {
  const style_hover: CSSProperties = {
      position: "fixed",
      top:0,
      width:"100%",
  }
  const style_red: CSSProperties = {
    color:"green"
}





    return (
      <nav style = {style_hover} className="font-mono font-bold px-6 py-2" >
      <p style = {style_red} className="py-1">
        <Link href="/"> Home </Link>
      </p>

      <p className="py-1">
        <Me/>
      </p>
      <p>
        <ConnectWalletButton/>
        </p>
      </nav>
    );
  }
  /*
        <p style = {style_red} className="py-1">
        <Link href="/assets"> AssetList </Link>
      </p>*/ 