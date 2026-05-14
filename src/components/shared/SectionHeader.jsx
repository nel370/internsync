import React from "react";

export default function SectionHeader({ title, subtitle }) {
  return (
    <div className="text-center mb-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{title}</h2>
      {subtitle && (
        <p className="mt-2 text-muted-foreground text-sm max-w-md mx-auto">{subtitle}</p>
      )}
    </div>
  );
}