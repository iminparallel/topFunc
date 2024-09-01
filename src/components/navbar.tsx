"use client";
import Link from "next/link";
import { Me } from "@/components/me";
import { ConnectWalletButton } from "@/components/wallet/connect";
import { CSSProperties } from "react";
import { Play } from "@/components/play";
import { Submissions } from "@/components/submissions";
import Image from "next/image";

type NavbarProps = {};

export function Navbar(props: NavbarProps) {
  const style_hover: CSSProperties = {
    position: "fixed",
    top: 0,
    width: "100%",
  };
  const style_red: CSSProperties = {
    color: "green",
  };

  const styley: CSSProperties = {
    width: "10%",
  };

  return (
    <nav
      style={style_hover}
      className="font-mono font-bold px-6 py-2 flex flex-col"
    >
      <div style={style_red} className="font-mono font-bold">
        <Image
          className="p-1 text-white"
          src="sisyphus.svg"
          width={50}
          height={50}
          alt="chained"
        />
        TopFunc()
      </div>
      <div>
        <ConnectWalletButton />
      </div>
      <div className="py-1">
        <Me />
      </div>
      <div>
        <Submissions />
      </div>
      <div>
        <Play />
      </div>
    </nav>
  );
}
/*
        <p style = {style_red} className="py-1">
        <Link href="/assets"> AssetList </Link>
      </p>*/
