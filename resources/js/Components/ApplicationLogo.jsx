export default function ApplicationLogo(props) {
    return (
        <svg {...props} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
            <g clipPath="url(#a)">
                <path
                    d="M96 0H32A32 32 0 0 0 0 32v64a32 32 0 0 0 32 32h64a32 32 0 0 0 32-32V32A32 32 0 0 0 96 0Z"
                    fill="url(#b)"
                />
                <path
                    d="M51.6 75C75 75 75 51.6 75 51.6S75 75 98.4 75C75 75 75 98.4 75 98.4S75 75 51.6 75ZM42 29.6S42 42 29.6 42C42 42 42 54.4 42 54.4S42 42 54.4 42C42 42 42 29.6 42 29.6Z"
                    fill="#818CF8"
                />
                <path
                    d="M51.6 75C75 75 75 51.6 75 51.6S75 75 98.4 75C75 75 75 98.4 75 98.4S75 75 51.6 75ZM42 29.6S42 42 29.6 42C42 42 42 54.4 42 54.4S42 42 54.4 42C42 42 42 29.6 42 29.6Z"
                    fill="#fff"
                    stroke="#fff"
                    strokeWidth="10.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
            <defs>
                <linearGradient id="b" x1={0} y1={0} x2=".2" y2=".2" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#8E2DE2" />
                    <stop offset={1} stopColor="#4A00E0" />
                </linearGradient>
                <clipPath id="a">
                    <path fill="#fff" d="M0 0h128v128H0z" />
                </clipPath>
            </defs>
        </svg>
    );
}
