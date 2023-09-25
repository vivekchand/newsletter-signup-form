export default function FeedBack({ email }) {
  const handleClick = (e) => {
    e.preventDefault();
    location.reload();
  };

  return (
    <div className="flex flex-col space-y-6 pt-32 lg:pt-0 ">
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          viewBox="0 0 64 64"
        >
          <defs>
            <linearGradient id="a" x1="100%" x2="0%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#FF6A3A" />
              <stop offset="100%" stopColor="#FF527B" />
            </linearGradient>
          </defs>
          <g fill="none">
            <circle cx="32" cy="32" r="32" fill="url(#a)" />
            <path
              stroke="#FFF"
              strokeWidth="4"
              d="m18.286 34.686 8.334 7.98 19.094-18.285"
            />
          </g>
        </svg>
      </>

      <h1 className="font-semibold text-5xl text-left max-w-sm">
        Thanks for subscribing!
      </h1>

      <p className="max-w-sm">
        A confirmation email has been sent to{" "}
        <span className="font-semibold">{email}</span>. Please open it and click
        the button inside to confirm subscription
      </p>

      <span className="flex items-center justify-center pt-64 lg:pt-0">
        <button
          aria-label="Dismiss Message"
          className="min-w-full py-3 px-6 text-white shadow-xl bg-gradient-to-r from-rose-400 via-red-400 to-orange-400 rounded-lg"
          onClick={handleClick}
        >
          Dismiss message
        </button>
      </span>
    </div>
  );
}
