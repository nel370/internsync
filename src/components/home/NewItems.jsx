import React from "react";
import { generateNfts } from "@/lib/nftData";
import SectionHeader from "@/components/shared/SectionHeader";
import NftCard from "@/components/shared/NftCard";
import { motion } from "framer-motion";

const nfts = generateNfts(4);

export default function NewItems() {
  return (
    <section className="py-20 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="New Items" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {nfts.map((nft, i) => (
            <motion.div
              key={nft.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <NftCard nft={nft} showCountdown />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}