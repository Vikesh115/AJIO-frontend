const LoadingSpinner = ({ size = "md", color = "currentColor" }) => {
    const sizeClasses = {
        xs: "h-4 w-4 border-[2px]",
        sm: "h-5 w-5 border-[2px]",
        md: "h-6 w-6 border-2",
        lg: "h-8 w-8 border-[3px]",
        xl: "h-10 w-10 border-[3px]",
    };

    return (
        <div className="flex items-center justify-center">
            <div
                className={`animate-spin rounded-full border-solid ${sizeClasses[size]} border-t-transparent`}
                style={{ borderColor: color }}
            />
        </div>
    );
};

export default LoadingSpinner;