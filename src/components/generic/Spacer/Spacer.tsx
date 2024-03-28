import React from 'react';
import "./spacer.css";

interface SpacerProps {
    className?: string;
    space?: number;
    charSpace?: string;
}

export default function Spacer({ className, space = 1, charSpace = ' ' }: SpacerProps) {
    const spacerString = charSpace.repeat(space);

    return (
        <span className={`spacer ${className || ''}`} style={{whiteSpace: 'pre'}}>{spacerString}</span>
    );
}
