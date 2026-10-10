import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./UI/Input";
import Button from "./UI/Button";

const SearchBar = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedUsername = username.trim();

    if (!trimmedUsername) {
      setError("Please enter a GitHub username.");
      return;
    }

    setError("");
    setUsername(trimmedUsername);
    navigate(`/user/${encodeURIComponent(trimmedUsername)}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-2xl flex-col gap-3 px-4 py-10 sm:flex-row sm:items-start"
    >
      <div className="flex min-w-0 flex-1 flex-col">
        <Input
          id="github-username"
          name="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            if (error) setError("");
          }}
          placeholder="Enter GitHub username"
          ariaLabel="GitHub username"
          ariaInvalid={Boolean(error)}
          ariaDescribedby={error ? "username-error" : undefined}
        />
        {error && (
          <p
            id="username-error"
            role="alert"
            className="mt-2 text-sm text-rose-400"
          >
            {error}
          </p>
        )}
      </div>
      <Button type="submit" className="sm:shrink-0">
        Search
      </Button>
    </form>
  );
};
export default SearchBar;
