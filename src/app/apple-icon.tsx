import { ImageResponse } from 'next/og';

export const size = {
  width: 180,
  height: 180,
};

export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
          background: 'linear-gradient(135deg, #0A1124 0%, #1E3A8A 100%)',
          border: '8px solid #D4AF37',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
        }}
      >
        <span
          style={{
            color: '#E5C05B',
            fontSize: 72,
            fontWeight: 700,
            fontFamily: 'monospace',
            letterSpacing: '0.04em',
            lineHeight: 1,
          }}
        >
          BH
        </span>
        <span
          style={{
            color: '#94A3B8',
            fontSize: 18,
            fontWeight: 500,
            fontFamily: 'sans-serif',
            letterSpacing: '0.15em',
            lineHeight: 1,
          }}
        >
          DIGITAL
        </span>
      </div>
    ),
    { ...size }
  );
}
