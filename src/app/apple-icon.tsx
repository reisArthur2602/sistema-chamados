import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

const PRIMARY = '#d97706';
const S = 180 / 32;

export default function AppleIcon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: 180,
                    height: 180,
                    borderRadius: 40,
                    backgroundColor: PRIMARY,
                    display: 'flex',
                    position: 'relative',
                }}
            >
                {/* Ticket body */}
                <div
                    style={{
                        position: 'absolute',
                        left: Math.round(6 * S),
                        top: Math.round(11 * S),
                        width: Math.round(13 * S),
                        height: Math.round(10 * S),
                        borderRadius: Math.round(2 * S),
                        backgroundColor: 'rgba(255,255,255,0.95)',
                    }}
                />
                {/* Ticket stub */}
                <div
                    style={{
                        position: 'absolute',
                        left: Math.round(20 * S),
                        top: Math.round(11 * S),
                        width: Math.round(6 * S),
                        height: Math.round(10 * S),
                        borderRadius: Math.round(2 * S),
                        backgroundColor: 'rgba(255,255,255,0.55)',
                    }}
                />
                {/* Line 1 */}
                <div
                    style={{
                        position: 'absolute',
                        left: Math.round(9 * S),
                        top: Math.round(13.5 * S),
                        width: Math.round(6 * S),
                        height: Math.round(1.5 * S),
                        borderRadius: Math.round(S),
                        backgroundColor: PRIMARY,
                    }}
                />
                {/* Line 2 */}
                <div
                    style={{
                        position: 'absolute',
                        left: Math.round(9 * S),
                        top: Math.round(17 * S),
                        width: Math.round(4 * S),
                        height: Math.round(1.5 * S),
                        borderRadius: Math.round(S),
                        backgroundColor: PRIMARY,
                    }}
                />
            </div>
        ),
        { ...size },
    );
}
