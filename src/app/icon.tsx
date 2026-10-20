import { ImageResponse } from 'next/og';

export const size = {
  width: 32,
  height: 32,
};

export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 7,
          background: 'linear-gradient(135deg, #0A1124 0%, #1E3A8A 100%)',
          border: '1.5px solid #D4AF37',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            color: '#E5C05B',
            fontSize: 14,
            fontWeight: 700,
            fontFamily: 'monospace',
            letterSpacing: '0.05em',
            lineHeight: 1,
          }}
        >
          BH
        </span>
      </div>
    ),
    { ...size }
  );
}
