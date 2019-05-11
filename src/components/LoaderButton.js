import React from "react";
import { Button } from "react-bootstrap";
import "../css/LoaderButton.css";

export default ({
        isLoading,
        text,
        loadingText,
        className = "",
        disabled = false,
        ...props
    }) =>
    <Button
        className={`LoaderButton ${className}`}
        disabled={disabled || isLoading}
        {...props}
    >
        {isLoading }
        {!isLoading ? text : loadingText}
    </Button>;
