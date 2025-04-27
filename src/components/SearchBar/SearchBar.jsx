import { useState } from "react";
import s from "./SearchBar.module.css";
import toast, { Toaster } from "react-hot-toast";

function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim().length >= 2) {
      onSearch(input.trim());
      setInput("");
    } else {
      toast.error("Please enter at least 2 characters");
    }
  };

  return (
    <header className={s.header}>
      <form onSubmit={handleSubmit} className={s.form}>
        <input
          className={s.input}
          name="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className={s.button} type="submit">
          Search
        </button>
      </form>
      <Toaster position="top-right" />
    </header>
  );
}

export default SearchBar;
