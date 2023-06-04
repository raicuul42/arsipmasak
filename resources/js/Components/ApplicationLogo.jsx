export default function ApplicationLogo(props) {
    return (
        <svg {...props} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180">
            <path
                d="M135 0H45A45 45 0 0 0 0 45v90a45 45 0 0 0 45 45h90a45 45 0 0 0 45-45V45a45 45 0 0 0-45-45Z"
                fill="url(#a)"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M90 35.9A54.1 54.1 0 1 0 90 144a54.1 54.1 0 0 0 0-108ZM68.3 80.3a5.8 5.8 0 1 0 8.6 7.8l7.3-8.1v35a5.8 5.8 0 1 0 11.6 0V80l7.3 8a5.8 5.8 0 1 0 8.6-7.7L94.3 61a5.8 5.8 0 0 0-8.6 0L68.3 80.3Z"
                fill="#fff"
            />
            <defs>
                <linearGradient id="a" x1={0} y1={0} x2=".2" y2=".2" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#60A5FA" />
                    <stop offset={1} stopColor="#2563EB" />
                </linearGradient>
            </defs>
        </svg>
    );
}
