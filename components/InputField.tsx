import React from 'react';

interface InputFieldProps {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  label?: string; // Opsional: jika ingin menampilkan label di atas input
}

export default function InputField({ type, value, onChange, placeholder, label }: InputFieldProps) {
  return (
    <div className="w-full space-y-2">
      {label && <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-white/[0.03] px-8 py-6 rounded-3xl border border-white/5 focus:border-purple-500 outline-none text-sm font-bold transition-all duration-300 placeholder:text-gray-700"
      />
    </div>
  );
}