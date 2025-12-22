export default function NoiseOverlay() {
    return (
        <div
            className="fixed inset-0 z-50 pointer-events-none opacity-25 mix-blend-overlay"
            style={{
                backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')"
            }}
        />
    );
}
