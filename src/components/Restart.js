import React from "react";

export function Restart({ onClick }) {
    return (
        <button className="restart" onClick={onClick}>
            Play again
        </button>
    );
}
